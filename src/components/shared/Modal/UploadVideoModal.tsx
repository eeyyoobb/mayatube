"use client";

import { UploadVideoModalContext } from "@/context/UploadVideoModalContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { MdClose, MdUpload, MdLink } from "react-icons/md";
import MediaUpload from "../MediaUpload";
import IconButton from "../../../Common/IconButton";
import Button from "../../../Common/Button";

interface UploadVideoModalProps {
  onUpload: (value: string) => void;
}

const UploadVideoModal: React.FC<UploadVideoModalProps> = ({ onUpload }) => {
  const router = useRouter();
  const uploadVideoModal = useContext(UploadVideoModalContext);

  // State to toggle between uploading a file or adding a link
  const [uploadOption, setUploadOption] = useState<"file" | "link">("file");
  const [videoLink, setVideoLink] = useState("");

  const handleUpload = (value: string) => {
    onUpload(value);
    uploadVideoModal?.onClose();
  };

  const handleAddLink = () => {
    if (videoLink) {
      handleUpload(videoLink);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-start bg-zinc-800 w-5/6 h-5/6 rounded-xl z-50">
      <div className="p-3 border-b border-neutral-700 flex justify-between">
        <h1 className="text-xl">Upload Video</h1>
        <MdClose
          className="h-6 w-6 cursor-pointer"
          onClick={() => {
            uploadVideoModal?.onClose();
            router.back();
          }}
        />
      </div>
      <div className="flex justify-center gap-4 p-4">
        <Button
          type="box"
          onClick={() => setUploadOption("file")}
          active={uploadOption === "file"}
        >
          Upload File
        </Button>
        <Button
          type="box"
          onClick={() => setUploadOption("link")}
          active={uploadOption === "link"}
        >
          Add Link
        </Button>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center h-full">
        {uploadOption === "file" ? (
          <>
            <MediaUpload onChange={handleUpload}>
              <IconButton className="bg-stone-900">
                <MdUpload className="h-20 w-20 m-8 text-neutral-400" />
              </IconButton>
            </MediaUpload>
            <div className="flex flex-col items-center">
              <p>Select files to upload</p>
              <p className="text-neutral-400 text-sm">
                Your videos will be private until you publish them.
              </p>
            </div>
            <MediaUpload onChange={handleUpload}>
              <Button type="box">Select Files</Button>
            </MediaUpload>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 items-center">
              <MdLink className="h-20 w-20 m-8 text-neutral-400" />
              <input
                type="text"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                placeholder="Enter video link"
                className="p-2 bg-stone-900 rounded-lg w-3/4 text-white"
              />
            </div>
            <Button type="box" onClick={handleAddLink}>
              Add Link
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadVideoModal;
