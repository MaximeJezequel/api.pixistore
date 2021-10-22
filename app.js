const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const multer = require("multer")
const { setupRoutes } = require("./routes")
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

//multer storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/images")
	},
	filename: (req, file, cb) => {
		console.log("file", file)
		cb(null, file.originalname)
	},
})

//multer upload
const upload = multer({
	storage: storage,
})

app.post(
	"/upload",
	upload.fields([{ name: "product_img" }, { name: "product_img_mini" }]),
	(req, res) => {
		res.status(200).json("Uploaded")
	}
)

// Route middleware
app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(__dirname + "/public"))

app.get("/", (req, res) => {
	res.status(200).send("Salut Pixilive ! Welcome home !")
})

setupRoutes(app)

// Test if server is running
app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
