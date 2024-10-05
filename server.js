const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

//import routes
const adminRoutes = require('./routes/adminroutes');
const doctorRoutes = require('./routes/doctorroutes');
const labRoutes = require('./routes/labroutes');
const receptionistRoutes = require('./routes/receptionistroutes');
const authRoutes = require('./routes/authroutes');

//initialize app
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => console.log('Connected to database'))
.catch((err) => console.log(`Datbase connection error:', ${err}`));

//Routes
app.use('/auth', authRoutes);
app.use('api/admin', adminRoutes);
app.use('api/doctor', doctorRoutes);
app.use('api/labTechnician', labRoutes);
app.use('api/receptionist', receptionistRoutes);

//render home page for api testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to this EMR' });
});

//Handling middleware errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oops! Something broke!');
});

const PORT = process.env.PORT || 5080

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});