const { Certificate } = require("../models/index.js");
const uploadBuffer = require("../core/gcp/upload-buffer.js");
const user = require("../models/user.js");
const bucket = require("../core/gcp/gcp-storage-bucket.js");

const getCertificates = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required" });
    }
    const certificates = await Certificate.findAll({ where: { storeId } });
    return res.status(200).json(certificates);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Interßnal server error" });
  }
};

const createCertificate = async (req, res) => {
  try {
    const { title, issuedDate, expireDate, issuingIstitution, note } = req.body;
    const { photo } = req.files;

    if (!title || !issuedDate || !photo) {
      return res
        .status(400)
        .json({ message: "Title, issued date, and photo are required" });
    }

    const ext = photo[0].originalname.split(".").pop();
    const fileName = Date.now();
    const path = `certificates/${fileName}.${ext}`;
    const isUploaded = await uploadBuffer(
      photo[0].buffer,
      photo[0].mimetype,
      path
    );

    if (!isUploaded) {
      return res.status(500).json({ message: "Failed to upload photo" });
    }

    const certificate = await Certificate.create({
      title,
      issuedDate,
      expireDate,
      photo: path,
      note,
      userId: req.user.id,
      issuingIstitution,
      storeId: req.user.store.id,
    });

    return res.status(201).json(certificate.dataValues);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editCertificate = async (req, res) => {
  try {
    const { title, issuedDate, expireDate, issuingIstitution, note } = req.body;
    const { photo } = req.files;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required in params" });
    }
    const certificate = await Certificate.findByPk(id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    const data = { expireDate, issuingIstitution, note };
    if (title) {
      data.title = title;
    }
    if (issuedDate) {
      data.issuedDate = issuedDate;
    }

    if (photo) {
      const ext = photo[0].originalname.split(".").pop();
      const path = certificate.photo ?? `certificates/${Date.now()}.${ext}`;
      const isUploaded = await uploadBuffer(
        photo[0].buffer,
        photo[0].mimetype,
        path
      );

      if (!isUploaded) {
        return res.status(500).json({ message: "Failed to upload photo" });
      }
      data.photo = path;
    }
    await certificate.update(data);

    return res.status(200).json(certificate);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findByPk(id)
    await bucket.file(certificate.photo).delete();
    await certificate.destroy();
    return res
      .status(200)
      .json({ message: "Certificate deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getCertificates, createCertificate, editCertificate, deleteCertificate };
