import express from "express"; // importing
import axios from "axios";
import "./config";
import geohash from "ngeohash";

const app = express(); // creating an app, which is the server
const PORT = 8000; // which port the server will run on

const postCode = "SW10 0EF";

const API_KEY = process.env.TICKET_MASTER_API_KEY;
const city = "London";

app.get("/", (req, res) => res.send("Express + TypeScript Server")); //defining your handler
app.get("/api/concerts", (req, res) => {
  const postcode = req.query.postcode;
  // let lat: any;
  // let long: any;
  // let precision = 5;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.postcodes.io/postcodes/${postcode}`
      );
      const lat = response.data.result.latitude;
      const long = response.data.result.longitude;
      const precision = 5;
      const geoHash = geohash.encode(lat, long, precision);

      res.send(geoHash);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
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
