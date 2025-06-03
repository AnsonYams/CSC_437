import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import cuisines from "./routes/cuisines";
import restaurantRoutes from "./routes/restaurants";
import foodRoutes from "./routes/foods";
import auth, {authenticateUser } from "./routes/auth";
import fs from "node:fs/promises";
import path from "path";

connect("FoodFinder");
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.json()); //middleware
app.use("/auth", auth);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/cuisines", authenticateUser, cuisines);
app.use(express.static(staticDir));

app.get("/api/cuisines", cuisines);
app.get("/api/restaurants", restaurantRoutes);

app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

