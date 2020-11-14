import { io } from "@socketio";

io.on("connect", (data) => {
  console.log("connected");
});
