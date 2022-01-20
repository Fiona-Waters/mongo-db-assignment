// Fiona Waters Student Number 20095357
// Databases Assignment 2 - Mongo DB

//Part 1 Read(Find)
// Query 1
// This query shows all animated movies made after the year 2000 with a runtime of 2 hours or less. 
// The result shows the title and any viewer tomatoes ratings if they exist, sorted by title in ascending order.

db.movies.find(
    {
        genres: "Animation",
        year: { $gt: 2000 },
        runtime: { $lte: 2 },
    },
    {
        _id: 0, title: 1, "tomatoes.viewer.rating": 1
    }
).sort({ "title": 1 }).pretty()

// Query 2
// This query shows movies starring Ryan Reynolds made in or before 2015 with a runtime longer than 2 hours.
// The result provides the title and plot. It orders by title in descending order and limits results to 5.

db.movies.find(
    {
        cast: "Ryan Reynolds",
        year: { $lte: 2015 },
        runtime: { $gt: 2 }
    },
    {
        _id: 0, title: 1, plot: 1
    }
).sort({ title: -1 }).limit(5).pretty()

// Query 3
// This query shows 10 comedy movies that are not rated G made in France, 
// showing the title and director/s and sorted in ascending order by title.

db.movies.find(
    {
        genres: "Comedy",
        rated: { $nin: ["G"] },
        countries: { $in: ["France"] }
    },
    {
        _id: 0, title: 1, directors: 1
    }
).sort({ title: 1 }).limit(10).pretty()

// Query 4
// This query shows movies made in or after 2010, in genres other than comedy and short with comments by Amy Wolfe. 
// It shows the title, genres and comments, skipping the first 10.

db.movies.find(
    {
        year: { $gte: 2010 },
        genres: { $nin: ["Comedy", "Short"] },
        comments: {
            $elemMatch: {
                name: "Amy Wolfe"
            }
        }
    },
    {
        _id: 0, title: 1, genres: 1, comments: 1
    }
).skip(10).pretty()

// Query 5
// This query shows/counts the number of movies in the database under the drama genre with 
// Judi Dench in the cast, made between 1980 and 2015.

db.movies.find(
    {
        genres: "Drama",
        cast: "Judi Dench",
        year: { $gt: 1980, $lt: 2015 }
    }
).count()


// Query 6
// This query shows movies made either in the year 2000 or in Ireland, with an IMDB 
// rating of more than 6.5 and with more than 100 votes. 
// It shows the title, year, countries, imdb rating and imdb votes. It is limited to 10 results.
// The results are sorted by number of imdb votes in ascending order.

db.movies.find(
    {
        $or: [
            { year: 2000 },
            { countries: ["Ireland"] }
        ],
        "imdb.rating": { $gt: 6.5 },
        "imdb.votes": { $gt: 100 }
    },
    {
        _id: 0, title: 1, year: 1, countries: 1, "imdb.rating": 1, "imdb.votes": 1
    }
).sort({ "imdb.votes": 1 }).limit(10).pretty()


// Part 2 Create(Insert)
// Document 1
// Insert first document - Wonder Woman Movie from 2017.

db.movies.insertOne(
    {
        _id: 1,
        title: "Wonder Woman",
        year: 2017,
        runtime: 2,
        cast: ["Gal Gadot", "Chris Pine", "Connie Nielsen", "Robin Wright"],
        plot: "Before she was Wonder Woman (Gal Gadot), she was Diana, princess of the Amazons, trained to be an unconquerable warrior. Raised on a sheltered island paradise, Diana meets an American pilot (Chris Pine) who tells her about the massive conflict that's raging in the outside world. Convinced that she can stop the threat, Diana leaves her home for the first time. Fighting alongside men in a war to end all wars, she finally discovers her full powers and true destiny.",
        directors: ["Patty Jenkins"],
        imdb: {
            rating: 7.4,
            votes: 724,
            genres: ["Fantasy", "Action", "Adventure"]
        }
    }
)

// Insert second document - Small Foot Movie from 2018.

db.movies.insertOne(
    {
        _id: 2,
        title: "Small Foot",
        year: 2018,
        runtime: 1,
        cast: ["Channing Tatum", "James Corden", "Zendaya", "Common", "LeBron James"],
        plot: "Migo is a friendly Yeti whose world gets turned upside down when he discovers something that he didn't know existed -- a human. He soon faces banishment from his snowy home when the rest of the villagers refuse to believe his fantastic tale. Hoping to prove them wrong, Migo embarks on an epic journey to find the mysterious creature that can put him back in good graces with his simple community.",
        directors: ["Karey Kirkpatrick"],
        imdb: {
            rating: 6.6,
            votes: 233,
            genres: ["Animation", "Comedy", "Adventure"]
        }
    }
)

// Insert third document - Avengers Endgame movie from 2019.

db.movies.insertOne(
    {
        _id: 3,
        title: "Avengers Endgame",
        year: 2019,
        runtime: 3,
        cast: ["Robert Downey Jr", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson"],
        plot: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.",
        directors: ["Anthony Russo", "Joe Russo"],
        imdb: {
            rating: 8.4,
            votes: 9300,
            genres: ["Action", "Drama", "Adventure"]
        }
    }
)

// Insert fourth and fifth documents - 2 Users added 
//create a users collection
db.createCollection("users")

// add 2 users
db.users.insertMany(
    [
        {
            user_id: 4,
            name: "Fiona Waters",
            title: "Owner",
            email: "fiona@fiona.com",
            password: "1a2s3d4f5g",
            favourites: [1, 2]

        },
        {
            user_id: 5,
            name: "Ann Murphy",
            title: "Assistant",
            email: "ann@ann.com",
            password: "9h7f6d4ed4",
            favourites: [3]
        }

    ])

// Part 3 Update
// Update 1 - increasing the imdb votes by 1 and updating the imdb rating to a new value
db.movies.updateOne(
    { _id: 1 },
    {
        $inc: { "imdb.votes": 1 }
    },
    {
        $set:
            { "imdb.rating": 9.1 }
    }
)

// Update 2 - adding a tomatoes subdocument to Avengers Endgame Movie record (_id:3)
db.movies.updateOne(
    { _id: 3 },
    {
        $set: {
            "tomatoes": {
                "viewer": {
                    "rating": 4.5,
                    "numReviews": 109
                },
                "lastUpdated": ISODate("2021-12-28T09:48:29Z")
            }
        }
    }
)

// Update 3 - adding a new favourite to the user favourites array (user_id:4)
db.users.updateOne(
    { user_id: 4 },
    { $push: { "favourites": 3 } }
)

// Update 4 - adding a cast member and director (if not already there) to movie with _id:2 (Small Foot).
db.movies.updateOne(
    { "_id": 2 },
    {
        $addToSet: {
            "cast": "Danny DeVito",
            "directors": "Jason Reisig"
        }
    }
)

// Update 5 - updating all tomatoes viewers ratings that are currently 3.5 to 4.
db.movies.updateMany({ "tomatoes.viewer.rating": 3.5 },
    {
        $set: {
            "tomatoes.viewer.rating": 4
        }
    },

)

// Part 4 - Delete
// Deleting movie with _id:1 (Wonder Woman 2017 - Added in Create/Insert section above)

db.movies.deleteOne({ _id: 1 })


