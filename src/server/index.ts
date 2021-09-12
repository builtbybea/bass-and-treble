import express from "express"; // importing
import { getCoordinates, getNearestConcert } from "../server/api/data";
import "./config";
import geohash from "ngeohash";

const app = express(); // creating an app, which is the server
const PORT = 8000; // which port the server will run on

app.get("/ping", (req, res) => res.send("pong")); //defining your handler

app.get("/api/concerts", async (req, res) => {
  const postcode: string = req.query.postcode as string;

  const coordinates = await getCoordinates(postcode);
  const precision = 5;
  const geoHash = geohash.encode(
    coordinates.latitude,
    coordinates.longitude,
    precision
  );

  const listOfConcerts = await getNearestConcert(2, "miles", geoHash);

  res.json(listOfConcerts);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
