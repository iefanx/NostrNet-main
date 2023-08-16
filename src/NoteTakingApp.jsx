import React, { useState, useEffect } from 'react';

const NoteTakingApp = () => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    try {
      const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
      setNotes(storedNotes);
    } catch (error) {
      console.error('Error parsing notes:', error);
    }
  }, []);

  const saveNote = () => {
    if (noteTitle.trim() && noteContent.trim()) {
      const note = { title: noteTitle, content: noteContent };
      const updatedNotes = [note, ...notes]; // Add the latest note to the beginning
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      clearInputs();
      alert('Note saved successfully.');
    } else {
      alert('Please enter both a title and content for the note.');
    }
  };

  const downloadNotes = () => {
    const notesData = JSON.stringify(notes, null, 2); // Beautify the JSON for better readability
    const blob = new Blob([notesData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.json';
    a.click();

    // Clean up the temporary URL object
    URL.revokeObjectURL(url);
  };

  const editNote = (index) => {
    const updatedNotes = [...notes];
    const note = updatedNotes[index];
    setNoteTitle(note.title);
    setNoteContent(note.content);
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const deleteNote = (index) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = [...notes];
      updatedNotes.splice(index, 1);
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
  };

  const clearInputs = () => {
    setNoteTitle('');
    setNoteContent('');
  };

   return (
    <div className="min-h-screen py-0 flex text-white justify-center items-center">
      <div className="max-w-md w-full rounded-lg">
        <h1 className="text-lg text-center mt-3 font-bold mb-4">Quick Notes (beta)</h1>
        <div className="mb-4">
          <input
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Enter note title"
            className="block w-full p-2 border rounded focus:outline-none focus:border-blue-500 bg-[#242225] text-gray-300"
          />
        </div>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Enter note content"
          className="block w-full p-2 h-32 border rounded focus:outline-none focus:border-blue-500 bg-[#242225] text-gray-300"
        />
        <button onClick={saveNote} className="btn px-2 py-2 text-gray-300 bg-[#303479] m-4">
          Save Note
        </button>
        

        <h2 className="text-lg  font-semibold mt-3">Your Notes:</h2>
        <button onClick={downloadNotes} className=" flex px-4 py-0.5 text-xs mr-2  rounded bg-[#303479] font-semibold text-gray-200">
          Download Data
        </button>
        <ul id="notesList" className="mt-2">
          {notes.map((note, index) => (
            <li key={index} className="bg-[#242225] p-2 mb-2 rounded shadow">
              <h3 className="text-blue-400 text-md font-semibold">{note.title}</h3>
              <p className="text-gray-300 text-sm mb-2 mt-1">{note.content}</p>
              <div className="flex justify-end mt-2">
                <button onClick={() => editNote(index)} className="text-blue-400 mr-2">
                  Edit
                </button>
                <button onClick={() => deleteNote(index)} className="text-red-400">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoteTakingApp;
