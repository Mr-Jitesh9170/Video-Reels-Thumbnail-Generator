const express = require("express")
const path = require("path")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads/thumbnail', express.static(path.join(__dirname, 'uploads', 'thumbnail')));

app.use(require("./routes/thumbnailRoutes"))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

const port = process.env.PORT || 8080
app.listen(8080, () => {
    console.log("server is running at ->", port)
})