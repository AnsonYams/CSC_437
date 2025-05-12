import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import CuisineItem from "./services/cuisines-svc";

connect("foodfinder");
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("/cuisines/:cuisine", (req: Request, res: Response) => {
  const { cuisine } = req.params;

  CuisineItem.get(cuisine).then((data) => {
    if (data) res
      .set("Content-Type", "application/json")
      .send(JSON.stringify(data));
    else res
      .status(404).send();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

