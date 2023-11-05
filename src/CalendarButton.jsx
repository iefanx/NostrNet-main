import React, { useState } from "react";

function CalendarButton() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative">
      {/* Calendar Button */}
      <button
        className="absolute top-2 right-2  text-white px-2 py-1 rounded"
        onClick={openModal}
      >
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="#4296FF"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7 2C7.55228 2 8 2.44772 8 3V5C8 5.55228 7.55228 6 7 6C6.44772 6 6 5.55228 6 5V3C6 2.44772 6.44772 2 7 2Z"
            fill="#4296FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 2C17.5523 2 18 2.44772 18 3V5C18 5.55228 17.5523 6 17 6C16.4477 6 16 5.55228 16 5V3C16 2.44772 16.4477 2 17 2Z"
            fill="#4296FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13Z"
            fill="#4296FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7 17C7 16.4477 7.44772 16 8 16H12C12.5523 16 13 16.4477 13 17C13 17.5523 12.5523 18 12 18H8C7.44772 18 7 17.5523 7 17Z"
            fill="#4296FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7 4C4.23858 4 2 6.23858 2 9V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V9C22 6.23858 19.7614 4 17 4H7ZM19.8293 8C19.4175 6.83481 18.3062 6 17 6H7C5.69378 6 4.58254 6.83481 4.17071 8H19.8293ZM4 10H20V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V10Z"
            fill="#FFFFFF"
          />
        </svg>
      </button>

      {/* Calendar Modal */}
      {showModal && (
        <div className="fixed inset-0 h-full  bg-[#18181a] flex items-center justify-center z-50">
          <div className="absolute inset-0  bg-[#18181a] opacity-50"></div>
          <div className="relative z-10 pt-6  h-full w-full rounded-lg">
            <iframe
              src="https://cal.nostrnet.work" // Replace with your calendar website URL
              title="Calendar"
              name="uniqueIframeName" // Set a unique name for the iframe
              width="100%"
              height="100%" // Adjust the height as needed
            ></iframe>
            <button
              className="absolute top-0  right-2 text-white px-2 py-0.5 rounded"
              onClick={closeModal}
            >
              <span className="text-red-500 flex font-semibold">X</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarButton;
