const mongoose = require('mongoose');

const username = 'egyan';
const password = 'egyan123';
const dbName = 'exerdb';
const url = `mongodb://${username}:${password}@localhost:27017/${dbName}?authSource=admin`;

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected ...'))
    .catch(err => console.log(err));


const courseSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    tags: [String]
});

const Course = mongoose.model('Course', courseSchema);


courseData = [
    {
        "tags": [
            "express",
            "backend"
        ],
        "date": "2018-01-24T21:42:27.388Z",
        "name": "Express.js Course",
        "author": "Shawn Melody",
        "isPublished": true,
        "price": 10,
    },
    {
        "tags": [
            "node",
            "backend"
        ],
        "date": "2018-01-24T21:42:47.912Z",
        "name": "Node.js Course",
        "author": "Shawn Melody",
        "isPublished": true,
        "price": 20,
    },
    {
        "tags": [
            "aspnet",
            "backend"
        ],
        "date": "2018-01-24T21:42:59.605Z",
        "name": "ASP.NET MVC Course",
        "author": "Shawn Melody",
        "isPublished": true,
        "price": 15,
    },
    {
        "tags": [
            "react",
            "frontend"
        ],
        "date": "2018-01-24T21:43:21.589Z",
        "name": "React Course",
        "author": "Shawn Melody",
        "isPublished": false,
    },
    {
        "tags": [
            "node",
            "backend"
        ],
        "date": "2018-01-24T21:44:01.075Z",
        "name": "Node.js Course by Jack",
        "author": "Jack",
        "isPublished": true,
        "price": 12,
    },
    {
        "tags": [
            "node",
            "backend"
        ],
        "date": "2018-01-24T21:47:53.128Z",
        "name": "Node.js Course by Mary",
        "author": "Mary",
        "isPublished": false,
        "price": 12,
    },
    {
        "tags": [
            "angular",
            "frontend"
        ],
        "date": "2018-01-24T21:56:15.353Z",
        "name": "Angular Course",
        "author": "Shawn Melody",
        "isPublished": true,
        "price": 15,
    }
]

Course.insertMany(courseData)
    .then(() => console.log("Course data Saved Successfully!"))
    .catch((err) => console.log(err));