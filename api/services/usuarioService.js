const database = require('../models')

class UsuarioService {
    async cadastrar(dto){
        const usuario = await database.findOne({
            where: {
                email: dto.email
            }
        })
        if(usuario){
            throw new Error('Usuario cadastrado')
        }
    }
}

module.exports = UsuarioService