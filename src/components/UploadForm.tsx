import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const url = "https://api.cloudinary.com/v1_1/k-showdown/auto/upload";
const preset = process.env.CLOUDINARY_PRESET ?? "development";

const UploadForm = () => {
  const [files, setFiles] = useState<FileList | null>();
  const [open, setOpen] = useState<boolean>(false);
  const [isMobileNavActive, setMobileNav] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files) return;
    try {
      uploadImages(files);
    } catch (e) {
      console.error(e);
    }
  };

  const uploadImages = async (files: FileList) => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      try {
        const sig = await fetch("/api/files/sign");
        const signed = await sig.json();

        formData.append("file", files[i]);
        formData.append("upload_preset", preset);
        formData.append("api_key", process.env.CLOUDINARY_API_KEY!);
        formData.append("timestamp", signed.timestamp);
        formData.append("api_key", signed.api_key);

        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (!data.secure_url) return;
        await fetch("/api/files/upload-success", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (e) {
        console.error(e);
      }
    }
    setFiles(null);
    (document.getElementById("uploadForm") as HTMLFormElement).reset();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length >= 3) {
      alert("You can upload only 1 or 2 images");
      (document.getElementById("filesInput") as HTMLInputElement).value = "";
      return;
    }
    setFiles(e.target.files);
  };

  return (
    <>
      <div className="w-full fixed sm:hidden p-4 top-0 text-right bg-inherit">
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileNav((open) => !open)}
        >
          <svg
            className="w-8 h-8 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div
        className={`${
          isMobileNavActive ? "flex" : "hidden"
        } z-50 min-h-full min-w-full backdrop-blur-sm sm:hidden absolute justify-end right-0`}
        onClick={() => setMobileNav((open) => !open)}
      >
        <button className="absolute right-6 top-6 w-4 h-4 text-white">
          <Image
            src="/x_mark_white.svg"
            layout="fill"
            alt="Toggle mobile nav"
          />
        </button>
        <div
          id="mobileNav"
          className={`shadow-slate-300 shadow-md w-1/2 place-items-end bg-slate-500`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="self-end mt-32">
            <div className="flex flex-col items-end space-y-5 w-full text-white">
              <div className="border-slate-400 border-t mb-8 w-full" />
              <button
                className="flex justify-between w-full mr-2"
                onClick={() => {
                  setOpen((open) => !open);
                  setMobileNav(false);
                }}
              >
                <span className="ml-10">Submit Meme</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                  <line x1="12" y1="11" x2="12" y2="17" />
                  <polyline points="9 14 12 11 15 14" />
                </svg>
              </button>
              <div className="flex justify-between relative w-full mr-2">
                <Link href="/results">
                  <a className="ml-10"> Results</a>
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 4v3m-4 -3v6m8 -6v6" />
                  <path d="M12 18.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpen((open) => !open)}
        type="button"
        className={`${
          open ? "invisible" : "visible"
        } hidden sm:block sm:fixed sm:top-0 z-10 p-2 m-4 shadow-md text-once border-2 border-once bg-white hover:bg-white/80 rounded-md`}
      >
        Submit Meme
      </button>

      {open && (
        <div
          onClick={() => setOpen((open) => !open)}
          className="z-10 absolute flex justify-center w-full min-h-screen backdrop-blur"
        >
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
            className="bg-slate-500 absolute rounded shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-x-auto p-2"
          >
            <form
              className="flex flex-wrap sm:p-8 sm:justify-items-end place-content-center"
              onSubmit={handleSubmit}
              id="uploadForm"
              encType="multipart/form-data"
            >
              <input
                className="text-white"
                id="filesInput"
                type="file"
                name="image"
                onChange={handleFileInput}
                multiple
              />
              <input
                className={`${
                  !files
                    ? "cursor-not-allowed bg-once/70 text-white/80"
                    : "cursor-pointer hover:bg-once/80"
                } rounded bg-once/90 p-1 m-4 sm:m-1 font-bold justify-self-center sm:justify-self-end text-white w-min`}
                type="submit"
                value="Upload"
                disabled={!files}
              />
            </form>

            <div className="flex flex-wrap justify-center">
              {files &&
                files.length >= 1 &&
                Array.from(files).map((photo, index) => {
                  return (
                    <div key={index} className="m-1">
                      <Image
                        height={192}
                        width={192}
                        src={URL.createObjectURL(photo)}
                        alt=""
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadForm;
