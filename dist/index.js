import { getGeocodeKey } from "/apiInfo.js"; //todo switch this over to evn variables
let lat;
let long;
const key = getGeocodeKey();
let locationData;

navigator.geolocation.getCurrentPosition(
  (pos) => {
    console.log(pos.coords);
    const coords = pos.coords;
    lat = coords.latitude;
    long = coords.longitude;
  },
  () => err
);

function err(err) {
  console.log("error getting position info" + err);
}

const trackBtn = document.getElementById("track-btn");
trackBtn.addEventListener("click", async () => {
  // const geoLocResponse = await fetch(
  //   `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C%20${long}&key=${key}&language=en&pretty=1`
  // );
  // const geoLoc = await geoLocResponse.json();
  // console.log(geoLoc.results[0].formatted);
  // locationData = geoLoc.results[0].formatted;

  async function geoInfo() {
    const geoLocResponse = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C%20${long}&key=${key}&language=en&pretty=1`
    );
    const geoLoc = await geoLocResponse.json();
    console.log(geoLoc);
    return geoLoc.results[0];
  }

  async function chained() {
    const geo = await geoInfo();
    console.log(`in chained geo:`);
    console.log(geo);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ geo }),
    };
    const apiReq = await fetch("http://localhost:3001/location", options);
    const apiRes = await apiReq.json();
    console.log(apiRes);
  }
  chained();
});
