const connection = require("../db-config")
// const Joi = require("joi")
const db = connection.promise()

//Get all products
const getItemAll = () => {
	let sql = "SELECT * FROM item"
	return db.query(sql).then(([results]) => results)
}

module.exports = {
	getItemAll,
}
