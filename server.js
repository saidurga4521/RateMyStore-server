import express from "express";
import sequelize from "./config/db.js";
import cors from "cors";
import routes from "./routes/index.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("hello world");
  console.log("hello world");
});
// Sync models and then start server
sequelize
  .sync({ alter: true }) //creates tables if they don't exist
  .then(() => {
    console.log("Database & tables synced successfully.");

    app.listen(5050, () => {
      console.log("Server running on port 5050");
    });
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
  });
