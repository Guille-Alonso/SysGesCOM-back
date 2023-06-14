const multer = require("multer");

const funcion = (id) => {
  try {
    console.log(id);

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./uploads");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });

    const upload = multer({ storage: storage });

    return upload;
  } catch (error) {
    // res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  funcion,
};
