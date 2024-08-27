"use client";

import { useState } from "react";
import Button from "../../Common/Button";

interface AddLinkProps {
  onChange: (value: string) => void;
}

const AddLink: React.FC<React.PropsWithChildren<AddLinkProps>> = ({
  onChange,
  children,
}) => {
  const [link, setLink] = useState("");

  const handleLinkSubmit = () => {
    if (link) {
      onChange(link);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        className="w-full p-2 border border-neutral-700 rounded bg-zinc-900 text-white"
        placeholder="Enter YouTube video link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <Button type="box" className="mt-5" onClick={handleLinkSubmit}>
        Submit Link
      </Button>
    </div>
  );
};

export default AddLink;
