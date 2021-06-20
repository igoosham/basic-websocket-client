export default function Socket(config) {
  const url = config?.url;

  if (typeof url === "undefined") {
    console.warn("WEBSOCKET :: URL IS REQUERED");
  }

  const message = config?.onmessage;

  const binary = config?.binary;
  const text = config?.text;

  const error = config?.onerror;
  const open = config?.open;
  const close = config?.close;

  console.log({ config });

  this.__ws__ = new WebSocket(url);

  this.__ws__.onmessage = (e) => {
    this.log(e.data);
  };

  this.__ws__.onopen = () => {
    if (typeof open === "function") {
      open();
      return;
    }
    this.log(null, "OPEND");
  };

  this.__ws__.onclose =
    close && typeof close === "function"
      ? close
      : () => {
          this.log(null, "CLOSED");
        };

  this.__ws__.onerror = (e) => {
    error ? error(e) : this.err(e);
  };

  this.send = (msg, shouldLog = true) => {
    const socket = this.__ws__;

    if (socket instanceof WebSocket && socket.readyState === 1) {
      if (shouldLog) this.log(msg, "SENDING :");

      this.__ws__.send(msg);
    }

    if (socket instanceof WebSocket && socket.readyState === 0) {
      if (shouldLog) this.log("NOT READY, QUEUED MESSAGE:", msg);

      socket.addEventListener(
        "open",
        () => {
          this.send(msg);
        },
        { once: true }
      );
    }
  };
}

Socket.prototype.log = (prefix, msg) => {
  if (prefix) {
    console.log("WEBSOCKET ::", prefix, msg);
    return;
  }
  console.log("WEBSOCKET ::", msg);
};

Socket.prototype.err = (e) => {
  console.error("WEBSOCKET ERROR ::", e);
};
