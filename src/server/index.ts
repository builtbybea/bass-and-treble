import express from "express"; // importing
import axios from "axios";
import "./config";

const app = express(); // creating an app, which is the server
const PORT = 8000; // which port the server will run on

const postCode = "SW10 0EF";
const concert = [
  {
    artist: "Disclourse",
    date: "05/03/2022",
  },
  {
    artist: "Erika De Casier",
    date: "11/11/2021",
  },
  {
    artist: "Rina Sawayana",
    date: "17/11/2021",
  },
];

const API_KEY = process.env.TICKET_MASTER_API_KEY;
const city = "London";

app.get("/", (req, res) => res.send("Express + TypeScript Server")); //defining your handler
app.get("/api/concerts", (req, res) => res.json(concert));

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
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
