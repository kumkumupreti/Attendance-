const mapCenter = { lat: 20.5937, lng: 78.9629 }; // Center of India
const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: mapCenter,
});

// Sample user data with real locations
const users = [
    {
        name: "User 1",
        currentLocation: { lat: 28.6139, lng: 77.2090 }, // New Delhi
        previousLocations: [
            { name: "Connaught Place, New Delhi", coords: { lat: 28.6302, lng: 77.2180 }, time: "08:00 AM" },
            { name: "India Gate, New Delhi", coords: { lat: 28.6128, lng: 77.2295 }, time: "09:30 AM" },
            { name: "Red Fort, New Delhi", coords: { lat: 28.6562, lng: 77.2410 }, time: "10:30 AM" },
            { name: "Qutub Minar, New Delhi", coords: { lat: 28.5245, lng: 77.1855 }, time: "11:15 AM" },
            { name: "Lotus Temple, New Delhi", coords: { lat: 28.5535, lng: 77.2588 }, time: "01:00 PM" },
            { name: "Hauz Khas Village, New Delhi", coords: { lat: 28.5491, lng: 77.2150 }, time: "02:30 PM" },
            { name: "Jama Masjid, New Delhi", coords: { lat: 28.6506, lng: 77.2330 }, time: "03:15 PM" },
            { name: "Akshardham Temple, New Delhi", coords: { lat: 28.6126, lng: 77.2824 }, time: "04:00 PM" },
        ],
    },
    {
        name: "User 2",
        currentLocation: { lat: 19.0760, lng: 72.8777 }, // Mumbai
        previousLocations: [
            { name: "Gateway of India, Mumbai", coords: { lat: 18.9217, lng: 72.8347 }, time: "10:00 AM" },
            { name: "Marine Drive, Mumbai", coords: { lat: 18.9526, lng: 72.8265 }, time: "11:30 AM" },
            { name: "Juhu Beach, Mumbai", coords: { lat: 19.1005, lng: 72.8258 }, time: "12:15 PM" },
            { name: "Chhatrapati Shivaji Terminus, Mumbai", coords: { lat: 18.9406, lng: 72.8353 }, time: "01:00 PM" },
            { name: "Elephanta Caves, Mumbai", coords: { lat: 18.9793, lng: 72.9288 }, time: "02:30 PM" },
            { name: "Hanging Gardens, Mumbai", coords: { lat: 18.5172, lng: 72.8250 }, time: "03:45 PM" },
            { name: "Bandra-Worli Sea Link, Mumbai", coords: { lat: 19.0436, lng: 72.8266 }, time: "04:30 PM" },
            { name: "Sanjay Gandhi National Park, Mumbai", coords: { lat: 19.1794, lng: 72.9348 }, time: "05:15 PM" },
        ],
    },
    {
        name: "User 3",
        currentLocation: { lat: 12.9716, lng: 77.5946 }, // Bangalore
        previousLocations: [
            { name: "Cubbon Park, Bangalore", coords: { lat: 12.9769, lng: 77.5905 }, time: "09:00 AM" },
            { name: "Vidhana Soudha, Bangalore", coords: { lat: 12.9792, lng: 77.5912 }, time: "10:15 AM" },
            { name: "Lalbagh Botanical Garden, Bangalore", coords: { lat: 12.9525, lng: 77.5848 }, time: "11:00 AM" },
            { name: "Bangalore Palace, Bangalore", coords: { lat: 12.9990, lng: 77.5900 }, time: "12:00 PM" },
            { name: "Nandi Hills, Bangalore", coords: { lat: 13.3486, lng: 77.7362 }, time: "01:30 PM" },
            { name: "ISKCON Temple, Bangalore", coords: { lat: 12.9374, lng: 77.6245 }, time: "03:00 PM" },
            { name: "Bannerghatta National Park, Bangalore", coords: { lat: 12.7542, lng: 77.5897 }, time: "04:30 PM" },
            { name: "Ulsoor Lake, Bangalore", coords: { lat: 12.9761, lng: 77.6145 }, time: "05:45 PM" },
        ],
    },
    {
        name: "User 4",
        currentLocation: { lat: 22.3193, lng: 70.7930 }, // Surat
        previousLocations: [
            { name: "Sarthana Nature Park, Surat", coords: { lat: 21.1784, lng: 72.7962 }, time: "11:00 AM" },
            { name: "Surat Castle, Surat", coords: { lat: 21.1702, lng: 72.8311 }, time: "12:30 PM" },
            { name: "Dumas Beach, Surat", coords: { lat: 21.2000, lng: 72.8226 }, time: "01:15 PM" },
            { name: "Gopi Talav, Surat", coords: { lat: 21.1979, lng: 72.8380 }, time: "02:00 PM" },
            { name: "Surat Diamond Bourse, Surat", coords: { lat: 21.2256, lng: 72.8354 }, time: "03:30 PM" },
            { name: "Sardar Patel Museum, Surat", coords: { lat: 21.1706, lng: 72.8293 }, time: "04:15 PM" },
            { name: "Dutch Garden, Surat", coords: { lat: 21.2020, lng: 72.8486 }, time: "05:00 PM" },
            { name: "Sarthana Nature Park, Surat", coords: { lat: 21.1784, lng: 72.7962 }, time: "06:00 PM" },
        ],
    },
    {
        name: "User 5",
        currentLocation: { lat: 26.9124, lng: 75.7873 }, // Jaipur
        previousLocations: [
            { name: "Hawa Mahal, Jaipur", coords: { lat: 26.9935, lng: 75.8267 }, time: "01:00 PM" },
            { name: "Amber Fort, Jaipur", coords: { lat: 26.9855, lng: 75.8513 }, time: "02:15 PM" },
            { name: "Jantar Mantar, Jaipur", coords: { lat: 26.9256, lng: 75.8267 }, time: "03:00 PM" },
            { name: "City Palace, Jaipur", coords: { lat: 26.9257, lng: 75.8262 }, time: "04:00 PM" },
            { name: "Nahargarh Fort, Jaipur", coords: { lat: 26.9923, lng: 75.8269 }, time: "05:30 PM" },
            { name: "Jal Mahal, Jaipur", coords: { lat: 26.9896, lng: 75.8426 }, time: "06:45 PM" },
            { name: "Albert Hall Museum, Jaipur", coords: { lat: 26.9259, lng: 75.8158 }, time: "07:30 PM" },
            { name: "Birla Mandir, Jaipur", coords: { lat: 26.9352, lng: 75.8234 }, time: "08:15 PM" },
        ],
    },
    {
        name: "User 6",
        currentLocation: { lat: 19.2183, lng: 84.4420 }, // Bhubaneswar
        previousLocations: [
            { name: "Lingaraj Temple, Bhubaneswar", coords: { lat: 20.2740, lng: 85.8350 }, time: "03:00 PM" },
            { name: "Udayagiri and Khandagiri Caves", coords: { lat: 20.2373, lng: 85.8260 }, time: "04:00 PM" },
            { name: "Dhauli Hills, Bhubaneswar", coords: { lat: 20.2056, lng: 85.8315 }, time: "05:15 PM" },
            { name: "Nandankanan Zoological Park", coords: { lat: 20.3386, lng: 85.8183 }, time: "06:00 PM" },
            { name: "Khandagiri Caves", coords: { lat: 20.2643, lng: 85.8325 }, time: "07:00 PM" },
            { name: "Buddha Jayanti Park", coords: { lat: 20.2880, lng: 85.8268 }, time: "08:00 PM" },
            { name: "Nandankanan Wildlife Sanctuary", coords: { lat: 20.3293, lng: 85.8265 }, time: "09:00 PM" },
            { name: "Parasurameswar Temple", coords: { lat: 20.2708, lng: 85.8280 }, time: "10:00 PM" },
        ],
    },
    {
        name: "User 7",
        currentLocation: { lat: 10.8505, lng: 76.2711 }, // Kerala
        previousLocations: [
            { name: "Backwaters of Alleppey", coords: { lat: 9.5004, lng: 76.3198 }, time: "09:30 AM" },
            { name: "Munnar Tea Gardens", coords: { lat: 10.0881, lng: 77.0737 }, time: "10:15 AM" },
            { name: "Fort Kochi", coords: { lat: 9.9656, lng: 76.2215 }, time: "11:00 AM" },
            { name: "Athirappilly Waterfalls", coords: { lat: 10.2751, lng: 76.5253 }, time: "12:00 PM" },
            { name: "Mattancherry Palace", coords: { lat: 9.9525, lng: 76.2365 }, time: "01:30 PM" },
            { name: "Wayanad Wildlife Sanctuary", coords: { lat: 11.6152, lng: 76.1319 }, time: "03:00 PM" },
            { name: "Kumarakom Bird Sanctuary", coords: { lat: 9.5938, lng: 76.3453 }, time: "04:30 PM" },
            { name: "Spice Plantations", coords: { lat: 10.3414, lng: 76.3992 }, time: "05:45 PM" },
        ],
    },
    {
        name: "User 8",
        currentLocation: { lat: 15.3173, lng: 75.7139 }, // Goa
        previousLocations: [
            { name: "Baga Beach, Goa", coords: { lat: 15.5521, lng: 73.7512 }, time: "09:00 AM" },
            { name: "Fort Aguada, Goa", coords: { lat: 15.4905, lng: 73.7525 }, time: "10:30 AM" },
            { name: "Dudhsagar Waterfalls", coords: { lat: 15.2510, lng: 74.1755 }, time: "11:45 AM" },
            { name: "Anjuna Beach, Goa", coords: { lat: 15.5526, lng: 73.7525 }, time: "12:30 PM" },
            { name: "Vagator Beach, Goa", coords: { lat: 15.5522, lng: 73.7514 }, time: "01:30 PM" },
            { name: "Chapora Fort, Goa", coords: { lat: 15.5457, lng: 73.7548 }, time: "02:15 PM" },
            { name: "Basilica of Bom Jesus", coords: { lat: 15.4901, lng: 73.9127 }, time: "03:30 PM" },
            { name: "Se Cathedral, Goa", coords: { lat: 15.4902, lng: 73.9120 }, time: "04:45 PM" },
        ],
    },
    {
        name: "User 9",
        currentLocation: { lat: 11.0168, lng: 76.9558 }, // Coimbatore
        previousLocations: [
            { name: "Marudamalai Temple, Coimbatore", coords: { lat: 11.0313, lng: 76.9582 }, time: "08:30 AM" },
            { name: "VOC Park, Coimbatore", coords: { lat: 11.0108, lng: 76.9721 }, time: "09:30 AM" },
            { name: "Perur Patteeswarar Temple, Coimbatore", coords: { lat: 11.0133, lng: 76.9634 }, time: "10:30 AM" },
            { name: "Brookefields Mall, Coimbatore", coords: { lat: 11.0277, lng: 76.9554 }, time: "11:15 AM" },
            { name: "Kovai Kutralam, Coimbatore", coords: { lat: 11.1273, lng: 76.9395 }, time: "12:00 PM" },
            { name: "Maruthamalai, Coimbatore", coords: { lat: 11.0316, lng: 76.9585 }, time: "01:00 PM" },
            { name: "Nilgiri Biosphere Reserve", coords: { lat: 11.2395, lng: 76.8428 }, time: "02:30 PM" },
            { name: "Nehru Stadium, Coimbatore", coords: { lat: 11.0155, lng: 76.9735 }, time: "03:30 PM" },
        ],
    },
    {
        name: "User 10",
        currentLocation: { lat: 22.5726, lng: 88.3639 }, // Kolkata
        previousLocations: [
            { name: "Victoria Memorial, Kolkata", coords: { lat: 22.5431, lng: 88.3432 }, time: "10:00 AM" },
            { name: "Howrah Bridge, Kolkata", coords: { lat: 22.5958, lng: 88.3469 }, time: "11:00 AM" },
            { name: "Dakshineswar Kali Temple, Kolkata", coords: { lat: 22.6081, lng: 88.3654 }, time: "12:30 PM" },
            { name: "Science City, Kolkata", coords: { lat: 22.5345, lng: 88.3542 }, time: "01:30 PM" },
            { name: "Kalighat Temple, Kolkata", coords: { lat: 22.5178, lng: 88.3519 }, time: "02:30 PM" },
            { name: "Alambazar, Kolkata", coords: { lat: 22.6350, lng: 88.3501 }, time: "03:15 PM" },
            { name: "Belur Math, Kolkata", coords: { lat: 22.5770, lng: 88.3540 }, time: "04:30 PM" },
            { name: "Rabindra Sarobar, Kolkata", coords: { lat: 22.5131, lng: 88.3643 }, time: "05:45 PM" },
        ],
    },
    {
        name: "User 11",
        currentLocation: { lat: 17.3850, lng: 78.4867 }, // Hyderabad
        previousLocations: [
            { name: "Charminar, Hyderabad", coords: { lat: 17.3616, lng: 78.4747 }, time: "08:00 AM" },
            { name: "Hussain Sagar, Hyderabad", coords: { lat: 17.4260, lng: 78.4761 }, time: "09:30 AM" },
            { name: "Golconda Fort, Hyderabad", coords: { lat: 17.3833, lng: 78.4015 }, time: "10:45 AM" },
            { name: "Ramoji Film City, Hyderabad", coords: { lat: 17.2951, lng: 78.7489 }, time: "12:00 PM" },
            { name: "Lumbini Park, Hyderabad", coords: { lat: 17.4183, lng: 78.4712 }, time: "01:30 PM" },
            { name: "Birla Mandir, Hyderabad", coords: { lat: 17.4239, lng: 78.4697 }, time: "02:30 PM" },
            { name: "Shilparamam, Hyderabad", coords: { lat: 17.4450, lng: 78.3833 }, time: "03:30 PM" },
            { name: "Salar Jung Museum, Hyderabad", coords: { lat: 17.3638, lng: 78.4763 }, time: "04:30 PM" },
        ],
    },
    {
        name: "User 12",
        currentLocation: { lat: 19.0760, lng: 72.8777 }, // Mumbai
        previousLocations: [
            { name: "Gateway of India, Mumbai", coords: { lat: 18.9218, lng: 72.8347 }, time: "10:00 AM" },
            { name: "Marine Drive, Mumbai", coords: { lat: 18.9525, lng: 72.8262 }, time: "11:15 AM" },
            { name: "Chhatrapati Shivaji Maharaj Terminus", coords: { lat: 18.9408, lng: 72.8353 }, time: "12:30 PM" },
            { name: "Haji Ali Dargah, Mumbai", coords: { lat: 18.9782, lng: 72.8361 }, time: "01:45 PM" },
            { name: "Elephanta Caves, Mumbai", coords: { lat: 18.9612, lng: 72.9072 }, time: "03:00 PM" },
            { name: "Chowpatty Beach, Mumbai", coords: { lat: 18.9525, lng: 72.8262 }, time: "04:15 PM" },
            { name: "Sanjay Gandhi National Park, Mumbai", coords: { lat: 19.2028, lng: 72.9383 }, time: "05:30 PM" },
            { name: "Versova Beach, Mumbai", coords: { lat: 19.1092, lng: 72.8303 }, time: "06:30 PM" },
        ],
    },
    {
        name: "User 13",
        currentLocation: { lat: 26.9124, lng: 75.7873 }, // Jaipur
        previousLocations: [
            { name: "Hawa Mahal, Jaipur", coords: { lat: 26.9855, lng: 75.8239 }, time: "09:00 AM" },
            { name: "City Palace, Jaipur", coords: { lat: 26.9955, lng: 75.8252 }, time: "10:30 AM" },
            { name: "Amber Fort, Jaipur", coords: { lat: 26.9853, lng: 75.8510 }, time: "11:45 AM" },
            { name: "Jantar Mantar, Jaipur", coords: { lat: 26.9242, lng: 75.8260 }, time: "12:30 PM" },
            { name: "Jaipur Wax Museum", coords: { lat: 26.9983, lng: 75.8531 }, time: "01:15 PM" },
            { name: "Nahargarh Fort, Jaipur", coords: { lat: 26.9784, lng: 75.8497 }, time: "02:30 PM" },
            { name: "Chokhi Dhani, Jaipur", coords: { lat: 26.9349, lng: 75.8299 }, time: "03:45 PM" },
            { name: "Birla Mandir, Jaipur", coords: { lat: 26.9265, lng: 75.8285 }, time: "04:45 PM" },
        ],
    },
    {
        name: "User 14",
        currentLocation: { lat: 30.7333, lng: 76.7794 }, // Chandigarh
        previousLocations: [
            { name: "Rock Garden, Chandigarh", coords: { lat: 30.7354, lng: 76.7813 }, time: "09:00 AM" },
            { name: "Sukhna Lake, Chandigarh", coords: { lat: 30.7200, lng: 76.8023 }, time: "10:15 AM" },
            { name: "Rose Garden, Chandigarh", coords: { lat: 30.7300, lng: 76.7880 }, time: "11:30 AM" },
            { name: "Capitol Complex, Chandigarh", coords: { lat: 30.7472, lng: 76.7795 }, time: "12:30 PM" },
            { name: "Elante Mall, Chandigarh", coords: { lat: 30.7404, lng: 76.7577 }, time: "01:45 PM" },
            { name: "Chandigarh Haat, Chandigarh", coords: { lat: 30.7545, lng: 76.7805 }, time: "03:00 PM" },
            { name: "Government Museum and Art Gallery", coords: { lat: 30.7415, lng: 76.7788 }, time: "04:15 PM" },
            { name: "Punjab University, Chandigarh", coords: { lat: 30.7432, lng: 76.7815 }, time: "05:30 PM" },
        ],
    },
];

// Function to place markers on the map
function placeUserMarkers() {
    users.forEach(user => {
        const marker = new google.maps.Marker({
            position: user.currentLocation,
            map: map,
            title: user.name,
        });

        // Click event to show previous locations
        marker.addListener("click", () => {
            displayPreviousLocations(user);
        });
    });
}

// Function to display previous locations
function displayPreviousLocations(user) {
    const locationTable = document.getElementById("locationTable");
    locationTable.innerHTML = `<tr><th colspan="2">${user.name}'s Previous Locations</th></tr>`; // Table header

    user.previousLocations.forEach(location => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${location.name}</td><td>${location.time}</td>`;
        locationTable.appendChild(row);
    });
}

// Initialize map and markers
placeUserMarkers();
