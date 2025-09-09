const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 


const port = process.env.PORT || 8080
app.listen(8080, () => {
    console.log("server is running at ->", port)
})