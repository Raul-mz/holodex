
let nowDate = new Date(); 
let mindate = new Date(nowDate.getTime() + 30*60*1000);
let timeExpire = mindate.getTime();
let authToken = "";
function send() {
    userField = document.getElementById("username");
    username = userField.value;
    window.hive_keychain.requestSignBuffer(
        username,
     `{"username":"${username}","type":"login","app":"Holodex","expiry":${timeExpire}}`,
      "Active",
      function (response) {
        hiveResponse=response;
        if(response.success == true) {
            $("#ClaimPanel").show();
            userField.setAttribute('readonly', true); 
            userField.classList.remove('neon');
            document.getElementById("userprofile").src = `https://images.hive.blog/u/${username}/avatar/small`;
          
                $.get(`https://api.holozing.com/rewards/pending?user=${username}`, function(data, status){
                  $("#staking").html(data.stakeZing)
                  $("#delegation").html(data.delegation)
                  $("#posh").html(data.stakePosh)
                  $("#total").html(Number(parseFloat(data.stakeZing)+parseFloat(data.stakePosh)+parseFloat(data.delegation)).toFixed(3))

                });
                $.post(`https://api.holozing.com/login`,response,function(data, status){
                authToken=data.jwt;
                });
        }
      },
    );
  }

  $("#claim").click(function(){
    if(authToken != "") {
        $.ajax({
            url:`https://api.holozing.com/rewards/pending/`,
            type: 'POST',
            headers: {"Authorization": `Bearer ${authToken}`, 'X-Alt-Referer': 'https://holozing.com/' } ,
            success: function(data)
            {
            $("#ClaimPanel").hide();
            $("#successful").show();
            $("#staking").html(0)
            $("#delegation").html(0)
            $("#posh").html(0)
            $("#total").html(0)
        }       
      });
    }
});
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

$("#rewards").click(function(){
    $(".ButtonPanel").show();
    
    $("#ClaimPanel").show();
})
function reset() {
    $(".ButtonPanel").show();
    $("#statsDescription").hide();
    document.getElementById("picture").style.backgroundImage = `url('')`;
    $("#search").val("");
    $("#ClaimPanel").hide();
    $("#successful").hide();
}

document.getElementById("search").addEventListener("input", () => {
    const searchTerm = document.getElementById("search").value;
    $(".ButtonPanel").hide();
    if (searchTerm.length == 0){
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
