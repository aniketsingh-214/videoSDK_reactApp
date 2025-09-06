import React, { useState, useMemo, useRef, useEffect } from "react";
import { MeetingProvider, useMeeting, useParticipant, VideoPlayer } from "@videosdk.live/react-sdk";
import { createMeeting, authToken } from "./Api";

// --- App Component ---
function App() {
  const [meetingId, setMeetingId] = useState(null);

  const getMeeting = async (id) => {
    const idToUse = id || (await createMeeting());
    setMeetingId(idToUse);
  };

  return (
    <div className="p-4">
      {!meetingId ? (
        <div>
          <button className="bg-blue-500 text-white p-2 rounded mr-2" onClick={() => getMeeting(null)}>Create Meeting</button>
          <input className="border p-2 rounded mr-2" placeholder="Meeting ID" onChange={(e) => setMeetingId(e.target.value)} />
          <button className="bg-green-500 text-white p-2 rounded" onClick={() => getMeeting(meetingId)}>Join Meeting</button>
        </div>
      ) : (
        <MeetingProvider config={{ meetingId, micEnabled: true, webcamEnabled: true, name: "Host" }} token={authToken}>
          <MeetingView onMeetingLeave={() => setMeetingId(null)} />
        </MeetingProvider>
      )}
    </div>
  );
}

// --- Meeting View ---
function MeetingView({ onMeetingLeave }) {
  const { join, leave, toggleMic, toggleWebcam, participants } = useMeeting();

  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">Participants Demo</h2>
      <button className="bg-blue-500 text-white p-2 rounded mr-2" onClick={join}>Join Meeting</button>
      <button className="bg-gray-500 text-white p-2 rounded mr-2" onClick={leave}>Leave Meeting</button>
      <button className="bg-yellow-500 text-black p-2 rounded mr-2" onClick={toggleMic}>Toggle Mic</button>
      <button className="bg-orange-500 text-white p-2 rounded" onClick={toggleWebcam}>Toggle Webcam</button>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {[...participants.keys()].map((pId) => (
          <ParticipantView key={pId} participantId={pId} />
        ))}
      </div>
    </div>
  );
}

// --- Participant View ---
function ParticipantView({ participantId }) {
  const { webcamOn, micOn, displayName } = useParticipant(participantId);

  return (
    <div className="border p-2 rounded shadow">
      <p className="font-semibold">{displayName}</p>
      <p>Webcam: {webcamOn ? "ON" : "OFF"} | Mic: {micOn ? "ON" : "OFF"}</p>
      {webcamOn && (
        <VideoPlayer participantId={participantId} type="video" containerStyle={{ width: "250px", height: "180px" }} />
      )}
    </div>
  );
}

export default App;
