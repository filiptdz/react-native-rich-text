import React from 'react';
import { WebView, Platform } from 'react-native';
import { Asset } from 'expo';
import PropTypes from 'prop-types';

import { RichTextContext } from './RichText';

const { localUri } = Asset.fromModule(require('./assets/textviewer.html'));

export const ViewerWebView = React.createRef();

export default class Viewer extends React.Component {
  post = value => ViewerWebView.current.postMessage(value);

  render() {
    const { scrollEnabled, onClick } = this.props;
    return (
      <RichTextContext.Consumer>
        {({ value }) => (
          <WebView
            bounces={false}
            scalesPageToFit={false}
            scrollEnabled={scrollEnabled}
            style={{ backgroundColor: 'transparent' }}
            onError={error => console.error(error)}
            javaScriptEnabled
            domStorageEnabled
            source={
              Platform.OS === 'android'
                ? {
                  uri: localUri.includes('ExponentAsset')
                    ? localUri
                    : 'file:///android_asset/' + localUri.substr(9),
                }
                : require('./assets/textviewer.html')
            }
            ref={ViewerWebView}
            onMessage={(evt) => {
              if (evt.nativeEvent.data === '$viewerClick$') {
                onClick();
              }
            }}
            onLoad={() => this.post(value)}
          />
        )}
      </RichTextContext.Consumer>
    );
  }
}
Viewer.propTypes = {
  scrollEnabled: PropTypes.bool,
  onClick: PropTypes.func,
};
Viewer.defaultProps = {
  scrollEnabled: true,
  onClick: () => {},
};
