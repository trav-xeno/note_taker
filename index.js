"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var exp = require("express");
var path = require("path");
var Note = /** @class */ (function () {
    function Note(id, note) {
        this.id = id;
        this.note = note;
    }
    return Note;
}());
// =============================================================
var app = exp();
var PORT = 8080;
// Sets up the Express app to handle data parsing
app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());
app.use("/resources", exp.static(__dirname + "/assests"));
var note1 = new Note(0, "this is a test to see if stuff works! some more randome stuff hopefully this is hidden by the rramework");
var note2 = new Note(1, "this is the second note. hopefully this work");
var notes = [];
notes.push(note1);
notes.push(note2);
//---------------------------
//    main page url
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
//---------------------
//apis
app.get("/api/notes", function (req, res) {
    //call get notes function from fs
    res.json(notes);
});
app.get("/api/deletenote/:id", function (req, res) { });
app.post("/api/note", function (req, res) {
    var _a = req.body, id = _a.id, content = _a.content;
    var note = new Note(id, content);
});
app.get("*", function (req, res) {
    res.status(404).send("Page Not found!");
});
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
var writeDoc = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        fs.writeFile("data.json", data, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("File created!");
        });
        return [2 /*return*/];
    });
}); };
var readDoc = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            fs.readFile("data.json", function (data) {
                //will need to make a list o objects that data gets called by front end
                console.log(data);
            });
        }
        catch (err) {
            console.log("There was an error while trying to create the readme!");
            console.log(err);
        }
        return [2 /*return*/];
    });
}); };
var start = function () { };
start();
