const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '635acb1f895f3f03288dc54f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                    
                    url: 'https://res.cloudinary.com/di2wi5tr3/image/upload/v1672235309/YelpCamp/onvzhx2zc2dgl3ollwup.jpg',
                    filename: 'YelpCamp/onvzhx2zc2dgl3ollwup'

                },
                {
                    
                    url: 'https://res.cloudinary.com/di2wi5tr3/image/upload/v1672235310/YelpCamp/dpjd8oudl6vere9b9vih.jpg',
                    filename: 'YelpCamp/dpjd8oudl6vere9b9vih'

                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})