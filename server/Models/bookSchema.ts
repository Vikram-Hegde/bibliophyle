import mongoose, { Types, Document } from "mongoose";

interface IReview extends Document {
  book_id: Types.ObjectId;
  name: string;
  comment: string;
  rating: number;
  avatar_link: string;
}
interface IBook extends Document {
  title: string;
  author: string;
  price: number;
  imageURL: string;
  genre: string[];
  summary: string;
  rating?: number;
  related?: Types.ObjectId[];
  reviews?: Types.ObjectId[];
  createdOn: Date;
}

const reviewSchema = new mongoose.Schema<IReview>({
  book_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "books",
    required: true,
  },
  name: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  avatar_link: String,
});
const bookSchema = new mongoose.Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: { type: String, required: true },
  genre: { type: [String], required: true },
  summary: { type: String, required: true },
  rating: { type: Number },
  related: { type: [mongoose.SchemaTypes.ObjectId], ref: "books" },
  reviews: { type: [mongoose.SchemaTypes.ObjectId], ref: "reviews" },
  createdOn: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const reviewModel = mongoose.model<IReview>("reviews", reviewSchema);

const bookModel = mongoose.model<IBook>("books", bookSchema);

export { reviewModel, bookModel, IBook };
