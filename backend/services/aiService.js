const axios =
  require("axios");

const FormData =
  require("form-data");

const fs =
  require("fs");


const parseResume =
async (filePath) => {

  const formData =
    new FormData();

  formData.append(

    "file",

    fs.createReadStream(filePath)

  );

  const response =
    await axios.post(

      "http://127.0.0.1:8000/parse-resume",

      formData,

      {

        headers:
          formData.getHeaders()

      }

    );

  return response.data;

};

module.exports = {
  parseResume
};