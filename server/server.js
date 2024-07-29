const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const UserRouter = require("./routes/usersRoute");
const NotesRouter = require("./routes/notesRoute");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.ATLAS_URI;

console.log(uri);
mongoose.connect(uri, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection is established.");
});

app.use("/users", UserRouter);
app.use("/notes", NotesRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}

app.listen(port, () => {
  console.log(`Server is running in port: ${port}`);
});
