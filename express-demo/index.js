const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World...!");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

// /api/courses/1
app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id); // returns 1
});

// /api/courses/2022/August?sortBy=year
app.get("/api/courses/:year/:month", (req, res) => {
  res.send({ ...req.params, ...req.query }); // returns object { year:2022, month: August, sortBy=year }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
