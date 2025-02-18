const bucket = require("../core/gcp/gcp-storage-bucket.js");
const { User, Store } = require("../models/index.js");
const uploadBuffer = require("../core/gcp/upload-buffer.js");

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
    const { photo } = req.files;

    const data = { lastName };
    if (photo) {
      const ext = photo[0].originalname.split(".").pop();
      const path = `users/${id}.${ext}`;
      const isUploaded = await uploadBuffer(
        photo[0].buffer,
        photo[0].mimetype,
        path
      );
      if (isUploaded) {
        data.photo = path;
      }
    }

    if (firstName) {
      data.firstName = firstName;
    }

    await User.update(data, { where: { id } });

    req.params.id = id
    return await getProfileById(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getProfileById, editProfile };
