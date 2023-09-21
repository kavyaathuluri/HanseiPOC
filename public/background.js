chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Handle the message here
  
    // Optionally, send a response back to the sender
    sendResponse({ response: 'Message received' });
  });
  