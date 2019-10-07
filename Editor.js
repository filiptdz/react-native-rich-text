import React from 'react';
import {
  View, Keyboard, LayoutAnimation, UIManager, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

import { RichTextContext } from './RichText';

export const EditorWebView = React.createRef();

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0,
    };
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (e) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState(p => ({ ...p, keyboardHeight: e.endCoordinates.height }));
  };

  _keyboardDidHide = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState(p => ({ ...p, keyboardHeight: 0 }));
  };

  post = value => EditorWebView.current.postMessage(value);

  updateFormat = (format, extraData = '') => this.post('$' + format + '$' + extraData);

  render() {
    const { keyboardHeight } = this.state;
    const { onChangeText, style } = this.props;
    return (
      <RichTextContext.Consumer>
        {({ setFormat, updateFormatFunc, value }) => {
          if (!setFormat) {
            updateFormatFunc(this.updateFormat);
          }
          return (
            <View style={[{ flex: 1 }, style]}>
              <WebView
                ref={EditorWebView}
                onLoad={() => this.post(value)}
                onError={error => console.error(error)}
                javaScriptEnabled
                domStorageEnabled
                bounces={false}
                scalesPageToFit={false}
                source={
                  Platform.OS === 'android'
                    ? {
                      uri: 'file:///android_asset/html/texteditor.html',
                    }
                    : require('./assets/texteditor.html')
                }
                style={{ backgroundColor: 'white', flex: 1 }}
                onMessage={(evt) => {
                  if (evt.nativeEvent.data !== '') {
                    onChangeText(evt.nativeEvent.data);
                  }
                }}
              />
              <View
                style={{
                  height: 0,
                }}
              />
            </View>
          );
        }}
      </RichTextContext.Consumer>
    );
  }
}

Editor.propTypes = {
  onChangeText: PropTypes.func,
  style: PropTypes.object,
};
Editor.defaultProps = {
  onChangeText: () => {},
  style: {
    zIndex: -1,
  },
};
