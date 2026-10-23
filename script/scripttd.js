let ws = new WebSocket(
  "wss://unglitchonline-td-629d79503f4a.herokuapp.com:443"
);
let controlByTD = document.querySelector(".controlByTD");

let controlTD = document.querySelector(".controlTD");
// controlTD.value = 90
// console.log(controlTD.value);

controlTD.addEventListener("input", (event) => {
  console.log(controlTD.value)
  ws.send(JSON.stringify({"slider1": controlTD.value / 100}))
});

ws.addEventListener("open", (event) => {
  console.log("websocket abierto");
});

ws.addEventListener("message", (message) => {
  if(message.data == "ping") {
    ws.send("pong");
    return
  }
let data = JSON.parse(message.data);
if("slider1" in data) {
  let val = data["slider1"];
  controlByTD.value = val*100;
}
  console.log(data);
});

ws.addEventListener("error", (error) => {
  console.error("websocket closed");
});

ws.addEventListener("close", (event) => {
  console.log("websocket closed");
});
