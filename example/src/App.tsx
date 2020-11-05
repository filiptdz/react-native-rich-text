import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { RichTextEditor, RichTextStyle } from 'react-native-rich-text';

export default function App() {
  const [value, setValue] = React.useState<string | undefined>('initial text');
  const [isBold, setIsBold] = React.useState<boolean>(false);
  const richTextEditor = React.useRef<RichTextEditor>(null);

  React.useEffect(() => {
    setTimeout(() => setValue('oi<h1>oio</h1>oi'), 3000);
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => {
            if (richTextEditor.current) {
              setIsBold(!isBold);
              richTextEditor.current.setStyle(
                isBold ? RichTextStyle.regular : RichTextStyle.bold
              );
            }
          }}
        >
          <Text>Toggle Bold</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <RichTextEditor
            value={value}
            ref={richTextEditor}
            onChangeText={(newValue: string) => console.log(newValue)}
          />
          <View style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  );
}
