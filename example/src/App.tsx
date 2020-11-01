import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { RichTextEditor } from 'react-native-rich-text';

export default function App() {
  const [value, setValue] = React.useState<string | undefined>('initial text');

  React.useEffect(() => {
    setTimeout(() => setValue('oioiooi'), 3000);
  }, []);

  return (
    <View style={styles.container}>
      <RichTextEditor style={{ height: 200, width: 200 }} value={value} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
