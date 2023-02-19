import { Router } from "express";
import { handleInputErrors } from "./modules/middleware";
import { createContract } from "./handlers/nft";
import { body, oneOf, validationResult } from "express-validator";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post(
  "/nft",
  body("price").exists().isString(),
  body("uri").exists().isString(),
  body("creator").exists().isString(),
  handleInputErrors,
  createContract
);

router.use((err, req, res, next) => {
  console.log(err);
  res.json({ message: "in router handler" });
});
export default router;
