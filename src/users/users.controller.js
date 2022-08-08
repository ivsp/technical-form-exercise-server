import { sendRegisterEmail } from "../adapters/register.email.js";
import { encodePassword } from "../auth/auth.utils.js";
import { createUser, retrieveUserByEmail } from "./users.model.js";

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
