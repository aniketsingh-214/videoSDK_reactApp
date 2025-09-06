import React, { useState, useMemo } from "react";
import { MeetingProvider, useMeeting, useParticipant, VideoPlayer } from "@videosdk.live/react-sdk";
import { createMeeting, fetchHlsDownstreamUrl, authToken } from "./Api";

function App() {
  const [mode, setMode] = useState("host");
  const isHost = useMemo(() => mode === "host", [mode]);

  return (
    <>
      <button className="p-2 m-2 bg-blue-500 text-white rounded" onClick={() => setMode(s => (s === "host" ? "viewer" : "host"))}>
        {isHost ? "Join as Viewer" : "Join as Host"}
      </button>
      {isHost ? <MeetingContainer /> : <HLSContainer />}
    </>
  );
}

// --- Host Container ---
function MeetingContainer() {
  const [meetingId, setMeetingId] = useState(null);
  const getMeetingAndToken = async (id) => {
    const idToUse = id || (await createMeeting());
    setMeetingId(idToUse);
  };
  const onMeetingLeave = () => setMeetingId(null);

  return meetingId ? (
    <MeetingProvider config={{ meetingId, micEnabled: true, webcamEnabled: true, name: "Host" }} token={authToken}>
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

// --- JoinScreen ---
function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState("");
  return (
    <div className="p-4">
      <input
        className="border p-2 rounded mr-2"
        placeholder="Enter Meeting ID"
        value={meetingId}
        onChange={(e) => setMeetingId(e.target.value)}
      />
      <button className="bg-green-500 text-white p-2 rounded mr-2" onClick={() => getMeetingAndToken(meetingId)}>Join</button>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={() => getMeetingAndToken(null)}>Create Meeting</button>
    </div>
  );
}

// --- Meeting View ---
function MeetingView({ meetingId, onMeetingLeave }) {
  const { join, leave, participants, startHls } = useMeeting({
    onMeetingJoined: () => startHls(),
    onMeetingLeft: () => onMeetingLeave(),
  });

  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">Meeting ID: {meetingId}</h2>
      <button className="bg-red-500 text-white p-2 rounded mb-2" onClick={join}>Join Meeting</button>
      <button className="bg-gray-500 text-white p-2 rounded mb-4 ml-2" onClick={leave}>Leave Meeting</button>

      {[...participants.keys()].map((pId) => (
        <ParticipantView key={pId} participantId={pId} />
      ))}
    </div>
  );
}

// --- Participant View ---
function ParticipantView({ participantId }) {
  const { webcamOn, micOn, displayName } = useParticipant(participantId);
  return (
    <div className="border p-2 m-2 rounded">
      <p>{displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic: {micOn ? "ON" : "OFF"}</p>
      {webcamOn && <VideoPlayer participantId={participantId} type="video" containerStyle={{ width: "300px", height: "200px" }} />}
    </div>
  );
}

// --- Viewer / HLS ---
function HLSContainer() {
  const [url, setUrl] = useState("");
  return url ? <HLSPlayer url={url} onLeave={() => setUrl("")} /> : <HLSJoinScreen onDownstreamUrl={setUrl} />;
}

function HLSJoinScreen({ onDownstreamUrl }) {
  const [meetingId, setMeetingId] = useState("");
  return (
    <div className="p-4">
      <input className="border p-2 rounded mr-2" placeholder="Meeting ID" value={meetingId} onChange={(e) => setMeetingId(e.target.value)} />
      <button className="bg-green-500 text-white p-2 rounded" onClick={async () => { const url = await fetchHlsDownstreamUrl({ meetingId }); onDownstreamUrl(url); }}>Join Stream</button>
    </div>
  );
}

function HLSPlayer({ url, onLeave }) {
  return (
    <div className="p-4">
      <button className="bg-red-500 text-white p-2 rounded mb-2" onClick={onLeave}>Leave Stream</button>
      <video className="w-full h-80 bg-black" src={url} controls autoPlay />
    </div>
  );
}

export default App;
