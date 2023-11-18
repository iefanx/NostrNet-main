import React, { useState } from 'react';
import NoteTakingApp from './NoteTakingApp'; 
import Profile from './Profile';

const ButtonGroup = () => {
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);


  const handleButtonClick = (url) => {
  if (url === 'backup') {
    setIsProfileOpen(true);
  } else {
    setSelectedUrl(url);
    setIsModalOpen(true);
  }
};


  
  const closeModal = () => {
    setSelectedUrl(null);
    setIsModalOpen(false);
  };

  return (
    <div className="main-btn grid grid-cols-2 md:grid-cols-4    gap-2 px-8  justify-center mt-4">
      <button
        className="bg-[#252528] hover:bg-gray-700 text-md text-sm text-gray-300 font-semibold py-2 px-4 rounded-xl shadow-lg flex items-center space-x-2"
        onClick={() => handleButtonClick("backup")}
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z"
            stroke="#e7e7e7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.34"
            d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z"
            stroke="#e7e7e7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#88898c"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span className="ml-1">Profile</span>
      </button>
      <button
        className="bg-[#252528]  hover:bg-gray-700 text-gray-300 text-sm font-semibold py-2 px-4 rounded-xl shadow-lg flex items-center space-x-2"
        onClick={() => handleButtonClick("https://cal.nostrnet.work/")}
      >
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.94028 2C7.35614 2 7.69326 2.32421 7.69326 2.72414V4.18487C8.36117 4.17241 9.10983 4.17241 9.95219 4.17241H13.9681C14.8104 4.17241 15.5591 4.17241 16.227 4.18487V2.72414C16.227 2.32421 16.5641 2 16.98 2C17.3958 2 17.733 2.32421 17.733 2.72414V4.24894C19.178 4.36022 20.1267 4.63333 20.8236 5.30359C21.5206 5.97385 21.8046 6.88616 21.9203 8.27586L22 9H2.92456H2V8.27586C2.11571 6.88616 2.3997 5.97385 3.09665 5.30359C3.79361 4.63333 4.74226 4.36022 6.1873 4.24894V2.72414C6.1873 2.32421 6.52442 2 6.94028 2Z"
            fill="#dadce2"
          />
          <path
            opacity="0.5"
            d="M21.9995 14.0001V12.0001C21.9995 11.161 21.9963 9.66527 21.9834 9H2.00917C1.99626 9.66527 1.99953 11.161 1.99953 12.0001V14.0001C1.99953 17.7713 1.99953 19.6569 3.1711 20.8285C4.34267 22.0001 6.22829 22.0001 9.99953 22.0001H13.9995C17.7708 22.0001 19.6564 22.0001 20.828 20.8285C21.9995 19.6569 21.9995 17.7713 21.9995 14.0001Z"
            fill="#A4A8B7"
          />
          <path
            d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
            fill="#dadce2"
          />
          <path
            d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
            fill="#dadce2"
          />
          <path
            d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
            fill="#dadce2"
          />
          <path
            d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
            fill="#dadce2"
          />
          <path
            d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
            fill="#dadce2"
          />
          <path
            d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
            fill="#dadce2"
          />
        </svg>

        <span className="ml-1">Calendar</span>
      </button>
      <button
        className="bg-[#252528] hover:bg-gray-700 text-gray-300 text-sm font-semibold py-2 px-4 rounded-xl shadow-lg flex items-center space-x-2"
        onClick={() => handleButtonClick("https://notes.nostrnet.work")} // Set the selectedUrl to 'notes'
      >
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="#88898c"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.6602 10.44L20.6802 14.62C19.8402 18.23 18.1802 19.69 15.0602 19.39C14.5602 19.35 14.0202 19.26 13.4402 19.12L11.7602 18.72C7.59018 17.73 6.30018 15.67 7.28018 11.49L8.26018 7.30001C8.46018 6.45001 8.70018 5.71001 9.00018 5.10001C10.1702 2.68001 12.1602 2.03001 15.5002 2.82001L17.1702 3.21001C21.3602 4.19001 22.6402 6.26001 21.6602 10.44Z"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.4"
            d="M15.0603 19.3901C14.4403 19.8101 13.6603 20.1601 12.7103 20.4701L11.1303 20.9901C7.16034 22.2701 5.07034 21.2001 3.78034 17.2301L2.50034 13.2801C1.22034 9.3101 2.28034 7.2101 6.25034 5.9301L7.83034 5.4101C8.24034 5.2801 8.63034 5.1701 9.00034 5.1001C8.70034 5.7101 8.46034 6.4501 8.26034 7.3001L7.28034 11.4901C6.30034 15.6701 7.59034 17.7301 11.7603 18.7201L13.4403 19.1201C14.0203 19.2601 14.5603 19.3501 15.0603 19.3901Z"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.4"
            d="M12.6406 8.52979L17.4906 9.75979"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.4"
            d="M11.6602 12.3999L14.5602 13.1399"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span className="ml-1">Notes</span>
      </button>

      <button
        className="bg-[#252528] hover:bg-gray-700 text-gray-300 text-sm font-semibold py-2 px-3 rounded-xl shadow-lg flex items-center space-x-2"
        onClick={() => handleButtonClick("https://vendata.io/jobs/new")}
      >
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 512 512"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <title>ai</title>
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g
              id="icon"
              fill="#88898c"
              transform="translate(64.000000, 64.000000)"
            >
              <path
                d="M320,64 L320,320 L64,320 L64,64 L320,64 Z M171.749388,128 L146.817842,128 L99.4840387,256 L121.976629,256 L130.913039,230.977 L187.575039,230.977 L196.319607,256 L220.167172,256 L171.749388,128 Z M260.093778,128 L237.691519,128 L237.691519,256 L260.093778,256 L260.093778,128 Z M159.094727,149.47526 L181.409039,213.333 L137.135039,213.333 L159.094727,149.47526 Z M341.333333,256 L384,256 L384,298.666667 L341.333333,298.666667 L341.333333,256 Z M85.3333333,341.333333 L128,341.333333 L128,384 L85.3333333,384 L85.3333333,341.333333 Z M170.666667,341.333333 L213.333333,341.333333 L213.333333,384 L170.666667,384 L170.666667,341.333333 Z M85.3333333,0 L128,0 L128,42.6666667 L85.3333333,42.6666667 L85.3333333,0 Z M256,341.333333 L298.666667,341.333333 L298.666667,384 L256,384 L256,341.333333 Z M170.666667,0 L213.333333,0 L213.333333,42.6666667 L170.666667,42.6666667 L170.666667,0 Z M256,0 L298.666667,0 L298.666667,42.6666667 L256,42.6666667 L256,0 Z M341.333333,170.666667 L384,170.666667 L384,213.333333 L341.333333,213.333333 L341.333333,170.666667 Z M0,256 L42.6666667,256 L42.6666667,298.666667 L0,298.666667 L0,256 Z M341.333333,85.3333333 L384,85.3333333 L384,128 L341.333333,128 L341.333333,85.3333333 Z M0,170.666667 L42.6666667,170.666667 L42.6666667,213.333333 L0,213.333333 L0,170.666667 Z M0,85.3333333 L42.6666667,85.3333333 L42.6666667,128 L0,128 L0,85.3333333 Z"
                id="Combined-Shape"
              ></path>
            </g>
          </g>
        </svg>

        <span className="ml-1">NostrAi</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="  w-full h-full relative overflow-y-auto">
            <button
              className="absolute top-1 right-1 font-bold text-gray-300 rounded-full bg-gray-300 hover:text-white"
              onClick={closeModal}
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
            {selectedUrl === "notes" ? (
              <div className="modal-content   ">
                <NoteTakingApp />
              </div>
            ) : (
              <iframe
                title="Modal Content"
                src={selectedUrl}
                width="100%"
                height="100%"
                className="modal-content  bg-[#18181a]"
                frameBorder="0"
              />
            )}
          </div>
        </div>
      )}
      {isProfileOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="p-4 rounded-xl w-full h-full relative bg-[#18181a] overflow-y-auto">
            <div className="modal-content mt-10 bg-[#252528]  rounded-xl">
              <button
                className="absolute  right-10 mt-3 font-bold bg-inherit text-gray-300 rounded-full bg-gray-300 hover:text-white "
                onClick={() => setIsProfileOpen(false)}
              >
                <spam> close</spam>
              </button>

              <Profile />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonGroup;
