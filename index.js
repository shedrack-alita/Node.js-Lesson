const express = require('express');
const mongoose = require('mongoose');
const Customers = require('./src/models/customers.js');
const app = express();
mongoose.set('strictQuery', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();     
}
const PORT = process.env.PORT || 4000;
const CONNECTION = process.env.CONNECTION

 

const customer = new Customers({
    name: 'Felix',
    industry: 'Painting'
});

app.get('/', (req, res)=>{
    res.send('Welcome To FortuneTech!');
});

//Get all the customers in the database
app.get('/api/customers', async(req, res)=>{
    // console.log(await mongoose.connection.db.listCollections().toArray()); //Logging out list of database collections to the console.
    
    try {
        const result = await Customers.find();
        // res.send({'Customers': result});
        res.json({'Customers': result});
    } catch (err) {
        res.status(500).json({Error: err.message});
    }
});

// Getting customers data by passing additional info to the url
app.get('/api/customers/:id/:test', async(req, res)=>{
    res.json({
        requestParams: req.params,
        requestQuery: req.query 
    });
})

app.post('/api/customers/save', async(req, res)=>{
    console.log(req.body);
    const customers = new Customers(req.body);
    try {
        await customers.save();
        res.status(200).json({customers});
    } catch (err) {
        res.status(500).json({Error: err.message});
    }
})






const start = async()=>{
    try {
        await mongoose.connect(CONNECTION);

        app.listen(PORT, ()=> {
            console.log('App running on port:' + PORT);
        })
    } catch (e) {
        console.log(e.message);
    }
}

start();