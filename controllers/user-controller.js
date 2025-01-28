import { User, Store, Certificate } from "../models/index.js";
import uploadBuffer from "../core/gcp/upload-buffer.js";
import bucket from "../core/gcp/gcp-storage-bucket.js";

const getProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findByPk(id, {
      include: {
        model: Store,
        as: "store",
        attributes: { exclude: ["userId"] },
        include: {
          model: Certificate,
          as: "certificates",
          attributes: { exclude: ["userId", "storeId"] },
        },
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

    const user = await User.findByPk(id);

    const { firstName, lastName } = req.body;

    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName

    const { photo } = req.files;
    if (photo) {
      if (user.photo) {
        await bucket.file(user.photo).delete();
      }
      const ext = photo[0].originalname.split(".").pop();
      const path = `users/${id}.${ext}`;
      const isUploaded = await uploadBuffer(
        photo[0].buffer,
        photo[0].mimetype,
        path
      );
      if (isUploaded) {
        user.photo = path
      } else {
        delete user.photo
      }
    }

    await user.save()
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getProfile, editProfile };
