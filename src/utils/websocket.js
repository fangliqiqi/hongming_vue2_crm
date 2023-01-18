// socket功能
// import SockJS from 'sockjs-client'
let wsApiUrl = process.env.VUE_APP_WEBSOCKET_API;
var lockReconnect = false;  //避免ws重复连接
var ws = null;          // 判断当前浏览器是否支持WebSocket
let wsUrl = '';

export function connectionSocket(url, cb) {
  console.info(process.env)
  console.info('请求')
  wsUrl = wsApiUrl+'/hmkj-message/hmkjIm' + url;
  createWebSocket(wsUrl,cb);   //连接ws
  return ws

}


function createWebSocket(url,cb) {
  try{
    if('WebSocket' in window){
      ws = new WebSocket(url);
    }
    initEventHandle(cb);
  }catch(e){
    reconnect(url,cb);
    console.log(e);
  }
}

function initEventHandle(cb) {
  ws.onclose = function () {
    reconnect(wsUrl,cb);
    console.log("llws连接关闭!"+new Date().toLocaleString());
  };
  ws.onerror = function () {
    reconnect(wsUrl,cb);
    console.log("llws连接错误!");
  };
  ws.onopen = function () {
    heartCheck.reset().start();      //心跳检测重置
    console.log("llws连接成功!"+new Date().toLocaleString());
  };
  ws.onmessage = function (event) {    //如果获取到消息，心跳检测重置
    heartCheck.reset().start();      //拿到任何消息都说明当前连接是正常的
    // console.log(event);
    if(event.data!='pong'){

      let data = JSON.parse(event.data);
      if(typeof cb == "function"&&data&&data.msgCode!= "500"){
        cb(data)
      }
    }
  };
}
// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function() {
  ws.close();
}

function reconnect(url,cb) {
  if(lockReconnect) return;
  lockReconnect = true;
  setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
    createWebSocket(url,cb);
    lockReconnect = false;
  }, 2000);
}

//心跳检测
var heartCheck = {
  timeout: 18000000,        //1分钟发一次心跳
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function(){
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function(){
    var self = this;
    this.timeoutObj = setTimeout(function(){
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      ws.send("ping");
      console.log("ping!")
      self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
        ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
      }, self.timeout)
    }, this.timeout)
  }
}
