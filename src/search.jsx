import React, { useState } from 'react';
import ExtModel from './ExtModel';

const SearchForm = ({ value, onChange, onSubmit, placeholder }) => (
  <form onSubmit={onSubmit} className="flex items-center rounded p-2">
    <input
      type="text"
      name="q"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="input-style font-semibold p-2 outline-none"
    />
  </form>
);

const DuckDuckGoSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalContent, setModalContent] = useState(null); // State to manage modal content

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchUrl = `https://nostr.band/?q=${encodeURIComponent(searchQuery)}`;
    setModalContent(<iframe src={searchUrl} title="Search Results" className="w-screen h-screen" />);
  };
  const [extModelOpen, setExtModelOpen] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

   const openExtModel = () => {
    setExtModelOpen(true);
  };

  const closeExtModel = () => {
    setExtModelOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      <SearchForm
        value={searchQuery}
        onChange={setSearchQuery}
        onSubmit={handleSearchSubmit}
        placeholder="Search on Nostr"
      />

      <div className="relative inline-block px-1 px-">
        <div className="bg-[#303479] shadow-md text-semibold  rounded-full">
          <div className="" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={() => openModal(<iframe src="https://labs.perplexity.ai/" title="AI Chat" className="w-full h-full" />)}
              className="block px-1 py-1 text-xs font-semibold rounded-full font-mono text-gray-200 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <svg width="20px" height="20px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="3" stroke="#000000" fill="none"><circle cx="34.52" cy="11.43" r="5.82"/><circle cx="53.63" cy="31.6" r="5.82"/><circle cx="34.52" cy="50.57" r="5.82"/><circle cx="15.16" cy="42.03" r="5.82"/><circle cx="15.16" cy="19.27" r="5.82"/><circle cx="34.51" cy="29.27" r="4.7"/><line x1="20.17" y1="16.3" x2="28.9" y2="12.93"/><line x1="38.6" y1="15.59" x2="49.48" y2="27.52"/><line x1="50.07" y1="36.2" x2="38.67" y2="46.49"/><line x1="18.36" y1="24.13" x2="30.91" y2="46.01"/><line x1="20.31" y1="44.74" x2="28.7" y2="48.63"/><line x1="17.34" y1="36.63" x2="31.37" y2="16.32"/><line x1="20.52" y1="21.55" x2="30.34" y2="27.1"/><line x1="39.22" y1="29.8" x2="47.81" y2="30.45"/><line x1="34.51" y1="33.98" x2="34.52" y2="44.74"/></svg>
            </button>
            

          </div>
          
        </div>
        
      </div>
      <button
              className="bg-[#303479] p-1 shadow-md text-semibold rounded-full"
              onClick={openExtModel}
              
            >
              <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 10V7c0-1.103-.897-2-2-2h-3c0-1.654-1.346-3-3-3S8 3.346 8 5H5c-1.103 0-2 .897-2 2v4h1a2 2 0 0 1 0 4H3v4c0 1.103.897 2 2 2h4v-1a2 2 0 0 1 4 0v1h4c1.103 0 2-.897 2-2v-3c1.654 0 3-1.346 3-3s-1.346-3-3-3z"/></svg>
            </button>
            <ExtModel isOpen={extModelOpen} onClose={closeExtModel} />

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-3  items-center pt-7 justify-center bg-opacity-50 z-10">
          <div className=" h-full  w-full  rounded-lg">
            <button onClick={closeModal}  className=" absolute top-0  font-mono font-semibold rounded-full text-black bg-gray-300 right-2">
              <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
            {modalContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default DuckDuckGoSearchBar;
