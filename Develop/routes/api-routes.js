const db = require("../models/Workout");

module.exports = (app) => {
    app.get("/api/workouts", (req, res) => {
        db.find({})
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
        db.create(body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    app.put('/api/workouts/:id', (req, res) => {
        let exercise = req.body;
        db.findByIdAndUpdate(req.params.id, {
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
        db.find({})
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
};