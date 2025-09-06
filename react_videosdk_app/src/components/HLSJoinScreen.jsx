import { useState } from "react";
import { fetchHlsDownstreamUrl } from "../API";

function HLSJoinScreen({ onDownstreamUrl }) {
  const [meetingId, setMeetingId] = useState("");

  const handleJoin = async () => {
    const downstreamUrl = await fetchHlsDownstreamUrl({ meetingId });
    onDownstreamUrl(downstreamUrl);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Join as Viewer</h2>
      <input
        type="text"
        placeholder="Enter Meeting ID"
        value={meetingId}
        onChange={(e) => setMeetingId(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-indigo-500"
      />
      <button
        onClick={handleJoin}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
      >
        Join Stream
      </button>
    </div>
  );
}

export default HLSJoinScreen;
