import { sendRegisterEmail } from "../adapters/register.email.js";
import { encodePassword } from "../auth/auth.utils.js";
import {
  createUser,
  retrieveUserByEmail,
  deleteUserByEmail,
} from "./users.model.js";

const { VALIDATION_URL } = process.env;

export const registerCtrl = async (req, res) => {
  const { email } = req.body;
  try {
    //función que verifica que el correo no está dado de alta
    const user = await retrieveUserByEmail(email);

    if (user === null) {
      //Codifico la contraseña para guardarla en la base de datos.
      req.body.password = encodePassword(req.body.password);
      await createUser(req.body);
      await sendRegisterEmail(req.body, VALIDATION_URL);
      res.sendStatus(201);
    } else {
      // mando un 409(conflict) porque ya existe el usuario en BBDD
      res.sendStatus(409);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const deleteUserCtrl = async (req, res) => {
  const { email } = req.body;
  try {
    //función que verifica que el correo existe y el usuario está dado de alta
    const user = await retrieveUserByEmail(email);
    console.log("usuario", user);

    if (user !== null) {
      //Elimino al usuario de la base de datos y mando un 200
      await deleteUserByEmail(user.email);
      const { name, surname, email } = user;
      res.status(200).json({ name: name, surname: surname, email: email });
    } else {
      // mando un 404(not found) porque no se ha encontrado al usuario en BBDD
      res.sendStatus(404);
    }
  } catch (err) {
    console.log("Error:", err);
    res.sendStatus(500);
  }
};
