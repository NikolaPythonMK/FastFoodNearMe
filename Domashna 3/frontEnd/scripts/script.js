let restaurants = [];

// Create a map object
const map = L.map('map', {
    center: [42.0038, 21.4361],
    zoom: 12
});

// Add an OpenStreetMap tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Create an array to store markers for the restaurants
const markers = [];

// Function to add a marker for a restaurant to the map
function addMarker(restaurant) {
    // Create a marker for the restaurant
    const marker = L.marker([restaurant.lat, restaurant.lon], {
        title: restaurant.name
    }).addTo(map);

    // Add the marker to the array of markers
    markers.push(marker);

    // Add an event listener to the marker to show the info window when clicked
    marker.on('click', function () {
        marker.bindPopup(restaurant.name).openPopup();
    });
}
// Function to search for restaurants that match the given search term
function searchRestaurants(searchTerm) {
    // Clear the current markers from the map
    for (let i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
    }
    markers.length = 0;

    // Loop through the restaurants array and add a marker for each restaurant
    // that matches the search term
    for (let i = 0; i < restaurants.length; i++) {
        if(restaurants[i].tags.name == undefined){
            continue;
        }
        if (restaurants[i].tags.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            addMarker(restaurants[i]);
        }
    }
}


function filterBy(property, value){
    for (let i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
    }
    markers.length = 0;
    for (let i = 0; i < restaurants.length; i++) {
        if(!restaurants[i].tags.hasOwnProperty(property)){
            continue;
        }
        if(restaurants[i].tags[property] == value){
            addMarker(restaurants[i]);
        }
    }
}

function filterOpenedRestaurants(){
    for (let i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
    }
    markers.length = 0;
    for(let i = 0; i < restaurants.length; i++){
        if(!restaurants[i].tags.hasOwnProperty("opening_hours")){
            continue;
        }else{
            let isOpen = false;
            let now = new Date();
            let restaurant_time = restaurants[i].tags["opening_hours"];
            let parts = restaurant_time.split(";");

            for(let i = 0; i < parts.length; i++){
                isOpen = false;
                let hours = parts[i].split(" ")[1];
                let days = parts[i].split(" ")[0];
                let beginnigHour = Number(hours[0] + hours[1]);
                let endingHour = Number(hours[6] + hours[7]);
                let openingDay = Number(days[0]);
                let closingDay = Number(days[2]);
                if(now.getHours() >= beginnigHour && now.getHours() <= endingHour && now.getDay() >= openingDay
                && now.getDay() <= closingDay){
                    isOpen = true;
                    break;
                }
            }
            if(isOpen){
                addMarker(restaurants[i]);
            }
        }
    }
    if(markers.length == 0){
        alert("Нема ресторани во моментов кој работат");
    }
}

// Get a reference to the search input and search button
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const nearestEl = document.getElementById("nearest-el");
const smokingEl = document.getElementById("smoking-el");
const deliveryEl = document.getElementById("delivery-el");
const outdoorseatingEl = document.getElementById("outdoorseating-el");
const openEl = document.getElementById("open-el");
const wifiEl = document.getElementById("wifi-el");

// Add an event listener to the search button to search for restaurants
// when it is clicked
searchButton.addEventListener('click', function () {
    searchRestaurants(searchInput.value);
});

// Add an event listener to the search input to search for restaurants
// when the user hits enter
searchInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        searchRestaurants(searchInput.value);
    }
});

smokingEl.addEventListener('click', function(){
    filterBy("smoking", "isolated");
});

deliveryEl.addEventListener('click', function(){
    filterBy("delivery", "yes");
});

outdoorseatingEl.addEventListener('click', function(){
    filterBy("outdoor_seating", "yes");
});

openEl.addEventListener('click', function(){
    filterOpenedRestaurants();
});

wifiEl.addEventListener('click', function(){
    filterBy("internet_access", "wlan");
});

axios.get("http://localhost:8080/app/home").then((res) => {
    restaurants = Array.from(res.data.restaurants.elements);
    //console.log(restaurants);
    for (let i = 0; i < restaurants.length; i++) {
        addMarker(restaurants[i]);
    }
})


