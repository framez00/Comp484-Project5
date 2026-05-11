//create locations
let currentQuestion = 0;
const locations = [
    {
        name: "Where is the Police Services building?",
        north: 34.23889188535426,
        south: 34.23859032126264,
        east: -118.53306853811232,
        west: -118.53360497988338
    }
];

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

    document.getElementById("question").innerText = locations[currentQuestion].name;

    //double click
    map.addListener("dblclick", function(event){
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();
    
        const current = locations[currentQuestion];
        //check if clicked location alignes with coordinates
        if(
            clickedLat <= current.north &&
            clickedLat >= current.south &&
            clickedLng <= current.east &&
            clickedLng >= current.west
        ){
            alert("Correct!");
        }
        else{
            alert("Wrong!");
        }
    
    });
}