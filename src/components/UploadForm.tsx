import Image from "next/image";
import React, { useState } from "react";

const url = "https://api.cloudinary.com/v1_1/k-showdown/auto/upload";
const preset = process.env.CLOUDINARY_PRESET ?? "development";

const UploadForm: React.FC<{ toggleActive: Function }> = ({ toggleActive }) => {
  const [files, setFiles] = useState<FileList | null>();

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
    <div
      className="z-10 absolute flex justify-center w-full min-h-screen backdrop-blur"
      onClick={() => toggleActive(false)}
    >
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
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
  );
};

export default UploadForm;
