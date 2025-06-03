import express, { Request, Response } from "express";
import { Restaurant } from "../models/restaurant";
import Restaurants from "../services/restaurant-svc";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const cuisine = req.query.cuisine as string;
  console.log(cuisine)
  try {
    const restaurants = cuisine
      ? await Restaurants.byCuisine(cuisine)
      : await Restaurants.index();

    res.json(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get("/:id", (req: Request, res: Response) => {
  Restaurants.get(req.params.id)
    .then((restaurant: Restaurant) => res.json(restaurant))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  Restaurants.create(req.body)
    .then((restaurant: Restaurant) => res.status(201).json(restaurant))
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
  Restaurants.update(req.params.id, req.body)
    .then((restaurant: Restaurant) => res.json(restaurant))
    .catch(() => res.status(404).end());
});

router.delete("/:id", (req: Request, res: Response) => {
  Restaurants.remove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
