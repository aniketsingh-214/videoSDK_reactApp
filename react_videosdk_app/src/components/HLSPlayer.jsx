import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

function HLSPlayer({ url, handleOnLeave }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => setLoading(false));
        hls.on(Hls.Events.ERROR, (_, data) => {
          setError(data?.details || "Playback error");
          setLoading(false);
        });

        return () => hls.destroy();
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = url;
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current.play().catch(() => setError("Autoplay blocked"));
          setLoading(false);
        });
      } else {
        setError("HLS not supported in this browser");
        setLoading(false);
      }
    }
  }, [url]);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={handleOnLeave}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
        >
          Leave Stream
        </button>
        <span className={loading ? "text-yellow-400" : "text-green-400"}>
          {loading ? "Loading stream..." : "Stream active"}
        </span>
      </div>
      <video
        ref={videoRef}
        autoPlay
        controls
        muted
        playsInline
        className="w-full h-96 bg-black rounded-lg"
      />
      {error && <div className="text-red-500 mt-2">Error: {error}</div>}
    </div>
  );
}

export default HLSPlayer;
