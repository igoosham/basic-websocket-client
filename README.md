# basic-websocket-client

This is probably the simpliest websocket client , built on [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) and provides only very basic functionality which could be handy for quick test.

## How to use

Create file filename.html with only text in it:

``` html
<script src="https://cdn.jsdelivr.net/gh/igoosham/basic-websocket-client/browserws.js"></script>
```

open devTools and type in console:

``` javascript
ws.url('wss://echo.websocket.org').send("hello world")
```

you will see: 



