import router from "express";
import APIHelpers from "../helpers/APIHelpers";

const app = router();

app.get("/", (req, res) => {
  return res.send("Server is up and running!");
});

export default app;
