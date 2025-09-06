import { useEffect, useRef } from "react";
import { useParticipant, VideoPlayer } from "@videosdk.live/react-sdk";

function ParticipantView({ participantId }) {
  const micRef = useRef(null);
  const { micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participantId);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current.play().catch((err) =>
          console.error("Audio play failed", err)
        );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="bg-gray-800 text-white rounded-xl shadow-md p-4 flex flex-col items-center gap-2">
      <p className="text-sm font-medium">
        {displayName} | 🎥 {webcamOn ? "ON" : "OFF"} | 🎤 {micOn ? "ON" : "OFF"}
      </p>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn && (
        <div className="w-full h-60 bg-black rounded-lg overflow-hidden">
          <VideoPlayer
            participantId={participantId}
            type="video"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default ParticipantView;
