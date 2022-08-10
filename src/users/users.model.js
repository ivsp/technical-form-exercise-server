import { MongoClient } from "mongodb";
const { DB_PW } = process.env;
console.log(DB_PW);

const URI = `mongodb+srv://ivsp:${DB_PW}@cluster0.qmsat1f.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(URI);
const DATABASE_NAME = "form-technical-exercise";
const COLLECTION_NAME = "users";

export const createUser = async (body) => {
  console.log("en el model", body);
  const { name, surname, email, password, gender } = body;
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const users = db.collection(COLLECTION_NAME);
    return await users.insertOne({
      name,
      surname,
      email,
      password,
      gender,
    });
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

export const retrieveUserByEmail = async (email) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const users = db.collection(COLLECTION_NAME);
    return await users.findOne({ email });
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

export const deleteUserByEmail = async (email) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const users = db.collection(COLLECTION_NAME);
    const query = { email };
    const options = { projection: { _id: 0 } };
    return await users.deleteOne(query, options);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
