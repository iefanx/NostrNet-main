import React, { useState, useEffect } from 'react';

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('NoteDB', 1);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      const noteStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
      noteStore.createIndex('title', 'title', { unique: false });
    };

    request.onsuccess = event => {
      resolve(event.target.result);
    };

    request.onerror = event => {
      reject(event.target.error);
    };
  });
};

const NoteTakingApp = () => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);


  useEffect(() => {
    openDatabase()
      .then(db => {
        const transaction = db.transaction(['notes'], 'readonly');
        const noteStore = transaction.objectStore('notes');
        const getAllNotes = noteStore.getAll();

        getAllNotes.onsuccess = event => {
          setNotes(event.target.result);
        };
      })
      .catch(error => {
        console.error('Error opening database:', error);
      });
  }, []);

  useEffect(() => {
    const filteredNotes = notes.filter(
      note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredNotes);
  }, [searchQuery, notes]);

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  const saveNote = () => {
  if (noteTitle.trim() && noteContent.trim()) {
    openDatabase()
      .then(db => {
        const transaction = db.transaction(['notes'], 'readwrite');
        const noteStore = transaction.objectStore('notes');

        const note = { title: noteTitle, content: noteContent };

        if (editingNoteId) {
          // Editing an existing note
          note.id = editingNoteId; // Ensure the edited note retains its ID
          const putRequest = noteStore.put(note); // Use put() to update existing note

          putRequest.onsuccess = () => {
            const updatedNotes = notes.map(existingNote =>
              existingNote.id === editingNoteId ? { ...note } : existingNote
            );
            setNotes(updatedNotes);
            clearInputs();
            setEditingNoteId(null); // Reset editing state
            alert('Note edited successfully.');
          };
        } else {
          // Adding a new note
          const addRequest = noteStore.add(note);

          addRequest.onsuccess = () => {
            setNotes([...notes, { ...note, id: addRequest.result }]);
            clearInputs();
            alert('Note saved successfully.');
          };
        }
      })
      .catch(error => {
        console.error('Error saving note:', error);
      });
  } else {
    alert('Please enter both a title and content for the note.');
  }
};


  const downloadNotes = () => {
  const notesText = searchResults
    .map((note, index) => {
      return `
Note ${index + 1}:
Title: ${note.title}
Content: ${note.content}
------------------------------
      `;
    })
    .join('\n');

  const blob = new Blob([notesText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'notes.txt';
  a.click();

  URL.revokeObjectURL(url);
};




  const editNote = (noteId) => {
  const noteToEdit = notes.find(note => note.id === noteId);

  if (noteToEdit) {
    setNoteTitle(noteToEdit.title);
    setNoteContent(noteToEdit.content);
    setEditingNoteId(noteId); // Set the ID of the note being edited
  } else {
    console.error('Note not found for editing.');
  }
};





  const deleteNote = (noteId) => {
  if (window.confirm('Are you sure you want to delete this note?')) {
    openDatabase()
      .then(db => {
        const transaction = db.transaction(['notes'], 'readwrite');
        const noteStore = transaction.objectStore('notes');

        const deleteRequest = noteStore.delete(noteId);

        deleteRequest.onsuccess = () => {
          const updatedNotes = notes.filter(note => note.id !== noteId);
          setNotes(updatedNotes);
          setSearchResults(updatedNotes); // Update search results as well
          
        };

        deleteRequest.onerror = event => {
          console.error('Error deleting note:', event.target.error);
        };
      })
      .catch(error => {
        console.error('Error opening database:', error);
      });
  }
};


  const clearInputs = () => {
    setNoteTitle('');
    setNoteContent('');
  };

   return (
     <div className="min-h-screen py-2 flex text-white justify-center items-center">
      <div className="max-w-md w-full rounded-lg">
        <h1 className="text-lg text-center mt-3 font-bold mb-4">Quick Notes (beta)</h1>
        <div className="mb-4">
          <input
            type="text"
            value={noteTitle}
            onChange={e => setNoteTitle(e.target.value)}
            placeholder="Enter note title"
            className="block w-full p-2 border rounded focus:outline-none focus:border-blue-500 bg-[#242225] text-gray-300"
          />
        </div>
        <textarea
          value={noteContent}
          onChange={e => setNoteContent(e.target.value)}
          placeholder="Enter note content"
          className="block w-full p-2 h-32 border rounded focus:outline-none focus:border-blue-500 bg-[#242225] text-gray-300"
        />
        <button onClick={saveNote} className=" px-1 py-1 rounded-md text-gray-300 bg-[#303479] m-4">
          Save Note
        </button>
        

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search notes..."
          className="input input-bordered  block  bg-[#242225]  w-full "
        />
         <button onClick={downloadNotes} className=" flex  px-1 right-0 rounded-md text-gray-300 bg-[#303479] ">
          Download Data
        </button>

        <ul id="notesList" className="mt-2">
          {searchResults
            .sort((a, b) => b.id - a.id)
            .map((note) => (
              <li key={note.id} className="bg-[#242225] p-2 mb-2 rounded shadow">
                <h3 className="text-blue-400 text-left text-md font-semibold">{note.title}</h3>
                <p className="text-gray-300 text-left text-sm mb-2 mt-1">{note.content}</p>
                <div className="flex justify-end mt-2">
                  <button onClick={() => editNote(note.id)} className="text-blue-400 mr-4">
                    Edit
                  </button>
                  <button onClick={() => deleteNote(note.id)} className="text-red-400">
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
