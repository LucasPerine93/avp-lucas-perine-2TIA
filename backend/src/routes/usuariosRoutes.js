import express from "express";
import { cadastrarUsuario, login } from "../controllers/usuariosController.js";

const router = express.Router();

/**
 * @swagger
 * /usuarios/cadastrar:
 *   post:
 *     summary: Cadastra um novo usuário
 *     description: Adiciona um usuário ao sistema.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: Lucas Perine
 *             email: lucas@example.com
 *             senha: senha123
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               message: Usuário, cadastrado com sucesso
 *               novoUsuario:
 *                 id: 1
 *                 nome: Lucas Perine
 *                 email: lucas@example.com
 *       400:
 *         description: Dados inválidos ou usuário já cadastrado.
 */
router.post("/cadastrar", cadastrarUsuario);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     description: Autentica um usuário usando email e senha.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: lucas@example.com
 *             senha: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               message: Login realizado com sucesso
 *               usuario:
 *                 id: 1
 *                 nome: Lucas Perine
 *                 email: lucas@example.com
 *       401:
 *         description: Email ou senha inválidos.
 *         content:
 *           application/json:
 *             example:
 *               message: Email ou senha invalidos
 */
router.post("/login", login);

export default router;