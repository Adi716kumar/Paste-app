import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { Save } from "lucide-react";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allpastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allpastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId]);

  function createPastes() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 bg-gray-900 text-white rounded-2xl shadow-md flex flex-col gap-6">
      <input
        className="p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
        type="text"
        placeholder="Enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full resize-none"
        placeholder="Enter content here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={15}
      />

      <button
        onClick={createPastes}
        className="self-end bg-teal-600 hover:bg-teal-500 text-white p-3 rounded-full shadow-md transition"
        title={pasteId ? "Update Paste" : "Create Paste"}
      >
        <Save size={20} />
      </button>
    </div>
  );
};

export default Home;
