// server.js

// requirers
// const { json } = require("express");
const express = require("express");
const fs = require("fs");
// const { request } = require("http");
const path = require("path");
const uuid = require("uuid");

// create server
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "/assets")));

// middleware (?) routing
// GET
app.get("api/notes.html", (request, response) => response.sendFile(path.join(__dirname, "/public/notes.html")));

app.get("/index.html", (request, response) => response.sendFile(path.join(__dirname, "/public/index.html")));

app.get("/api/notes", (request, response) => {
    fs.readFile("db/db.json", "utf8", (error, data) => {
        if (error) throw error
        console.error(error)
        response.json(data);
    })
});

// POST
app.post("/api/notes", (request, response) => {
    fs.readFile("db/db.json", "utf8", (error, data) => {
        if (error) {
            throw error
        } else {
            let note = JSON.parse(data);
            const newNote = request.body;
            newNote.id = uuid;
            note.push(newNote);
            fs.writeFile("db/db.json", JSON.stringify(note), (error) => error ? console.error(error) : console.log('new note saved to database'));
            response.send(newNote);
        }
    })
});

// how to delete a note? Graydon hint .filter, remove alements from an array

app.delete("api/notes/:id", (request, response) => {
    fs.readFile("db/db.json", "utf8", (error, data) => {
        if (error) {
            console.log(error);
        } else {
            let note = JSON.parse(data);
            note = note.filter(element => element.id);
            fs.writeFile("db/db.json", JSON.stringify(note), (error) => error ? console.error(error) : console.log("note deleted"))
            response.send({})
        }
    })
})


app.listen(PORT, () => console.log(`App listening at http://localhost${PORT}`));