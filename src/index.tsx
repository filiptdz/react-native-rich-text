import { NativeModules } from 'react-native';

type RichTextType = {
  multiply(a: number, b: number): Promise<number>;
};

const { RichText } = NativeModules;

export default RichText as RichTextType;
