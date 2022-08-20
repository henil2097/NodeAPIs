const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
};

app.get("/", (req, res) => {
  res.send("Welcome to courses api");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// /api/courses/1
app.get("/api/courses/:id", (req, res) => {
  // Find course, If not found respond bad request
  const id = parseInt(req.params.id);
  const course = courses.find((course) => course.id === id);

  if (!course)
    return res.status(404).send("The course with given id is not found.");

  res.send(course); // returns course with given id
});

// create new course
app.post("/api/courses", (req, res) => {
  // validate req body, if invalid then respond with 400 Bad request
  const result = validateCourse(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// update course
app.put("/api/courses/:id", (req, res) => {
  // Find course, If not found respond with 404 Not Found
  const id = parseInt(req.params.id);
  const course = courses.find((course) => course.id === id);
  if (!course)
    return res.status(404).send("The course with given id is not found.");

  // validate req body, if invalid then respond with 400 Bad request
  const result = validateCourse(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  // update course, return the updated course
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  // Find course, If not found respond with 404 Not Found
  const id = parseInt(req.params.id);
  const course = courses.find((course) => course.id === id);
  if (!course)
    return res.status(404).send("The course with given id is not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// /api/courses/2022/August?sortBy=year
app.get("/api/courses/:year/:month", (req, res) => {
  res.send({ ...req.params, ...req.query }); // returns object { year:2022, month: August, sortBy=year }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
