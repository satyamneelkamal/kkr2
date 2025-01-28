// Wrapper for Chrome extension API
const chromeApi = {
  isAvailable: () => {
    return typeof chrome !== 'undefined' && 
           chrome.runtime && 
           chrome.runtime.connect;
  },

  connect: (portName) => {
    if (!chromeApi.isAvailable()) {
      throw new Error('Chrome extension API not available');
    }
    return chrome.runtime.connect({ name: portName });
  },

  // Add any other Chrome API methods you need here
};

export default chromeApi; 