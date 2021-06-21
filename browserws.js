(function (global, func) {
  if (
    (typeof exports === "object" && typeof module !== "undefined") ||
    (typeof define === "function" && define.amd)
  )
    throw new Error("This is websocket client for use in browsers only");
  global.ws = func();
})(this, function () {
  "use strict";
  var _url,
    _socket,
    _cash = [],
    _chaining = true;

  var _errors = {
    wrongUrl:
      "remote server url not set or client failed to connect using given url. Check server settings and internet connection when try ws.url(proper server url) or ws.local(localhost port as number).",
  };

  var _warnings = {
    closedConn:
      "the connection is closed or in the process of closing. The message will be cashed and will be send then the connection will be successfully opened. To clean cash use ws.flush().",
    openingConn:
      "the connection is not yet open. The message is cashed and will be send as soon as connection is open.",
  };

  function _connect() {
    if (!_url) {
      wrongUrlError();
    }

    _socket = new WebSocket(_url);

    _socket.onclose = function () {
      _logWarning("connection closed.");
      _socket.onmessage = null;
      _socket.onopen = null;
      _socket.onerror = null;
      _socket.onclose = null;
      _socket = _url = null;
    };

    _socket.onopen = function () {
      _logWarning("connection open.");
      while (_cash.length) {
        _send(_cash.pop());
      }
    };

    _socket.onmessage = function (e) {
      _logServer(e.data);
    };
  }

  function _send(data) {
    try {
      switch (_socket.readyState) {
        case 0:
          _logWarning(_warnings.openingConn);
          _cash.push(data);
          break;
        case 1:
          _socket.send(data);
          _logClient(data);
          break;
        default:
          _logWarning(_warnings.closedConn);
          _cash.push(data);
      }
    } catch (e) {
      console.error("client:/n", e);
    }
  }

  function _logServer(data) {
    if (typeof data === "string")
      console.log(`server:\n %c${data}`, "color: green;");
    if (typeof data === "object")
      console.log("%cserver:", "color: green;", data);
  }

  function _logClient(data) {
    if (typeof data === "string")
      console.log(`client:\n %c${data}`, "color: red;");
    if (typeof data === "object") console.log("client:\n", data);
  }

  function _logError(text) {
    console.error("ws:", text);
  }

  function _logWarning(text) {
    console.log(`client:\n %c${text}`, "color: #f57f17;");
  }

  var _ws = {
    cash() {
      if (_cash.length > 0) {
        console.table(_cash);
      }
      return _chaining ? this : undefined;
    },

    chaining(bool) {
      _chaining = bool;

      return _chaining ? this : undefined;
    },

    close() {
      _socket.close();

      return _chaining ? this : undefined;
    },

    url(urlString) {
      _url = urlString;

      _connect();

      return _chaining ? this : undefined;
    },

    local(port) {
      _url = `ws://localhost:${port}/`;

      _connect();

      return _chaining ? this : undefined;
    },

    send(data) {
      if (!(_socket instanceof WebSocket)) {
        _logError(_errors.wrongUrl);
        return _chaining ? this : undefined;
      }

      _send(data);

      return _chaining ? this : undefined;
    },
  };

  return _ws;
});
