import { useState } from "react";

function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState("");

  const handleJoin = async () => {
    if (meetingId.trim() === "") {
      alert("Please enter Meeting ID");
      return;
    }
    await getMeetingAndToken(meetingId);
  };

  const handleCreate = async () => {
    await getMeetingAndToken(null); 
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Join or Create a Meeting</h2>
      <input
        type="text"
        placeholder="Enter Meeting ID"
        value={meetingId}
        onChange={(e) => setMeetingId(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-indigo-500"
      />
      <div className="flex gap-3 w-full">
        <button
          onClick={handleJoin}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
        >
          Join
        </button>
        <button
          onClick={handleCreate}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
        >
          Create Meeting
        </button>
      </div>
    </div>
  );
}

export default JoinScreen;
