const express =require('express')
const exphbs =require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require("dotenv");
const routes = require("./routes");



const app = express();

app.use(express.json())

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT , async ()=>{
    console.log(`Server started on port ${PORT}`)
    // await sequelize.authenticate()
    console.log('Database connected')
}
)