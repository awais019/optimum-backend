import router from "express";

const app = router();

app.get("/", (req, res) => {
  return res.send("Server is up and running!");
});

export default app;
