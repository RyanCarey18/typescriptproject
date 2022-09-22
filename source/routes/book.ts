import express from "express";
import controller from "../controllers/book";

const router = express.Router();

router.post("/create/book", controller.createBook);
router.get("/get/greeting", controller.getGreeting);

export = router;
