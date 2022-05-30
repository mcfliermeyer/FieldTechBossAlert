import { getGeocodeKey } from "/apiInfo.js";
let lat;
let long;
const key = getGeocodeKey();

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
trackBtn.addEventListener("click", () => {
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C%20${long}&key=${key}&language=en&pretty=1`
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
});
