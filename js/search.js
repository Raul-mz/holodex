var animateClass = "animatered";
const data = [
    {
        id: 1,
        name: "<strong>Grass Racoon</strong>",
        content: "<br> <strong>Type:</strong> Earth <br> <strong>Height:</strong> 00 <br> <strong>Weight:</strong>00 <br>History...",
        url: "https://holozing.com/images/creatures/grass_racoon.png",
        color: "animategreen"
    },
    {
        id: 2,
        name: "<strong>Electric Rabit</strong>",
        content: "<br> <strong>Type:</strong> Electric <br> <strong>Height:</strong> 00 <br> <strong>Weight:</strong>00 <br>History...",
        url: "https://holozing.com/images/creatures/electric_rabbit.png",
        color: "animateyellow"
    },
    {
        id: 3,
        name: "<strong>Water Whale</strong>",
        content: "<br> <strong>Type:</strong> Water <br> <strong>Height:</strong> 00 <br> <strong>Weight:</strong>00 <br> History...",
        url: "https://holozing.com/images/creatures/water_whale.png",
        color: "animateblue"
    },
    {
        id: 4,
        name: "<strong>Fire Wolf</strong>",
        content: "<br> <strong>Type:</strong> Fire <br> <strong>Height:</strong> 00 <br> <strong>Weight:</strong>00 <p> <br> History...",
        url: "https://holozing.com/images/creatures/fire_wolf.png",
        color: "animatered"
    },
];

function search(searchTerm) {
    const results = [];

    for (const item of data) {
        if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push(item);
        }
    }

    return results;
}

document.getElementById("search").addEventListener("input", () => {
    const searchTerm = document.getElementById("search").value;

    if (searchTerm.length > 2) {
        const results = search(searchTerm);
        document.getElementById("stats").innerHTML = "";
        document.getElementById("picturebg").classList.remove(`${animateClass}`);
        for (const result of results) {
            const p = document.createElement("p");
            animateClass = `${result.color}`;

            p.innerHTML = `<strong>Name:</strong> ${result.name} ${result.content}`;
            document.getElementById("stats").appendChild(p);
            document.getElementById("picture").style.backgroundImage = `url('${result.url}')`;
            document.getElementById("picturebg").classList.add(`${result.color}`);
        }
    }
});