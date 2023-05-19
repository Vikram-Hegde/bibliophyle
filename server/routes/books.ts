import { Router } from "express";
const router = Router();
import { getBooks, getBook, reviewBook, createBook } from "./controllers/jobs";
router.route("/").get(getBooks);
router.route("/createBook").post(createBook);
router.route("/:id").get(getBook);
router.route("/:id/reviewBook").post(reviewBook);

export default router;
