import express from "express"; // importing
import axios from "axios";
import "./config";
import geohash from "ngeohash";

const app = express(); // creating an app, which is the server
const PORT = 8000; // which port the server will run on

const API_KEY = process.env.TICKET_MASTER_API_KEY;
const city = "London";

app.get("/ping", (req, res) => res.send("pong")); //defining your handler

app.get("/api/concerts", (req, res) => {
  const postcode = req.query.postcode;
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.postcodes.io/postcodes/${postcode}`
      );
      const lat = response.data.result.latitude;
      const long = response.data.result.longitude;
      const precision = 5;
      const geoHash = geohash.encode(lat, long, precision);

      const radius = 2;
      const unit = "miles";

      const getNearestConcert = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&radius=${radius}&unit=${unit}&geoPoint=${geoHash}`
      );
      const concertDetails = getNearestConcert.data;
      res.json(concertDetails);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
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
