# VideoSDK Live Meeting & HLS Streaming App

## Overview
This is a **React-based video conferencing application** using [VideoSDK Live](https://www.videosdk.live/) that supports:
- Hosting a live meeting with webcam & microphone
- Joining meetings as a viewer via HLS streaming
- Interactive participant controls: toggle mic, toggle webcam, leave meeting
- Real-time video and audio of multiple participants

The project demonstrates how to integrate VideoSDK into a React app for both **host** and **viewer** workflows.

---

## Features

### Host Mode
- Create a new meeting or join an existing one
- Start HLS streaming automatically
- View participants with webcam & audio
- Toggle mic and webcam for yourself
- Leave meeting at any time

### Viewer Mode
- Join an existing meeting using HLS streaming URL
- Auto-play live stream
- Display stream status (loading/active/error)
- Leave stream anytime

### Participant View
- Display each participant's webcam and mic status
- Handles multiple participants dynamically
- Local participant audio muted automatically

---

## Screenshots
*(Add your screenshots here for better clarity)*
- Host Dashboard
- Viewer HLS Player
- Participant Controls

---

## Getting Started

### Prerequisites
- Node.js >= 18
- NPM >= 9
- Valid VideoSDK Live auth token

### Installation
1. Clone the repository:
```bash
git clone <YOUR_REPO_URL>
````

2. Navigate into the project:

```bash
cd your-project-folder
```

3. Install dependencies:

```bash
npm install
```

4. Replace the `authToken` in `api.js` with your VideoSDK Live token.

### Running the App

```bash
npm start
```

* Open browser → `http://localhost:5173`
* Toggle between **Host** and **Viewer** mode
* Follow on-screen instructions to join or create a meeting

---

## Project Structure

```
src/
 ├── App.js               # Main component handling host/viewer toggle
 ├── api.js               # API functions for createMeeting & HLS URL
 ├── HLSContainer.js      # Viewer-side HLS streaming
 ├── MeetingContainer.js  # Host-side meeting with MeetingProvider
 ├── MeetingView.js       # Host view with join/start controls
 ├── ParticipantView.js   # Individual participant webcam & mic
 └── Controls.js          # Mic/webcam toggle & leave buttons
```

---

## How it Works

1. **Host**:

   * Click **Create Meeting** → calls `createMeeting()` in `api.js` → generates `roomId`
   * `MeetingProvider` wraps the host meeting
   * Start meeting → participants join → HLS streaming starts automatically
2. **Viewer**:

   * Enter `meetingId` → `fetchHlsDownstreamUrl()` → fetches HLS URL
   * HLSPlayer plays live stream using `Hls.js`
3. **Participants**:

   * Each participant displays webcam & mic status
   * Toggle mic/webcam with `toggleMic()` and `toggleWebcam()` functions

---

## Dependencies

* [React](https://reactjs.org/)
* [VideoSDK Live React SDK](https://www.npmjs.com/package/@videosdk.live/react-sdk)
* [Hls.js](https://www.npmjs.com/package/hls.js)
* Tailwind CSS (for styling)

---

## Future Enhancements

* Add chat feature for participants
* Record meetings and save HLS stream
* Support multiple viewers with dynamic UI layout
* Integrate authentication for users

---

## License

This project is licensed under MIT License. See `LICENSE` for details.

---

## Author

**Aniket Singh**

* GitHub: [https://github.com/aniketsingh-214](https://github.com/aniketsingh-214)
* Email:  [aniketsingh7141340@gmail.com](aniketsingh7141340@gmail.com)


