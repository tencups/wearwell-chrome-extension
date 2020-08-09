// When the browser-action button is clicked...
console.log("hello");

chrome.tabs.getSelected(null, function (tab) {
  console.log(tab);

  chrome.tabs.executeScript(
    null,
    {
      code:
        "var result = ['cotton','polyester','hemp','organic cotton','wool','nylon',].filter((m) => document.documentElement.innerText.indexOf(m) > -1); result",
    },
    function (results) {
      foundMaterial(results, tab.url, tab.title);
    }
  );
});

// Example POST method implementation from MDN
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function getEmoji(score) {
  if (score < 82.5) {
    return "Unsustainable 😔";
  } else if (score < 165 && score > 82.5) {
    return "Neutral 😕";
  } else {
    return "Sustainable 🤩";
  }
}

function foundMaterial(mat, activeTab, title) {
  console.log(mat);
  console.log(activeTab);
  postData("https://wearwell.herokuapp.com/v1/score", {
    url: activeTab,
    materials: mat,
    header: title,
  }).then((data) => {
    console.log(data);
    if ("brand" in data) {
      document.getElementsByClassName("title")[0].innerHTML = data.brand;
      document.getElementsByClassName("score")[0].innerHTML = data.brandScore;
      document.getElementsByClassName("label")[0].innerHTML = getEmoji(
        data.brandScore
      );
    } else {
      document.getElementsByClassName("title")[0].innerHTML = "Unknown";
      document.getElementsByClassName("score")[0].innerHTML = "...";
      document.getElementsByClassName("label")[0].innerHTML = "";
    }
    for (var i = 0; i < data.material.length; i++) {
      if ("sIndex" in data.material[i]) {
        var elem = document.createElement("h3");
        elem.setAttribute("class", "material");
        elem.innerHTML =
          data.material[i].material + ": " + data.material[i].sIndex;
        document.getElementsByClassName("materials")[0].appendChild(elem);
      }
    }
  });
}
