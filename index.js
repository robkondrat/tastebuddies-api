const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

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
app.put('/restaurants/:id', updateRestaurant)
app.delete('/restaurants/:id', db.deleteRestaurant)

app.get('/menu_items', db.getMenuItems)
app.get('/menu_items/:id', db.getMenuItemById)
app.post('/menu_items', db.createMenuItem)
app.put('/menu_items/:id', updateMenuItem)
app.delete('/menu_items/:id', db.deleteMenuItem)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

