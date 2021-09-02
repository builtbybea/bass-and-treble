import express from "express"; // importing

const app = express(); // creating an app, which is the server
const PORT = 8000; // which port the server will run on

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

// https://stackoverflow.com/questions/39301227/external-api-calls-with-express-node-js-and-require-module
// https://gawdiseattle.gitbook.io/wdi/05-node-express/00readme-1/03apis-axios

app.get("/", (req, res) => res.send("Express + TypeScript Server")); //defining your handler
app.get("/api/concerts", (req, res) => res.json(concert));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
