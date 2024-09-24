// Sample data for members and their locations
const members = [
  {
    id: 1, 
    name: 'John Doe', 
    locations: [
      { lat: 40.7128, lng: -74.0060, date: '2024-09-22' }, // New York
      { lat: 34.0522, lng: -118.2437, date: '2024-09-23' }, // Los Angeles
      { lat: 37.7749, lng: -122.4194, date: '2024-09-24' }  // San Francisco
    ]
  },
  {
    id: 2, 
    name: 'Jane Smith', 
    locations: [
      { lat: 51.5074, lng: -0.1278, date: '2024-09-22' }, // London
      { lat: 48.8566, lng: 2.3522, date: '2024-09-23' },  // Paris
      { lat: 52.5200, lng: 13.4050, date: '2024-09-24' }  // Berlin
    ]
  }
];

// Initialize Google Map
let map;
let markers = [];
let routes = [];
let memberIndex = null;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.7128, lng: -74.0060 }, // Initial map center set to New York
    zoom: 5,
  });

  loadMembers();
}

// Load member list dynamically
function loadMembers() {
  const memberList = document.getElementById('member-list');
  members.forEach((member, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${member.name} 
      <button onclick="showMemberRoute(${index})">Show Location</button>
    `;
    memberList.appendChild(li);
  });
}

// Show current location and visited routes
function showMemberRoute(index) {
  memberIndex = index;
  const member = members[index];
  
  // Clear previous markers and routes
  clearMap();

  // Show current location marker
  const currentLocation = member.locations[member.locations.length - 1];
  const marker = new google.maps.Marker({
    position: { lat: currentLocation.lat, lng: currentLocation.lng },
    map: map,
    title: `${member.name}'s Current Location`
  });
  markers.push(marker);

  // Show visited locations on timeline
  showTimeline(member.locations);
  
  // Generate routes between locations
  generateRoutes(member.locations);
}

// Display visited locations in timeline
function showTimeline(locations) {
  const timelineData = document.getElementById('timeline-data');
  timelineData.innerHTML = '';
  locations.forEach(location => {
    const div = document.createElement('div');
    div.innerHTML = `Visited: ${location.date} at (${location.lat}, ${location.lng})`;
    timelineData.appendChild(div);
  });
}

// Generate routes between visited locations
function generateRoutes(locations) {
  const routePath = new google.maps.Polyline({
    path: locations.map(loc => ({ lat: loc.lat, lng: loc.lng })),
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  routePath.setMap(map);
  routes.push(routePath);
}

// Clear previous markers and routes from map
function clearMap() {
  markers.forEach(marker => marker.setMap(null));
  routes.forEach(route => route.setMap(null));
  markers = [];
  routes = [];
}

// Filter locations by the selected date
function filterByDate() {
  const selectedDate = document.getElementById('date-picker').value;
  
  if (!selectedDate || memberIndex === null) {
    alert('Please select a date and a member.');
    return;
  }

  const member = members[memberIndex];

  // Filter locations that match the selected date
  const filteredLocations = member.locations.filter(location => {
    const locationDate = new Date(location.date).toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD'
    return locationDate === selectedDate;
  });

  // Update the timeline and map with filtered locations
  if (filteredLocations.length > 0) {
    showTimeline(filteredLocations);
    generateRoutes(filteredLocations);
  } else {
    alert('No data found for the selected date.');
  }
}

// Initialize map on page load
window.onload = initMap;
