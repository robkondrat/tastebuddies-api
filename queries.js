require('dotenv').config()

const Pool = require('pg').Pool
// const {pool} = require('./config')
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
const bcrypt = require("bcryptjs")

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserByUsername = (username) => {
  return pool.query(`SELECT * FROM users WHERE username = '${username}'`)
    .then(results => {
      return results.rows[0]
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

const createUser = (request, response) => {
  const { username, email, password_digest } = request.body
  const salt = bcrypt.genSaltSync(10)

  const hash = bcrypt.hashSync(password_digest, salt)

  pool.query('INSERT INTO users (username, email, password_digest) VALUES ($1, $2, $3) RETURNING id', [username, email, hash], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, email } = request.body

  pool.query(
    'UPDATE users SET username = $1, email = $2 WHERE id = $3',
    [username, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const getCuisines = async (request, response) => {
  const cuisineResponse = await pool.query('SELECT * FROM cuisines ORDER BY id ASC')
  const cuisines = cuisineResponse.rows

  for ( const cuisine of cuisines ) {
    const restaurants = await pool.query(`SELECT * FROM restaurants WHERE restaurants.cuisine_id = ${cuisine.id}`)
    cuisine.restaurants = restaurants.rows
    for ( const restaurant of cuisine.restaurants ) {
      const menu_items = await pool.query(`SELECT * FROM menu_items WHERE menu_items.restaurant_id = ${restaurant.id}`)
      restaurant.menu_items = menu_items.rows
    }
  }
  response.status(200).json(cuisines)
}

const getCuisineById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM cuisines WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRestaurants = (request, response) => {

  pool.query('SELECT * FROM restaurants ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })
}

const getRestaurantById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM restaurants WHERE id = $1', [id], (error, result1) => {
    pool.query('SELECT * FROM menu_items WHERE restaurant_id = $1', [id], function (error, result2) {
      var ret = {
        restaurants: result1.rows,
        menu_items: result2.rows,
      };
      if (error) {
        throw error;
      }
      response.status(200).json(ret);
    })
    if (error) {
      throw error
    }
    // response.status(200).json(results.rows)
  })
}

const createRestaurant = (request, response) => {
  const { name, address, phone_number, website, image_url, cuisine_id } = request.body

  pool.query('INSERT INTO restaurants (name, address, phone_number, website, image_url, cuisine_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [name, address, phone_number, website, image_url, cuisine_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Restaurant added with ID: ${results.rows[0].id}`)
  })
}

const updateRestaurant = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, address, phone_number, website, image_url, cuisine_id } = request.body

  pool.query(
    'UPDATE restaurants SET name = $1, address = $2, phone_number = $3, website = $4, image_url = $5, cuisine_id = $6 WHERE id = $7',
    [name, address, phone_number, website, image_url, cuisine_id, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Restaurant modified with ID: ${id}`)
    }
  )
}

const deleteRestaurant = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM restaurants WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Restaurant deleted with ID: ${id}`)
  })
}

const getMenuItems = (request, response) => {
  pool.query('SELECT * FROM menu_items ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getMenuItemById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM menu_items WHERE id = $1', [id], (error, results) => {
  if (error) {
    throw error
  }
  response.status(200).json(results.rows)
})
}

const createMenuItem = (request, response) => {
  const { name, description, image_url, restaurant_id } = request.body

  pool.query('INSERT INTO menu_items (name, description, image_url, restaurant_id) VALUES ($1, $2, $3, $4)', [name, description, image_url, restaurant_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Menu Item added with ID: ${result.insertId}`)
  })
}

const updateMenuItem = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, description, image_url, restaurant_id } = request.body

  pool.query(
    'UPDATE menu_items SET name = $1, description = $2, image_url = $3, restaurant_id = $4 WHERE id = $5',
    [name, description, image_url, restaurant_id, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Menu Item modified with ID: ${id}`)
    }
  )
}

const deleteMenuItem = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM menu_items WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Menu Item deleted with ID: ${id}`)
  })
}



module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  getCuisines,
  getCuisineById,
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
}