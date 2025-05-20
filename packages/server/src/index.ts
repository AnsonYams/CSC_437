import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Cuisines from "./services/cuisine-svc";
import cuisines from "./routes/cuisines";
import auth, {authenticateUser } from "./routes/auth";

connect("FoodFinder");
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.json()); //middleware
app.use("/auth", auth);
app.use("/api/cuisines", authenticateUser, cuisines);
app.use(express.static(staticDir));

app.get("/cuisines/:cuisine", (req: Request, res: Response) => {
  const { cuisine } = req.params;
  console.log("Received request for cuisine:", req.params.cuisine);
  Cuisines.get(cuisine).then((data) => {
    if (data){
      res
      .set("Content-Type", "application/json")
      .send(JSON.stringify(data));
    }
    else res
      .status(404).send();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

