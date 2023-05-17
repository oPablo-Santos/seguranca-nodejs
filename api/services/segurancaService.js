const database = require("../models");
const Sequelize = require("sequelize");

class SegurancaService {
  async cadastrarAcl(dto) {
    const usuario = await database.usuario.findOne({
      include: [
        {
          model: database.roles,
          as: "usuario_roles",
          attributes: ["id", "nome", "descricao"],
        },
        {
          model: database.permissoes,
          as: "usuario_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
      where: {
        id: dto.usuarioId,
      },
    });

    if (!usuario) {
      throw new Error("usuario not found");
    }

    const rolesCadastradas = await database.roles.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.roles,
        },
      },
    });

    const permissoesCadastradas = await database.permissoes.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissoes,
        },
      },
    });

    await usuario.removeUsuario_roles(usuario.usuarios_roles);
    await usuario.removeUsuario_permissoes(usuario.usuario_permissoes);

    await usuario.addUsuario_roles(rolesCadastradas);
    await usuario.addUsuario_permissoes(permissoesCadastradas);

    const novoUsuario = await database.usuarios.findAll({
      include: [
        {
          model: database.roles,
          as: "usuario_roles",
          attributes: ["id", "nome", "descricao"],
        },
        {
          model: database.permissoes,
          as: "usuario_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
    });

    return novoUsuario;
  }

  async cadastrarPermissoesRoles(dto) {
    const role = await database.roles.findOne({
      include: [
        {
          model: database.permissoes,
          as: "roles_das_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
    });
    if (!role) {
      throw new Error("Role not found");
    }

    const permissoesCadastradas = await database.permissoes.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissoes,
        },
      },
    });
    await role.removeRoles_das_permissoes(roles.roles_das_permissoes);

    await role.addRoles_das_permissoes(permissoesCadastradas);

    const novaRole = await database.roles.findOne({
      include: [
        {
          model: database.permissoes,
          as: "roles_das_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
      where: {
        id: dto.roleId,
      },
    });
  }
}

module.exports = SegurancaService;
