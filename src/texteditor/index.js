const Quill = require('quill');

const editor = new Quill('#editor', {
  modules: {
    toolbar: null,
  },
  placeholder: 'Text',
  theme: 'snow',
});

// Receber mensagens do RN
document.addEventListener('message', (data) => {
  if (data.data.substr(0, 7) === '$image$') {
    const base64 = data.data.substr(7);
    // TODO: Should add image to end if editor doesn't have focus
    const { index } = editor.getSelection();
    editor.insertEmbed(index, 'image', base64);
  } else if (data.data[0] === '$') {
    const updatedSelector = data.data.slice(1, data.data.length - 1);
    const currentFormat = editor.getFormat();
    switch (updatedSelector) {
      case 'bold': {
        editor.format(updatedSelector, !currentFormat.bold, 'user');
        break;
      }
      case 'italic': {
        editor.format(updatedSelector, !currentFormat.italic, 'user');
        break;
      }
      case 'h1': {
        const updatedFormat = currentFormat.header === 1 ? null : 1;
        editor.format('header', updatedFormat, 'user');
        break;
      }
      case 'ul': {
        const updatedFormat = currentFormat.list === 'bullet' ? null : 'bullet';
        editor.format('list', updatedFormat, 'user');
        break;
      }
      case 'ol': {
        const updatedFormat = currentFormat.list === 'ordered' ? null : 'ordered';
        editor.format('list', updatedFormat, 'user');
        break;
      }
      case 'code-block': {
        editor.format(updatedSelector, !currentFormat['code-block'], 'user');
        break;
      }
      default:
        break;
    }
  } else if (data.data[0] === '{') {
    const content = JSON.parse(data.data);
    editor.setContents(content);
  }
});

// Toda vez que é editado, manda os conteúdos para o RN
editor.on('text-change', () => {
  window.postMessage(JSON.stringify(editor.getContents()), '*');
});
