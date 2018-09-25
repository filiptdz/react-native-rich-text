import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Toolbar from './Toolbar';
import Viewer from './Viewer';
import Editor from './Editor';

export const RichTextContext = React.createContext();

export default class RichText extends React.Component {
  static Toolbar = Toolbar;

  static Viewer = Viewer;

  static Editor = Editor;

  constructor(props) {
    super(props);
    this.state = {
      setFormat: undefined,
    };
  }

  updateFormatFunc = setFormat => this.setState(p => ({ ...p, setFormat }));

  render() {
    const { children, value } = this.props;
    const { setFormat } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <RichTextContext.Provider
          value={{
            setFormat,
            updateFormatFunc: this.updateFormatFunc,
            value,
          }}
        >
          {children}
        </RichTextContext.Provider>
      </View>
    );
  }
}

RichText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  value: PropTypes.string,
};
RichText.defaultProps = {
  value: '',
};
