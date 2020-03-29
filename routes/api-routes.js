// const db = require("../models");

// module.exports = (app) => {
//     app.get("/api/workouts", (req, res) => {
//         db.Workout.find({})
//             .then(dbWorkout => {
//                 res.json(dbWorkout);
//             })
//             .catch(err => {
//                 res.status(400).json(err);
//             });
//     });

//     app.post("/api/workouts", ({
//         body
//     }, res) => {
//         db.Workout.create(body)
//             .then(dbWorkout => {
//                 res.json(dbWorkout);
//             })
//             .catch(err => {
//                 res.status(400).json(err);
//             });
//     });

//     app.put('/api/workouts/:id', (req, res) => {
//         db.Workout.findByIdAndUpdate(req.params.id, {
//                 $push: {
//                     exercises: req.body
//                 }
//             })
//             .then(dbWorkout => {
//                 res.json(dbWorkout);
//             })
//             .catch(err => {
//                 res.status(400).json(err);
//             });
//     });

//     app.get("/api/workouts/range", (req, res) => {
//         db.Workout
//             .find({})
//             .then(workout => {
//                 res.json(workout);
//             })
//             .catch(err => {
//                 res.status(400).json(err);
//             });
//     });
// };

const db = require('../models');


module.exports = function(app) {

// create new workout
app.post("/api/workouts", ({ body }, res) => {

        db.Workout.create(body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
        .catch( err => {
            res.status(400).json(err);
        });
});

// get last workout
app.get("/api/workouts", (req, res) => {
    db.Workout.findOne({}).sort({ day: -1 })
        .then( dbWorkout => {           
        res.send(dbWorkout);
        })
        .catch( err => {
        res.status(400).json(err);
        });
});

// get all workouts
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).sort({ _id: -1 })
        .then( dbWorkout => {
        res.send(dbWorkout);
        })
        .catch(err => {
        res.status(400).json(err);
        });
});

// add exercise to workout. 
app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
        {_id: req.params.id}, 
        {$push: {exercises: req.body}}
        ).then( dbWorkout => {
        
        res.send(dbWorkout);
        })
        .catch(err => {
        res.status(400).json(err);
        });
});
}