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

  post = (value) => EditorWebView.current.postMessage(JSON.stringify(value));

  updateFormat = (format, extraData = '') => this.post({ value: '$' + format + '$' + extraData });

  onWebViewMessage = (evt) => {
    const { onChangeText, onMentionSelected } = this.props;
    const messageString = evt.nativeEvent.data;

    if (messageString === '')
      return false

    const message = JSON.parse(messageString)
    if(message.type === 'mention-start') {
      this.handleMentionStart(message.value);
      return false
    }
    if(message.type === 'mention-selected') {
      onMentionSelected(message.value)
      return false
    }

    onChangeText({
      text: message.value,
      mentions: message.mentions
    });
  }

  handleMentionStart(word) {
    const { onMentionStart } = this.props;
    const callback = (mentions = []) => {
      // retrive the mentions to the webview
      EditorWebView.current.postMessage(JSON.stringify({ mentions }));
    }

    onMentionStart(word, callback)
  }

  render() {
    const { keyboardHeight } = this.state;
    const { style } = this.props;

    return (
        <RichTextContext.Consumer>
          {({ setFormat, updateFormatFunc, value, placeholder = '' }) => {
            if (!setFormat) {
              updateFormatFunc(this.updateFormat);
            }
            return (
              <View style={[{ flex: 1 }, style]}>
                <WebView
                    ref={EditorWebView}
                    onLoad={() => this.post({ value, placeholder })}
                    onError={error => console.error(error)}
                    javaScriptEnabled
                    domStorageEnabled
                    bounces={false}
                    scalesPageToFit={false}
                    originWhitelist={['*']}
                    source={
                      Platform.OS === 'android'
                          ? {
                            uri: 'file:///android_asset/html/texteditor.html',
                          }
                          : (__DEV__) ?
                          require('./assets/texteditor.html')
                          :
                          { uri:'./html/texteditor.html' }
                    }
                    style={{ backgroundColor: 'white', flex: 1 }}
                    onMessage={this.onWebViewMessage}
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
  onMentionStart: PropTypes.func,
  onMentionSelected: PropTypes.func,
  style: PropTypes.shape({})
};
Editor.defaultProps = {
  onChangeText: () => {},
  onMentionStart: () => {},
  onMentionSelected: () => {},
  style: {
    zIndex: -1,
  },
};
