const GetData = require('./services/data.service.js');

const Websocket = require('ws');

const wss = new Websocket.Server({port:8082});

const data = GetData.GetData();
wss.on("connection", ws=>{
  console.log("Client connected");

  var n = 0;
  function sendinData(){
    if(n == data.length){
      n = 0;
    }
    ws.send(JSON.stringify(data[n]));
    n++;
  }
  

  var t=setInterval(sendinData,17);
})
