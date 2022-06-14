import Image from "next/image";
import React, { useState } from "react";

const url = "https://api.cloudinary.com/v1_1/k-showdown/auto/upload";

const UploadForm = () => {
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
        formData.append("upload_preset", "upload_v1");
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
      return;
    }
    setFiles(e.target.files);
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          id="uploadForm"
          encType="multipart/form-data"
        >
          <input
            className="text-white"
            type="file"
            name="image"
            onChange={handleFileInput}
            multiple
          />
          <input
            className={`${
              !files ? "cursor-not-allowed" : "cursor-pointer hover:bg-once/80"
            } rounded bg-once p-1 font-bold text-white`}
            type="submit"
            value="Upload"
            disabled={!files}
          />
        </form>

        {files &&
          files.length >= 1 &&
          Array.from(files).map((photo, index) => {
            return (
              <Image
                // height={200}
                // width={200}
                key={index.toString()}
                src={URL.createObjectURL(photo)}
                alt=""
              />
            );
          })}
      </div>
    </>
  );
};

export default UploadForm;
