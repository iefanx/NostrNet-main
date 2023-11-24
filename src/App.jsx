import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import "./App.css";
import Modal from "./Modal";
import DuckDuckGoSearchBar from "./search";
import NoteTakingApp from "./NoteTakingApp";
import ExtModel from "./ExtModel";
import ButtonGroup from "./ButtonGroup";
import MenuButton from "./MenuButton";

import Browser from "./Browser";


const EMBEDS_DATA_KEY = "embedsData";
const EmbedIframe = lazy(() => import("./EmbedIframe"));

function App() {
  const [embeds, setEmbeds] = useState(getEmbedsData());
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [showSecondMenu, setShowSecondMenu] = useState(false);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const [showTextModal] = useState(false);
  const [extModelOpen, setExtModelOpen] = useState(false);
  const [buttonClickMessage, setButtonClickMessage] = useState("");

  const isStandalone =
    window.navigator.standalone ||
    window.matchMedia("(display-mode: standalone)").matches;

  useEffect(() => {
    const storedEmbedsData = localStorage.getItem(EMBEDS_DATA_KEY);
    const storedEmbeds = storedEmbedsData
      ? JSON.parse(storedEmbedsData)
      : getEmbedsData();
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




  const memoizedEmbeds = useMemo(() => {
  const sortedEmbeds = embeds
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  return sortedEmbeds.map((embed) => {
    const hostname = new URL(embed.url).hostname;
    const iconUrl = `https://icon.horse/icon/${hostname}?size=100x100`;

    return {
      ...embed,
      handleClick: () => toggleEmbed(embed.id),
      iconUrl,
    };
  });
}, [embeds, toggleEmbed]);



  const handleDefaultClick = useCallback(() => {
    localStorage.removeItem(EMBEDS_DATA_KEY);
    setEmbeds(getDefaultEmbedsData());
    setButtonClicked(false);
    setShowDeleteButtons(false);
  }, []);


    const exportData = () => {
      const dataToExport = localStorage.getItem(EMBEDS_DATA_KEY);
      const blob = new Blob([dataToExport], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "embedsData.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    // New function to import data
    const importData = (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const importedData = e.target.result;
          localStorage.setItem(EMBEDS_DATA_KEY, importedData);
          setEmbeds(JSON.parse(importedData));
        };

        reader.readAsText(file);
      }
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

  const openExtModel = () => {
    setExtModelOpen(true);
  };

  const closeExtModel = () => {
    setExtModelOpen(false);
  };
  
  const handleButtonClick = (buttonName) => {
    setButtonClickMessage(`Button ${buttonName} clicked!`);
  };

  

  

  return (
    <div className="">
      <div className="bg-[#18181a] text-white h-screen text-center flex flex-col justify-start w-screen">
        {!buttonClicked && (
          <div style={{ position: "relative", marginBottom: "1rem" }}>
            <div className="flex justify-end ">
              <Browser />
            </div>
            <div className="flex justify-end mr-">
              
                
                <button
                  className=" absolute mt-3 px-5 text-sm mr-3  rounded font-bold text-white"
                  onClick={() =>
                    (window.location.href = "https://app.nostrnet.work/")
                  }
                >
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      opacity="0.5"
                      cx="12"
                      cy="12"
                      r="10"
                      fill="#A4A8B7"
                    />
                    <path
                      d="M8.57516 9.44737C8.3879 7.36316 6.7806 5.42105 6.00035 4.71053L5.56934 4.34189C7.30792 2.88037 9.55133 2 12.0004 2C14.2137 2 16.2592 2.7191 17.9158 3.93642C18.1498 4.64695 17.704 6.13158 17.2359 6.84211C17.0663 7.09947 16.6818 7.41898 16.2602 7.72186C15.3097 8.40477 14.1102 8.74254 13.5004 10C13.326 10.3595 13.3335 10.7108 13.4173 11.0163C13.4776 11.2358 13.5161 11.4745 13.5167 11.708C13.5187 12.4629 12.7552 13.0082 12.0004 13C10.0361 12.9786 8.7502 11.3955 8.57516 9.44737Z"
                      fill="#dadce2"
                    />
                    <path
                      d="M13.4365 18.2761C14.4246 16.414 17.7182 16.414 17.7182 16.414C21.1502 16.3782 21.6138 14.2944 21.9237 13.2412C21.369 17.7226 17.8494 21.2849 13.3885 21.9046C13.0659 21.2256 12.6837 19.6946 13.4365 18.2761Z"
                      fill="#dadce2"
                    />
                  </svg>
                </button>
              
            </div>

            <div className="text-left">
              <h1 className="text-2xl font-serif mt-3 px-5 m-3 ">
                <span className="font-black"> 𝐍</span>
                <span className="font-medium font-serif text-base">
                  ostrNet
                </span>
              </h1>

              <div className="mt-2 ">
                <DuckDuckGoSearchBar />
              </div>

              <div className="mt-2 ">
                <ButtonGroup onButtonClick={handleButtonClick} />

                {/* Display the button click message */}
                <p className="text-gray-300">{buttonClickMessage}</p>
              </div>
            </div>

            <div style={{ position: "fixed", right: "5%", bottom: "0" }}>
              {showDeleteButtons && (
                <button
                  className="px-4 py-2 ml-2 text-sm rounded font-bold text-white"
                  onClick={handleDefaultClick}
                >
                  Reset
                </button>
              )}
              <button
                className="px-4 py-2 ml-2 text-sm rounded font-bold text-blue-500"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Backup/Restore
              </button>

              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <dialog id="my_modal_1" className="modal rounded-lg ">
                <div className="border border-[#313134] p-6 bg-[#313134] items-center rounded-lg shadow-2xl text-center">
                  <p className="mb-4 font-semibold text-white">
                    Backup/Restore your App list
                  </p>

                  <div className="flex justify-center space-x-4">
                    <button
                      className="bg-gray-600 text-white font-semibold rounded-xl text-sm hover:bg-gray-600 px-4 py-2 flex items-center space-x-2"
                      onClick={exportData}
                    >
                      Export Data
                    </button>
                    <label className="bg-gray-600 text-white font-semibold rounded-xl text-sm hover:bg-gray-600 px-4 py-2 flex items-center space-x-2 cursor-pointer">
                      Import Data
                      <input
                        type="file"
                        accept=".json"
                        onChange={importData}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Close button */}
                  <button
                    className="mt-6 px-2 py-1 text-sm rounded font-bold text-white bg-red-500 hover:bg-red-600"
                    onClick={() =>
                      document.getElementById("my_modal_1").close()
                    }
                  >
                    Close
                  </button>
                </div>
              </dialog>

              <button
                className="px-4 py-2 text-sm rounded font-bold text-white"
                onClick={handleDeleteAllClick}
              >
                {showDeleteButtons ? "Cancel" : "Edit"}
              </button>
            </div>
          </div>
        )}

        {!embeds.some((embed) => embed.active) && !showSecondMenu ? (
          <nav className="flex justify-center mb-0">
            <div className="flex flex-wrap gap-1 mt-0 mx-auto w-full max-w-4xl md:max-w-4xl lg:max-w-6xl justify-center">
              {memoizedEmbeds.map((embed) => (
                <div
                  className=""
                  key={embed.id}
                  style={{ position: "relative", minWidth: "80px" }}
                >
                  {showDeleteButtons && (
                    <button
                      className="menu-item absolute right-0 px-0 py-0 font-lg text-xs rounded-full text-white transition bg-red-500 hover:bg-red-600"
                      onClick={() => handleDeleteClick(embed.id)}
                      style={{
                        width: "20px",
                        height: "20px",
                        lineHeight: "1",
                        textAlign: "center",
                        zIndex: 1,
                      }}
                    >
                      ⓧ
                    </button>
                  )}
                  <button
                    className={`menu-item px-0 py-1 font-semibold text-xs rounded-lg text-gray-300`}
                    onClick={embed.handleClick}
                    aria-label={`${embed.active ? "Hide" : "Show"} ${
                      embed.title
                    }`}
                    style={{
                      minWidth: "80px",
                      maxWidth: "120px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      transition: "background-color 0.3s, transform 0.3s",
                    }}
                  >
                    <img
                      src={embed.iconUrl}
                      alt={`${embed.title} icon`}
                      className="w-14 h-14 shadow-xl bg-[#252528] rounded-full mx-auto mb-1 ring-2 ring-gray-600"
                    />
                    <span
                      className="embed-title shadow"
                      style={{ maxWidth: "100%" }}
                    >
                      {embed.title}
                    </span>
                  </button>
                </div>
              ))}
              {!embeds.some((embed) => embed.active) && (
                <div>
                  <button
                    className={`inline-block px-0 pb-2 font-semibold text-xs rounded-lg text-gray-300`}
                    onClick={handleAddClick}
                  >
                    <svg
                      width="65px"
                      height="65px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" fill="" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                        fill="#252528"
                      />
                    </svg>
                    Add
                  </button>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <div className="pt-0.5 nav-bar py-0  space-x-3 justify-end mr-2 flex shadow-xl  ">
            <div className="left-corner-container ">
              <a
                href="/"
                className="px-4 py-0 text-md  font-bold text-gray-200"
              >
                𝐍
              </a>
            </div>

            <MenuButton
              showSecondMenu={showSecondMenu}
              setShowSecondMenu={setShowSecondMenu}
              memoizedEmbeds={memoizedEmbeds}
              showDeleteButtons={showDeleteButtons}
              handleDeleteClick={handleDeleteClick}
            />
            <a href="/" rel="noopener noreferrer">
              <button
                className="p-0.5 text-xs rounded-full shadow-lg z-10 bg-[#5d6095] font-semibold text-gray-200 hover:bg-[#5b5d80] transition"
                aria-label="Home"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </a>
          </div>
        )}

        <div className="flex-col  h-full   items-center mt-0">
          {memoizedEmbeds.map((embed) => (
            <div
              key={embed.id}
              className={`embed-container ${embed.active ? "active" : ""}`}
              style={{ display: embed.active ? "block" : "none" }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                {/* Use the Lazy EmbedIframe component */}
                <EmbedIframe url={embed.url} title={embed.title} />
              </Suspense>
            </div>
          ))}
        </div>

        {showTextModal && (
          <div className="fixed inset-0 flex items-center   bg-[#18181a] justify-center z-50">
            <div className="absolute inset-0 bg-[#18181a] opacity-60"></div>
            <div className="z-10 bg-[#18181a] rounded-lg shadow-xl h-full   max-w-screen-md overflow-y-auto">
              <div className="text-gray-100  relative">
                <button
                  className="absolute top-4 right-2 font-bold text-gray-300 rounded-full bg-gray-300 hover:text-white"
                  onClick={closeTextModal}
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 max-h-[100vh] overflow-y-auto">
                <NoteTakingApp />
              </div>
            </div>
          </div>
        )}

        <ExtModel isOpen={extModelOpen} onClose={closeExtModel} />

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
      url: 'https://highlighter.com',
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
      id: 'nostrsync-embed',
      url: 'https://nostrsync.live/',
      title: 'NostrSync',
      active: false,
    },
    {
      id: 'nostrnests-embed',
      url: 'https://nostrnests.com/',
      title: 'NostrNests',
      active: false,
      },
    {
      id: 'nostrcheck-embed',
      url: 'https://nostrcheck.me/',
      title: 'NostrCheck',
      active: false,
      },
    {
      id: 'nostrudel-embed',
      url: 'https://nostrudel.ninja/',
      title: 'noStrudel',
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
      id: 'oddbean-embed',
      url: 'https://oddbean.com/',
      title: 'Oddbean',
      active: false,
    },
    {
      id: 'zapstream-embed',
      url: 'https://zap.stream/',
      title: 'Zap.Stream',
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
