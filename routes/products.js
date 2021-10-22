const productsRouter = require("express").Router()
const Products = require("../models/products")

// Read All products (route)
productsRouter.get("/", (req, res) => {
	Products.getProductAll()
		.then((product) => {
			res.status(200).json(product)
		})
		.catch((err) => {
			console.log(err)
			res.status(500).send("Error Server")
		})
})

// Read product by id (route)
productsRouter.get("/:id", (req, res) => {
	Products.getProductById(req.params.id)
		.then((product) => {
			if (!product) res.status(404).json({ message: `Product not found` })
			else res.status(200).json(product)
		})
		.catch((err) => {
			console.error(err)
			res
				.status(500)
				.json({ message: "Error retrieving product from database" })
		})
})

// Create product (route)
productsRouter.post("/", (req, res) => {
	const {
		product_name,
		product_desc,
		product_img,
		product_img_mini,
		product_price,
		product_creation_date,
	} = req.body

	if (!product_name)
		res.status(401).json({ message: "Product name is required" })
	else {
		Products.getProductByName(product_name).then((duplicateProduct) => {
			console.log("findProductName", duplicateProduct)
			if (duplicateProduct) {
				res.status(401).json({ message: "Product already exists" })
			} else {
				console.log("body", req.body)
				Products.postProduct(
					product_name,
					product_desc,
					product_img,
					product_img_mini,
					product_price,
					product_creation_date
				)
					.then((createdProduct) =>
						res.status(201).json({
							message: `🎉 Product Created !`,
							product: createdProduct,
						})
					)
					.catch((err) => {
						console.error(err)
						res.status(500).json({ message: "Error saving the product" })
					})
			}
		})
	}
})

// Update product (route)
productsRouter.put("/:id", (req, res) => {
	const product_id = req.params.id
	let validationErrors = null
	Products.getProductById(product_id).then((existingProduct) => {
		if (!existingProduct) {
			res
				.status(404)
				.json({ message: `product with id ${product_id} not found.` })
		}
		console.log(req.body)
		validationErrors = Products.validate(req.body, false)
		if (validationErrors) {
			res.status(422).json({ validationErrors: validationErrors.details })
		} else {
			Products.putProduct(product_id, req.body)
				.then(() => {
					res
						.status(200)
						.json({ message: "product updated !", product: { ...req.body } })
				})
				.catch((err) => {
					console.error(err)
					res.status(500).json({ message: "Error updating a product." })
				})
		}
	})
})

//Delete product (route)
productsRouter.delete("/:id", (req, res) => {
	const product_id = req.params.id
	console.log("product_id:", product_id)
	Products.deleteProduct(product_id)
		.then((deletedProduct) => {
			if (deletedProduct)
				res.status(200).json({ message: `🎉 product deleted!` })
			else res.status(404).json({ message: "product not found" })
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({ message: "Error deleting a partner" })
		})
})

module.exports = productsRouter
