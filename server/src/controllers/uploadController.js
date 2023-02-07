const uploadController = {
  uploadImage: async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

      return res.status(200).json({
        msg: "Upload image success",
        data: {
          path: req.file.path.replace("https://res.cloudinary.com/", ""),
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  uploadImages: async (req, res) => {
    try {
      if (!req.files) return res.status(400).json({ msg: "No file uploaded" });
      const files = req.files;

      const newPaths = files.map((file) => ({
        path: file.path.replace("https://res.cloudinary.com/", ""),
      }));

      return res.status(200).json({
        msg: "Upload images success",
        data: newPaths,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default uploadController;
