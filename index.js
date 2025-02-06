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
const CONNECTION = process.env.CONNECTION_STRING;

 

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

// Getting customers data by passing additional (like an id) info to the url
app.get('/api/customers/:id', async(req, res)=>{
    console.log({
        requestParams: req.params,
        requestQuery: req.query 
    });

    
    try{
        //To grab that Id from the url
        const {id: customerId} = req.params; //Destructuring the id from the url 
        console.log(customerId);

        //Alternatively, you can also do this
        const customerId2 = req.params.id; 
        console.log(customerId2);

        //To make a request to the database to find a customer with the id
        const customer = await Customers.findById(customerId);
        console.log(customer);

        //If the customer is not found, return a 404 status code
        if(!customer){
            return res.status(404).json({Error: 'Customer not found'});
        }else {
            res.json({customer});
        }
    }catch(err){
        res.status(500).json({Error: err.message});
    }
    
})

//To Update a customer's data in the database by passing additional (like an id) info to the url
app.put('/api/customers/update/:id', async(req, res)=>{
    try{
        const customerId = req.params.id;
        const result = await Customers.replaceOne({_id: customerId}, req.body);
        console.log(result);
        res.json({updatedCount: result.modifiedCount});
    }catch(err){
        res.status(500).json({Error: 'An error occured while updating the customer'});
    }
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
        await mongoose.connect(CONNECTION)

        app.listen(PORT, ()=> {
            console.log('App running on port:' + PORT);
        })
    } catch (e) {
        console.log(e.message);
    }
}

start();