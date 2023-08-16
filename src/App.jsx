import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import Modal from './Modal';
import DuckDuckGoSearchBar from './search';
import BlockNumberComponent from './maininfo';
import NoteTakingApp from './NoteTakingApp';




const EMBEDS_DATA_KEY = 'embedsData';

const App = () => {
  const [embeds, setEmbeds] = useState(getEmbedsData());
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [showSecondMenu, setShowSecondMenu] = useState(false);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
 // Add these state variables along with your existing state variables
const [showTextModal, setShowTextModal] = useState(false);
const [textModalContent, setTextModalContent] = useState('');





  
  
  useEffect(() => {
    const storedEmbedsData = localStorage.getItem(EMBEDS_DATA_KEY);
    const storedEmbeds = storedEmbedsData ? JSON.parse(storedEmbedsData) : getEmbedsData();
    setEmbeds(storedEmbeds);
  }, []);

  const toggleEmbed = useCallback((embedId) => {
    setEmbeds((prevEmbeds) =>
      prevEmbeds.map((embed) => ({
        ...embed,
        active: embed.id === embedId,
      }))
    );
    setButtonClicked(true);
  }, []);
  

  const addCustomEmbed = useCallback((url, title) => {
    const newEmbed = {
      id: `custom-${Date.now()}`,
      url,
      title,
      active: false,
    };

    setEmbeds((prevEmbeds) => {
      const updatedEmbeds = [...prevEmbeds, newEmbed];
      localStorage.setItem(EMBEDS_DATA_KEY, JSON.stringify(updatedEmbeds));
      return updatedEmbeds;
    });
  }, []);

  const deleteCustomEmbed = useCallback((embedId) => {
    setEmbeds((prevEmbeds) => prevEmbeds.filter((embed) => embed.id !== embedId));
    localStorage.setItem(
      EMBEDS_DATA_KEY,
      JSON.stringify(embeds.filter((embed) => embed.id !== embedId))
    );
  }, [embeds]);

  const handleAddClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleSaveClick = useCallback(() => {
    if (url && title) {
      addCustomEmbed(url, title);
      setShowModal(false);
      setUrl('');
      setTitle('');
    }
  }, [url, title, addCustomEmbed]);

  const handleDeleteAllClick = useCallback(() => {
    setShowDeleteButtons((prevState) => !prevState);
  }, []);

  const handleDeleteClick = useCallback((embedId) => {
    deleteCustomEmbed(embedId);
  }, [deleteCustomEmbed]);

  const handleHomeButtonClick = useCallback(() => {
    setEmbeds((prevEmbeds) =>
      prevEmbeds.map((embed) => ({
        ...embed,
        active: false,
      }))
    );
    setButtonClicked(false);
  }, []);

  const memoizedEmbeds = useMemo(() => {
    
    const sortedEmbeds = embeds.slice().sort((a, b) => a.title.localeCompare(b.title));
    return sortedEmbeds.map((embed) => ({
      ...embed,
      handleClick: () => toggleEmbed(embed.id),
    }));
  }, [embeds, toggleEmbed]);

  const handleDefaultClick = useCallback(() => {
    localStorage.removeItem(EMBEDS_DATA_KEY);
    setEmbeds(getDefaultEmbedsData());
    setButtonClicked(false);
    setShowDeleteButtons(false);
  }, []);

   const [isDropdown2Open, setDropdown2Open] = useState(false);

  const toggleDropdown2 = () => {
    setDropdown2Open(!isDropdown2Open);
  };

  
// Add these functions
const openTextModal = (content) => {
  setTextModalContent(content);
  setShowTextModal(true);
};

const closeTextModal = () => {
  setTextModalContent('');
  setShowTextModal(false);
};


  

  return (
    <div className="bg-[#131214] text-white min-h-screen text-center flex flex-col justify-start  w-screen">
      {!buttonClicked && (
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <div className='text-left'>
            <h1 className="text-2xl  font-serif mt-4 px-5 m-3 ">
              <span className="  font-black"> 𝐍</span>
              <span className=" font-medium  font-serif text-base">ostrNet</span>

            </h1>
            <h2 className="text-xs font-semibold mx-9 md:text-base lg:text-lg">
             
            
            </h2>
            <div className=" clock-container text-center">

            <BlockNumberComponent />
          </div>
            <div className="mt-2 ">
         <DuckDuckGoSearchBar />
         
      </div>
          </div>
          
          <div style={{ position: 'fixed', right: '5%', bottom: '0' }}>
            {showDeleteButtons && (
              <button className="px-4 py-2 ml-2 text-sm rounded font-bold text-white" onClick={handleDefaultClick}>
                Reset
              </button>
            )}
            <button className="px-4 py-2 text-sm rounded font-bold text-white" onClick={handleDeleteAllClick}>
              {showDeleteButtons ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>
      )}
      
      {!embeds.some((embed) => embed.active) && !showSecondMenu ? (
       <nav className="flex justify-center mb-0">
      <div className="flex flex-wrap gap-3 mt-0 mx-auto w-full max-w-2xl md:max-w-4xl lg:max-w-6xl justify-center">
        {memoizedEmbeds.map((embed) => (
          <div key={embed.id} style={{ position: "relative", minWidth: "100px" }}>
            {showDeleteButtons && (
              <button
                className="menu-item absolute  right-0 px-0 py-0 font-lg text-xs rounded-full text-white transition bg-red-500 hover:bg-red-600"
                onClick={() => handleDeleteClick(embed.id)}
                style={{ width: "20px", height: "20px", lineHeight: "1", textAlign: "center", zIndex: 1 }}
              >
                ⓧ
              </button>
            )}
            <button
              className={`menu-item px-2 py-3 font-bold text-sm shadow-lg rounded-sm bg-[#242225] hover:bg-gray-700 transition transform hover:scale-105 duration-300`}
              onClick={embed.handleClick}
              aria-label={`${embed.active ? "Hide" : "Show"} ${embed.title}`}
              style={{
                minWidth: "100px",
                maxWidth: "150px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                transition: "background-color 0.3s, transform 0.3s",
              }}
            >
              <span className="embed-title" style={{ maxWidth: "100%" }}>
                {embed.title}
              </span>
            </button>

          </div>
        ))}
        {!embeds.some((embed) => embed.active) && (
          <div>
            <button
              className={`px-2 py-3 text-sm rounded bg-[#303479] font-bold text-white`}
              onClick={handleAddClick}
              style={{
                minWidth: "100px",
                maxWidth: "150px",
              }}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </nav>
      ) : (
        <div className="pt-1 py-0 ">
          <div className="left-corner-container ">
            <a href="/" className="px-4 py-o text-md  font-bold text-gray-200">
              𝐍
            </a>
          </div>
          <a href="/" rel="noopener noreferrer">
            <button
              className="px-4 py-0.5 text-xs mr-2 rounded bg-[#242225] font-semibold text-gray-200"
              onClick={handleHomeButtonClick}
            >
              Home
            </button>
          </a>
          
              

          {showSecondMenu ? (
            <button
              className="px-2 py-0.5 text-xs rounded mr-2 bg-[#303479] font-semibold text-gray-200 "
              onClick={() => setShowSecondMenu(false)}
            >
              Hide Menu
            </button>
          ) : (
            <button
              className="px-4 py-0.5 text-xs mr-2 rounded bg-[#242225] font-semibold text-gray-200 "
              onClick={() => setShowSecondMenu(true)}
            >
              Show Menu
            </button>
          )}
        
          <button
                className="absolute right-8 px-1 py-1 top-1.5 text-xs font-semibold bg-gray-600 rounded-md font-mono text-gray-200 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => openTextModal("This is the text modal content.")}
              >
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.6602 10.44L20.6802 14.62C19.8402 18.23 18.1802 19.69 15.0602 19.39C14.5602 19.35 14.0202 19.26 13.4402 19.12L11.7602 18.72C7.59018 17.73 6.30018 15.67 7.28018 11.49L8.26018 7.30001C8.46018 6.45001 8.70018 5.71001 9.00018 5.10001C10.1702 2.68001 12.1602 2.03001 15.5002 2.82001L17.1702 3.21001C21.3602 4.19001 22.6402 6.26001 21.6602 10.44Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path opacity="0.4" d="M15.0603 19.3901C14.4403 19.8101 13.6603 20.1601 12.7103 20.4701L11.1303 20.9901C7.16034 22.2701 5.07034 21.2001 3.78034 17.2301L2.50034 13.2801C1.22034 9.3101 2.28034 7.2101 6.25034 5.9301L7.83034 5.4101C8.24034 5.2801 8.63034 5.1701 9.00034 5.1001C8.70034 5.7101 8.46034 6.4501 8.26034 7.3001L7.28034 11.4901C6.30034 15.6701 7.59034 17.7301 11.7603 18.7201L13.4403 19.1201C14.0203 19.2601 14.5603 19.3501 15.0603 19.3901Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path opacity="0.4" d="M12.6406 8.52979L17.4906 9.75979" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path opacity="0.4" d="M11.6602 12.3999L14.5602 13.1399" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>

              </button>
          
       
       

          <div className="inline-block left-0 px-1">
            <button
              type="button"
              onClick={toggleDropdown2}
              className="bg-[#303479] right-corner-container px-1 py-1 text-xs rounded-md font-semibold text-gray-200"
            >
              
              <span className="text-xs font-mono font-extrabold">AI</span>
            </button>
            {isDropdown2Open && (
              <div className="absolute right-0 mr-2 mt-2 w-32 text-left  rounded-md shadow-lg z-10 bg-[#353237] ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a
                    href="https://labs.perplexity.ai/"
                    className="block px-4 py-2 text-xs font-semibold rounded-md font-mono text-gray-200 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    rel="noopener noreferrer"
                  >
                    AI Chat
                  </a>
                  <a
                    href="https://www.perplexity.ai/"
                    className="block px-4 py-2 text-xs font-semibold rounded-md font-mono text-gray-200 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    rel="noopener noreferrer"
                  >
                    AI Search
                  </a>
                </div>
              </div>
            )}
          </div>
          
        </div>
        
      )}

      {showSecondMenu && (
        <nav className="flex justify-center mb-0">
          <div className="flex flex-wrap gap-1 mt-2 mx-auto  max-w-2xl md:max-w-4xl lg:max-w-6xl justify-center">
            {memoizedEmbeds.map((embed) => (
              <div key={embed.id} style={{ position: 'relative', width: '85px' }}>
                {showDeleteButtons && (
                  <button
                    className="menu-item absolute top-0 right-0 px-0  py-0 font-medium text-xs rounded  text-black"
                    onClick={() => handleDeleteClick(embed.id)}
                    style={{ width: '100%', textAlign: 'center' }}
                  >
                     ⓧ
                  </button>
                )}
                <button
                  className={`menu-item px-0.5 py-0.5 bg-[#242225] hover:bg-gray-700  font-medium text-xs rounded ${
                    embed.active ? 'bg-[#303479] text-xs py-0.5  ' : 'bg-[#191e24] hover:bg-[#303479]'
                  }`}
                  onClick={embed.handleClick}
                  aria-label={`${embed.active ? 'Hide' : 'Show'} ${embed.title}`}
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <span className="embed-title">{embed.title}</span>
                </button>
              </div>
            ))}
            
          </div>
        </nav>
      )}

      <div className="full-width-container"></div>
      <div className="flex flex-col items-center mt-2">
        {memoizedEmbeds.map((embed) => (
          <div
            key={embed.id}
            className={`embed-container ${embed.active ? 'active' : ''}`}
            style={{ display: embed.active ? 'block' : 'none' }}
          >
            <iframe
              src={embed.url}
              frameBorder="0"
              scrolling="yes"
              className="embed-iframe"
              title={embed.title}
              allow="clipboard-write"
              loading="lazy"
            />
          </div>
        ))}
      </div>

    {showTextModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="z-10 bg-[#131214] rounded-lg p-6 shadow-xl w-full   max-h-screen max-w-screen  overflow-y-auto">
          
          <div className="text-gray-100 relative">
            <NoteTakingApp />
            <button className="absolute top-2 right-2 text-gray-300 hover:text-white" onClick={closeTextModal}>
              <svg className="w-4 h-4 font-bold fill-current" viewBox="0 0 24 24">
                <path d="M19.06 5.63l-1.07-1.07L12 10.94 5.41 4.35 4.34 5.42 10.93 12l-6.59 6.59 1.07 1.07L12 13.06l6.59 6.59 1.07-1.07L13.06 12l6.59-6.59z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )}

      {showModal && (
        <Modal
          url={url}
          title={title}
          setUrl={setUrl}
          setTitle={setTitle}
          handleSaveClick={handleSaveClick}
          handleClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};


const getEmbedsData = () => {
  const initialEmbedsData = localStorage.getItem(EMBEDS_DATA_KEY);
  return initialEmbedsData ? JSON.parse(initialEmbedsData) : getDefaultEmbedsData();
};



const getDefaultEmbedsData = () => {
  return [
    {
      id: 'chess-embed',
      url: 'https://jesterui.github.io/',
      title: 'Chess',
      active: false,
    },
    {
      id: 'coracle-embed',
      url: 'https://coracle.social/notes',
      title: 'Coracle',
      active: false,
    },
    {
      id: 'habla-embed',
      url: 'https://habla.news/',
      title: 'Habla',
      active: false,
    },
    {
      id: 'highlighter-embed',
      url: 'https://highlighter.com/global/newest',
      title: 'Highlighter',
      active: false,
    },
    {
      id: 'iris-embed',
      url: 'https://iris.to/',
      title: 'Iris.to',
      active: false,
    },
    {
      id: 'nostrbuild-embed',
      url: 'https://nostr.build/',
      title: 'Nostr.Build',
      active: false,
    },
    {
      id: 'nostrband-embed',
      url: 'https://nostr.band/',
      title: 'Nostr.Band',
      active: false,
    },
    {
      id: 'nostrcheck-embed',
      url: 'https://nostrcheck.me/',
      title: 'NostrCheck',
      active: false,
    },
    {
      id: 'nostrit-embed',
      url: 'https://nostrit.com/',
      title: 'Nostrit',
      active: false,
    },
    {
      id: 'nostryfied-embed',
      url: 'https://nostryfied.online/',
      title: 'Nostryfied',
      active: false,
    },
    {
      id: 'nostrnests-embed',
      url: 'https://nostrnests.com/',
      title: 'NostrNests',
      active: false,
      },
    {
      id: 'noypaywall-embed',
      url: 'https://www.removepaywall.com/',
      title: 'NoPaywall',
      active: false,
      },
    {
      id: 'primal-embed',
      url: 'https://primal.net/home',
      title: 'Primal',
      active: false,
    },
    
    {
      id: 'satellite-embed',
      url: 'https://satellite.earth/',
      title: 'Satellite',
      active: false,
    },
    {
      id: 'snort-embed',
      url: 'https://snort.social/notes',
      title: 'Snort',
      active: false,
    },
    {
      id: 'stacker-embed',
      url: 'https://stacker.news/',
      title: 'Stacker',
      active: false,
    },
    {
      id: 'stemstr-embed',
      url: 'https://www.stemstr.app/',
      title: 'Stemstr',
      active: false,
    },
    {
      id: 'zapstream-embed',
      url: 'https://zap.stream/',
      title: 'Zap.Stream',
      active: false,
    },
    {
      id: 'zapstr-embed',
      url: 'https://zapstr.live/',
      title: 'Zapstr',
      active: false,
    },
    {
      id: 'zaplife-embed',
      url: 'https://zaplife.lol/',
      title: 'Zaplife',
      active: false,
    }
  ];
};


export default App;
