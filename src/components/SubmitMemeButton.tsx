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
      } hidden sm:flex sm:top-0 z-10 p-2 m-4 shadow-md text-once border-2 border-once bg-white hover:bg-white/80 rounded-md`}
    >
      Submit Meme
    </button>
  );
};

export default SubmitMemeButton;
