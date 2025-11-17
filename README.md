RJ Video Call App (Web + Node Signaling)
=======================================
This bundle contains a web client (Cordova/Capacitor-ready) and a simple Node.js signaling server.
App name: Rj
Features:
- 1:1 WebRTC video call (P2P)
- Generates a shareable link (room ID) for quick connect
- Works on mobile when served over HTTPS or wrapped with Cordova/Capacitor
- Simple Node.js WebSocket signaling server (ws)

Contents:
- www/index.html       -> Client web app (open in mobile browser or wrap in Cordova)
- server.js            -> Minimal signaling server (Node + ws)
- package.json         -> For signaling server
- README.md            -> This file
- start_server.sh      -> Helper to start server (Unix)
- LICENSE              -> MIT

Quick local test (desktop):
1) Start signaling server:
    cd <project_folder>
    npm install
    node server.js
   Server listens on ws://localhost:8888 by default.

2) Serve client:
    npx http-server www -p 8080
   Open two tabs: http://localhost:8080
   Click "Create Link" → copy link → open in other tab/device

Quick mobile test with ngrok:
1) Start server: node server.js
2) ngrok http 8080
   Copy the https URL ngrok gives (e.g. https://abcd1234.ngrok.io)
   Open on phone: https://abcd1234.ngrok.io
   IMPORTANT: Update SIGNALING_URL in the client (or use the input in UI) to wss URL for signaling if using ngrok.

Build as Android APK (Cordova):
- Install Cordova & Android SDK locally and follow Cordova docs.
- Place www/ as the app www folder and build as usual (cordova build android).

Notes:
- For production use TURN server (coturn) and HTTPS/wss.
- This project is provided as-is for testing/demo and learning.
