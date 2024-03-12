const jwt = require("jsonwebtoken");

const expirationTime = "30d";

function singToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: expirationTime,
  });
  return token;
}

function validateToken(token) {
  let response = {};
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      response = { validated: false, msj: error.message };
    } else {
      response = { validated: true, token: decoded };
    }
  });
  return response;
}

const JWT = {
  singToken,
  validateToken,
};

export default JWT;
