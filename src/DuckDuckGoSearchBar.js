import React, { useState } from 'react';


const SearchForm = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-column  items-center">
      <input
        type="text"
        name="q"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search on Web"
        className=" bg-gray-700 text-xs text-white px-1 py-1 text-center focus:outline-none font-medium rounded"
      />
     <button
        type="submit"
        className="px-2 py-1 bg-blue-700 mx-2 rounded text-xs font-medium text-white hover:bg-blue-800 focus:outline-none"
        style={{ display: 'none' }} // Add this inline style to hide the button
    >
        Search
    </button>
    </form>
  );
};

const DuckDuckGoSearchBar = () => {
  const handleSearchSubmit = (query) => {
    window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="flex items-center justify-center rounded">
      <SearchForm onSubmit={handleSearchSubmit} />
    </div>
  );
};

export default DuckDuckGoSearchBar;
