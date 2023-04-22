import React, { useState } from "react";

const SubmitMemeButton: React.FC<{
  formIsActive: boolean;
  toggleForm: Function;
}> = ({ formIsActive, toggleForm: toggleForm }) => {
  return (
    <button
      onClick={() => {
        toggleForm((open: boolean) => !open);
      }}
      type="button"
      className={`${
        formIsActive ? "invisible" : "visible"
      } hidden sm:flex sm:top-0 z-10 p-2 m-4 shadow-md font-bold text-gray-900 border border-mina hover:border-mina/90 bg-mina hover:bg-mina/90 rounded-md`}
    >
      Submit Meme
    </button>
  );
};

export default SubmitMemeButton;
