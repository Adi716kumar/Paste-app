import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Clipboard, Share2 } from "lucide-react";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="text-center mt-20 text-red-500 text-lg">
        Paste not found!
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    toast.success("Content copied");
  };

  const handleShare = () => {
    const url = `${window.location.origin}/pastes/${paste._id}`;
    navigator.clipboard.writeText(url);
    toast.success("Shareable URL copied");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gray-900 p-6 rounded-2xl shadow text-white space-y-4">
      <h1 className="text-2xl font-bold">{paste.title}</h1>

      <textarea
        className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl resize-none text-sm"
        value={paste.content}
        disabled
        rows={16}
      />

      <div className="flex gap-4 justify-end text-gray-300">
        <button
          onClick={handleCopy}
          className="hover:text-teal-400"
          title="Copy content"
        >
          <Clipboard size={20} />
        </button>

        <button
          onClick={handleShare}
          className="hover:text-teal-400"
          title="Share paste"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default ViewPaste;
