import { useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { createMeeting, authToken } from "../API";
import JoinScreen from "./JoinScreen";
import MeetingView from "./MeetingView";

function MeetingContainer() {
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => setMeetingId(null);

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "Aniket Singh",
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default MeetingContainer;
