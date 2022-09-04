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

// Get all backend and frontent courses which are published, sort by name and display only name and author.
async function getCourses() {
    const courses = await Course.find({ tags: { $in: ['backend', 'frontend'] }, isPublished: true })
        .select("name author -_id")
        .sort("-price");
    console.log(courses);
}

getCourses();