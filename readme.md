# react-native-rich-text

Rich text editor for React Native projects. Based on [Quill.js](https://quilljs.com/)

**Not yet suggested for use in production apps. If you would like to help, try your hand at some of the issues with the label `Release Roadmap`**

## Instalation

```js
npm install --save react-native-rich-text
// or
yarn add react-native-rich-text
```

## Important

You must make sure the .html files will be bundled with the app. For this, add the following fields to your `app.json`:

```json
{
  "expo": {
    "assetBundlePatterns": ["node_modules/react-native-rich-text/assets/*"],
    "packagerOpts": {
      "assetExts": ["html"]
    }
  }
}
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

Component that encapsules the `Editor` and/or `Viewer`. This component is necessary, and the others don't work if they aren't children of it.

#### Props

| Name  | Type   | Default | Description                                        |
| ----- | ------ | ------- | -------------------------------------------------- |
| value | string | ''      | Content for the editor. Should be in Quill format. |

### RichText.Toolbar

Common format for a Toolbar. It isn't necessary, and the buttons can be used inside any other component.

#### Props

| Name  | Type   | Default                                                                                                                                                                                                                                               | Description                                                |
| ----- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| style | object | `{ width: '100%', padding: 10, flexDirection: 'row', backgroundColor: 'white', ...Platform.select({ ios: { shadowColor: 'rgba(0,0,0,0.5)', shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, shadowOpacity: 1 }, android: { elevation: 6, }})}` | Style to use for the `View` containing the toolbar buttons |

### RichText.Toolbar.\*

Buttons for the toolbar. Some common usages are available: `BOLD, ITALIC, H1, UL, OL, CODE and IMAGE`. For other uses, `Custom` can be used if there is a need to refresh the editor, or to change the text format in the editor. To see the available formats, check the [Quill documentation](https://quilljs.com/docs/api/).

#### Props

| Name        | Type                  | Default                                                                   | Description                                                                                                                                                                      |
| ----------- | --------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callback    | function              | `undefined`                                                               | Function to be executed when the button is pressed. If the editor should be reloaded when the callback is executed, it should return an object on the format of { reload: true } |
| format      | string                | `undefined`                                                               | Format the text should take on after the button is pressed. Only available on `Custom` buttons                                                                                   |
| source      | `ImageSourcePropType` | Depends on the type. Every kind has a default button, except for `Custom` | Source of the image to use as source for the toolbar button                                                                                                                      |
| imageStyles | object                |                                                                           | Style to use for the `Image` of the toolbar buttons                                                                                                                              |

### RichText.Editor

View where the text is edited. Actually is a `WebView` with a Quill editor.

#### Props

| Name         | Type     | Default          | Description                                                                                                                    |
| ------------ | -------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| onChangeText | Function | () => {}         | Function called when the user edits the content, with a single parameter being the content of the editor, in the Quill format. |
| style        | object   | `{ zIndex: -1 }` | Style to use for the `View` containing the `WebView`                                                                           |

### RichText.Viewer

Used to display the text, since it isn't possible with `<Text>`s. Actually a `WebView` with a Quill viewer.

#### Props

| Name          | Type     | Default | Description                                                                                  |
| ------------- | -------- | ------- | -------------------------------------------------------------------------------------------- |
| scrollEnabled | boolean  | true    | If the text is bigger than the screen, defines if it should be possible to scroll through it |
| onClick       | Function |         | Function to call when the `Viewer` is clicked                                                |
