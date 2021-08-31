import express from "express"; // importing

const app = express(); // creating an app, which is the server
const PORT = 8000; // which port the server will run on

app.get("/", (req, res) => res.send("Express + TypeScript Server")); //defining your handler
app.get("/api/concerts", (req, res) => res.send("changes"));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
