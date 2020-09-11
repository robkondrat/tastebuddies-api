const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000
const db = require('./queries')
const accessTokenSecret = 'youraccesstokensecret';
const bcrypt = require("bcryptjs")

var cors = require('cors')
app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.post('/login', (req, res) => {
  // Read username and password from request body

  const { username, password } = req.body;

  const saltRounds = 10

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      throw err
    } else {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          throw err
        } else {
          console.log(hash)
          bcrypt.compare(password, hash, function(err, isMatch) {
            if (err) {
              throw err
            } else if (!isMatch) {
              console.log("Password doesn't match!")
            } else {
              console.log("Password matches!")
            }
          })
        }
      })
    }
  })

  // Filter user from the users array by username and password
  const user = users.find(u => { return u.username === username && u.password === password });

  if (user) {
      // Generate an access token
      const accessToken = jwt.sign({ username: user.username }, accessTokenSecret);

      res.json({
          accessToken
      });
  } else {
      res.send('Username or password incorrect');
  }
});

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.get('/cuisines', db.getCuisines)
app.get('/cuisines/:id', db.getCuisineById)

app.get('/restaurants', db.getRestaurants)
app.get('/restaurants/:id', db.getRestaurantById)
app.post('/restaurants', db.createRestaurant)
app.put('/restaurants/:id', db.updateRestaurant)
app.delete('/restaurants/:id', db.deleteRestaurant)

app.get('/menu_items', db.getMenuItems)
app.get('/menu_items/:id', db.getMenuItemById)
app.post('/menu_items', db.createMenuItem)
app.put('/menu_items/:id', db.updateMenuItem)
app.delete('/menu_items/:id', db.deleteMenuItem)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

