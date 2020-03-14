import fs = require("fs");
import exp = require("express");
import path = require("path");

class Note {
  id: Number;
  note: String;
  constructor(id: Number, note: string) {
    this.id = id;
    this.note = note;
  }
}

// =============================================================
const app = exp();
const PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());
app.use("/resources", exp.static(__dirname + "/assests"));

let note1 = new Note(
  0,
  "this is a test to see if stuff works! some more randome stuff hopefully this is hidden by the rramework"
);
let note2 = new Note(1, "this is the second note. hopefully this work");
let notes: Array<Note> = [];
notes.push(note1);
notes.push(note2);
//---------------------------
//    main page url
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
//---------------------
//apis
app.get("/api/notes", function(req, res) {
  //call get notes function from fs
  res.json(notes);
});
app.get("/api/deletenote/:id", function(req, res) {});

app.post("/api/note", function(req, res) {
  const { id, content } = req.body;
  let note = new Note(id, content);
});

app.get("*", function(req, res) {
  res.status(404).send("Page Not found!");
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

const writeDoc = async (data: string) => {
  fs.writeFile("data.json", data, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log("File created!");
  });
};
const readDoc = async () => {
  try {
    fs.readFile("data.json", (data: any) => {
      //will need to make a list o objects that data gets called by front end
      console.log(data);
    });
  } catch (err) {
    console.log(`There was an error while trying to create the readme!`);
    console.log(err);
  }
};

const start = () => {};
start();
