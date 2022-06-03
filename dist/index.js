const trackBtn = document.getElementById("track-btn");

trackBtn.addEventListener("click", async () => {

  async function getCurrentLocation() {

    function getPosition() {
      return new Promise((pos) => {
        navigator.geolocation.getCurrentPosition((pos))
      })
    }
    const position = await getPosition()
    return position.coords
  }

  async function getGeocodeKey() {
    const res = await fetch(`http://localhost:3001/geocode`);
    const key = await res.json()
    return key.geocode
  }

  async function geoInfo() {
    const geocodeKey = await getGeocodeKey()
    const loc = await getCurrentLocation()
    const geoLocResponse = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${loc.latitude}%2C%20${loc.longitude}&key=${geocodeKey}&language=en&pretty=1`
    );
    const geoLoc = await geoLocResponse.json();
    return geoLoc.results[0];
  }

  async function chained() {
    const geo = await geoInfo();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ geo }),
    };
    const apiReq = await fetch("http://localhost:3001/location", options);//send command to text
    const apiRes = await apiReq.json();
  }
  chained();
});
