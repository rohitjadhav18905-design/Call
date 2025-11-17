// server.js - minimal WebSocket signaling server for RJ app
const WebSocket = require('ws');
const PORT = process.env.PORT || 8888;
const wss = new WebSocket.Server({ port: PORT });
console.log('RJ Signaling server running on ws://localhost:' + PORT);
const rooms = new Map();
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    let msg;
    try { msg = JSON.parse(message); } catch (e) { return; }
    const { type, room, payload } = msg;
    if (!room) return;
    if (!rooms.has(room)) rooms.set(room, new Set());
    const set = rooms.get(room);
    if (type === 'join') {
      ws.room = room;
      set.add(ws);
      set.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'peer-joined' }));
        }
      });
      return;
    }
    set.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type, payload }));
      }
    });
  });
  ws.on('close', () => {
    const room = ws.room;
    if (room && rooms.has(room)) {
      const set = rooms.get(room);
      set.delete(ws);
      set.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'peer-left' }));
        }
      });
      if (set.size === 0) rooms.delete(room);
    }
  });
});
