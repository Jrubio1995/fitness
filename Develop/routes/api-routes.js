const db = require("../models");

module.exports = function (app) {

    app.get("/api/workouts", (req, res) => {
        console.log("get /api/workouts called.");
        db.Workout.find({})

            .sort({ day: 'asc' })
            .then((dbResult) => {
                console.log("Found");
                res.json(dbResult);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err);
            })
    });

    app.put("/api/workouts/:id", (req, res) => {
        console.log("put /api/workouts/:id called", req.body);
        var now = new Date();
        var todayStart = new Date();
        var todayEnd = new Date();
        todayStart.setHours(0, 0, 0, 0);
        todayEnd.setHours(23, 59, 59, 999)

        console.log(" req.body ", req.body);
        var tempJSON = {
            day: now,
            exercises: [{
                type: req.body.type,
                name: req.body.name,
                duration: req.body.duration,
                distance: req.body.distance,
                weight: req.body.weight,
                reps: req.body.reps,
                sets: req.body.sets
            }]
        };

        db.Workout.findOneAndUpdate(
            { day: { $gt: todayStart, $lt: todayEnd } },
            { day: now, $push: { exercises: tempJSON.exercises } },
            { upsert: true, runValidators: true }
        )
            .then((dbResult) => {
                console.log(" found and updated:", dbResult);
                res.json(dbResult);
            })
            .catch(err => {
                console.log(" error encountered ", err);
                res.status(500).json(err)
            });



    });

    app.post("/api/workouts", (req, res) => {
        console.log("post /api/workouts called", req.body);
    });

    app.get("/api/workouts/range", (req, res) => {
        console.log("get /api/workouts/range called");
        db.Workout.find({})
            .then((dbResult) => {
                console.log("found");
                res.json(dbResult);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err);
            })
    });
}