const OPCODES = {
    INFO: 0,
    HELLO: 1,
    INIT: 2,
    HEARTBEAT: 3,
};

const elements = {
    username: document.getElementById("username"),
    discriminator: document.getElementById("tag"),
    avatar: document.getElementById("avatar"),
    status: document.getElementById("status"),
    card: document.getElementById("profile"),
    durum: document.getElementById("durum"),
    hangicihaz: document.getElementById("aktiflikyeri"),
};

const lanyard = new WebSocket("wss://api.lanyard.rest/socket");

// On Message
lanyard.onmessage = ({ data }) => {
    const parsedData = JSON.parse(data);

    if (parsedData.op == OPCODES.HELLO) {
        // Identify
        lanyard.send(
            JSON.stringify({
                op: OPCODES.INIT,
                d: {
                    subscribe_to_id: "701896585604497490",
                },
            })
        );

        // Interval
        setInterval(function () {
            lanyard.send(
                JSON.stringify({
                    op: OPCODES.HEARTBEAT,
                })
            );
        }, parsedData.d.heartbeat_interval);
    } else if (parsedData.op == OPCODES.INFO) {
        const statusColors = {
            online: "#2afa62",
            offline: "#747F8D",
            idle: "#eddf47",
            dnd: "#ff3640",
        };

        if (parsedData.t == "INIT_STATE") {
            const user = parsedData.d;
            elements.avatar.src = `https://cdn.discordapp.com/avatars/701896585604497490/${user.discord_user.avatar}.png?size=128`;
            var a = 0
            console.log(user)
            elements.card.style.opacity = "1";
            elements.username.innerText = user.discord_user.username;
            elements.discriminator.innerText = `#${user.discord_user.discriminator}`;
            try {
            if (!user.activities[1]){
            a += 2
            }
            if (!user.activities[0]){
            a += 1
            } if (a == 3){
            elements.durum.innerText ="Discord Status: Anything"
            } else if ( a == 2) {
            elements.durum.innerText ="Discord Status: "+ user.activities[0].state
            } else if (a == 0){
            elements.durum.innerText ="Discord Status: "+ user.activities[0].state+"\n What am I doing: "+user.activities[1].name
            
            }
            if(user.listening_to_spotify== true){
                document.getElementById("spotify-artist").innerText = "\n"+ user.spotify.artist
                document.getElementById("spotify-song").innerText = "\n"+ user.spotify.song
                document.getElementById("spotify-pic").src = user.spotify.album_art_url
                document.getElementById("spotify-pic").style.visibility = "visible";
            }
            
           else if(user.activities[1]){
            document.getElementById("avatar").style.cursor = "pointer"
            }
                
            } catch(error) {
            document.getElementById("playingname").innerText ="No Status Available"
            console.log(error)
            }
            elements.status.style.background =
                statusColors[user.discord_status];
            
            
        } else if (parsedData.t == "PRESENCE_UPDATE") {
            const user = parsedData.d;
            elements.status.style.background =
                statusColors[user.discord_status];
        }
    }
};