Vue.component("note", {
  props: ["note"],

  template: `<div class="row"><div class="col s6 truncate" id="note.id">{{note.note}} </div> <div class="col s4"><button class=" btn right red darken-2" @click="clearNote()">delete</button></div></div>`,
  methods: {
    clearNote: function() {
      this.$root.deleteNote(this.note);
    }
  }
});

const app = new Vue({
  el: "#app",
  data: {
    notes: [],
    note: "",
    displayNote: ""
  },
  mounted() {
    this.start();
    console.log("did it work");
  },
  methods: {
    start: async function() {
      //call this onpage load
      try {
        const { data } = await axios.get("/api/notes");
        console.log(data);
        if (data.length == 0) {
          this.notes = [];
        } else {
          this.notes = data;
        }
        console.log("----data notes----");
        console.log(this.notes);
      } catch (error) {
        console.error(error);
      }
    },
    add: function() {
      let id = generate();
      axios
        .post("/api/notes", {
          id: id,
          note: "Flintstone"
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteNote: function(ob) {
      console.log(`this id was deleted ${ob.id} ${ob.note}`);
    }
  },
  generate: function() {
    let id = this.notes.length;
    return id;
  }
});
