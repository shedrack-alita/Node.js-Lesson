# Beginner's Guide to Node.js

## 1. What is Node.js?
Node.js lets you run JavaScript outside of a web browser! Think of it like a special program that understands JavaScript and helps you build applications.

### Installation
1. Go to nodejs.org
2. Download the "LTS" (Long Term Support) version
3. Follow the installation steps
4. Check if it worked by opening your terminal and typing:
```bash
node --version
```

## 2. Your First Node.js Program
Let's start with the classic "Hello World":

```javascript
// Create a file named hello.js
console.log("Hello World!");

// Run it by typing in terminal:
// node hello.js
```

## 3. Basic Node.js Concepts

### Working with Files
Let's create and read a simple text file:
```javascript
// file-demo.js
const fs = require('fs');

// Writing to a file
fs.writeFile('note.txt', 'Hello from Node.js!', (error) => {
    if (error) {
        console.log('Oops, something went wrong!');
        return;
    }
    console.log('Successfully wrote to file!');
});

// Reading from a file
fs.readFile('note.txt', 'utf8', (error, data) => {
    if (error) {
        console.log('Oops, something went wrong!');
        return;
    }
    console.log('File contents:', data);
});
```

### Creating a Simple Web Server
Let's make a basic website:
```javascript
// server.js
const http = require('http');

// Create a server
const server = http.createServer((request, response) => {
    // response.writeHead(200, {'Content-Type': 'text/plain'});
    // response.end('Welcome to my first Node.js website!');
    response.statusCode: 200;
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});

// Run this file and visit http://localhost:3000 in your browser!
```

## 4. Introduction to Express
Express makes it easier to create web applications. Think of it like a helper that makes Node.js simpler to use.

### Simple Express Server
```javascript
// First install Express:
// npm install express

// app.js
const express = require('express');
const app = express();

// Create a homepage
app.get('/', (request, response) => {
    response.send('Welcome to my Express website!');
});

// Create an about page
app.get('/about', (request, response) => {
    response.send('This is my about page!');
});

// Start the server
app.listen(3000, () => {
    console.log('Website is running at http://localhost:3000/');
});
```

## 5. Working with JSON Data
JSON is how we store and send data in Node.js applications:

```javascript
// data-demo.js
const express = require('express');
const app = express();

// Tell Express to understand JSON
app.use(express.json());

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
app.post('/items', (request, response) => {
    const newItem = {
        id: items.length + 1,
        name: request.body.name
    };
    items.push(newItem);
    response.json(newItem);
});

app.listen(3000, () => {
    console.log('Server running!');
});
```

## 6. Simple Database Operations
Let's start with basic MongoDB operations using Mongoose:

```javascript
// First install Mongoose:
// npm install mongoose

const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create a simple User model
const User = mongoose.model('User', {
    name: String,
    age: Number
});

// Create a new user
const createUser = async () => {
    try {
        const user = new User({
            name: 'John',
            age: 25
        });
        await user.save();
        console.log('User saved!');
    } catch (error) {
        console.log('Oops, something went wrong!');
    }
};

// Find all users
const findUsers = async () => {
    try {
        const users = await User.find();
        console.log('Users:', users);
    } catch (error) {
        console.log('Oops, something went wrong!');
    }
};
```

## Practice Projects Ideas
1. Create a simple todo list that stores items in a file
2. Build a basic website with a homepage and about page
3. Make a small API that stores and shows your favorite books

## Tips for Beginners
- Always start small and build up gradually
- Use `console.log()` to understand what your code is doing
- Don't worry about making mistakes - they help you learn!
- Test your code frequently as you write it
- Take breaks when you get stuck

Remember: Every expert was once a beginner! Take your time to understand each concept before moving to the next one.
