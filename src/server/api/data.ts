import axios from "axios";
import "../config";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const API_KEY = process.env.TICKET_MASTER_API_KEY;

export const getCoordinates = async (
  postcode: string
): Promise<Coordinates> => {
  const response = await axios.get(
    `https://api.postcodes.io/postcodes/${postcode}`
  );

  const { latitude, longitude }: { latitude: number; longitude: number } =
    response.data.result;

  return {
    latitude: latitude,
    longitude: longitude,
  };
};

export const getNearestConcert = async (
  radius: number,
  unit: string,
  geohash: any
): Promise<{}> => {
  const response = await axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&radius=${radius}&unit=${unit}&geoPoint=${geohash}`
  );
  const concertDetails = response.data._embedded;
  return concertDetails;
};
