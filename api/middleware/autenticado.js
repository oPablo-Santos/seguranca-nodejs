const { verify, decode } = require("jsonwebtoken");
const  jsonSecret  = require("../config/jsonSecret");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Acess Token invalido");
  }

  const [, acessToken] = token.split(" ");

  try {
    verify(acessToken, jsonSecret.secret);

    const { id, email } = await decode(acessToken);

    req.usuarioId = id;
    req.usuarioEmail = email;

    return next();
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};
