const multer = require("multer");
const path = require('path');
const fs = require('fs');

const funcionMulter = (user) => {
  
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        // cb(null, `./uploads/${user.nombreUsuario}`);
        const uploadPath = `./uploads/${user.nombreUsuario}`; // Ruta de la carpeta de destino
        fs.mkdirSync(uploadPath, { recursive: true }); // Crear carpeta si no existe
        cb(null, uploadPath);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });

    const upload = multer({ storage: storage });

    return upload;
};

module.exports = {
  funcionMulter,
};