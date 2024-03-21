const express = require("express");
const router = express.Router();

const {
    getTrainers,
    createTrainer,
    getTrainerById,
    updateTrainer,
    deleteTrainer,
    } = require("./trainer.controller");

router.get("/alltrainers", getTrainers);
router.post("/newtrainer", createTrainer);
router.get("/gettrainer/:id", getTrainerById);
router.put("/updatetrainer/:id", updateTrainer);
router.delete("/deletetrainer/:id", deleteTrainer);

module.exports = router;