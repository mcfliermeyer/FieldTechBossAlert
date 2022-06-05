const trackBtn = document.getElementById("track-btn");
trackBtn.disabled = true
trackBtn.innerText = "PLEASE WAIT Getting your location idiot"

//  get location upon page load which i think would be faster
//  then button press sends location to server
//  server does rest of logic and api calls

async function postLocationToServer() {
  navigator.geolocation.getCurrentPosition((location) => {
    const latLong = {lat: location.coords.latitude, long: location.coords.longitude}
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userLocation: latLong }),
    };
    fetch("http://localhost:3001/location", options); //send location of user to server
    trackBtn.disabled = false
    trackBtn.innerText = "Send Sasquatch's Location";
  });
}

postLocationToServer();

trackBtn.addEventListener("click", async () => {
  const req = await fetch("http://localhost:3001/send-text");
  console.log(req.json());
});
