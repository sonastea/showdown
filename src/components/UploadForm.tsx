import imageCompression, { Options } from "browser-image-compression";
import Image from "next/image";
import React, { useState } from "react";
import AlertSuccess from "./AlertSuccess";

const url = "https://api.cloudinary.com/v1_1/k-showdown/auto/upload";
const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET ?? "development";

const UploadForm: React.FC<{ toggleActive: Function }> = ({ toggleActive }) => {
  const [image, setImage] = useState<File | null>();
  const [success, setSuccess] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;
    try {
      uploadImages(image);
    } catch (e) {
      console.error(e);
    }
  };

  const uploadImages = async (file: File) => {
    const formData = new FormData();

    try {
      setSuccess(false);
      setIsUploading(true);
      const sig = await fetch("/api/files/sign");
      if (sig.status === 429) {
        alert("You have reached the limit of uploads");
        return;
      }
      const signed = await sig.json();

      formData.append("file", file);
      formData.append("upload_preset", preset);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append("timestamp", signed.timestamp);
      formData.append("signature", signed.signature);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!data.secure_url) return;
      const upload = await fetch("/api/files/upload-success", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (upload.ok) {
        setTimeout(() => {
          setSuccess(true);
          setIsUploading(false);
        }, 1000);
      }
    } catch (e) {
      console.error(e);
    }
    setImage(null);
    (document.getElementById("uploadForm") as HTMLFormElement).reset();
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length >= 2) {
      alert("You can upload only 1 image at a time");
      (document.getElementById("filesInput") as HTMLInputElement).value = "";
      return;
    }
    if (!e.target.files) return;

    const imageFile = e.target.files[0];
    const compressOptions: Options = { maxSizeMB: 3, useWebWorker: true };

    try {
      const compressedFile = await imageCompression(imageFile, compressOptions);
      setImage(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="z-10 absolute flex justify-center w-full min-h-screen backdrop-blur"
      onClick={() => toggleActive(false)}
    >
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className="bg-slate-500 absolute rounded shadow-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-x-auto p-2"
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
              !image
                ? "cursor-not-allowed bg-mina/70 text-mina-900"
                : "cursor-pointer hover:bg-mina-400"
            } rounded bg-mina p-1 m-4 sm:m-1 font-bold justify-self-center sm:justify-self-end text-mina-900 w-min`}
            type="submit"
            value="Upload"
            disabled={!image}
          />
        </form>
        {isUploading && (
          <div className="grid">
            <Image
              className="justify-self-center"
              src="/spinner-1s-200px.svg"
              alt="spinner loader"
              height={36}
              width={36}
            />
          </div>
        )}
        <AlertSuccess onSuccess={success} toggleActive={setSuccess} />

        <div className="flex flex-wrap justify-center">
          {image && (
            <div className="m-1 object-scale-down">
              <Image
                className="h-auto w-48"
                height={0}
                width={0}
                src={URL.createObjectURL(image)}
                alt={image.name}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
