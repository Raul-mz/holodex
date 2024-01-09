let nowDate = new Date();
let mindate = new Date(nowDate.getTime() + 30 * 60 * 1000);
let timeExpire = mindate.getTime();
let authToken = "";
let isLogged=false;
let playerPerson;
var obstacles = [];
var tokenReward;
let qtyTokenReward = parseFloat(0);
let reward=0.001;

var menu = document.querySelector('.hamburger');

// method
function toggleMenu (event) {
  this.classList.toggle('is-active');
  document.querySelector( ".menuppal" ).classList.toggle("is_active");
  event.preventDefault();
}

// event
menu.addEventListener('click', toggleMenu, false);

function send() {
    userField = document.getElementById("username");
    username = userField.value;
    
    document.querySelector('.hamburger').classList.remove('is-active');
    document.querySelector( '.menuppal' ).classList.remove('is_active');
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
                isLogged=true;
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
    
    $("#game").hide();
    $("#startGame").hide();
    $("#classPanel").hide();

    document.querySelector('.hamburger').classList.remove('is-active');
    document.querySelector( '.menuppal' ).classList.remove('is_active');
    $("#TokenInfoPanel").show();
    $("#successful").hide();
    $("#ClaimPanel").hide();
    $("#WelcomePanel").hide();

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

    

})
$("#rewards").click(function () {
    $(".ButtonPanel").show();
    $("#WelcomePanel").hide();
    $("#TokenInfoPanel").hide();
    $("#successful").hide();
    $("#ClaimPanel").show();
    
    document.querySelector('.hamburger').classList.remove('is-active');
    document.querySelector( '.menuppal' ).classList.remove('is_active');
    $("#game").hide();
    $("#startGame").hide();
    $("#classPanel").hide();
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
    $("#game").hide();
    $("#startGame").hide();
    $("#classPanel").hide();

    document.querySelector('.hamburger').classList.remove('is-active');
    document.querySelector( '.menuppal' ).classList.remove('is_active');
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
    document.querySelector('.hamburger').classList.remove('is-active');
    document.querySelector( '.menuppal' ).classList.remove('is_active');

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


$("#MiniGame").click(function () {
    document.querySelector('.hamburger').classList.remove('is-active');
    document.querySelector( '.menuppal' ).classList.remove('is_active');
   // if(isLogged)
        init();
    
})
function init() {
    
    $("#WelcomePanel").hide();
    $("#TokenInfoPanel").hide();
    $("#successful").hide();
    $("#ClaimPanel").hide();
    $("#game").show();
    $("#startGame").show();
    $("#classPanel").show();
    
    obstacles = [];
    playerPerson = new component(55, 55, "img/water_whale.png", 50, 50, "image");
    playerPerson.gravity = 0.05;
    tokenReward = new component("14px", "Impact", "white", 150, 20, "text");
    
   // $("#game").empty();
    gameArea.load();
}
function startGame() {   
    
    $("#startGame").hide();
    
    gameArea.start();
}
function resetGame(){
    
    gameArea.stop();
    gameArea.clear();
    
    $("#resetGame").hide();
    init();
    startGame();
} 

var gameArea = {
    canvas : document.createElement("canvas"),
    start: function() {  this.interval = setInterval(updateGameArea, 20); },
    load : function() {
        this.canvas.width = 254;
        this.canvas.height = 254;
		this.canvas.id="taptap";
        this.context = this.canvas.getContext("2d");
        $("#game").html(this.canvas);
        this.framePos = 0;
       
		document.getElementById("taptap").addEventListener("mousedown", mouseDown);
        document.getElementById("taptap").addEventListener("mouseup", mouseUp);
        document.getElementById("taptap").addEventListener("touchstart", accelerateDown);
        document.getElementById("taptap").addEventListener("touchend", accelerateUp); 
function mouseDown() {
  accelerate(-0.2);
}

function mouseUp() {
  accelerate(0.05);
}

let isTouching = false;

function accelerateDown() {
    if (!isTouching) {
        accelerate(-0.2);
        isTouching = true;
    }
}

function accelerateUp() {
    isTouching = false;
    accelerate(0.05);
}
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
	this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = gameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
			
        } 
		if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);}
		
		else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = gameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
        if(this.y <= 0)
            this.y =0
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom-20< othertop) || (mytop+20> otherbottom) || (myright-20 < otherleft) || (myleft +20> otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    let multplier=10;
    reward = 0.001;

    for (i = 0; i < obstacles.length; i += 1) {
        if (playerPerson.crashWith(obstacles[i])) {

            $("#resetGame").show();
            return;
        } 
    }

    gameArea.clear();
    gameArea.framePos += 1;
    
    if (gameArea.framePos == 1 || everyinterval(100)) {
        x = gameArea.canvas.width;
        minHeight = 10;
        maxHeight = 150;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
		obstacles.push(new component(30, height, "img/rotatecoral.png", x, 0, "image"));
        obstacles.push(new component(30, x - height - gap, "img/coral.png", x, height + gap,"image"));
    }
    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].x += -2;
        obstacles[i].update();
    }

    qtyTokenReward =Number(multplier*reward*gameArea.framePos).toFixed(3)
    
    tokenReward.text="Score: " + qtyTokenReward;
    tokenReward.update();
    playerPerson.newPos();
    playerPerson.update();
}

function everyinterval(n) {
    if ((gameArea.framePos / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    playerPerson.gravity = n;
}
