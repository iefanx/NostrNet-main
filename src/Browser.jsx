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
      {/* Calendar Button */}
      <button
        className="absolute top-2.5 right-3  text-white px-2 py-1 rounded"
        onClick={openModal}
      >
        <svg
          width="30px"
          height="30px"
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
      </button>

      {showInstallButton && (
        <button
          className="absolute top-2 right-14  text-white px-2 py-1 rounded"
          onClick={handleInstallClick}
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
