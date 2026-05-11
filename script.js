function initMap() {
    //csun coordinates
    const csun = {
        lat: 34.2400,
        lng: -118.5290
    };
    //map
    const map = new google.maps.Map(document.getElementById("map"), {
        center: csun,
        zoom: 17,
        //remove labels/names
        styles: [
            {
                featureType: "all",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ],

        //remove map/satellite button
        mapTypeControl: false, 

        //remove the yellow guy
        streetViewControl: false,

        //remove full screen button
        fullscreenControl: false,

        //no dragging
        draggable: false,

        //no mouse wheel zooming
        scrollwheel: false,

        //no double click zoom
        disableDoubleClickZoom: true,

        //no movement, locks the map
        gestureHandling: "none"
    });
}