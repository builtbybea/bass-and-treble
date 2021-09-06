import express from "express"; // importing
import axios from "axios";
import "./config";
import geohash from "ngeohash";

const app = express(); // creating an app, which is the server
const PORT = 8000; // which port the server will run on

const postCode = "SW10 0EF";

const API_KEY = process.env.TICKET_MASTER_API_KEY;
const city = "London";

const geoHash = geohash.encode(37.8324, 112.5584);
console.log(geoHash);

app.get("/", (req, res) => res.send("Express + TypeScript Server")); //defining your handler
app.get("/api/concerts", (req, res) => {
  const postcode = req.query.postcode;

  res.send(postcode);
});

app.get("/api/postcode", (req, res) => {
  axios
    .get(`https://api.postcodes.io/postcodes/${postCode}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.get("/api/events", (req, res) => {
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&city=${city}`
    )
    .then((response) => {
      res.json(response.data._embedded.events);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
