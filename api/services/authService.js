const database = require("../models");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

class AuthService {
  async login(dto) {
    const usuario = await database.usuario.findOne({
      attributes: ["id", "email", "senha"],
      where: {
        email: dto.email,
      },
    });

    if (!usuario) {
      throw new Error("usuario not found");
    }

    const senhasIguais = await compare(dto.senha, usuario.senha);

    if (!senhasIguais) {
      throw new Error("Usuario ou senha incorretos");
    }

    const acessToken = sign(
      { id: usuario.id, email: usuario.email },
      jsonSecret.secret,
      { expiresIn: 86400 }
    );

    return { acessToken }
  }
}

module.exports = AuthService;
