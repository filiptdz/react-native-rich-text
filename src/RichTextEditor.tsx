import React from 'react';
import {
  HostComponent,
  requireNativeComponent,
  StyleSheet,
  ViewStyle,
} from 'react-native';

type RichTextEditorProps = {
  value?: string;
  style?: undefined | ViewStyle[] | ViewStyle;
};

const NativeRichTextEditor = requireNativeComponent(
  'RNRTEditor'
) as HostComponent<RichTextEditorProps>;

const RichTextEditor = ({ style, ...props }: RichTextEditorProps) => (
  <NativeRichTextEditor
    style={[
      { flex: 1, width: '100%', height: '100%' },
      StyleSheet.flatten(style),
    ]}
    {...props}
  />
);

export default RichTextEditor;
