
let nowDate = new Date();
let mindate = new Date(nowDate.getTime() + 30 * 60 * 1000);
let timeExpire = mindate.getTime();
let authToken = "";


function send() {
    userField = document.getElementById("username");
    username = userField.value;
    
    $("#ClaimPanel").show();
    $("#WelcomePanel").hide();

    window.hive_keychain.requestSignBuffer(
        username,
        `{\"username\":\"${username}\",\"type\":\"login\",\"app\":\"Holodex\",\"expiry\":${timeExpire}}`,
        "Active",
        function (response) {
            hiveResponse = response;
            if (response.success == true) {
                userField.setAttribute('readonly', true);
                userField.classList.remove('neon');
                document.getElementById("userprofile").src = `https://images.hive.blog/u/${username}/avatar/small`;

                $.get(`https://api.holozing.com/rewards/pending?user=${username}`, function (data, status) {
                    $("#staking").text(data.stakeZing);
                    $("#delegation").text(data.delegation);
                    $("#posh").text(data.stakePosh);
                    $("#total").html(Number(parseFloat(data.stakeZing) + parseFloat(data.stakePosh) + parseFloat(data.delegation)).toFixed(3))

                });
                $.ajax({
                    type: 'POST',
                    url: 'https://api.holozing.com/login',
                    data: JSON.stringify (hiveResponse),
                    contentType: "application/json",
                    dataType: 'json',
                    success: function (data) {
                        authToken = data.jwt;
                    }
                });
            }
        },
    );
}

$("#claim").click(function () {
    if (authToken != "") {
        $.ajax({
            url: `https://api.holozing.com/rewards/pending/`,
            type: 'POST',
            headers: { "Authorization": `Bearer ${authToken}`, 'X-Alt-Referer': 'https://holozing.com/' },
            success: function (data) {
                $("#ClaimPanel").hide();
                $("#WelcomePanel").hide();
                $("#successful").show();
                $("#staking").html(0)
                $("#delegation").html(0)
                $("#posh").html(0)
                $("#total").html(0)
            }
        });
    }
});
var animateClass = "picturebgbs";
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
$("#tokenInfo").click(function () {
    let hivePrice = 0;
    $.get('https://api.coingecko.com/api/v3/simple/price?ids=hive&vs_currencies=usd', function (data, status) {
        hivePrice=data.hive.usd;   
});
    $.ajax({
        url: `https://api.primersion.com/contracts`,
        type: 'POST',
        data: '{"id":0,"jsonrpc":"2.0","method":"find","params":{"contract":"market","table":"metrics","query":{"symbol":{"$in":["ZING","POSH"]}},"limit":2,"offset":0}}',
        headers: { "Content-Type":'application/json'},
        success: function (data) {
            console.log(data.result[1])
            $("#marketPrice").text(Number(parseFloat(hivePrice) * parseFloat(data.result[1].highestBid)).toFixed(5));
        }
    });
    $.get('https://api.holozing.com/stats', function (data, status) {
        $("#calculatedCirculationBalance").text(Number(data.circulation.calculatedCirculationBalance).toFixed(1));
        $("#totalZingStaked").text(Number(data.rewardTokenTotals.totalZingStaked).toFixed(1));
    });

    

    $("#TokenInfoPanel").show();
    $("#successful").hide();
    $("#ClaimPanel").hide();
    $("#WelcomePanel").hide();
})
$("#rewards").click(function () {
    $(".ButtonPanel").show();
    $("#WelcomePanel").hide();
    $("#TokenInfoPanel").hide();
    $("#successful").hide();
    $("#ClaimPanel").show();
})
$("#logout").click(function () {
    reset();
    $("#search").val("");
    userField = document.getElementById("username");
    userField.value = '';
    username = userField.value
    userField.setAttribute('readonly', true);
    userField.classList.add('neon');
    document.getElementById("userprofile").src = 'https://files.peakd.com/file/peakd-hive/raulmz/23wqiMStAS9AfQAb825mL7WsTGsNke1GYKuKfgm6fYH7Cnmkg4qFC91p9rtRVX4k34kEn.png';
})
function reset() {
    $(".ButtonPanel").show();
    $("#statsDescription").hide();
    document.getElementById("picture").style.backgroundImage = `url('')`;
    $("#ClaimPanel").hide();
    $("#successful").hide();
    $("#WelcomePanel").show();
    
    document.getElementById("picturebg").classList.remove(`${animateClass}`);
    animateClass="picturebgbs";
    document.getElementById("picturebg").classList.add(`picturebgbs`);
    
    $("#TokenInfoPanel").hide();
}

document.getElementById("search").addEventListener("input", () => {
    const searchTerm = document.getElementById("search").value;
    reset();
    $("#WelcomePanel").hide();
    $(".ButtonPanel").hide();
    
    if (searchTerm.length == 0) {
        reset();
    }

    if (searchTerm.length > 2) {
        const results = search(searchTerm);
        document.getElementById("statsDescription").innerHTML = "";
        $("#statsDescription").show();

        document.getElementById("picturebg").classList.remove(`${animateClass}`);
        for (const result of results) {
            const p = document.createElement("p");
            animateClass = `${result.color}`;

            p.innerHTML = `<strong>Name:</strong> ${result.name} ${result.content}`;
            document.getElementById("statsDescription").appendChild(p);
            document.getElementById("picture").style.backgroundImage = `url('${result.url}')`;
            document.getElementById("picturebg").classList.add(`${result.color}`);
        }
    }
});
