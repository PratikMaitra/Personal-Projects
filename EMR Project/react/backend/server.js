const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");

db.sequelize.sync();
// force: true will drop the table if it already exists
//db.sequelize.sync({force: true}).then(() => {
//  console.log('Drop and Resync Database with { force: true }');
//  initial();
//});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our healthcare application!" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/profile.routes')(app);
require('./app/routes/person.routes')(app);
require('./app/routes/person-management.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// this can all be deleted once we remove the complete resync
const Role = db.role;
const Gender = db.gender;
const Pronoun = db.pronoun;
const SexAtBirth = db.sexAtBirth;
const State = db.state;

function initial() {
  // Genders
  Gender.create({gender: "Man"});
  Gender.create({gender: "Woman"});
  Gender.create({gender: "Non-Binary"});
  // Pronouns
  Pronoun.create({pronoun: "He / Him"});
  Pronoun.create({pronoun: "She / Her"});
  Pronoun.create({pronoun: "They / Them"});
  // Sex At Birth
  SexAtBirth.create({sex_at_birth: "Male"});
  SexAtBirth.create({sex_at_birth: "Female"});
  SexAtBirth.create({sex_at_birth: "Intersexed"});
  // States
  State.create({state: "Alabama"});
  State.create({state: "Alaska"});
  State.create({state: "Arizona"});
  State.create({state: "Arkansas"});
  State.create({state: "California"});
  State.create({state: "Colorado"});
  State.create({state: "Connecticut"});
  State.create({state: "Delaware"});
  State.create({state: "Florida"});
  State.create({state: "Georgia"});
  State.create({state: "Hawaii"});
  State.create({state: "Idaho"});
  State.create({state: "Illinois"});
  State.create({state: "Indiana"});
  State.create({state: "Iowa"});
  State.create({state: "Kansas"});
  State.create({state: "Kentucky"});
  State.create({state: "Louisiana"});
  State.create({state: "Maine"});
  State.create({state: "Maryland"});
  State.create({state: "Massachusetts"});
  State.create({state: "Michigan"});
  State.create({state: "Minnesota"});
  State.create({state: "Mississippi"});
  State.create({state: "Missouri"});
  State.create({state: "Montana"});
  State.create({state: "Nebraska"});
  State.create({state: "Nevada"});
  State.create({state: "New Hampshire"});
  State.create({state: "New Jersey"});
  State.create({state: "New Mexico"});
  State.create({state: "New York"});
  State.create({state: "North Carolina"});
  State.create({state: "North Dakota"});
  State.create({state: "Ohio"});
  State.create({state: "Oklahoma"});
  State.create({state: "Oregon"});
  State.create({state: "Pennsylvania"});
  State.create({state: "Rhode Island"});
  State.create({state: "South Carolina"});
  State.create({state: "South Dakota"});
  State.create({state: "Tennessee"});
  State.create({state: "Texas"});
  State.create({state: "Utah"});
  State.create({state: "Vermont"});
  State.create({state: "Virginia"});
  State.create({state: "Washington"});
  State.create({state: "West Virginia"});
  State.create({state: "Wisconsin"});
  State.create({state: "Wyoming"});

  // roles
  Role.create({name: "user"});
  Role.create({name: "moderator"});
  Role.create({name: "admin"});
}