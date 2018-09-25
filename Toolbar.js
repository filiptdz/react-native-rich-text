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
  background: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    zIndex: 1,
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
            const { reload } = callback();
            if (reload) {
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
  static BOLD = ({ callback }) => (
    <ToolbarButton callback={callback} format="bold">
      <Image style={styles.image} source={require('../assets/toolbarAssets/bold.png')} />
    </ToolbarButton>
  );

  static ITALIC = ({ callback }) => (
    <ToolbarButton callback={callback} format="italic">
      <Image style={styles.image} source={require('../assets/toolbarAssets/italic.png')} />
    </ToolbarButton>
  );

  static H1 = ({ callback }) => (
    <ToolbarButton callback={callback} format="h1">
      <Image
        style={[styles.image, { width: 20 }]}
        source={require('../assets/toolbarAssets/header.png')}
      />
    </ToolbarButton>
  );

  static UL = ({ callback }) => (
    <ToolbarButton callback={callback} format="ul">
      <Image
        style={[styles.image, { width: 18 }]}
        source={require('../assets/toolbarAssets/list-bullet.png')}
      />
    </ToolbarButton>
  );

  static OL = ({ callback }) => (
    <ToolbarButton callback={callback} format="ol">
      <Image
        style={[styles.image, { width: 18 }]}
        source={require('../assets/toolbarAssets/list-ordered.png')}
      />
    </ToolbarButton>
  );

  static CODE = ({ callback }) => (
    <ToolbarButton callback={callback} format="code-block">
      <Image
        style={[styles.image, { height: 15, width: 18 }]}
        source={require('../assets/toolbarAssets/code.png')}
      />
    </ToolbarButton>
  );

  static IMAGE = ({ callback }) => (
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
            style={[styles.image, { width: 18 }]}
            source={require('../assets/toolbarAssets/image.png')}
          />
        </TouchableOpacity>
      )}
    </RichTextContext.Consumer>
  );

  static Custom = props => <ToolbarButton {...props} />;

  render() {
    const { children } = this.props;
    return <View style={styles.background}>{children}</View>;
  }
}

Toolbar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};
