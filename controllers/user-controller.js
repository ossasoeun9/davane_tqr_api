const { User, Store } = require("../models/index.js");

const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required in params" });
    }
    const user = await User.findByPk(id, {
      include: {
        model: Store,
        as: "store",
        attributes: { exclude: ["userId"] },
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const { firstName, lastName } = req.body;

    const data = { lastName };
    if (firstName) {
      data.firstName = firstName;
    }

    await User.update(data, { where: { id } });

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getProfileById, editProfile };