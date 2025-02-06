const express = require('express');
const app = express();
app.use(express.json());

// app.get('/home', (request, response) => {
//     response.send('Welcome to my website homepage!');
// });
// Tell Express to understand JSON

// Create a list to store our items
let items = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" }
];

// Show all items
app.get('/items', (request, response) => {
    response.json(items);
});

// Add a new item
app.post('/newItems', (request, response) => {
    const newItem = {
        id: items.length + 1,
        name: request.body.name
    };
    items.push(newItem);
    response.json(newItem);
});


app.listen(2000, () => {
    console.log('Server is running on port 1500');
});