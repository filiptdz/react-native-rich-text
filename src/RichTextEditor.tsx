import React from 'react';
import {
  HostComponent,
  requireNativeComponent,
  StyleSheet,
  ViewStyle,
  UIManager,
  findNodeHandle,
} from 'react-native';
import type { Modify } from './utils';
import type RichTextStyle from './RichTextStyle';

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

export default class RichTextEditor extends React.Component<
  RichTextEditorProps
> {
  editorRef: React.Component | null = null;

  setStyle = (newStyle: RichTextStyle) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.editorRef),
      // @ts-ignore: '"RNRTEditor"' can't be used to index type 'UIManagerStatic'
      UIManager.RNRTEditor.Commands.setStyleFromManager,
      [newStyle]
    );
  };

  render() {
    const { style, onChangeText, ...props } = this.props;
    return (
      <NativeRichTextEditor
        style={[
          { flex: 1, width: '100%', height: '100%' },
          StyleSheet.flatten(style),
        ]}
        ref={(ref) => (this.editorRef = ref)}
        onChangeText={({ nativeEvent: { newValue } }) =>
          onChangeText && onChangeText(newValue)
        }
        {...props}
      />
    );
  }
}
