const OPCODES = {
    INFO: 0,
    HELLO: 1,
    INIT: 2,
    HEARTBEAT: 3,
};

const elements = {
    container: document.getElementsByClassName("container")[0],
    username: document.getElementById("discord-username"),
    discriminator: document.getElementById("discord-disc"),
    avatar: document.getElementById("discord-avatar"),
    card: document.getElementById("profile-card"),
};

const projects = [
    {
        name: "Floppa P.L.",
        description:
            "A programming language that created for fun. Works like brainf. But has more commands.",
        link: "https://github.com/5elenay/floppa-programming-language",
    },
    {
        name: "Htmotor",
        description:
            "HTML Template engine for python. Supports XSS preventation and many more!",
        link: "https://github.com/5elenay/htmotor",
    },
    {
        name: "Hyaline",
        description:
            "Hyaline is a discord api wrapper for python. Uses latest (v9) gateway version and supports cache system.",
        link: "https://github.com/5elenay/hyaline",
    },
    {
        name: "Datagoose",
        description:
            "Fastest JSON database for python. Supports encryption and has tons of functions.",
        link: "https://github.com/5elenay/datagoose",
    },
    {
        name: "Pewn",
        description: "Another Python library for downloading files from URL.",
        link: "https://github.com/5elenay/pewn",
    },
    {
        name: "Hawser",
        description: "Hawser is a Lanyard API Wrapper for Python. Supports both REST and WebSocket methods.",
        link: "https://github.com/5elenay/hawser",
    },
    {
        name: "Scupt",
        description: "An uptime service for websites. (Dead Project.)",
        link: "https://scupt.ga/",
    },
    {
        name: "Acebin",
        description: "A bin that supports over 40+ language.",
        link: "https://acebin.ga/",
    }
];

const using = [
    {
        "background-color": "#3F7CAD",
        color: "#FFDF5A",
        name: "Python",
    },
    {
        "background-color": "#FCDC00",
        color: "#000",
        name: "JavaScript",
    },
    {
        "background-color": "#967AB4",
        color: "#fff",
        name: "Elixir",
    },
    {
        "background-color": "#7FD5EA",
        color: "#fff",
        name: "Golang",
    },
    {
        "background-color": "#F1662A",
        color: "#fff",
        name: "HTML",
    },
    {
        "background-color": "#33A9DC",
        color: "#fff",
        name: "CSS",
    },
    {
        "background-color": "#CF649A",
        color: "#fff",
        name: "SCSS",
    },
    {
        "background-color": "#3EAF7C",
        color: "#30435A",
        name: "VueJS",
    },
    {
        "background-color": "#026E00",
        color: "#FFF",
        name: "NodeJS",
    },
    {
        "background-color": "#FFF",
        color: "#13AA52",
        name: "MongoDB",
    },
];

const lanyard = new WebSocket("wss://api.lanyard.rest/socket");

// On Message
lanyard.onmessage = function (packet) {
    const parsedData = JSON.parse(packet.data);

    if (parsedData.op == OPCODES.HELLO) {
        // Identify
        lanyard.send(
            JSON.stringify({
                op: OPCODES.INIT,
                d: {
                    subscribe_to_ids: ["793467584820281346"],
                },
            })
        );

        // Interval
        setInterval(function () {
            lanyard.send(
                JSON.stringify({
                    op: OPCODES.HEARTBEAT,
                    d: null,
                })
            );
        }, parsedData.d.heartbeat_interval);
    } else if (parsedData.op == OPCODES.INFO) {
        const statusColors = {
            online: "#2afa62",
            offline: "#ddd",
            idle: "#eddf47",
            dnd: "#ff3640",
        };

        if (parsedData.t == "INIT_STATE") {
            const user = parsedData.d["793467584820281346"];

            elements.card.style.opacity = "1";
            elements.username.innerText = user.discord_user.username;
            elements.discriminator.innerText = `#${user.discord_user.discriminator}`;

            elements.avatar.src = `https://cdn.discordapp.com/avatars/793467584820281346/${user.discord_user.avatar}.png?size=128`;
            elements.avatar.style.border = `3px solid ${
                statusColors[user.discord_status]
            }`;

            if (
                !elements.status &&
                user.activities.filter((i) => i.type == 4).length > 0
            ) {
                elements.status = document.createElement("p");
                elements.status.innerText = `"${
                    user.activities.filter((i) => i.type == 4)[0].state
                }"`;
                document.getElementById("profile-card").append(elements.status);
            }
        } else if (parsedData.t == "PRESENCE_UPDATE") {
            const filteredActivity = parsedData.d.activities.filter(
                (i) => i.type == 4
            );

            if (elements.status && parsedData.d.activities.length == 0) {
                elements.status.remove();
                elements.status = undefined;
            } else if (!elements.status && filteredActivity.length > 0) {
                elements.status = document.createElement("p");
                elements.status.innerText = `"${filteredActivity[0].state}"`;
                document.getElementById("profile-card").append(elements.status);
            } else if (elements.status && filteredActivity.length > 0) {
                elements.status.innerText = `"${filteredActivity[0].state}"`;
            }

            elements.avatar.style.border = `3px solid ${
                statusColors[parsedData.d.discord_status]
            }`;
        }
    }
};

// Clipboard
elements.username.onclick = function (e) {
    copyText(`${e.target.innerText}${elements.discriminator.innerText}`);
};

// Copy Text
function copyText(text) {
    const el = document.createElement("input");
    el.style.position = "absolute";
    el.style.left = "-1000px";
    el.value = text;
    el.setAttribute("readonly", "");

    document.body.appendChild(el);
    el.select();

    document.execCommand("copy");
    document.body.removeChild(el);
}

// List Projects
for (const project of projects) {
    const projectList = document.getElementById("project-list");

    const newCard = document.createElement("div");
    newCard.className = "project-card";
    newCard.style.cursor = "pointer";

    newCard.onclick = function () {
        window.location.href = project.link;
    };

    const title = document.createElement("h1");
    title.innerText = project.name;
    newCard.append(title);

    const description = document.createElement("p");
    description.innerText = project.description;
    newCard.append(description);

    projectList.append(newCard);
}

// List Tools and Languages
for (const u of using) {
    const usingList = document.getElementById("using-list");

    const newCard = document.createElement("a");
    newCard.style.backgroundColor = u["background-color"];
    newCard.style.color = u.color;
    newCard.innerText = u.name;

    usingList.append(newCard);
}
