import * as usuariosModel from '../models/usuariosModel.js';
import bcrypt from 'bcrypt';

export async function cadastrarUsuario(req, res) {
    try {
        const { nome, email, senha } = req.body;
        if (!nome) {
            return res.status(404).json({message: "Nome não enviado!"});
        }

        if (!email) {
            return res.status(404).json({message: "Email não enviado!"})
        }

        if (!senha) {
            return res.status(404).json({message: "Senha não enviada!"})
        }

        const senhaHash = await bcrypt.hash(senha, 10);
        const novoUsuario = await usuariosModel.criar({
            nome,
            email,
            senhaHash
        });

        res.status(201).json({
            message: "Usuário, cadastrado com sucesso",
            novoUsuario
        });
    } catch (erro) {
        return res.status(500).json({message: "Erro no banco | Detalhes do erro: ", data: erro});
    }
}

export async function login(req, res) {
    try {
        const { email, senha } = req.body;
        const usuario = await usuariosModel.buscaPorEmail(email);

        if (!usuario) {
            return res.status(401).json({
                message: 'Email ou senha invalidos'
            });
        }

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senhaHash
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                message: "Email ou senha invalidos"
            });
        }

        res.json({
            message: "Login realizado com sucesso",
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senhaHash
            }
        });
    } catch (erro) {
        return res.status(500).json({message: "Erro no banco | Detalhes do erro: ", data: erro});
    }
}