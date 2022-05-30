/////////////////////node, express, and twilio things
import dotenv from "dotenv/config"; //keep in order to load env variables
import express from "express";
import twilio from "twilio";
import path from "path";

const __dirname = path.dirname(
  "/Users/markmeyer/code/FieldTechBossAlert/dist/output.css"
);
const img__dirname = path.dirname(
  "/Users/markmeyer/code/FieldTechBossAlert/src/img/PottsProfileLinkedIn.webp"
);
const app = express();
const port = 3001;

function sendText() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  client.messages
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
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

loadPageAndResources()