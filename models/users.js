const pool = require("../config/database");
const bcrypt = require("bcryptjs");


const User = {
  async createUser(username, email, password) {
    //check if a user already exists
    const existingUserQuery = {
      text: `SELECT * FROM users WHERE username = $1 OR email = $2`,
      values: [username, email],
    };
    const existingUserResult = await pool.query(existingUserQuery);

    

    if (existingUserResult.rows.length > 0) {
      throw new Error("User already exists, Please login");
    }

  

    //create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`,
      values: [username, email, hashedPassword],
    };
    const result = await pool.query(query);
    return result.rows[0];
  },

  async loginUser(email, password, authenticate) {
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      const user = result.rows[0];

      if (!user) {
        throw new Error("Invalid email");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error("Invalid password");
      }else{
        console.log("user logged in successfully");
      }

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async getUserByEmail(email) {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email],
    };
    const result = await pool.query(query);
    return result.rows[0];
  },

  async getUserById(id) {
    const query = {
      text: `SELECT * FROM users where id = $1`,
      values: [id],
    };
    const result = await pool.query(query);
    return result.rows[0];
  },
};

module.exports = User;
