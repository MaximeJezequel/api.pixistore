const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const multer = require("multer")

const connection = require("./db-config.js")
const app = express()

// Declare port
const port = process.env.PORT || 4000

// Test connection MySQL
connection.connect((err) => {
	if (err) {
		console.error("error connecting: " + err.stack)
	} else {
		console.log("connected to database with threadId :  " + connection.threadId)
	}
})

// Route middleware
app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(__dirname + "/public"))

app.get("/", (req, res) => {
	res.status(200).send("Salut Pixilive ! Welcome home !")
})

// Test if server is running
app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
