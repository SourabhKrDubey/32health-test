import React from "react";

export default function Loader({ isLoading }) {
  return (
    isLoading && (
      <div className="loader">
        <div className="bubble1" />
        <div className="bubble2" />
        <div className="bubble3" />
      </div>
    )
  );
}
