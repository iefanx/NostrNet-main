import React, { useState } from 'react';

const SearchForm = ({ value, onChange, onSubmit, placeholder }) => (
  <form onSubmit={onSubmit} className="flex items-center rounded p-2">
    <input
      type="text"
      name="q"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="input-style p-2 outline-none"
    />
  </form>
);

const searchEnginesConfig = {
  Nostr: {
    url: (query) => `https://nostr.band/?q=${encodeURIComponent(query)}`,
    placeholder: 'Search on Nostr',
  },
   Brave: {
    url: (query) => `https://search.brave.com/search?q=${encodeURIComponent(query)}`,
    placeholder: 'Search on Brave',
  },
  DDG: {
    url: (query) => `https://search.brave.com/search?q=${encodeURIComponent(query)}`,
    placeholder: 'Search on duckduckgo',
  },
  Google: {
    url: (query) => `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    placeholder: 'Search on Google',
  },
  Reddit: {
    url: (query) => `https://www.reddit.com/search?q=${encodeURIComponent(query)}`,
    placeholder: 'Search on Reddit',
  },
  YouTube: {
    url: (query) => `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
    placeholder: 'Search on YouTube',
  },
  
 
};



const DuckDuckGoSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchEngine, setSearchEngine] = useState('Nostr');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchUrl = searchEnginesConfig[searchEngine].url(searchQuery);
    window.location.href = searchUrl;
  };

  const handleSearchEngineChange = (event) => {
    setSearchEngine(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const placeholder = searchEnginesConfig[searchEngine].placeholder;

  

  return (
    <div className="flex items-center justify-center">
      <SearchForm
        value={searchQuery}
        onChange={setSearchQuery}
        onSubmit={handleSearchSubmit}
        placeholder={placeholder}
      />
      <div className="ml-0 relative">
        {/* Dropdown list for search engine selection */}
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              onClick={toggleDropdown}
              className="bg-[#353237] text-white t p-1 rounded-md focus:outline-none relative z-1"
            >
              <span className="sr-only">Open options</span>
              <svg
                className={`h-5 w-5  ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 8.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
      
          </div>
          
          {isDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-25 rounded-md  shadow-lg  z-10 bg-[#353237]  ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {Object.keys(searchEnginesConfig).map((engine) => (
                  <button
                    key={engine}
                    value={engine}
                    onClick={handleSearchEngineChange}
                    className={`w-full text-left block px-2 py-2  text-sm rounded-md font-semibold hover:bg-gray-100 hover:text-gray-900 ${searchEngine === engine ? 'bg-gray-100 text-gray-900 hover:text-gray-900 ' : ''}`}
                  >
                    {engine === 'Brave' ? 'Brave' : engine}
                  </button>
                  
                  
                ))}
                
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DuckDuckGoSearchBar;
