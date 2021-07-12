async function getRepo(user) {
    const result = await fetch(`https://api.github.com/users/${user}/repos`)
    let repos = await result.json()

    repos = filterRepos(repos)
    return repos
}

function filterRepos(repos) {
    const deleteForks = repos.filter(i => !i.fork)
    const sortRepo = deleteForks.sort((a, b) => a.updated_at.localeCompare(b.updated_at))

    return sortRepo.reverse()
}