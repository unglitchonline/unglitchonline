let ws = new WebSocket('wss://unglitchonline-td-629d79503f4a.herokuapp.com:443');

let controlTD = document.querySelector('.controlTD');

ws.addEventListener('open', (event) => {
    console.log('websocket abierto');
});

ws.addEventListener('message', (message) => {
    console.log(message);
});

ws.addEventListener('error', (error) => {
    console.error('websocket cerrado')
});

ws.addEventListener('close', (event) => {
    console.log('websocket cerrado');
});
