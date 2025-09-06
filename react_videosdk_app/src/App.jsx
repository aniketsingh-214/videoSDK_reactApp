import { useState, useMemo } from "react";
import MeetingContainer from "./components/MeetingContainer";
import HLSContainer from "./components/HLSContainer";

function App() {
  const [mode, setMode] = useState("host");
  const isHost = useMemo(() => mode === "host", [mode]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6 p-6">
      <button
        onClick={() => setMode((prev) => (prev === "host" ? "viewer" : "host"))}
        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg text-white transition"
      >
        {isHost ? "Join as Viewer" : "Join as Host"}
      </button>
      {isHost ? <MeetingContainer /> : <HLSContainer />}
    </div>
  );
}

export default App;
