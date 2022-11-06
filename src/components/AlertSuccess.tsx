const AlertSuccess = ({
  onSuccess,
  toggleActive,
}: {
  onSuccess: boolean;
  toggleActive: Function;
}) => {
  if (!onSuccess) return null;
  return (
    <div className="flex p-4 mb-4 rounded-lg bg-white" role="alert">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 h-5 w-5 text-once"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <div className="ml-3 text-sm font-medium text-once">
        Successfully uploaded
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg text-once focus:ring-2 focus:ring-once p-1.5 hover:bg-slate-200 inline-flex h-8 w-8"
        aria-label="Close"
        onClick={() => toggleActive(false)}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default AlertSuccess;
