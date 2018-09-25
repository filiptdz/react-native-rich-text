const Quill = require('quill');

const editor = new Quill('#editor', {
  readOnly: true,
  theme: 'snow',
  modules: {
    toolbar: null,
  },
});

// Receber mensagens do RN
document.addEventListener('message', (data) => {
  if (data.data[0] === '{') {
    const content = JSON.parse(data.data);
    editor.setContents(content);
  }
});
