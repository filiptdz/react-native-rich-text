import React from 'react';
import {
  HostComponent,
  requireNativeComponent,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import type { Modify } from './utils';

type NativeRichTextEditorProps = {
  value?: string;
  style?: undefined | ViewStyle[] | ViewStyle;
  onChangeText?: ({
    nativeEvent,
  }: {
    nativeEvent: { newValue: string };
  }) => void;
};

type RichTextEditorProps = Modify<
  NativeRichTextEditorProps,
  {
    onChangeText?: (newValue: string) => void;
  }
>;

const NativeRichTextEditor = requireNativeComponent(
  'RNRTEditor'
) as HostComponent<NativeRichTextEditorProps>;

const RichTextEditor = ({
  style,
  onChangeText,
  ...props
}: RichTextEditorProps) => (
  <NativeRichTextEditor
    style={[
      { flex: 1, width: '100%', height: '100%' },
      StyleSheet.flatten(style),
    ]}
    onChangeText={({ nativeEvent: { newValue } }) =>
      onChangeText && onChangeText(newValue)
    }
    {...props}
  />
);

export default RichTextEditor;
