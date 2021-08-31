"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // importing
const app = (0, express_1.default)(); // creating an app, which is the server
const PORT = 8000; // which port the server will run on
app.get("/", (req, res) => res.send("Express + TypeScript Server")); //defining your handler
app.get("/api/concerts", (req, res) => res.send("list of concerts"));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
