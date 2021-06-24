# browserWS

This is probably the simpliest websocket client , built on [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) and provides only very basic functionality which could be handy for quick test.

## How to use

Create file filename.html with the following link in it:

``` html
<script src="https://cdn.jsdelivr.net/gh/igoosham/basic-websocket-client/browserws.min.js"></script>
```
run it in browser you use for tests, open devTools and type in console:

``` javascript
ws.url('wss://echo.websocket.org').send("hello world")
```

you should see: 

![echo-sample](/images/echo-sample.png)

In two words what's going on is 

Browserws creates and injects object ws in your window (yes it's bad to pollute the global scope, but we are here for a quick test, ok).
Then you've set server url and tell the socket to send "hello world" text to the server.

Do not worry when u will se that "connection is not open..." Opening connection as you know takes some time, but in this example we chained send request. So browserws just stores the request till connection will open and warns you about it.

After some mills connection opens and we see corresponding warning.

Browserws checks for cashed send requests and send them immediately.

Client's data sent to server starts with client:, severs answers with server:

For easier understanding I decided to highlight text with color as well, so what is going on in console client's text is logged as red, server's as green and browserws's warnings as yellow.

## Documentation

**cash()** - logs array of cashed messages in console.

**chaining(boolean)** - enables/disables chaining.

**close()** - closes socket connection.

**local(number)** - similar to **url()** sets server url and makes connection attempt, but unlike **url()** makes it as ws://localhost:${number}/ 
                    e.g. ws.local(8086) sets server url to ws://localhost:8086/.
                    
**send(any)** - sends data to server. Can be invoked immediately after **url(string)** or **local(number)** as if connection still in opening state data will be cashed and send                 immediately after connection opens.

**url(string)** - sets server url and makes connection attempt.


