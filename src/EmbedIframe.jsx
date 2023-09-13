import React from 'react';

const EmbedIframe = ({ url, title }) => {
  return (
    <iframe
  src={url}
  frameBorder="0"
  scrolling="yes"
  className="embed-iframe max-h-full"
  title={title}
  allow="
    accelerometer;
    autoplay;
    camera;
    clipboard-write;
    encrypted-media;
    fullscreen;
    geolocation;
    gyroscope;
    microphone;
    midi;
    payment;
    picture-in-picture;
    downloads;
  "
  loading="lazy"
  sandbox="
    allow-scripts;
    allow-same-origin;
    allow-popups;
    allow-forms;
    allow-modals;
    allow-orientation-lock;
    allow-pointer-lock;
    allow-top-navigation;
    allow-top-navigation-by-user-activation;
  "
/>
  );
};

export default EmbedIframe;
