import fs = require("fs");
import exp = require("express");
import path = require("path");
import { v4 as uuidv4 } from "uuid";
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

class Note {
  title: String;
  text: string;
  id: string;
  constructor(id: string, title: string, text: string) {
    this.title = title;
    this.text = text;
    this.id = id;
  }
}

const writeDoc = (data: string) => {
  fs.writeFile("db.json", data, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log("File created!");
  });
};

// ==================================================================
const app = exp();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());
//app.use(exp.static(__dirname + "/public/assests"));
//used "/assets",  this ^ on my own handwriten version
app.use(exp.static("public"));

let notes: Array<Note> = [];

//----------------------------------
//       main page url
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
//---------------------
//apis
app.get("/api/notes", function(req, res) {
  //call get notes function from fs
  //await readDoc(); I know not the best thing to make it sync but its onload when this gets called and  i just needed to make sure this got run first
  notes = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  res.json(notes);
});
app.delete("/api/notes/:id", function(req, res) {
  let id = req.params.id;

  notes = notes.filter(el => el.id !== id);
  res.sendStatus(200);

  console.log(notes);
  let strnotes = JSON.stringify(notes);
  writeDoc(strnotes);
});

app.post("/api/notes", function(req, res) {
  const { title, text } = req.body;
  let id = uuidv4(); //Math.floor(Math.random() * 200);
  let note = new Note(id, title, text);
  notes.push(note);
  console.log(note);
  console.log(notes);
  let strnotes = JSON.stringify(notes);
  res.sendStatus(201);
  writeDoc(strnotes);
});

//sets any other url to homepage
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
