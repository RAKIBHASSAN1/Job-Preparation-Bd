// variables
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const contentInput = document.querySelector('#content');
const noteList = document.querySelector('#note-list');
const addButton = document.querySelector('#add-button');
const updateButton = document.querySelector('#update-button');
const cancelButton = document.querySelector('#cancel-button');
let notes = [];

// functions
function renderNotes() {
  noteList.innerHTML = '';
  notes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
      <h2>${note.title}</h2>
      <p>${note.content}</p>
      <div class="button-container">
        <button type="button" onclick="editNote(${index})">Edit</button>
        <button type="button" onclick="deleteNote(${index})">Delete      </div>
    `;
    noteList.appendChild(noteElement);
  });
}

function addNote() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (title === '' || content === '') {
    showMessage('Please enter a title and content', 'error');
    return;
  }
  const note = { title, content };
  notes.push(note);
  showMessage('Note added successfully', 'success');
  form.reset();
  renderNotes();
}

function editNote(index) {
  const note = notes[index];
  titleInput.value = note.title;
  contentInput.value = note.content;
  addButton.style.display = 'none';
  updateButton.style.display = 'block';
  cancelButton.style.display = 'block';
  updateButton.onclick = function() {
    const newTitle = titleInput.value.trim();
    const newContent = contentInput.value.trim();
    if (newTitle === '' || newContent === '') {
      showMessage('Please enter a title and content', 'error');
      return;
    }
    note.title = newTitle;
    note.content = newContent;
    showMessage('Note updated successfully', 'success');
    form.reset();
    renderNotes();
    addButton.style.display = 'block';
    updateButton.style.display = 'none';
    cancelButton.style.display = 'none';
  }
  cancelButton.onclick = function() {
    form.reset();
    addButton.style.display = 'block';
    updateButton.style.display = 'none';
    cancelButton.style.display = 'none';
  }
}

function deleteNote(index) {
  notes.splice(index, 1);
  showMessage('Note deleted successfully', 'success');
  renderNotes();
}

function showMessage(message, type) {
  const messageElement = document.createElement('div');
  messageElement.classList.add(type);
  messageElement.textContent = message;
  form.appendChild(messageElement);
  setTimeout(function() {
    messageElement.remove();
  }, 3000);
}

// event listeners
addButton.addEventListener('click', addNote);

// initialize
renderNotes();
