import React from 'react';
import {
  View, TouchableOpacity, StyleSheet, Platform, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { ImagePicker, Permissions } from 'expo';

import { EditorWebView } from './Editor';
import { RichTextContext } from './RichText';

const getImageAsync = async (callback) => {
  const statusRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (statusRoll.status === 'granted') {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      base64: true,
    });
    if (!image.cancelled) {
      callback(image.base64);
    }
  }
};

const styles = StyleSheet.create({
  image: {
    marginHorizontal: 5,
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
});

const ToolbarButton = ({ callback, children, format }) => (
  <RichTextContext.Consumer>
    {({ setFormat }) => (
      <TouchableOpacity
        onPress={() => {
          if (setFormat && format) {
            setFormat(format);
          }
          if (callback) {
            const response = callback();
            if (response && response.reload) {
              EditorWebView.current.reload();
            }
          }
        }}
      >
        {children}
      </TouchableOpacity>
    )}
  </RichTextContext.Consumer>
);
ToolbarButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  callback: PropTypes.func,
  format: PropTypes.string,
};
ToolbarButton.defaultProps = {
  callback: undefined,
  format: undefined,
};

export default class Toolbar extends React.Component {
  static BOLD = ({ callback, source, imageStyles }) => (
    <ToolbarButton callback={callback} format="bold">
      <Image style={imageStyles || styles.image} source={source || require('./assets/bold.png')} />
    </ToolbarButton>
  );

  static ITALIC = ({ callback, source, imageStyles }) => (
    <ToolbarButton callback={callback} format="italic">
      <Image
        style={imageStyles || styles.image}
        source={source || require('./assets/italic.png')}
      />
    </ToolbarButton>
  );

  static H1 = ({ callback, source, imageStyles }) => (
    <ToolbarButton callback={callback} format="h1">
      <Image
        style={imageStyles || styles.image}
        source={source || require('./assets/header.png')}
      />
    </ToolbarButton>
  );

  static UL = ({ callback, source, imageStyles }) => (
    <ToolbarButton callback={callback} format="ul">
      <Image
        style={imageStyles || styles.image}
        source={source || require('./assets/list-bullet.png')}
      />
    </ToolbarButton>
  );

  static OL = ({ callback, source, imageStyles }) => (
    <ToolbarButton callback={callback} format="ol">
      <Image
        style={imageStyles || styles.image}
        source={source || require('./assets/list-ordered.png')}
      />
    </ToolbarButton>
  );

  static CODE = ({ callback, source, imageStyles }) => (
    <ToolbarButton callback={callback} format="code-block">
      <Image
        style={imageStyles || [styles.image, { height: 15, width: 18 }]}
        source={source || require('./assets/code.png')}
      />
    </ToolbarButton>
  );

  static IMAGE = ({ callback, source, imageStyles }) => (
    <RichTextContext.Consumer>
      {({ setFormat }) => (
        <TouchableOpacity
          onPress={() => {
            if (setFormat) {
              getImageAsync(base64 => setFormat('image', 'data:image/jpeg;base64, ' + base64));
            }
            if (callback) {
              callback();
            }
          }}
        >
          <Image
            style={imageStyles || [styles.image, { width: 18 }]}
            source={source || require('./assets/image.png')}
          />
        </TouchableOpacity>
      )}
    </RichTextContext.Consumer>
  );

  static Custom = props => <ToolbarButton {...props} />;

  render() {
    const { children, style } = this.props;
    return <View style={style}>{children}</View>;
  }
}

Toolbar.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

Toolbar.defaultProps = {
  style: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 2,
        shadowOpacity: 1,
      },
      android: {
        elevation: 6,
      },
    }),
  },
};
