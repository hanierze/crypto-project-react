import React from "react";

import spinner from "../assets/gif/giphy.gif";

const Loading = () => {
  return (
    <div>
      <img src={spinner} alt="spinner" />
      <h1> Loading </h1>
    </div>
  );
};

export default Loading;
