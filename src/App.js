
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import Modal from './Modal';

const EMBEDS_DATA_KEY = 'embedsData';

const App = () => {
  const [embeds, setEmbeds] = useState(getEmbedsData());
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [showSecondMenu, setShowSecondMenu] = useState(false);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);

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
    return embeds.map((embed) => ({
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
    <div className="bg-black text-white min-h-screen text-center flex flex-col justify-start items-center w-screen">
      {!buttonClicked && (
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <div>
            <h1 className="text-3xl font-serif mt-4 px-5 m-3">
              <span className="font-black">ℕ</span>
              <span className="font-medium text-2xl">ostrNet</span>
            </h1>
            <h2 className="text-xs font-semibold mx-9 md:text-base lg:text-lg">
              NostrNet.work, It offers a unified dashboard to manage all your Nostr web apps in one place.
            </h2>
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
          <div className="flex flex-wrap gap-2 mt-2 mx-auto w-full max-w-2xl md:max-w-4xl lg:max-w-6xl justify-center">
            {memoizedEmbeds.map((embed) => (
              <div key={embed.id} style={{ position: 'relative', minWidth: '100px' }}>
                {showDeleteButtons && (
                  <button
                    className="menu-item absolute bottom-2 right-0 px-0 py-0 font-lg text-xs rounded text-white transition bg-red-500 hover:bg-red-600"
                    onClick={() => handleDeleteClick(embed.id)}
                    style={{ width: '20px', height: '20px', lineHeight: '1', textAlign: 'center' }}
                  >
                    𝕏
                  </button>
                )}
                <button
                  className={`menu-item px-2 py-1 font-bold text-sm rounded ${
                    embed.active ? 'bg-gray-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-700'
                  } transition`}
                  onClick={embed.handleClick}
                  aria-label={`${embed.active ? 'Hide' : 'Show'} ${embed.title}`}
                  style={{
                    minWidth: '100px',
                    maxWidth: '150px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <span className="embed-title" style={{ maxWidth: '100%', display: 'block' }}>
                    {embed.title}
                  </span>
                </button>
              </div>
            ))}
            {!embeds.some((embed) => embed.active) && (
              <div>
                <button
                  className={`px-2 py-1 text-sm rounded bg-purple-600 font-bold text-white ${
                    buttonClicked ? 'text-sm' : ''
                  } transition`}
                  onClick={handleAddClick}
                  style={{
                    minWidth: '100px',
                    maxWidth: '150px',
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
            <a href="/path-to-your-page" className="px-4 py-1 text-sm font-bold text-gray-200">
              ℕ
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
          <div className="flex flex-wrap gap-1 mt-2 mx-auto max-w-2xl md:max-w-4xl lg:max-w-6xl justify-center">
            {memoizedEmbeds.map((embed) => (
              <div key={embed.id} style={{ position: 'relative', width: '85px' }}>
                {showDeleteButtons && (
                  <button
                    className="menu-item absolute top-0 right-0 px-0 py-0 font-medium text-xs rounded  text-black"
                    onClick={() => handleDeleteClick(embed.id)}
                    style={{ width: '100%', textAlign: 'center' }}
                  >
                    𝕏
                  </button>
                )}
                <button
                  className={`menu-item px-1 py-1 font-medium text-xs rounded ${
                    embed.active ? 'bg-blue-600 text-xs py-1  hover:bg-blue-700' : 'bg-gray-800 hover:bg-blue-700'
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
            {!embeds.some((embed) => embed.active) && (
              <button
                className={`px-1 py-1 text-xs rounded bg-purple-600 font-bold text-white ${
                  buttonClicked ? 'text-xs' : ''
                }`}
                onClick={handleAddClick}
              >
                Add
              </button>
            )}
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
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-top-navigation allow-top-navigation-by-user-activation allow-downloads"
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
      id: 'nostrband-embed',
      url: 'https://nostr.band/',
      title: 'Nostr.Band',
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
      id: 'nostryfied-embed',
      url: 'https://nostryfied.online/',
      title: 'Nostr Backups',
      active: false,
    },
    {
      id: 'nostrnests-embed',
      url: 'https://nostrnests.com/',
      title: 'NostrNests',
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
