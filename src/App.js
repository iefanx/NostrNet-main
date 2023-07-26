import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import Modal from './Modal';

const EMBEDS_DATA_KEY = 'embedsData';

const App = () => {
  const [embeds, setEmbeds] = useState(getEmbedsData());
  const [, setCustomEmbeds] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [showSecondMenu, setShowSecondMenu] = useState(false);

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

    setCustomEmbeds((prevCustomEmbeds) => [...prevCustomEmbeds, newEmbed]);
  }, []);

  const deleteCustomEmbeds = useCallback(() => {
    setCustomEmbeds([]);
    setEmbeds((prevEmbeds) => prevEmbeds.filter((embed) => !embed.id.startsWith('custom-')));
    localStorage.removeItem(EMBEDS_DATA_KEY);
  }, []);

  useEffect(() => {
    const storedEmbedsData = localStorage.getItem(EMBEDS_DATA_KEY);
    const storedEmbeds = storedEmbedsData ? JSON.parse(storedEmbedsData) : getEmbedsData();
    setEmbeds(storedEmbeds);
  }, []);

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
    const confirmDelete = window.confirm('Are you sure you want to delete all custom embeds?');
    if (confirmDelete) {
      deleteCustomEmbeds();
    }
  }, [deleteCustomEmbeds]);

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

  return (
    <div className="bg-black text-white min-h-screen flex flex-col text-center justify-start items-center w-screen">
      {!buttonClicked && (
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <div>
            <h1 className="text-4xl font-bold mt-4 px-5 mb-2">ℕ</h1>
             <h2 className="text-sm font-bold mb-4 px-5">NostNet.work, it offers a unified dashboard to manage all your Nostr web apps in one place. (Beta)</h2>
          </div>
          <div style={{ position: 'fixed', right: '5%', bottom: '0' }}>
            <button className="px-4 py-2 text-sm rounded font-bold text-white" onClick={handleDeleteAllClick}>
              Reset
            </button>
          </div>
        </div>
      )}
      {!embeds.some((embed) => embed.active) && !showSecondMenu ? (
        <nav className="flex justify-center mb-0">
          <div className="grid grid-cols-3 gap-4 mt-2 mx-auto max-w-2xl md:max-w-4xl md:grid-cols-5 lg:grid-cols-8">
            {memoizedEmbeds.map((embed) => (
              <button
                key={embed.id}
                className={`menu-item px-2 py-2 font-bold text-sm rounded ${
                  embed.active ? 'bg-gray-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={embed.handleClick}
                aria-label={`${embed.active ? 'Hide' : 'Show'} ${embed.title}`}
              >
                <span className="embed-title">{embed.title}</span>
              </button>
            ))}
            {!embeds.some((embed) => embed.active) && (
              <button
                className={`px-4 py-2 text-sm rounded bg-purple-600 font-bold text-white ${
                  buttonClicked ? 'text-sm' : ''
                }`}
                onClick={handleAddClick}
              >
                Add
              </button>
            )}
          </div>
        </nav>
      ) : (
        <div className="pt-1 mb-0">
          
          <a href="/" rel="noopener noreferrer">
  <button 
    className="px-4 py-1 text-sm mr-2 rounded bg-gray-900 font-bold text-gray-200"
    onClick={handleHomeButtonClick}
  >
    Home
  </button>
</a>

          {showSecondMenu ? (
            <button
              className="px-4 py-1 text-sm rounded mr-2 bg-purple-900 font-bold  text-gray-200 "
              onClick={() => setShowSecondMenu(false)}
            >
              Hide Menu
            </button>
          ) : (
            <button
              className="px-4 py-1 text-sm mr-2 rounded bg-gray-900 font-bold text-gray-200 "
              onClick={() => setShowSecondMenu(true)}
            >
              Show Menu
            </button>
          )}
        </div>
      )}
      {showSecondMenu && (
        <nav className="flex justify-center mb-0">
          <div className="grid grid-cols-3 gap-4 mt-2">
            {memoizedEmbeds.map((embed) => (
              <button
                key={embed.id}
                className={`menu-item px-2 py-2 font-bold text-sm rounded ${
                  embed.active ? 'bg-blue-600 text-sm hover:bg-blue-700' : 'bg-gray-800 hover:bg-blue-700'
                }`}
                onClick={embed.handleClick}
                aria-label={`${embed.active ? 'Hide' : 'Show'} ${embed.title}`}
              >
                <span className="embed-title">{embed.title}</span>
              </button>
            ))}
            {!embeds.some((embed) => embed.active) && (
              <button
                className={`px-4 py-2 text-sm rounded bg-purple-600 font-bold text-white ${
                  buttonClicked ? 'text-sm' : ''
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
          <div key={embed.id} className={`embed-container ${embed.active ? 'active' : ''}`}>
            {embed.active && (
              <iframe src={embed.url} frameBorder="0" scrolling="yes" className="embed-iframe" title={embed.title} />
            )}
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
      id: 'listr-embed',
      url: 'https://listr.lol/',
      title: 'Listr',
      active: false,
    },
    {
      id: 'nostrband-embed',
      url: 'https://nostr.band/',
      title: 'Nostr Band',
      active: false,
    },
    {
      id: 'nostrbuild-embed',
      url: 'https://nostr.build/',
      title: 'Nostr Build',
      active: false,
    },
    {
      id: 'nostrnests-embed',
      url: 'https://nostrnests.com/',
      title: 'Nostr Nests',
      active: false,
    },
    {
      id: 'chess-embed',
      url: 'https://jesterui.github.io/',
      title: 'Nostr Chess',
      active: false,
    },
    {
      id: 'satellite-embed',
      url: 'https://satellite.earth/',
      title: 'Satellite',
      active: false,
    },
    {
      id: 'zapstream-embed',
      url: 'https://zap.stream/',
      title: 'Zap Stream',
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
