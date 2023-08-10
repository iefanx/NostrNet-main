import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import Modal from './Modal';
import DuckDuckGoSearchBar from './search';

const EMBEDS_DATA_KEY = 'embedsData';

const App = () => {
  const [embeds, setEmbeds] = useState(getEmbedsData());
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [showSecondMenu, setShowSecondMenu] = useState(false);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);



  const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1000ms (1 second)

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);


  
  // Format the current time as 12-hour format with AM/PM
  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',

    hour12: true,
  });

  // Get the current hour from the date
  const currentHour = currentTime.getHours();

 let greeting = '';
  if (currentHour >= 0 && currentHour < 12) {
    greeting = 'Good Morning, Nostrich!';
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = 'Good Afternoon, Nostrich!';
  } else {
    greeting = 'Good Evening, Nostrich!';
  }  // Determine the appropriate greeting based on the time
 

  return (
    <div className="clock">
      <div className="time">{formattedTime}</div>
      <div className="greeting">{greeting}</div>
      
    </div>
  );
};



  
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

  return (
    <div className="bg-[#131214] text-white min-h-screen text-center flex flex-col justify-start  w-screen">
      {!buttonClicked && (
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <div className='text-left'>
            <h1 className="text-3xl   font-serif mt-4 px-5 m-3">
              <span className="font-black"> 𝐍</span>
              <span className="font-medium  text-2xl">ostrNet</span>
            </h1>
            <h2 className="text-xs font-semibold mx-9 md:text-base lg:text-lg">
             
              
            </h2>
            <div className=" clock-container text-center">
            <Clock />
          </div>
            <div className="mt-5 ">
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
                style={{ width: "20px", height: "20px", lineHeight: "1", textAlign: "center" }}
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
        <div className="pt-1 mb-0">
          <div className="left-corner-container">
            <a href="/" className="px-4 py-1 text-md font-bold text-gray-200">
              𝐍
            </a>
          </div>
          <a href="/" rel="noopener noreferrer">
            <button
              className="px-4 py-1 text-xs mr-2 rounded bg-gray-900 font-semibold text-gray-200"
              onClick={handleHomeButtonClick}
            >
              Home
            </button>
          </a>

          {showSecondMenu ? (
            <button
              className="px-4 py-1 text-xs rounded mr-2 bg-purple-900 font-semibold text-gray-200 "
              onClick={() => setShowSecondMenu(false)}
            >
              Hide Menu
            </button>
          ) : (
            <button
              className="px-4 py-1 text-xs mr-2 rounded bg-gray-900 font-semibold text-gray-200 "
              onClick={() => setShowSecondMenu(true)}
            >
              Show Menu
            </button>
          )}
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
                    𝕏
                  </button>
                )}
                <button
                  className={`menu-item px-0.5 py-0.5 bg-[#191e24] hover:bg-[#303479] font-medium text-xs rounded ${
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
