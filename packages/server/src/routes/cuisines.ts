import express, { Request, Response } from "express";
import { Cuisine } from "../models/cuisine";

import Cuisines from "../services/cuisine-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Cuisines.index()
    .then((list: Cuisine[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:cuisine", (req: Request, res: Response) => {
  const { c } = req.params;
  Cuisines.get(c)
    .then((cuisine: Cuisine) => res.json(cuisine))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newCuisine = req.body;

  Cuisines.create(newCuisine)
    .then((cuisine: Cuisine) =>
      res.status(201).json(cuisine)
    )
    .catch((err) => res.status(500).send(err));
});

router.put("/:cuisine", (req: Request, res: Response) => {
  const { cuisine } = req.params;
  const newCuisine = req.body;

  Cuisines.update(cuisine, newCuisine)
    .then((cuisine: Cuisine) => res.json(cuisine))
    .catch((err) => res.status(404).end());
});

router.delete("/:cuisine", (req: Request, res: Response) => {
  const { cuisine } = req.params;

  Cuisines.remove(cuisine)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;