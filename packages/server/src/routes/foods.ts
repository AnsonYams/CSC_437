import express, { Request, Response } from "express";
import { Food } from "../models/food";
import Foods from "../services/food-svc";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  Foods.index()
    .then((list: Food[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", (req: Request, res: Response) => {
  Foods.get(req.params.id)
    .then((food: Food) => res.json(food))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  Foods.create(req.body)
    .then((food: Food) => res.status(201).json(food))
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
  Foods.update(req.params.id, req.body)
    .then((food: Food) => res.json(food))
    .catch(() => res.status(404).end());
});

router.delete("/:id", (req: Request, res: Response) => {
  Foods.remove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
