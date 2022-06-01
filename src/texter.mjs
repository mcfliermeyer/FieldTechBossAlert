/////////////////////node, express, and twilio things
import dotenv from "dotenv"; //keep in order to load env variables
import express from "express";
import twilio from "twilio";
import path from "path";
dotenv.config({
  path: path.resolve(
    "/Users/markmeyer/code/FieldTechBossAlert/src/.env",
    "../.env"
  ),
});

let locationOfPotts;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const geocode = process.env.GEOCODE_KEY;
const __dirname = path.dirname(
  "/Users/markmeyer/code/FieldTechBossAlert/dist/output.css"
);
const img__dirname = path.dirname(
  "/Users/markmeyer/code/FieldTechBossAlert/src/img/PottsProfileLinkedIn.webp"
);
const client = twilio(accountSid, authToken);
const app = express();
const port = 3001;

app.use(express.json({ limit: "5mb" }));
app.get("/geocode", (req, res) => {
  res.send({geocode: geocode})
})
app.post("/location", (req, res) => {
  console.log(req.body.geo);
  locationOfPotts = req.body.geo;
  const formatted = locationOfPotts.formatted;
  const neighborhood = locationOfPotts.components.neighbourhood
    ? `\nAround the area of ${locationOfPotts.components.neighbourhood.toUpperCase()}`
    : "";
  console.log(formatted);
  console.log(neighborhood);
  sendText(
    `Sasquatch spotted around:\n${formatted} ${neighborhood}`
  );
});

function sendText(text) {
  client.messages
    .create({
      body: text,
      from: "+19285855151",
      to: "+13307807602",
    })
    .then((message) => console.log(message.sid));
}

function loadPageAndResources() {
  app.use(express.static(__dirname)); //serves dist folder
  app.use(express.static(img__dirname)); //serves img folder

  app.get("/", (req, res) => {
    res.sendFile("/index.html", { root: "./src" }); //serves html file to client
  });

  app.listen(port, () => {
    console.log("listening to port http://localhost:3001");
  });
}

loadPageAndResources();
