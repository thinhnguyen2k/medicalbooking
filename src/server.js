
const express = require('express')
import bodyParser from "body-parser";
const staffRouter = require('./controllers/StaffRouter')
const loginRouter = require('./controllers/LoginRouter')
const patientRouter = require('./controllers/PatientRouter')
const roleRouter = require('./controllers/RoleRouter')

// import cors from 'cors';
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) // use req.body


require('dotenv').config();

app.use('/api/login', loginRouter)
app.use('/api/staff', staffRouter)
app.use('/api/patient', patientRouter)
app.use('/api/role', roleRouter)







let port = process.env.PORT || 6969;
// Port === undefined => port = 6969
app.listen(port, () => {
    console.log("Backend Nodejs is runing on the port: " + port);
})