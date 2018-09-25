# react-native-rich-text

Rich text editor for React Native projects

## Instalation

```js
npm install --save react-native-rich-text
// or
yarn add react-native-rich-text
```

## Usage

```js
import RichText from 'react-native-rich-text';

...
render() {
  return (
    <RichText value={text}>
          <RichText.Toolbar>
            <RichText.Toolbar.BOLD />
            <RichText.Toolbar.ITALIC />
            <RichText.Toolbar.H1 />
            <RichText.Toolbar.UL />
            <RichText.Toolbar.OL />
            <RichText.Toolbar.CODE />
            <RichText.Toolbar.IMAGE />
            <RichText.Toolbar.Custom
              callback={() => {
                this.setState(p => ({ ...p, toggle: !p.toggle }));
                return { reload: true };
              }}
            >
              <Text>Toggle</Text>
            </RichText.Toolbar.Custom>
          </RichText.Toolbar>
          <RichText.Editor onChangeText={text => changeText(text)} />
        </RichText>
  )
}
```

## API

### RichText

Component that encapsules the editor

#### Props

| Name | Type | Default | Description |
| value | string | '' | Content for the editor. Should be in Quill format. |

### RichText.Toolbar

Common format for a Toolbar. It isn't necessary, and the buttons can be used inside any other component.

### RichText.Toolbar.\*

Buttons for the toolbar. Some common usages are available: `BOLD, ITALIC, H1, UL, OL, CODE and IMAGE`. For other uses, `CUSTOM` can be used if there is a need to refresh the editor, or to change the text format in the editor. To see the available formats, check the [Quill documentation](https://quilljs.com/docs/api/).

#### Props

| Name | Type | Default | Description |
| callback | function | undefined | Function to be executed when the button is pressed. If the editor should be reloaded when the callback is executed, it should return an object on the format of { reload: true } |
| format | string | undefined | Format the text should take on after the button is pressed. Only available on `CUSTOM` buttons |

### RichText.Editor

View where the text is edited. Actually is a WebView with a Quill editor.

#### Props

| Name | Type | Default | Description |
| onChangeText | Function | () => {} | Function called when the user edits the content, with a single parameter being the content of the editor, in the Quill format. |
