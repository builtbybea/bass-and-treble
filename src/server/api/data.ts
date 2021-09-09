import axios from "axios";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const getCoordinates = async (postcode: any): Promise<Coordinates> => {
  const response = await axios.get(`https://api.postcodes.io/postcodes/e143rn`);

  console.log(response);

  const lat: number = response.data.result.latitude;
  const long: number = response.data.result.longitude;

  return {
    latitude: lat,
    longitude: long,
  };
};
