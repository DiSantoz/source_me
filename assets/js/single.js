let issueContainerEl = document.querySelector("#issues-container");
let limitWarningEl = document.querySelector("#limit-warning");

let getRepoIssues = function (repo) {
  let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);

        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      alert("there was an error");
    }
  });
};

let displayIssues = function (issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }

  for (var i = 0; i < issues.length; i++) {
    let issuesEl = document.createElement("a");
    issuesEl.classList =
      "list-item flex-row justify-space-between align-center";
    issuesEl.setAttribute("href", issues[i].html_url);
    issuesEl.setAttribute("target", "_blank");

    let titleEL = document.createElement("span");
    titleEL.textContent = issues[i].title;

    issuesEl.appendChild(titleEL);

    let typeEl = document.createElement("span");

    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }
    issuesEl.appendChild(typeEl);
    issueContainerEl.appendChild(issuesEl);
  }
};

let displayWarning = function (repo) {
  limitWarningEl.textContent = "To see more issues for this repo visit ";
  let linkEl = document.createElement("a");
  linkEl.textContent = "See More Issues on Github.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");
