const PermissaoService = require("../services/permissaoService");
const PermissaoService = new PermissaoService();

class PermissaoController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;

    try {
      const permissao = await PermissaoService.cadastrar({ nome, descricao });
    res.status(201).sendo(permissao)
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = PermissaoController;
