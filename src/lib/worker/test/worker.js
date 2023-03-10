'use strict';

const { parentPort } = require('worker_threads');

parentPort.on('message', handleMessage);

function handleMessage (message) {
  setTimeout(() => {
    message.port.postMessage('hello world');
    message.port.close();
  }, 50);
}
