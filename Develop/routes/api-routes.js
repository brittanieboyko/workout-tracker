const db = require("../models");

module.exports = function(app) {
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    app.post("/api/workouts", ({
        body
    }, res) => {
        db.Workout.create(body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
    
    app.put('/api/workouts/:id', (req, res) => {
        const exercise = req.body;
        db.Workout.findByIdAndUpdate(req.params.id, {
                $push: {
                    exercises: exercise
                }
            })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout
            .find({})
            .sort({
                day: -1
            })
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
};