import { Router } from "express";
import { body } from "express-validator";
import { createAccount, getUser, login, updateProfile, uploadImage } from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { authMiddleware } from "./middleware/auth";

const router = Router();

//Routing
router.post(
  "/auth/register",
  body("handle")
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacio"),
  body("name").notEmpty().withMessage("El nombre no puede estar vacio"),
  body("email")
    .isEmail()
    .withMessage("El correo no es válido, utiliza un correo válido."),
  body("password")
    .isLength({ min: 8 })
    .withMessage(
      "La contraseña no puede estar vacia o ser muy corta (mínimo 8 caracteres)."
    ),
  handleInputErrors,
  createAccount
);

router.post(
  "/auth/login",
  body("email")
    .isEmail()
    .withMessage("El correo no es válido, utiliza un correo válido."),
  body("password").notEmpty().withMessage("La contraseña es incorrecta."),
  handleInputErrors,
  login
);

router.get("/user", authMiddleware, getUser);
router.patch(
  "/user",
  body("handle")
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción no puede ir vacia"),
  handleInputErrors,
  authMiddleware,
  updateProfile
);

router.post("/user/image", authMiddleware,uploadImage)
export default router;
