"use strict";
exports.__esModule = true;
var fs = require("fs");
var exp = require("express");
var path = require("path");
var uuid_1 = require("uuid");
/*
[
  { "id": 0, "title": "Test Title", "text": "Test text" },
  {
    "id": 1,
    "title": "Note Two",
    "text": "This is a test please....hopefully it works"
  },
  {
    "id": 2,
    "title": "Demo Note",
    "text": "Test this really really need thsi to work!"
  }
]

*/
var Note = /** @class */ (function () {
    function Note(id, title, text) {
        this.title = title;
        this.text = text;
        this.id = id;
    }
    return Note;
}());
var writeDoc = function (data) {
    fs.writeFile("db.json", data, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("File created!");
    });
};
// ==================================================================
var app = exp();
var PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());
//app.use(exp.static(__dirname + "/public/assests"));
//used "/assets",  this ^ on my own handwriten version
app.use(exp.static("public"));
var notes = [];
//----------------------------------
//       main page url
app.get("/", function (req, res) {
    //res.sendFile(path.join(__dirname, "./public/index.html"));
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/notes", function (req, res) {
    // res.sendFile(path.join(__dirname, "./public/notes.html"));
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});
//---------------------
//apis
app.get("/api/notes", function (req, res) {
    //call get notes function from fs
    //await readDoc(); I know not the best thing to make it sync but its onload when this gets called and  i just needed to make sure this got run first
    notes = JSON.parse(fs.readFileSync("db.json", "utf-8"));
    res.json(notes);
});
app["delete"]("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    notes = notes.filter(function (el) { return el.id !== id; });
    res.sendStatus(200);
    console.log(notes);
    var strnotes = JSON.stringify(notes);
    writeDoc(strnotes);
});
app.post("/api/notes", function (req, res) {
    var _a = req.body, title = _a.title, text = _a.text;
    var id = uuid_1.v4(); //Math.floor(Math.random() * 200);
    var note = new Note(id, title, text);
    notes.push(note);
    console.log(note);
    console.log(notes);
    var strnotes = JSON.stringify(notes);
    res.sendStatus(201);
    writeDoc(strnotes);
});
//sets any other url to homepage
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
