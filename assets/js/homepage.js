let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");
let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");
let avatar = document.querySelector(".avatar");
let languageButtonsEl = document.querySelector("#language-buttons");

let formSubmitHandler = function (event) {
  event.preventDefault();

  let username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    nameInputEl.placeholder = "Please enter a Github Username";
    userFormEl.classList.add("apply-shake");
  }
};

let getUserRepos = function (user) {
  let apiUrl = "https://api.github.com/users/" + user + "/repos";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        nameInputEl.placeholder = "Error: GitHub User Not Found!";
        userFormEl.classList.add("apply-shake");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub");
    });
};

let displayRepos = function (repos, searchTerm) {
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  //   dom styling for username
  repoSearchTerm.style =
    "background-color: #1c1b1b; color: #fafafa; border: solid; border-color: #6e5494; border-radius: 10px;";

  let displayAvatar = repos[0].owner.avatar_url;
  //   display user avatar
  avatar.src = displayAvatar;
  //   styling for avatar
  avatar.style =
    "vertical-align: middle; width: 50px; height: 50px; border-radius: 50%";

  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found for this user.";
    return;
  }

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name to display on list
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo = " + repoName);

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

let getFeaturedRepos = function (language) {
  let apiUrl =
    "https://api.github.com/search/repositories?q=" +
    language +
    "is:featured&sort=help-wanted-issues";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert("not found");
    }
  });
};

let buttonClickHanlder = function (event) {
  let language = event.target.getAttribute("data-language");

  if (language) {
    getFeaturedRepos(language);

    repoContainerEl.textContent = "";
  }
};

userFormEl.addEventListener("submit", formSubmitHandler);

languageButtonsEl, addEventListener("click", buttonClickHanlder);
