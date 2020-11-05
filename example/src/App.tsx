import React from 'react';
import { View } from 'react-native';
import { RichTextEditor } from 'react-native-rich-text';

export default function App() {
  const [value, setValue] = React.useState<string | undefined>('initial text');

  React.useEffect(() => {
    setTimeout(() => setValue('oi<h1>oio</h1>oi'), 3000);
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <RichTextEditor
            value={value}
            onChangeText={(newValue: string) => console.log(newValue)}
          />
          <View style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  );
}
