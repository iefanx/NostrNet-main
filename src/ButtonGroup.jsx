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

        <span className="ml-1">Calander</span>
      </button>

      <button
        className="bg-[#252528] hover:bg-gray-700 text-gray-300 text-sm font-semibold py-2 px-3 rounded-xl shadow-lg flex items-center space-x-2"
        onClick={() => handleButtonClick("https://labs.perplexity.ai")}
      >
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M13.7916 21.319L13.1953 22.3265C12.6638 23.2244 11.3361 23.2244 10.8046 22.3265L10.2083 21.319C9.7458 20.5376 9.51454 20.1469 9.14307 19.9308C8.7716 19.7148 8.30391 19.7067 7.36854 19.6906C5.98764 19.6668 5.12158 19.5822 4.39524 19.2813C3.04759 18.7231 1.97688 17.6524 1.41866 16.3048C1 15.294 1 14.0127 1 11.45V10.35C1 6.74923 1 4.94884 1.81048 3.62626C2.26399 2.8862 2.8862 2.26399 3.62626 1.81048C4.94884 1 6.74923 1 10.35 1H13.65C17.2508 1 19.0512 1 20.3737 1.81048C21.1138 2.26399 21.736 2.8862 22.1895 3.62626C23 4.94884 23 6.74923 23 10.35V11.45C23 14.0127 23 15.294 22.5813 16.3048C22.0231 17.6524 20.9524 18.7231 19.6048 19.2813C18.8784 19.5822 18.0123 19.6668 16.6314 19.6906C15.696 19.7067 15.2284 19.7148 14.8569 19.9308C14.4854 20.1469 14.2542 20.5376 13.7916 21.319Z"
            fill="#A4A8B7"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.267 6.82953C15.5892 6.50734 16.1116 6.50734 16.4338 6.82953L16.6225 7.01826C16.636 7.03178 16.6495 7.04526 16.6629 7.0587C17.3618 7.75753 17.9446 8.34027 18.345 8.8651C18.7677 9.41906 19.0641 10.0043 19.0641 10.7129C19.0641 11.4214 18.7677 12.0067 18.345 12.5607C17.9446 13.0855 17.3618 13.6683 16.6629 14.3671L16.4338 14.5963C16.1116 14.9184 15.5892 14.9184 15.267 14.5963C14.9448 14.2741 14.9448 13.7517 15.267 13.4295L15.4558 13.2408C16.2056 12.491 16.708 11.9861 17.0332 11.5598C17.3439 11.1526 17.4141 10.9156 17.4141 10.7129C17.4141 10.5102 17.3439 10.2731 17.0332 9.86596C16.708 9.43973 16.2056 8.93481 15.4558 8.18498L15.267 7.99625C14.9448 7.67407 14.9448 7.15171 15.267 6.82953Z"
            fill="#dadce2"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.6367 4.60415C14.0768 4.72208 14.338 5.17446 14.2201 5.61457L11.3731 16.2398C11.2552 16.6799 10.8028 16.941 10.3627 16.8231C9.92256 16.7052 9.66138 16.2528 9.77931 15.8127L12.6263 5.18751C12.7442 4.7474 13.1966 4.48622 13.6367 4.60415Z"
            fill="#dadce2"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.73297 6.82953C8.41079 6.50734 7.88843 6.50734 7.56625 6.82953L7.37752 7.01826C7.36399 7.03178 7.35051 7.04526 7.33707 7.0587C6.63819 7.75753 6.05542 8.34027 5.65499 8.8651C5.23233 9.41906 4.93588 10.0043 4.93588 10.7129C4.93588 11.4214 5.23233 12.0067 5.65499 12.5607C6.05542 13.0855 6.6382 13.6683 7.33708 14.3671L7.56625 14.5963C7.88843 14.9184 8.41079 14.9184 8.73297 14.5963C9.05516 14.2741 9.05516 13.7517 8.73297 13.4295L8.54424 13.2408C7.79442 12.491 7.29197 11.9861 6.96677 11.5598C6.6561 11.1526 6.58588 10.9156 6.58588 10.7129C6.58588 10.5102 6.6561 10.2731 6.96677 9.86596C7.29197 9.43973 7.79442 8.93481 8.54424 8.18498L8.73297 7.99625C9.05516 7.67407 9.05516 7.15171 8.73297 6.82953Z"
            fill="#dadce2"
          />
        </svg>

        <span className="ml-1">Copilot</span>
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
