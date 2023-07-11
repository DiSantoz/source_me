let getUserRepos = function (users) {
  let apiUrl = "https://api.github.com/users/" + users + "/repos";

  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

getUserRepos("disantoz");
