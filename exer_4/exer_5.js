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

// Get all backend courses which are published, sort by name and display only name and author.
async function getCourses() {
    const courses = await Course.find({ tags: 'backend', isPublished: true })
        .select("name author -_id")
        .sort("name");
    console.log(courses);
}

getCourses();