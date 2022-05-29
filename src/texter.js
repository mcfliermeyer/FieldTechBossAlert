/////////////////////node, express, and twilio things
import dotenv from "dotenv/config";
import express from "express";
import twilio from "twilio";
import path from "path";

const app = express();
const port = 3001;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

//sending a message to my phone from twilio
// client.messages
//   .create({
//     body: "This is the ship that made the Kessel Run in fourteen parsecs?",
//     from: "+19285855151",
//     to: "+13307807602",
//   })
//   .then((message) => console.log(message.sid));

app.get("/", (req, res) => {
  res.send("<h1>Henlo</h1>");
});

app.listen(port, () => {
  console.log("listening to port http://localhost:3001");
});
