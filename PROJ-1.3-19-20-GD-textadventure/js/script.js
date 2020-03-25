const divLocation = document.getElementById('location');
const myPossibilities = document.getElementById('possibilities');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');
const imageLocation = document.getElementById('imageLocation');
const myDescription = document.getElementById('description');
const myInventory = document.getElementById('inventory');
const treasure = document.getElementById('treasure');


let currentLocation = 0;

let locations = [];
locations[0] = "Kantine";
locations[1] = "Trap";
locations[2] = "Eind";
locations[3] = "Docentenkamer";
locations[4] = "Gang";
locations[5] = "Medialab";
locations[6] = "Toiletten";
locations[7] = "Klaslokaal";
locations[8] = "Examenlokaal";

images = [];
images[0] = "room0.jpg";
images[1] = "room1.jpg";
images[2] = "room2.jpg";
images[3] = "room3.jpg";
images[4] = "room4.jpg";
images[5] = "room5.jpg";
images[6] = "room6.jpg";
images[7] = "room7.jpg";
images[8] = "room8.jpg";

directions = [];
directions[0] = ["oost"];
directions[1] = ["west", "zuid"];
directions[2] = ["zuid"];
directions[3] = ["oost"];
directions[4] = ["noord", "west", "zuid"];
directions[5] = ["zuid"];
directions[6] = ["oost"];
directions[7] = ["noord", "west", "oost"];
directions[8] = ["noord", "west"];

descriptions = [];
descriptions[0] = "u staat in een kantine. Hier zitten studenten te eten of computerspelletjes te doen";
descriptions[1] = "u staat op een trap naar de eerste etage. Om u heen lopen studenten omhoog en omlaag";
descriptions[2] = "u heeft gewonnen";
descriptions[3] = "u staat in de lerarenkamer. De leraren eten hier hun lunch of drinken koffie of thee";
descriptions[4] = "u staat in een gang. Studenten en leraren lopen richting de klaslokalen";
descriptions[5] = "u staat in het medialab. Hier kan geexperimenteerd worden met bijvoorbeeld virtual reality brillen";
descriptions[6] = "u staat bij de toiletten";
descriptions[7] = "u staat in een klaslokaal. De tafels staan recht achter elkaar en voorin is een projector en een smartboard";
descriptions[8] = "u staat in het examenlokaal. Hier zijn de vierdejaars studenten bezig met het voorbereiden van hun examen";

treasures = []
treasures[0] = "Dit is een mooie auto";
treasures[1] = "U heeft een wapen gevonden";
treasures[2] = "Froggy chair is de beste item!";
treasures[3] = "Een mooie meme!";

treasureImages = []
treasureImages[0] = "treasure.png";
treasureImages[1] = "treasure1.png";
treasureImages[2] = "treasure2.png";
treasureImages[3] = "treasure3.png";

inventoryTreasures = [];


myInput.addEventListener('keydown', getInput, false);


function getInput(evt) {
  if (evt.key == "Enter") {
    let inputArray = myInput.value.split(" ");

    if (inputArray[0] == "Ga" || "ga") {
      if (directions[currentLocation].indexOf(inputArray[1]) != -1) {
        switch (inputArray[1]) {
          case "noord":
            currentLocation -= 3;
            break;
          case "zuid":
            currentLocation += 3;
            break;
          case "oost":
            currentLocation += 1;
            break;
          case "west":
            currentLocation -= 1;
            break;
        }
      } else {
        feedback.innerHTML = "Dat mag niet";
        setTimeout(removeFeedback, 2000);

      }
      giveLocation();
      myInput.value = "";
    }

    if (inputArray[0] == "Pak" || "pak") {
      console.log('Ga wat pakken');
      myInput.value = "";
      if(treasureAanwezig)
      {
        pakTreasure(currentLocation);
        giveLocation();
      }
    }

    if (inputArray[0] == "Gebruik" || "gebruik"){
      console.log('Ga wat gebruiken');
      myInput.value = "";
    }

    if (inputArray[0] != "Ga" && inputArray[0] != "Pak" && inputArray[0] != "Gebruik" ){
      feedback.innerHTML = "Mogelijke commando's zijn: ga, pak, gebruik en help";
      myInput.value = "";
      setTimeout(removeFeedback, 4000);
    }

  }
}

function giveLocation() {
  divLocation.innerHTML = locations[currentLocation] + "=> Grid " + currentLocation;
  myDescription.innerHTML = descriptions[currentLocation];
  imageLocation.src = "media/" + images[currentLocation];
  myDirections = "mogelijke richtingen zijn: ";
  for (let i = 0; i < directions[currentLocation].length; i++) {
    myDirections += "<li>" + directions[currentLocation][i] + "</li>";
  }
  myDirections += checkTreasure(currentLocation);
  myPossibilities.innerHTML = myDirections;
if(inventoryTreasures.length > 0)
  {
    myInventory.innerHTML = "<h4> Dit zijn jouw schatten! </h3>";
    inventoryTreasures.forEach(showInventory);
      function showInventory(item, index)
        {
          myInventory.innerHTML += "<li>" + item + "</li>"; 
        }
  }
  else
  {
    myInventory.innerHTML = "Je inventory is leeg";
  }
}

function removeFeedback() {
  feedback.innerHTML = "";
}
function checkTreasure(currentLocation)
{
  if(typeof treasures [currentLocation] != "undefined" && treasures[currentLocation] != "")
  {
    console.log(treasures[currentLocation]);
    treasure.src = "Treasures/" + treasureImages[currentLocation];
    let treasureText = "<br><h4> In deze ruimte is een voorwerp aanwezig:" + treasures[currentLocation] + "</h4><br>";
    treasureAanwezig = true;
    return treasureText;
  }
  else
  {
    treasure.src = "";
    treasureAanwezig = false;
    return "";
  }
}
giveLocation();

function showTreasure(currentLocation)
{
  if(typeof treasures[currentLocation] != "undefined")
  {
    console.log(treasures[currentLocation]);
    treasures.src = "Treasures/" + treasureImages[currentLocation];
  }
}

function pakTreasure(currentLocation)
{
  inventoryTreasures.push(treasures[currentLocation]);
  treasures[currentLocation] = "";
  giveLocation();
}