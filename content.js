/*
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === "report_back") {
    console.log("ran")
    const result = [
      "cotton",
      "polyester",
      "hemp",
      "organic cotton",
      "wool",
      "nylon",
    ].filter((m) => document.documentElement.innerText.indexOf(m) > -1);
    sendResponse(result);
  }
});
*/
