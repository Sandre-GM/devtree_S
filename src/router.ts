import { Router } from "express";

const router = Router();

//Routing
router.get("/", (req, res) => {
  res.send("Hola desde express");
});

router.get("/nosotros", (req, res) => {
  res.send("nosotros");
});

router.get("/blog", (req, res) => {
    res.send("blog");
});

export default router;