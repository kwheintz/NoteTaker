const path = require("path");
const fs = require("fs");
const router = require ("express").Router();
const db = path.join(__dirname, "../db/db.json");

let allNotes = [];
let nextID = 0;

router.get("/notes", (req, res) => {

    res.sendFile(path.join(__dirname, "../db/db.json"));

});

router.post("/notes", (req, res) => {

    let createNote = req.body;

    fs.readFile(db, "utf8", (err, data) => {
       
        allNotes = JSON.parse(data);

        createNote.id = nextID++;

        allNotes.push(createNote);

        let arrayJSON = JSON.stringify(allNotes);

        sendNotesDB(arrayJSON, res);
    });
});

router.delete("/notes/:id", (req, res) => {

    let getID = req.params.id;

    fs.readFile(db, "utf8", (err, data) => {

        allNotes = JSON.parse(data);

        let selectNote = allNotes.filter(note => {
            return note.id != getID;
        });

        let arrayJSON = JSON.stringify(selectNote);

        sendNotesDB(arrayJSON, res);
    });
});

createNote = () => {
    nextID++;
};

sendNotesDB = (dataArray, res) => {
    fs.writeFile(db, dataArray, err => {
        if (err) throw err;
        return res.sendFile(path.join(__dirname, "../public/notes.html"))
    });
};

module.exports = router;