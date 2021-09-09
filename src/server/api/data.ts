import axios from "axios";
import "../config";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const API_KEY = process.env.TICKET_MASTER_API_KEY;

export const getCoordinates = async (postcode: any): Promise<Coordinates> => {
  const response = await axios.get(
    `https://api.postcodes.io/postcodes/${postcode}`
  );

  const lat: number = response.data.result.latitude;
  const long: number = response.data.result.longitude;

  return {
    latitude: lat,
    longitude: long,
  };
};

export const getNearestConcert = async (
  radius: number,
  unit: string,
  geohash: any
): Promise<[]> => {
  const response = await axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&radius=${radius}&unit=${unit}&geoPoint=${geohash}`
  );
  const concertDetails = response.data._embedded;
  return concertDetails;
};
