import { sendRegisterEmail } from "../adapters/register.email.js";
import { createUser, retrieveUserByEmail } from "./users.model.js";

const { VALIDATION_URL } = process.env;

export const registerCtrl = async (req, res) => {
  const { email } = req.body;
  try {
    //función que verifica que el correo no está dado de alta
    const user = await retrieveUserByEmail(email);

    if (user === null) {
      await createUser(req.body);
      await sendRegisterEmail(req.body, VALIDATION_URL);
      // req.body.password = encodePassword(req.body.password);
      //await createUser({ ...req.body, status: "PENDING_VALIDATION" }); // paso 2
      // paso 3
      //const token = generateValidationToken();
      //await createValidationToken(token, req.body.email);
      // paso 4
      //ojo que el host es el de nuestra aplicación de react
      //sendValidationEmail(
      //req.body.email,
      //`http://localhost:3000/validate?token=${token}`
      //);
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
