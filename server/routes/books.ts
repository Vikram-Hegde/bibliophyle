import { Router } from "express";
const router = Router();
import {
  getBooks,
  getBook,
  reviewBook,
  createBook,
  getRelated,
} from "./controllers/jobs";
router.route("/").get(getBooks);
router.route("/createBook").post(createBook);
router.route("/:id").get(getBook);
router.route("/:id/reviewBook").post(reviewBook);
router.route("/:id/related").get(getRelated);

export default router;
