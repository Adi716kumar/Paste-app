import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import {
  Trash2,
  Eye,
  Clipboard,
  Share2,
  PencilLine,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleCopy(content) {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  }

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <div className="flex items-center gap-3 mb-6">
        <Search size={20} />
        <input
          className="p-2 rounded-xl bg-gray-800 border border-gray-600 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
          type="search"
          placeholder="Search pastes by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-6">
        {filteredData.map((paste) => (
          <div
            key={paste._id}
            className="bg-gray-900 p-4 rounded-xl shadow flex flex-col gap-2"
          >
            <div className="text-lg font-semibold">{paste.title}</div>
            <div className="text-sm text-gray-300 whitespace-pre-wrap">
              {paste.content.length > 300
                ? paste.content.slice(0, 300) + "..."
                : paste.content}
            </div>

            <div className="flex items-center gap-4 mt-2 text-gray-400">
              <Link
                to={`/?pasteId=${paste._id}`}
                title="Edit"
                className="hover:text-teal-400"
              >
                <PencilLine size={18} />
              </Link>
              <Link
                to={`/pastes/${paste._id}`}
                title="View"
                className="hover:text-teal-400"
              >
                <Eye size={18} />
              </Link>
              <button
                onClick={() => handleCopy(paste.content)}
                title="Copy"
                className="hover:text-teal-400"
              >
                <Clipboard size={18} />
              </button>
              <button
                onClick={() => handleDelete(paste._id)}
                title="Delete"
                className="hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
              <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/pastes/${paste._id}`
                      );
                      toast.success("Share link copied!");
                    }}
                    title="Share"
                    className="hover:text-teal-400"
                  >
                    <Share2 size={18} />
                  </button>

              <span className="ml-auto text-xs">
                {dayjs(paste.createdAt).format("MMM D, YYYY [at] h:mm A")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paste;
