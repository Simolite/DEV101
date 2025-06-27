// Utility functions for local storage
function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// Default data
const defaultStudents = [
  "Name: Alice Johnson, Age: 14",
  "Name: Bob Smith, Age: 15",
  "Name: Charlie Brown, Age: 13"
];

const defaultTeachers = [
  "Name: Mrs. Thompson, Subject: Mathematics",
  "Name: Mr. Lee, Subject: English",
  "Name: Ms. Rivera, Subject: Science"
];

const defaultResults = [
  "Student: Alice Johnson, Subject: Mathematics, Marks: 89",
  "Student: Bob Smith, Subject: English, Marks: 75",
  "Student: Charlie Brown, Subject: Science, Marks: 92"
];

// Initialize defaults if localStorage is empty
function initializeDefaults() {
  if (!localStorage.getItem('students')) {
    saveToStorage('students', defaultStudents);
  }
  if (!localStorage.getItem('teachers')) {
    saveToStorage('teachers', defaultTeachers);
  }
  if (!localStorage.getItem('results')) {
    saveToStorage('results', defaultResults);
  }
}


function addItemAndSave(key, item, listElement) {
  const data = getFromStorage(key);
  data.push(item);
  saveToStorage(key, data);
  renderList(key, listElement);
}

function deleteItem(key, index, listElement) {
  const data = getFromStorage(key);
  data.splice(index, 1);
  saveToStorage(key, data);
  renderList(key, listElement);
}

function renderList(key, listElement) {
  const data = getFromStorage(key);
  listElement.innerHTML = '';

  data.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item}
      <button class="delete-btn" onclick="deleteItem('${key}', ${index}, document.getElementById('${listElement.id}'))">
        🗑️
      </button>
    `;
    listElement.appendChild(li);
  });
}

// Section switcher
function showSection(sectionId) {
  document.querySelectorAll('.content-section').forEach((section) => {
    section.classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
}

// On page load: render saved data
document.addEventListener('DOMContentLoaded', () => {
  initializeDefaults(); // inject default values if needed
  renderList('students', document.getElementById('studentList'));
  renderList('teachers', document.getElementById('teacherList'));
  renderList('results', document.getElementById('resultList'));
});


// Student Form
document.getElementById('studentForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('studentName').value.trim();
  const age = document.getElementById('studentAge').value.trim();
  if (!name || !age) return;

  const studentData = `Name: ${name}, Age: ${age}`;
  addItemAndSave('students', studentData, document.getElementById('studentList'));
  this.reset();
});

// Teacher Form
document.getElementById('teacherForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('teacherName').value.trim();
  const subject = document.getElementById('subject').value.trim();
  if (!name || !subject) return;

  const teacherData = `Name: ${name}, Subject: ${subject}`;
  addItemAndSave('teachers', teacherData, document.getElementById('teacherList'));
  this.reset();
});

// Result Form
document.getElementById('resultForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const student = document.getElementById('resultStudent').value.trim();
  const subject = document.getElementById('subjectResult').value.trim();
  const marks = document.getElementById('marks').value.trim();
  if (!student || !subject || !marks) return;

  const resultData = `Student: ${student}, Subject: ${subject}, Marks: ${marks}`;
  addItemAndSave('results', resultData, document.getElementById('resultList'));
  this.reset();
});
