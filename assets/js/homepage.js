let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");

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

let getUserRepos = function (users) {
  let apiUrl = "https://api.github.com/users/" + users + "/repos";

  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

userFormEl.addEventListener("submit", formSubmitHandler);
