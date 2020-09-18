const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const port = 3000
const db = require('./queries')
const accessTokenSecret = 'youraccesstokensecret';
const bcrypt = require("bcryptjs")

const verifyToken = (request, response, next) => {
  const authorizationHeader = request.headers["authorization"]
  if (!authorizationHeader) {
    response.status(401).json("unauthorized")
    return 
  }
  authArray = authorizationHeader.split(" ")
  let bearerToken = null
  if (authArray.length > 1) {
    bearerToken = authArray[1]
  } else {
    bearerToken = authArray[0]
  }
  const decoded = jwt.verify(bearerToken, accessTokenSecret)
  if (decoded && decoded.username) {
    request.username = decoded.username
    next() 
  } else {
    response.status(401).json("unauthorized")
  }
}

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

app.post('/login', async (req, res) => {
  // Read username and password from request body

  const { username, password } = req.body;
  try {
    const user = await db.getUserByUsername(username)

    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password_digest)
      if (isMatch) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username }, accessTokenSecret);
        res.json({accessToken});
        return
      } else {
        res.status(401).json("Password do not match")
      }
    } else {
      res.status(422).json("User does not exist!")
    }
  }
  catch(err) {
    res.status(500).json(err)
    return
  }
});



app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.get('/test', verifyToken, (request, response) => {
  response.json(request.username)
})

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

