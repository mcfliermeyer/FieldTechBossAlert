/////////////////////node, express, and twilio things
import dotenv from "dotenv"; //keep in order to load env variables
import express from "express";
import twilio from "twilio";
import path from "path";
import fetch from "node-fetch";
dotenv.config({
  path: path.resolve(
    "/Users/markmeyer/code/FieldTechBossAlert/src/.env",
    "../.env"
  ),
});

let textBody = "";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const geocodeKey = process.env.GEOCODE_KEY;
const __dirname = path.dirname(
  "/Users/markmeyer/code/FieldTechBossAlert/dist/output.css"
);
const img__dirname = path.dirname(
  "/Users/markmeyer/code/FieldTechBossAlert/dist/img/PottsProfileLinkedIn.webp"
);
const client = twilio(accountSid, authToken);
const app = express();
const port = 3001;

app.use(express.json({ limit: "5mb" }));

app.post("/location", async (req, res) => {
  const location = await geoInfo(req.body.userLocation);
  const formatted = await location.formatted;
  console.log(location.components);
  const neighborhood = location.components.neighbourhood
    ? `\nAround the area of ${location.components.neighbourhood.toUpperCase()}`
    : "";
  textBody = `Sasquatch spotted around:\n${formatted} ${neighborhood}`;
});

app.get("/send-text", (req, res) => {
  console.log(`sendind text ${textBody}`);
  sendText(textBody);
});

async function geoInfo(loc) {
  const geoLocResponse = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${loc.lat}%2C%20${loc.long}&key=${geocodeKey}&language=en&pretty=1`
  );
  const geoLoc = await geoLocResponse.json();
  return geoLoc.results[0];
}

function sendText(text) {
  client.messages
    .create({
      body: text,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.TEST_PHONE_NUMBER,
    })
    .then((message) => console.log(message.sid));
}

function loadPageAndResources() {
  app.use(express.static(__dirname)); //serves dist folder
  app.use(express.static(img__dirname)); //serves img folder

  app.get("/", (req, res) => {
    res.sendFile("/index.html", { root: "./dist" }); //serves html file to client
  });

  app.listen(port, () => {
    console.log("listening to port http://localhost:3001");
  });
}

loadPageAndResources();
