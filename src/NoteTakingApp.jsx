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
  const dataToDownload = JSON.stringify(searchResults);
  const blob = new Blob([dataToDownload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'notes.json';
  a.click();

  URL.revokeObjectURL(url);
};

const restoreNotes = (data) => {
  try {
    const parsedData = JSON.parse(data);
    if (Array.isArray(parsedData)) {
      // Set the parsed data as the new notes
      setNotes(parsedData);
      setSearchResults(parsedData);
      alert('Data restored successfully.');
    } else {
      throw new Error('Invalid data format.');
    }
  } catch (error) {
    console.error('Error restoring data:', error);
    alert('Error restoring data. Please make sure the data is in valid JSON format.');
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    restoreNotes(event.target.result);
  };
  reader.readAsText(file);
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
    <div className="min-h-screen flex flex-col bg-[#131214] items-center">
      <div className="w-screen rounded-lg p-4 bg-[#131214] text-white">
        <h1 className="text-lg text-center font-bold mb-4">Quick Notes (beta)</h1>
        <div className="mb-4">
          <input
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Enter note title"
            className="w-full p-2 border rounded focus:outline-none text-xs font-bold focus:border-blue-500 bg-[#242225] text-white border-none"
          />
        </div>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Enter note content"
          className="w-full p-2 h-32 border text-xs font-bold rounded focus:outline-none focus:border-blue-500 bg-[#242225] text-white border-none"
        />
        <div className="flex justify-center items-center mt-4">
          <div>
            <button onClick={saveNote} className="px-2 py-1 rounded-md  font-bold text-sm  text-black bg-gray-300 ">
              Save Note
            </button>
          </div>
        </div>


        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search notes..."
          className="w-full p-1 mt-4 border rounded focus:outline-none text-xs font-bold focus:border-blue-500 bg-[#242225] text-white border-none"
        />
        <div className="flex space-x-1">
            <button onClick={downloadNotes} className="px-1 pt-3 bg-transparent font-extrabold rounded-md text-xs text-gray-300  ">
              Download Data
            </button>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="px-1 pt-3  rounded-md text-xs text-gray-300 font-extrabold   cursor-pointer">
              Restore
            </label>
          </div>

       <ul id="notesList" className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {searchResults
          .sort((a, b) => b.id - a.id) 
          .map((note) => (
            <li key={note.id} className="bg-[#242225] p-4 rounded shadow">
              <h3 className="text-blue-400 text-sm font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-300 text-xs  mb-2">{note.content}</p>
              <div className="flex justify-center ">
                <button onClick={() => editNote(note.id)} className="text-blue-400  mr-10">
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
