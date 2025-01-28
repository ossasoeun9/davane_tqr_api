import bucket from "../core/gcp/gcp-storage-bucket.js";

const getImage = async (req, res) => {
  try {
    const imagePath = req.path.slice(1);
    const file = bucket.file(imagePath);

    const [exists] = await file.exists();
    if (!exists) {
      return res.status(404).json({ message: "Image not found" });
    }

    const stream = file.createReadStream();

    stream.on("error", (error) => {
      console.error(`Error reading file: ${error}`);
      return res.status(500).json({ message: "Internal server error" });
    });

    stream.on("response", (response) => {
      res.setHeader("Content-Type", response.headers["content-type"]);
    });

    stream.pipe(res);
  } catch (error) {
    console.error(`Error fetching image: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getImage };
