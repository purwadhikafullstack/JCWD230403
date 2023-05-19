const multer = require("multer");
const fs = require("fs");

const uploader = (directory, filePreFix) => {
  // 1. default directory storage
  let defaultDir = "./src/public";

  // 2. storage location config
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const storeDir = directory ? defaultDir + directory : defaultDir;
      if (fs.existsSync(storeDir)) {
        console.log(`Directory ${storeDir} exist ✅`);
        cb(null, storeDir);
      } else {
        fs.mkdir(storeDir, { recursive: true }, (error) => {
          if (error) {
            console.log("error create directory : ", error);
          }
          cb(error, storeDir);
        });
      }
    },
    filename: (req, file, cb) => {
      console.log("cek file original name :", file.originalname);
      console.log("cek file  :", file);
      let ext =
        file.originalname.split(".")[file.originalname.split(".").length - 1];
      console.log("check extension : ", ext);

      let newName = filePreFix + Date.now() + "." + ext;
      console.log("New Name : ", newName);
      cb(null, newName);
    },
  });

  //3. file filter config
  const fileFilter = (req, file, cb) => {
    const extFilter = /\.(jpg|gif|png|webp|jpeg|avif)/;
    let checkExt = file.originalname.toLowerCase().match(extFilter);
    if (checkExt) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .jpeg, .png, and webp format allowed!"), false);
    }
  };

  //4. set file size limit
  const limits = {
    fileSize: 2000 * 1024, // 1 MB
  };

  //5. return multer
  return multer({ storage, fileFilter, limits });
};

module.exports = uploader;