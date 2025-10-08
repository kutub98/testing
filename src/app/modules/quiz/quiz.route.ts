import { Router } from "express";
import { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz, getQuizzesByEventId } from "./quiz.controller";

const QuizRouter = Router();

QuizRouter.post("/", createQuiz);
QuizRouter.get("/", getQuizzes);
QuizRouter.get("/:id", getQuizById);
QuizRouter.patch("/:id", updateQuiz); 
QuizRouter.delete("/:id", deleteQuiz);
QuizRouter.get("/event/:eventId", getQuizzesByEventId);

export { QuizRouter };