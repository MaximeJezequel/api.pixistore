const connection = require("../db-config")
const Joi = require("joi")
const db = connection.promise()

// Validate Data
const validate = (data, forCreation = true) => {
	const presence = forCreation ? "required" : "optional"
	return Joi.object({
		product_id: Joi.number().presence(presence),
		product_name: Joi.string().max(250).presence(presence),
		product_desc: Joi.string().max(250).presence(presence),
		product_img: Joi.string().max(250).presence(presence),
		product_img_mini: Joi.string().max(250).presence(presence),
		product_price: Joi.number().presence(presence),
		product_creation_date: Joi.date().raw().presence(presence),
	}).validate(data, { abortEarly: false }).error
}

//Read all products (model)
const getProductAll = () => {
	let sql = "SELECT * FROM product"
	return db.query(sql).then(([results]) => console.log(results) || results)
}

// Read product by product_id (model)
const getProductById = (id) => {
	let sql = "SELECT * FROM product WHERE product_id = ?"
	return db.query(sql, [id]).then(([results]) => results[0])
}

// Read product by product_name (model)
const getProductByName = (name) => {
	let sql = "SELECT * FROM product WHERE product_name LIKE ?"
	return db.query(sql, [name]).then(([results]) => results[0])
}

// Create new product (model)
const postProduct = (
	product_name,
	product_desc,
	product_img,
	product_img_mini,
	product_price,
	product_creation_date
) => {
	let sql = "INSERT INTO product SET ?"
	return db
		.query(sql, {
			product_name,
			product_desc,
			product_img,
			product_img_mini,
			product_price,
			product_creation_date,
		})
		.then(([result]) => {
			const product_id = result.insertId
			return {
				product_id,
				product_name,
				product_desc,
				product_img,
				product_img_mini,
				product_price,
				product_creation_date,
			}
		})
}

// Update product (model)
const putProduct = (product_id, newAttributes) => {
	let sql = "UPDATE product SET ? WHERE product_id = ?"
	return db.query(sql, [newAttributes, product_id])
}

// Destroy product (model)
const deleteProduct = (product_id) => {
	let sql = "DELETE FROM product WHERE product_id = ?"
	return db
		.query(sql, [product_id])
		.then(([result]) => result.affectedRows !== 0)
}

module.exports = {
	getProductAll,
	getProductById,
	getProductByName,
	postProduct,
	putProduct,
	deleteProduct,
	validate,
}
