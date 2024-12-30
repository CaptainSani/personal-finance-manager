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
        message: "Username Retrieved Successfully",
        user: {
          username: user.username,
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

  // async updateUsername(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const newUsername = req.body.username;

  //     if (!id || !newUsername) {
  //       return res.status(400).json({
  //         status: "Bad Request",
  //         statusCode: 400,
  //         error: "Please Input Valid User Id and Username",
  //       });
  //     }

  //     const user = await User.updateUsername(id, newUsername);

  //     res.status(200).json({
  //       status: "Success OK",
  //       statusCode: 200,
  //       message: "Username Updated Successfully",
  //       user: {
  //         username: user.username,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error Updating Username:", error);
  //     res.status(500).json({
  //       status: "Internal Server Error",
  //       statusCode: 500,
  //       error: "Failed To Update Username",
  //     });
  //   }
  // },

  // async updateEmail(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const newEmail = req.body.email;

  //     if (!id || !newEmail) {
  //       return res.status(400).json({
  //         status: "Bad Request",
  //         statusCode: 400,
  //         error: "Please Input Valid User Id and Email",
  //       });
  //     }

  //     const user = await User.updateEmail(id, newEmail);

  //     res.status(200).json({
  //       status: "Success OK",
  //       statusCode: 200,
  //       message: "Email Updated Successfully",
  //       user: {
  //         email: user.email,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error Updating Email:", error);
  //     res.status(500).json({
  //       status: "Internal Server Error",
  //       statusCode: 500,
  //       error: "Failed To Update Email",
  //     });
  //   }
  // },

  // async updatePassword(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const newPassword = req.body.password;

  //     if (!id || !newPassword) {
  //       return res.status(400).json({
  //         status: "Bad Request",
  //         statusCode: 400,
  //         error: "Please Input Valid User Id and Password",
  //       });
  //     }

  //     const user = await User.updatePassword(id, newPassword);

  //     res.status(200).json({
  //       status: "Success OK",
  //       statusCode: 200,
  //       message: "Password Updated Successfully",
  //     });
  //   } catch (error) {
  //     console.error("Error Updating Password:", error);
  //     res.status(500).json({
  //       status: "Internal Server Error",
  //       statusCode: 500,
  //       error: "Failed To Update Password",
  //     });
  //   }
  // },

  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const { username, password } = req.body;
      if (!id || !username || !password) {
        return res.status(400).json({
          status: "Bad Request",
          statusCode: 400,
          error: "Please Input Valid User ID",
        });
      }

      const user = await User.updateUserDetails(
        req.params.id,
        username,
        password
      );
      if (!user) {
        res.status(404).json({
          status: "Not Found",
          statusCode: 404,
          message: `User With Id ${req.params.id} not found`,
        });
      } else {
        res.status(200).json({
          status: "Success OK",
          statusCode: 200,
          message: `User With Id ${req.params.id} Updated Succesfully`,
          budget,
        });
      }
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
