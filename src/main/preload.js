const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  writeToFile: {
    writeToFile(message, fileInfo) {
      console.log(`preload.js RECEIVED message: ${message}`);
      console.log(fileInfo);
      ipcRenderer.send('writeToFileChannel', message, fileInfo);
    },
    on(channel, func) {
      const validChannels = ['writeToFileChannel'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
  },
  readFromFile: {
    readFromFile(message, fileInfo) {
      console.log(`preload.js RECEIVED message: ${message}`);
      console.log(fileInfo);
      ipcRenderer.send('readFromFileChannel', message, fileInfo);
    },
    on(channel, func) {
      const validChannels = ['readFromFileChannel'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
  },
});
