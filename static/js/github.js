const repos = document.getElementById("repos");

async function getRepo(user) {
  const result = await fetch(`https://api.github.com/users/${user}/repos`);
  let repos = await result.json();

  repos = filterRepos(repos);
  return repos;
}

function filterRepos(repos) {
  const deleteForks = repos.filter((i) => !i.fork);
  const sortRepo = deleteForks.sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  return sortRepo.slice(0, 12);
}

async function addRepos() {
  for (repo of await getRepo("5elenay")) {
    const repoDiv = document.createElement("div");
    repoDiv.className = "repo";

    const repoTitle = document.createElement("div");
    repoTitle.className = "repo-title";

    const repoUrl = document.createElement("a");
    repoUrl.innerText =
      repo.name.length > 11 ? `${repo.name.substring(0, 8)}...` : repo.name;
    repoUrl.href = repo.html_url;
    repoUrl.target = "_blank";

    const tempDiv = document.createElement("div");

    const starCount = document.createElement("p");
    starCount.innerText = repo.stargazers_count;

    const imgFile = document.createElement("img");
    imgFile.src = "./static/images/star.svg";

    tempDiv.append(starCount, imgFile);
    repoTitle.append(repoUrl, tempDiv);

    const repoDescription = document.createElement("p");
    repoDescription.innerText =
      repo.description.length > 76
        ? `${repo.description.substring(0, 73)}...`
        : repo.description;

    repoDiv.append(repoTitle, repoDescription);
    repos.appendChild(repoDiv);
  }
}

addRepos();
