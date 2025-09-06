export const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI1YzM5N2E2Ny0wYWMzLTRhNzYtOTFiNi05NWY4YWM1ODI2YmUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc1NzA5NDQxNywiZXhwIjoxNzU3Njk5MjE3fQ.p999SRaFlSFMlQK_aSl2feIz7vJRg-27sLskPf1Z280";

export const createMeeting = async ({ token = authToken }) => {
  try {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      throw new Error(`Failed to create meeting. Status: ${res.status}`);
    }

    const { roomId } = await res.json();

    if (!roomId) {
      throw new Error("Room ID not returned from API.");
    }

    return roomId;
  } catch (error) {
    console.error("❌ createMeeting error:", error.message);
    throw error;
  }
};

export const fetchHlsDownstreamUrl = async ({ meetingId, token = authToken }) => {
  try {
    const res = await fetch(
      `https://api.videosdk.live/v2/hls/?roomId=${meetingId}`,
      {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch HLS. Status: ${res.status}`);
    }

    const json = await res.json();

    const firstItem = json?.data?.[0];

    if (!firstItem?.downstreamUrl) {
      throw new Error(
        "HLS stream not available yet. Ensure the host has started streaming."
      );
    }

    return firstItem.downstreamUrl;
  } catch (error) {
    console.error("❌ fetchHlsDownstreamUrl error:", error.message);
    throw error;
  }
};
