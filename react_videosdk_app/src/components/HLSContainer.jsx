import { useState, useMemo } from "react";
import HLSPlayer from "./HLSPlayer";
import HLSJoinScreen from "./HLSJoinScreen";

function HLSContainer() {
  const [downstreamUrl, setDownstreamUrl] = useState("");

  const isJoined = useMemo(() => !!downstreamUrl, [downstreamUrl]);

  return isJoined ? (
    <HLSPlayer url={downstreamUrl} handleOnLeave={() => setDownstreamUrl("")} />
  ) : (
    <HLSJoinScreen onDownstreamUrl={(url) => setDownstreamUrl(url)} />
  );
}

export default HLSContainer;
