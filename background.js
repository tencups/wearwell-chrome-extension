if (!window.localStorage.getItem("hasSeenIntro")) {
  window.localStorage.setItem("hasSeenIntro", "yep");
  chrome.tabs.create({
    url: "https://wearwell.vercel.app/",
  });
}

// Example POST method implementation from MDN
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(
    tab.id,
    { text: "report_back" },
    foundMaterial.bind(this, tab.URL)
  );
});

function foundMaterial(mat, activeTab) {
  console.log(mat);
  console.log(activeTab);
  postData("https://wearwell.heroku.com/v1/score", {
    url: activeTab,
    Materials: mat,
  }).then((data) => {
    console.log(data);
    chrome.runtime.sendMessage({ message: "got_data", data: data });
  });
}
