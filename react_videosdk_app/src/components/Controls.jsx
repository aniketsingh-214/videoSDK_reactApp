import { useMeeting } from "@videosdk.live/react-sdk";

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={leave}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
      >
        Leave
      </button>
      <button
        onClick={toggleMic}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
      >
        Toggle Mic
      </button>
      <button
        onClick={toggleWebcam}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white"
      >
        Toggle Webcam
      </button>
    </div>
  );
}

export default Controls;
