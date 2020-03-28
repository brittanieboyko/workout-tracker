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

    app.put("/api/workouts/:id", ({
        body
    }, res) => {
        db.Workout.create(body)
            .then(({
                _id
            }) => db.Workout.findOneAndUpdate({}, {
                $push: {
                    exercises: _id
                }
            }, {
                new: true
            }))
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
};