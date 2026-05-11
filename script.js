//create locations
const locations = [
    {
        name: "Where is the Police Services building?",
        north: 34.23889188535426,
        south: 34.23859032126264,
        east: -118.53306853811232,
        west: -118.53360497988338
    },
    {
        name: "Where is the CSUN Library?",
        north: 34.24040096439571,
        south: 34.23962045734156,
        east: -118.52863135770787,
        west: -118.53003683514804
    },

    {
        name: "Where is Jacaranda Hall?",
        north: 34.24208441912933,
        south: 34.241055587979304,
        east: -118.52786344846811,
        west: -118.52947277378128
    },

    {
        name: "Where is the Campus Store?",
        north: 34.237738423815244,
        south: 34.23704957656588,
        east: -118.52773092039676,
        west: -118.52867167034485
    },

    {
        name: "Where is Live Oak Hall?",
        north: 34.23837247342718,
        south: 34.23818122473778,
        east: -118.52763317018528,
        west: -118.52877206749625
    }
];
let currentQuestion = 0;
let score = 0;
let startTime; //for timer (extra feature)

function initMap() {
    //csun coordinates
    const csun = {
        lat: 34.2400,
        lng: -118.5290
    };
    //map
    const map = new google.maps.Map(document.getElementById("map"), {
        center: csun,
        zoom: 16.55, //16.55 was just the best zoom value, if i put 16.5 it zooms out too much
        //remove labels/names
        styles: [
            {
                featureType: "all",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ],

        //removes the buttons
        disableDefaultUI: true,

        //no dragging
        draggable: false,

        //no mouse wheel zooming
        scrollwheel: false,

        //no double click zoom
        disableDoubleClickZoom: true,

        //disable keyboard shortcuts
        keyboardShortcuts: false,
        
        //no movement, locks the map
        gestureHandling: "none"
                
    });

    //start the timer
    startTime = Date.now();

    //first question
    document.getElementById("question").innerHTML = "<p class='questionBox'>" + locations[currentQuestion].name + "</p>";

    //double click
    map.addListener("dblclick", function(event){
        //adding a check so that you cant keep double clicking after all questions were answered
        if(currentQuestion >= locations.length){
            return;
        }
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();
        const current = locations[currentQuestion];

        //check if clicked location aligns with coordinates
        if(
            clickedLat <= current.north &&
            clickedLat >= current.south &&
            clickedLng <= current.east &&
            clickedLng >= current.west
        )
        {
        //correct message
            document.getElementById("question").innerHTML += "<p class='correct'>Your answer is correct!!</p>";
            score++;

            //rectangle
            new google.maps.Rectangle({
                map: map,
                bounds: {
                    north: current.north,
                    south: current.south,
                    east: current.east,
                    west: current.west
                },
                strokeColor: "green",
                strokeOpacity: 1,
                strokeWeight: 2,
                
                fillColor: "green",
                fillOpacity: 0.35
            });
        }
        //wrong message
        else{
            document.getElementById("question").innerHTML += "<p class='wrong'>Sorry wrong location.</p>";

            //rectangle
            new google.maps.Rectangle({
                map: map,
                bounds: {
                    north: current.north,
                    south: current.south,
                    east: current.east,
                    west: current.west
                },
                strokeColor: "red",
                strokeOpacity: 1,
                strokeWeight: 2,
                
                fillColor: "red",
                fillOpacity: 0.35
            });
        }

        //increment the question
        currentQuestion++;

        //loop through the questions
        if(currentQuestion < locations.length){
            document.getElementById("question").innerHTML += "<p class='questionBox'>" + locations[currentQuestion].name + "</p>";
        }
        //once it finishes
        else{
            //end timer
            let endTime = Date.now();
            let seconds = Math.floor((endTime - startTime) / 1000);

            //final output
            //count of correct and incorrect choices
            //added timer (extra feature)
            //added button to play again (extra feature)
            document.getElementById("question").innerHTML += 
                "<h1>" + score + " Correct, " + (locations.length - score) + " Incorrect</h1>" +
                "<h2>Time: You finished in " + seconds + " seconds</h2>" +
                "<button onclick='location.reload()'>Play Again</button>";

            //added confetti (extra feature)
            confetti({
                particleCount: 1000,
                spread: 200,
                origin: { y: 0.6 }
            });
        }
    });
}