import { Options } from "browser-image-compression";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import AlertSuccess from "./AlertSuccess";

const url = "https://api.cloudinary.com/v1_1/k-showdown/auto/upload";
const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET ?? "development";

const UploadForm: React.FC<{
  refetchPair: Function;
  toggleActive: Function;
}> = ({ refetchPair, toggleActive }) => {
  const [image, setImage] = useState<File | null>();
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileInput = useCallback(
    (file: File[]) => {
      if (file.length === 0) return;

      const imageFile = file[0];
      setImage(imageFile);

      if (previewURL) URL.revokeObjectURL(previewURL);
      setPreviewURL(URL.createObjectURL(imageFile));

      if (imageFile.type === "image/gif") {
        setImage(imageFile);
        return;
      }

      const compressOptions: Options = { maxSizeMB: 3, useWebWorker: true };
      try {
        const compressFile = async () => {
          const imageCompression = await import("browser-image-compression");
          await imageCompression
            .default(file[0], compressOptions)
            .then((compressedFile) => {
              setImage(compressedFile);
            });
        };
        compressFile();
      } catch (error) {
        console.log(error);
      }
    },
    [previewURL]
  );

  const validator = (file: File) => {
    if (file && file.length >= 2) {
      (document.getElementById("filesInput") as HTMLInputElement).value = "";
      return {
        code: "too-many-files",
        message: "You can upload only 1 image at a time",
      };
    }
    if (file && file.size > 9000000) {
      (document.getElementById("filesInput") as HTMLInputElement).value = "";
      alert("File can not be more than 9MB");
      return {
        code: "file-too-large",
        message: "File can not be larger than 9MB",
      };
    }
    return null;
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    maxFiles: 1,
    onDrop: handleFileInput,
    validator,
  });

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
          refetchPair();
        }, 1000);
      }
    } catch (e) {
      console.error(e);
    }
    setImage(null);
    (document.getElementById("uploadForm") as HTMLFormElement).reset();
  };

  return (
    <div
      className="z-10 fixed flex justify-center w-full min-h-screen backdrop-blur"
      onClick={() => toggleActive(false)}
    >
      <div
        {...getRootProps({
          className:
            "text-mina-50 bg-slate-500 absolute rounded shadow-xl w-3/4 md:w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-x-auto p-2",
          onClick: (e: React.MouseEvent<HTMLElement>) => e.stopPropagation(),
        })}
      >
        <form
          className="flex flex-col flex-wrap sm:p-4 p-2 sm:justify-items-end items-center place-content-center"
          onSubmit={handleSubmit}
          id="uploadForm"
          encType="multipart/form-data"
        >
          <input
            {...getInputProps({
              id: "filesInput",
              type: "file",
              name: "image",
            })}
          />
          {isDragActive ? (
            <p className="p-2 cursor-pointer" onClick={open}>
              Drop the file here ...
            </p>
          ) : (
            <p className="p-2 cursor-pointer" onClick={open}>
              Drag &apos;n&apos; drop file here, or{" "}
              <span className="font-bold text-mina-200">click</span> to select
              files
            </p>
          )}
          <button
            className={`${
              !image
                ? "cursor-not-allowed bg-mina/70 text-mina-900"
                : "cursor-pointer hover:bg-mina-400"
            } rounded bg-mina p-1 m-2 font-bold justify-self-center sm:justify-self-end text-mina-900 w-min`}
            type="submit"
            disabled={!image}
          >
            Upload
          </button>
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
          {image && previewURL && (
            <div className="m-1 object-scale-down">
              <Image
                className="h-auto w-48"
                height={0}
                width={0}
                src={previewURL}
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
