const express = require('express');
require("dotenv").config();
const cors = require("cors");
const app = express();
const router = require('./routes/index')
const addingRating = require("./models/addingRating");
const verifyAdmin = require("./models/verifyAdmin");
const sendErrorMessage = require("./models/sendErrorMessage");
const getLastToken = require("./models/getLastToken");
const fileUpload = require('express-fileupload');
const connection = require("./db");
const path = require("path");
const onlineUpdater = require('./utils/onlineUpdater')
// const bitrateUpdater = require('./utils/bitrateUpdater')

connection();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
onlineUpdater();
// bitrateUpdater();
app.use("/addingRating", addingRating);
app.use("/verifyAdmin", verifyAdmin);
app.use("/sendErrorMessage", sendErrorMessage);
app.use("/sendErrorMessage", sendErrorMessage);
app.use("/getLastToken", getLastToken);
app.use('/api', router);


const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
