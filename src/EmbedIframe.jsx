import React from 'react';

const EmbedIframe = ({ url, title }) => {
  return (
    <iframe
      src={url}
      frameBorder="0"
      scrolling="yes"
      className="embed-iframe max-h-full"
      title={title}
      allow="clipboard-write; autoplay; camera; microphone; geolocation; fullscreen"
      loading="lazy"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
    />
  );
};

export default EmbedIframe;
