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
import CalendarButton from "./CalendarButton";

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

  const openIframe = () => {
    setShowIframe(true);
  };

  const closeIframe = () => {
    setShowIframe(false);
  };

  

  return (
    <div className="">
      <div className="bg-[#18181a] text-white h-screen text-center flex flex-col justify-start w-screen">
        {!buttonClicked && (
          <div style={{ position: "relative", marginBottom: "1rem" }}>
            <CalendarButton />
            <div className="text-left">
              <h1 className="text-2xl  font-serif mt-4 px-5 m-3 ">
                <span className="  font-black"> 𝐍</span>
                <span className=" font-medium  font-serif text-base">
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
                className="px-4 py-2 text-sm rounded font-bold text-white"
                onClick={handleDeleteAllClick}
              >
                {showDeleteButtons ? "Cancel" : "Edit"}
              </button>
            </div>
          </div>
        )}

        {!embeds.some((embed) => embed.active) && !showSecondMenu ? (
          <nav className="flex justify-center  mb-0">
            <div className="flex flex-wrap gap-1 mt-0 mx-auto   w-full max-w-4xl md:max-w-4xl lg:max-w-6xl justify-center">
              {memoizedEmbeds.map((embed) => (
                <div
                  className=" "
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
                      className="w-14 h-14 shadow-xl  bg-[#252528] rounded-full mx-auto mb-1 ring-2 ring-gray-600"
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
                    className={`inline-block px-0 pb-2  font-semibold text-xs  rounded-lg text-gray-300`}
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
            <a>
              <button
                className="p-1 text-xs   rounded-full shadow-lg z-10 bg-[#6a6c91] font-semibold text-gray-200"
                onClick={() => openTextModal("This is the text modal content.")}
              >
                <svg
                  width="15px"
                  height="15px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.6602 10.44L20.6802 14.62C19.8402 18.23 18.1802 19.69 15.0602 19.39C14.5602 19.35 14.0202 19.26 13.4402 19.12L11.7602 18.72C7.59018 17.73 6.30018 15.67 7.28018 11.49L8.26018 7.30001C8.46018 6.45001 8.70018 5.71001 9.00018 5.10001C10.1702 2.68001 12.1602 2.03001 15.5002 2.82001L17.1702 3.21001C21.3602 4.19001 22.6402 6.26001 21.6602 10.44Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    opacity="0.4"
                    d="M15.0603 19.3901C14.4403 19.8101 13.6603 20.1601 12.7103 20.4701L11.1303 20.9901C7.16034 22.2701 5.07034 21.2001 3.78034 17.2301L2.50034 13.2801C1.22034 9.3101 2.28034 7.2101 6.25034 5.9301L7.83034 5.4101C8.24034 5.2801 8.63034 5.1701 9.00034 5.1001C8.70034 5.7101 8.46034 6.4501 8.26034 7.3001L7.28034 11.4901C6.30034 15.6701 7.59034 17.7301 11.7603 18.7201L13.4403 19.1201C14.0203 19.2601 14.5603 19.3501 15.0603 19.3901Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    opacity="0.4"
                    d="M12.6406 8.52979L17.4906 9.75979"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    opacity="0.4"
                    d="M11.6602 12.3999L14.5602 13.1399"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </a>

            <a href="/" rel="noopener noreferrer">
              <button
                className="p-1 text-xs rounded-full shadow-lg z-10 bg-[#6a6c91] font-semibold text-gray-200 hover:bg-[#5b5d80] transition"
                aria-label="Home"
              >
                <svg
                  width="15px"
                  height="15px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 18H9"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </a>

            <MenuButton
              showSecondMenu={showSecondMenu}
              setShowSecondMenu={setShowSecondMenu}
              memoizedEmbeds={memoizedEmbeds}
              showDeleteButtons={showDeleteButtons}
              handleDeleteClick={handleDeleteClick}
            />
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
      id: 'nostryfied-embed',
      url: 'https://nostrsync.live/',
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
      id: 'nostrcheck-embed',
      url: 'https://nostrcheck.me//',
      title: 'NostrCheck',
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
