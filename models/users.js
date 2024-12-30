const pool = require("../config/database");
const bcrypt = require("bcryptjs");


const User = {
  async createUser(username, email, password) {
    //check if a username or email already exists
    const existingUsernameQuery = {
      text: `SELECT * FROM users WHERE username = $1`,
      values: [username],
    };
    const existingUsernameResult = await pool.query(existingUsernameQuery);

    if (existingUsernameResult.rows.length > 0) {
      throw new Error("Username Already Exists, Please Choose Another One");
    }

    const existingEmailQuery = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email],
    };
    const existingEmailResult = await pool.query(existingEmailQuery);

    if (existingEmailResult.rows.length > 0) {
      throw new Error("Email Already Exists, Please Login if You Already Have An Account Or Kindly Use Another Email");
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

  async loginUser(email, password) {
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

  async getByEmail(email) {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email],
    };
    const result = await pool.query(query);
    return result.rows[0];
  },

  async getById(id) {
    const query = {
      text: `SELECT * FROM users where id = $1`,
      values: [id],
    };
    const result = await pool.query(query);
    return result.rows[0];
  },

  async updateUserDetails(id, newUsername, newPassword){
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query ={
      text: `UPADTE users SET username = $1, password = $2, WHERE id = $3 RETURTING *`,
      values: [id, newUsername, hashedPassword]
    };
    const result = await pool.query(query);
    return result.rows[0];
  },
};

module.exports = User;
