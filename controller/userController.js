const User = require("../models/users");

const userController = {
  async getUserByEmail(req, res) {
    try {
      const email = req.params.email;

      if (!email) {
        return res.status(400).json({
          status: "Bad Request",
          statusCode: 400,
          error: "Please Input Valid Email",
        });
      }

      const user = await User.getByEmail(email);

      if (!user) {
        return res.status(404).json({
          status: "Not Found",
          statusCode: 404,
          error: "No Email Found",
        });
      }

      res.status(200).json({
        status: "Success OK",
        statusCode: 200,
        message: "User Details Retrieved Successfully",
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
        },
      });
    } catch (error) {
      console.error("Error Fetching User By Email:", error);
      res.status(500).json({
        status: "Internal Server Error",
        statusCode: 500,
        error: "Failed To Retrieve User Details",
      });
    }
  },

  async getUserById(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          status: "Bad Request",
          statusCode: 400,
          error: "Please Input Valid User Id",
        });
      }

      const user = await User.getById(id);

      if (!id) {
        return res.status(404).json({
          status: "Not Found",
          statusCode: 404,
          error: "No Id found",
        });
      }

      res.status(200).json({
        status: "Success OK",
        statusCode: 200,
        message: "Username And Email Retrieved Successfully",
        user: {
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Error Fetching User By Id:", error);
      res.status(500).json({
        status: "Internal Server Error",
        statusCode: 500,
        error: "Failed To Retrieve User Details",
      });
    }
  },
  async updateUserDetails(req, res) {
    try {
      const id = req.params.id;
      const { username, password } = req.body;

      if (!id || !username || !password) {
        return res.status(400).json({
          status: "Bad Request",
          statusCode: 400,
          error: "Please Input All Required Fields",
        });
      }
      const updatedUser = await User.updateUserDetails(id, username, password);

      if (!updatedUser) {
        res.status(404).json({
          status: "Not Found",
          statusCode: 404,
          message: `User not found`,
        });
      }

      return res.status(200).json({
        status: "Success OK",
        statusCode: 200,
        message: `User Updated Succesfully`,
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
        },
      });
    } catch (err) {
      console.error("Error in updateUser:", err);
      res.status(500).json({
        status: "Internal Server Error",
        statusCode: 500,
        message: `Error Updating User: ${err.message}`,
      });
    }
  },
};

module.exports = userController;
