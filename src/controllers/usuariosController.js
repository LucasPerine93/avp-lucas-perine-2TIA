import * as usuariosModel from '../model/usuariosModel.js';
import bcrypt from 'bcrypt';

export async function cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body;
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
}

export async function login(req, res) {
    const { email, senha } = req.body;
    const usuario = await usuariosModel.buscarEmail(email);

    if (!usuario) {
        return res.status(401).json({
            message: 'Email ou senha invalidos';
        });
    }

    const senhaCorreta = bcrypt.compare(
        senha,
        usuario.senhaHash
    )

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
}