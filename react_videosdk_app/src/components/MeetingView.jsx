import { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantView from "./ParticipantView";
import Controls from "./Controls";

function MeetingView({ meetingId, onMeetingLeave }) {
  const [joined, setJoined] = useState(null);

  const { join, participants, startHls } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
      startHls();
    },
    onMeetingLeft: onMeetingLeave,
    onHlsStarted: (url) => console.log("HLS started:", url),
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Meeting ID: {meetingId}</h3>
      {joined === "JOINED" ? (
        <div>
          <Controls />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {[...participants.keys()].map((id) => (
              <ParticipantView key={id} participantId={id} />
            ))}
          </div>
        </div>
      ) : joined === "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button
          onClick={joinMeeting}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg text-white"
        >
          Join Meeting
        </button>
      )}
    </div>
  );
}

export default MeetingView;
