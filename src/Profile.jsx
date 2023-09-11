import React, { useState, useEffect } from "react";
import "./ButtonGroup";



const Profile = () => {
  const [publicKey, setPublicKey] = useState("");
  const [rawApiResponse, setRawApiResponse] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [iframes, setIframes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setPublicKey(parsedUser.npub);
      setIsLoggedIn(true);
      fetchProfileData(parsedUser.npub); // Automatically fetch data
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setPublicKey("");
    setIsLoggedIn(false);
    setRawApiResponse("");
  };

  const handleManualSubmit = async () => {
    if (publicKey) {
      fetchProfileData(publicKey);

      // Save the user data to localStorage
      const userData = { npub: publicKey };
      localStorage.setItem("user", JSON.stringify(userData));

      setIsLoggedIn(true);
    }
  };


  const handleUrlButtonClick = (url) => {
    const iframe = (
      <iframe
        key={url}
        src={url}
        title="External Content"
        className="fullscreen-iframe rounded-xl"
      />
    );
    setIframes((prevIframes) => [...prevIframes, iframe]);
    
    // Show the modal
    setIsModalVisible(true);
  };


  const fetchProfileData = async (publicKey) => {
    try {
      const response = await fetch(
        `https://api.nostr.band/v0/stats/profile/${publicKey}`
      );

      if (response.ok) {
        const data = await response.json();
        setRawApiResponse(JSON.stringify(data, null, 2));
      } else {
        console.error("Error fetching profile data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };


  const formatApiResponse = (response) => {
    const userStats = response.stats;

    if (!userStats) {
      return "No user stats found.";
    }

    const userKey = Object.keys(userStats)[0];
    const userData = userStats[userKey];
    const zapsReceived = userData.zaps_received;

    return (
      <div className="text-white p-4 bg-[#24242] rounded mt-4">
        <h2 className="text-xl font-semibold mb-2">Nostrich Stats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 text-sm font-semibold gap-2 gap-x-8">
          <p>Followers: {userData.followers_pubkey_count}</p>
          <p>Following: {userData.pub_following_pubkey_count}</p>
          <p>Notes: {userData.pub_note_count}</p>
          <p>Likes : {userData.reaction_count}</p>
          <p>Replies : {userData.reply_count}</p>
          <p>Zap Count: {zapsReceived.zapper_count}</p>
          <p>Total Zaps: {zapsReceived.msats / 1000}</p>
          <p>Max Zap: {zapsReceived.max_msats / 1000}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex bg-[#24242] flex-col">
      <div className="flex  ">
        <button
          className="btn fixed  p-0.5 shadow-xl  bg-gray-600 rounded-full  m-4"
          onClick={() => window.my_modal_1.showModal()}
        >
          {isLoggedIn ? (
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.4" d="M12.1605 10.87C12.0605 10.86 11.9405 10.86 11.8305 10.87C9.45055 10.79 7.56055 8.84 7.56055 6.44C7.56055 3.99 9.54055 2 12.0005 2C14.4505 2 16.4405 3.99 16.4405 6.44C16.4305 8.84 14.5405 10.79 12.1605 10.87Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.1607 14.56C4.7407 16.18 4.7407 18.82 7.1607 20.43C9.9107 22.27 14.4207 22.27 17.1707 20.43C19.5907 18.81 19.5907 16.17 17.1707 14.56C14.4307 12.73 9.9207 12.73 7.1607 14.56Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    ) : (
        <button
        className="   px-1  "
        onClick={() => handleManualSubmit()}
      >
        <span className=" text-sm  font-semibold">login for stats</span>
      </button>
      )}
        </button>
      </div>

      <dialog id="my_modal_1" className="modal p-4 mt-20 bg-gray-600 rounded-lg shadow-xl">
    <form method="dialog" className="modal-box flex flex-col">
        {/* Input and Login Button */}
        <div className="flex items-center space-x-2 mt-4">
            <input
                type="text"
                placeholder="Enter Public Key"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                className="border-none px-1 py-0.5 font-semibold bg-gray-800 rounded-xl"
            />
            <button
                className="px-2 py-0.5 bg-blue-700 shadow-xl text-white font-semibold rounded-xl text-sm hover:bg-green-600"
                onClick={handleManualSubmit}
            >
                Login
            </button>
        </div>

        {/* Logout and Close Buttons */}
        <div className="flex justify-between mt-4">
            <button
                className="inline px-1 py-0.5 bg-red-500 text-white font-semibold text-xs rounded-xl hover:bg-red-600 ml-2"
                onClick={handleLogout}
            >
                Logout
            </button>
            <button className="font-bold px-2 py-0.5 text-slate-50 text-sm">Close</button>
        </div>
    </form>
</dialog>

      <div className="flex flex-col items-center mb-5 mt-20">
        <div className="flex flex-col items-center"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <button
        className="bg-gray-700 text-white font-semibold rounded-xl text-sm hover:bg-gray-600 px-4 py-2 flex items-center space-x-2"
        onClick={() => handleUrlButtonClick("https://app.coracle.social/profile")}
        >
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.4" d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z" stroke="#e7e7e7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path opacity="0.34" d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z" stroke="#e7e7e7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#e7e7e7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span className="ml-2">Profile</span>
        </button>
        <button
        className="bg-gray-700 text-white font-semibold rounded-xl text-sm hover:bg-gray-600 px-4 py-2 flex items-center space-x-2"
        onClick={() => handleUrlButtonClick("https://app.coracle.social/relays")}
        >
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 21H6C4.11438 21 3.17157 21 2.58579 20.4142C2 19.8284 2 18.8856 2 17C2 15.1144 2 14.1716 2.58579 13.5858C3.17157 13 4.11438 13 6 13H18C19.8856 13 20.8284 13 21.4142 13.5858C22 14.1716 22 15.1144 22 17C22 18.8856 22 19.8284 21.4142 20.4142C20.8284 21 19.8856 21 18 21H17" stroke="#e7e7e7" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M11 2H18C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6C22 7.88562 22 8.82843 21.4142 9.41421C20.8284 10 19.8856 10 18 10H6C4.11438 10 3.17157 10 2.58579 9.41421C2 8.82843 2 7.88562 2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2H7" stroke="#e7e7e7" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M11 6H18" stroke="#e7e7e7" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M6 6H8" stroke="#e7e7e7" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M11 17H18" stroke="#e7e7e7" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M6 17H8" stroke="#e7e7e7" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span className="ml-2">My Relays</span>
        </button>
        <button
        className="bg-gray-700 text-white font-semibold rounded-xl text-sm hover:bg-gray-600 px-4 py-2 flex items-center space-x-2"
        onClick={() => handleUrlButtonClick("https://nostryfied.online/")}
        >
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.5">
        <path d="M6.50001 18L6.50001 17.9105C6.49991 17.0449 6.49981 16.2512 6.58661 15.6056C6.6822 14.8946 6.90709 14.1432 7.52514 13.5251C8.14319 12.9071 8.89464 12.6822 9.6056 12.5866C10.2512 12.4998 11.0449 12.4999 11.9105 12.5H12.0895C12.9551 12.4999 13.7488 12.4998 14.3944 12.5866C15.1054 12.6822 15.8568 12.9071 16.4749 13.5251C17.0929 14.1432 17.3178 14.8946 17.4134 15.6056C17.4989 16.2417 17.5001 17.0215 17.5 17.8722C20.0726 17.3221 22 15.0599 22 12.3529C22 9.88113 20.393 7.78024 18.1551 7.01498C17.8371 4.19371 15.4159 2 12.4762 2C9.32028 2 6.7619 4.52827 6.7619 7.64706C6.7619 8.33687 6.88706 8.9978 7.11616 9.60887C6.8475 9.55673 6.56983 9.52941 6.28571 9.52941C3.91878 9.52941 2 11.4256 2 13.7647C2 16.1038 3.91878 18 6.28571 18L6.50001 18Z" fill="#e7e7e7"/>
        </g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C10.1144 22 9.17157 22 8.58579 21.4142C8 20.8284 8 19.8856 8 18C8 16.1144 8 15.1716 8.58579 14.5858C9.17157 14 10.1144 14 12 14C13.8856 14 14.8284 14 15.4142 14.5858C16 15.1716 16 16.1144 16 18C16 19.8856 16 20.8284 15.4142 21.4142C14.8284 22 13.8856 22 12 22ZM13.8047 18.9158L12.4714 20.2492C12.2111 20.5095 11.7889 20.5095 11.5286 20.2492L10.1953 18.9158C9.93491 18.6555 9.93491 18.2334 10.1953 17.973C10.4556 17.7127 10.8777 17.7127 11.1381 17.973L11.3333 18.1683V16.2222C11.3333 15.854 11.6318 15.5556 12 15.5556C12.3682 15.5556 12.6667 15.854 12.6667 16.2222V18.1683L12.8619 17.973C13.1223 17.7127 13.5444 17.7127 13.8047 17.973C14.0651 18.2334 14.0651 18.6555 13.8047 18.9158Z" fill="#e7e7e7"/>
        </svg>
        <span className="ml-2">Backup</span>
        </button>
        <button
        className="bg-gray-700 text-white font-semibold rounded-xl text-sm hover:bg-gray-600 px-4 py-2 flex items-center space-x-2"
        onClick={() => handleUrlButtonClick("https://example.com")}
        >
        
        Coming Soon
        </button>

        </div>

        {rawApiResponse && formatApiResponse(JSON.parse(rawApiResponse))}
      </div>
      
        {isModalVisible && (
        <div className="modal-overlay  ">
          <div className="modal-content ">
            <button
              className="absolute top-2 right-2 font-mono font-semibold rounded-full text-black bg-gray-300  z-20"
              onClick={() => setIsModalVisible(false)}
            >
              <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {iframes.map((iframe, index) => (
              <div key={index} className="fullscreen-iframe rounded-xl min-h-full">
                {iframe}
              </div>
            ))}
            {/* Close button */}
            
          </div>
        </div>
      )}



    </div>
  );
};

export default Profile;
