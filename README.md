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

![echo-sample](/images/echo-sample.png)

What's going on? 

Browserws creates and injects object ws in your window (yes I do know it's bad to pollute the global scope), you've set desire url and tell the socket to send "hello world" text to the server.

So why I see this "the connection is not yet open... bla bla bla"?

Opening connection as you know takes some time, but in this example we chained send request. So browserws just stores the request till connection will open and warns you about it.

After some mills connection opens and we see corresponding warning.

Browserws checks for cashed send requests and send them immediately.

Client's data sent to server starts with client:, severs answers with server:

To make it little bit easier to understand what is going on in console client's text are logged as red, server's as green and browserws's warnings as yellow.
