const itemsRouter = require("express").Router()
const Items = require("../models/items")

// GET All items
itemsRouter.get("/", (req, res) => {
	Items.getItemAll()
		.then((item) => {
			res.status(200).json(Items)
		})
		.catch((err) => {
			console.log(err)
			res.status(500).send("Error Server")
		})
})

module.exports = itemsRouter
