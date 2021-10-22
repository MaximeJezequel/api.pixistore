// Import router: const myRouter = require('./myRoute')
const productsRouter = require("./products")
const itemsRouter = require("./items")

// add your middleware route: app.use('url', myRouter)
const setupRoutes = (app) => {
	app.use("/products", productsRouter)
	app.use("/items", itemsRouter)
}

module.exports = { setupRoutes }
