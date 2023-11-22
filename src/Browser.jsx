import React, { useState, useEffect } from "react";



function Browser() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setInstallPrompt(event);
    setShowInstallButton(true);
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      try {
        const result = await installPrompt.prompt();
        console.log(`Install prompt was: ${result.outcome}`);
      } catch (error) {
        console.error("Error when prompting to install:", error);
      } finally {
        setInstallPrompt(null);
        setShowInstallButton(false);
      }
    }
  };


  return (
    <div className="relative">
      

      {showInstallButton && (
        <button
          className="absolute top-3 right-16 text-white px-1.5 py-0 bg-[#273253] rounded-md flex items-center"
          onClick={handleInstallClick}
        >
          <span className="mr-2 text-white p-0 text-sm font-extrabold">Install </span>
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmln
            s="http://www.w3.org/2000/svg"
          >
            <path
              opacity="1"
              d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
              fill="#1877F2"
            />
            <path
              d="M12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7L11.25 12.1893L9.53033 10.4697C9.23744 10.1768 8.76256 10.1768 8.46967 10.4697C8.17678 10.7626 8.17678 11.2374 8.46967 11.5303L11.4697 14.5303C11.6103 14.671 11.8011 14.75 12 14.75C12.1989 14.75 12.3897 14.671 12.5303 14.5303L15.5303 11.5303C15.8232 11.2374 15.8232 10.7626 15.5303 10.4697C15.2374 10.1768 14.7626 10.1768 14.4697 10.4697L12.75 12.1893V7Z"
              fill="#FFFFFF"
            />
            <path
              d="M8 16.25C7.58579 16.25 7.25 16.5858 7.25 17C7.25 17.4142 7.58579 17.75 8 17.75H16C16.4142 17.75 16.75 17.4142 16.75 17C16.75 16.5858 16.4142 16.25 16 16.25H8Z"
              fill="#FFFFFF"
            />
          </svg>
        </button>
      )}

      {/* Calendar Modal */}
      {showModal && (
        <div className="fixed inset-0 h-full  bg-[#18181a] flex items-center justify-center z-50">
          <div className="absolute inset-0  bg-[#18181a] opacity-50"></div>
          <div className="relative z-10 pt-6  h-full w-full rounded-lg">
            <iframe
              src="https://labs.perplexity.ai" // Replace with your calendar website URL
              title="Calendar"
              name="uniqueIframeName" // Set a unique name for the iframe
              width="100%"
              height="100%" // Adjust the height as needed
            ></iframe>
            <button
              className="absolute top-0  right-2 text-white px-2 py-0.4 rounded"
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

export default Browser;
