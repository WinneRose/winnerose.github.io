const technologiesElement = document.getElementById("technologies");

const technologies = [
    {
        url: "https://elixir-lang.org/",
        name: "NuxtJS",
        icon: "nuxtjs.svg",
    },
    {
        url: "https://golang.org/",
        name: "Golang",
        icon: "golang.svg",
    },
    {
        url: "https://www.javascript.com/",
        name: "JavaScript",
        icon: "javascript.svg",
    },
    {
        url: "https://en.wikipedia.org/wiki/HTML",
        name: "HTML",
        icon: "html.svg",
    },
    {
        url: "https://www.mongodb.com/",
        name: "MongoDB",
        icon: "mongodb.svg",
    },
    {
        url: "https://git-scm.com/",
        name: "Git",
        icon: "git.svg",
    },
    {
        url: "https://code.visualstudio.com/",
        name: "Visual Studio Code",
        icon: "vscode.svg",
    },
    {
        url: "https://www.figma.com/",
        name: "Figma",
        icon: "figma.svg",
    },
    {
        url: "https://nodejs.org/en/",
        name: "NodeJS",
        icon: "nodejs.svg",
    },
    {
        url: "https://tailwindcss.com/",
        name: "TailwindCSS",
        icon: "tailwindcss.svg",
    },
    {
        url: "https://www.npmjs.com/",
        name: "NPM",
        icon: "npmjs.svg",
    },
];

for (let technology of technologies) {
    const techSpan = document.createElement("span");
    techSpan.className = "technology";

    const logo = document.createElement("img");
    logo.src = `./static/images/technologies/${technology.icon}`;

    const text = document.createElement("a");
    text.href = technology.url;
    text.target = "_blank";
    text.innerText = technology.name;

    techSpan.append(logo, text);
    technologiesElement.appendChild(techSpan);
}
