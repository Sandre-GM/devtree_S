import { Router } from "express";
import { body } from "express-validator";
import { createAccount } from "./handlers";

const router = Router();

//Routing
router.post(
  "/auth/register",
  body("handle")
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacio"),
  body("name")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio"),
  body("email")
    .isEmail()
    .withMessage("El correo no es válido, utiliza un correo válido."),
  body("password")
    .isLength({min:8})
    .withMessage("La contraseña no puede estar vacia o ser muy corta (mínimo 8 caracteres)."),
  createAccount
);

export default router;
