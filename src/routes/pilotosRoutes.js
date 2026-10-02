import express from "express";
import autenticar from "../middlewares/autenticar.js";
import { atualizarPiloto, 
            buscarPilotoPorId, 
            deletarPiloto, 
            editarPiloto, 
            listarPilotos } from "../controllers/pilotosController.js";



const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Lista todos os pilotos
 *     description: Retorna todos os pilotos cadastrados no sistema.
 *     tags:
 *       - Pilotos
 *     responses:
 *       200:
 *         description: Lista de pilotos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   numero:
 *                     type: integer
 *                     example: 5
 *                   nome:
 *                     type: string
 *                     example: Johann Zarco
 *                   equipe:
 *                     type: string
 *                     example: LCR Honda
 */
router.get("/", listarPilotos);

/**
 * @swagger
 * /pilotos/{id}:
 *   get:
 *     summary: Busca um piloto pelo ID
 *     description: Retorna os dados de um piloto específico.
 *     tags:
 *       - Pilotos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do piloto que será buscado.
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Piloto encontrado com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nome: Johann Zarco
 *               numero: 5
 *               equipe: LCR Honda
 *       404:
 *         description: Piloto não encontrado.
 *         content:
 *           application/json:
 *             example:
 *               mensagem: O piloto não foi encontrado
 */
router.get("/:id", buscarPilotoPorId);

/**
 * @swagger
 * /pilotos:
 *   post:
 *     summary: Cadastra um novo piloto
 *     description: Adiciona um piloto ao sistema usando um token Bearer.
 *     tags:
 *       - Pilotos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             id: 23
 *             nome: Miguel Oliveira
 *             numero: 88
 *             equipe: Prima Pramac Racing
 *     responses:
 *       201:
 *         description: Piloto cadastrado com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Piloto adicionado ao grid!
 *               piloto:
 *                 id: 23
 *                 nome: Miguel Oliveira
 *                 numero: 88
 *                 equipe: Prima Pramac Racing
 *       400:
 *         description: Dados inválidos ou piloto já cadastrado.
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Todos os campos devem ser preenchidos
 *       401:
 *         description: Token ausente ou inválido.
 *         content:
 *           application/json:
 *             example:
 *               erro: Acesso não autorizado
 */
router.post("/", autenticar, atualizarPiloto);

/**
 * @swagger
 * /pilotos/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um piloto
 *     description: Altera um ou mais dados de um piloto usando um token Bearer.
 *     tags:
 *       - Pilotos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do piloto que será atualizado.
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             equipe: Ducati Lenovo Team
 *     responses:
 *       200:
 *         description: Piloto atualizado com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nome: Johann Zarco
 *               numero: 5
 *               equipe: Ducati Lenovo Team
 *       401:
 *         description: Token ausente ou inválido.
 *         content:
 *           application/json:
 *             example:
 *               erro: Acesso não autorizado
 *       404:
 *         description: Piloto não encontrado.
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Piloto não encontrado!
 */
router.patch("/:id", autenticar, editarPiloto);

/**
 * @swagger
 * /pilotos/{id}:
 *   delete:
 *     summary: Exclui um piloto
 *     description: Remove um piloto do sistema usando um token Bearer.
 *     tags:
 *       - Pilotos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do piloto que será excluído.
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Piloto excluído com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Piloto removido com sucesso
 *       401:
 *         description: Token ausente ou inválido.
 *         content:
 *           application/json:
 *             example:
 *               erro: Acesso não autorizado
 *       404:
 *         description: Piloto não encontrado.
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Piloto não encontrado!
 */
router.delete("/:id", autenticar, deletarPiloto);

export default router;