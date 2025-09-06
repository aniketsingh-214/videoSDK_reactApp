export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI1YzM5N2E2Ny0wYWMzLTRhNzYtOTFiNi05NWY4YWM1ODI2YmUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc1NzA5NDQxNywiZXhwIjoxNzU3Njk5MjE3fQ.p999SRaFlSFMlQK_aSl2feIz7vJRg-27sLskPf1Z280";

export const createMeeting = async () => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: { authorization: authToken, "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const { roomId } = await res.json();
  return roomId;
};
