import React from 'react';
import { View } from 'react-native';
import { RichTextEditor } from 'react-native-rich-text';

export default function App() {
  const [value, setValue] = React.useState<string | undefined>('initial text');

  React.useEffect(() => {
    setTimeout(() => setValue('oioiooi'), 3000);
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <RichTextEditor value={value} />
          <View style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  );
}
