import express from "express";
import "dotenv/config.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const port = 9393;

const link = `http://localhost:${port}`;

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema de pilotos da MotoGP",
      version: "1.0.0",
      description: "Sistema de pilotos da MotoGP, com autenticação via token Bearer",
    },
    servers: [
      {
        url: "http://localhost:9393",
        description: "Servidor local"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: "Informe o token no formato: Bearer TOKEN",
        }
      }
    }
  },
  apis: ["./serverMotoGP.js"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// prettier-ignore
const pilotos = [
  { "id": 1, "numero": 5, "nome": "Johann Zarco", "equipe": "LCR Honda" },
  { "id": 2, "numero": 7, "nome": "Toprak Razgatlıoğlu", "equipe": "Prima Pramac Racing" },
  { "id": 3, "numero": 10, "nome": "Luca Marini", "equipe": "Repsol Honda Team" },
  { "id": 4, "numero": 11, "nome": "Diogo Moreira", "equipe": "LCR Honda" },
  { "id": 5, "numero": 12, "nome": "Maverick Viñales", "equipe": "Red Bull KTM Tech3" },
  { "id": 6, "numero": 20, "nome": "Fabio Quartararo", "equipe": "Monster Energy Yamaha MotoGP" },
  { "id": 7, "numero": 21, "nome": "Franco Morbidelli", "equipe": "Pertamina Enduro VR46 Racing Team" },
  { "id": 8, "numero": 23, "nome": "Enea Bastianini", "equipe": "Red Bull KTM Tech3" },
  { "id": 9, "numero": 25, "nome": "Raúl Fernández", "equipe": "Trackhouse Racing" },
  { "id": 10, "numero": 33, "nome": "Brad Binder", "equipe": "Red Bull KTM Factory Racing" },
  { "id": 11, "numero": 36, "nome": "Joan Mir", "equipe": "Repsol Honda Team" },
  { "id": 12, "numero": 37, "nome": "Pedro Acosta", "equipe": "Red Bull KTM Factory Racing" },
  { "id": 13, "numero": 42, "nome": "Álex Rins", "equipe": "Monster Energy Yamaha MotoGP" },
  { "id": 14, "numero": 43, "nome": "Jack Miller", "equipe": "Prima Pramac Racing" },
  { "id": 15, "numero": 49, "nome": "Fabio Di Giannantonio", "equipe": "Pertamina Enduro VR46 Racing Team" },
  { "id": 16, "numero": 54, "nome": "Fermín Aldeguer", "equipe": "Gresini Racing" },
  { "id": 17, "numero": 63, "nome": "Francesco Bagnaia", "equipe": "Ducati Lenovo Team" },
  { "id": 18, "numero": 72, "nome": "Marco Bezzecchi", "equipe": "Aprilia Racing" },
  { "id": 19, "numero": 73, "nome": "Álex Márquez", "equipe": "Gresini Racing" },
  { "id": 20, "numero": 79, "nome": "Ai Ogura", "equipe": "Trackhouse Racing" },
  { "id": 21, "numero": 89, "nome": "Jorge Martín", "equipe": "Aprilia Racing" },
  { "id": 22, "numero": 93, "nome": "Marc Márquez", "equipe": "Ducati Lenovo Team" }
];

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = process.env.TOKEN_SECRETO;

  if (authHeader !== `Bearer ${token}`) {
    return res.status(401).json({ "erro": "Acesso não autorizado" });
  }

  next();
}

app.get("/", (req, res) => {
  res.json(pilotos);
});

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
app.get("/pilotos/:id", (req, res) => {
  const buscar = Number(req.params.id);
  const id = pilotos.find((piloto) => piloto.id === buscar);

  if (!id) {
    return res.status(404).json({ mensagem: "O piloto não foi encontrado" });
  }

  res.json(id);
});

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
app.post("/pilotos", autenticar, (req, res) => {
  const { id, numero, nome, equipe } = req.body;

  if (!id || !numero || !nome || !equipe) {
    return res.status(400).json({
      mensagem: "Todos os campos devem ser preenchidos",
      recebido: req.body,
    });
  }

  const num = Number(numero);

  if (isNaN(num)) {
    return res.status(400).json({ mensagem: "Digite um numero!" });
  }

  const buscarNumero = pilotos.some((buscNum) => buscNum.numero === num);

  if (buscarNumero) {
    return res
      .status(400)
      .json({ mensagem: "Esse numero ja existe, escolha outro" });
  }

  const nomePiloto = String(nome);
  const buscarNome = pilotos.some((buscNome) => buscNome.nome === nomePiloto);

  if (buscarNome) {
    return res
      .status(400)
      .json({ mensagem: "Esse nome ja existe, escolha outro" });
  }

  const novoPiloto = {
    id: Number(id),
    numero: num,
    nome: nome,
    equipe: equipe,
  };

  pilotos.push(novoPiloto);

  res.status(201).json({
    mensagem: "Piloto adicionado ao grid!",
    piloto: novoPiloto,
  });
});

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
app.patch("/pilotos/:id", autenticar, (req, res) => {
  const buscarId = Number(req.params.id);
  const { id, numero, nome, equipe } = req.body;

  const piloto = pilotos.find((piloto) => piloto.id === buscarId);

  if (!piloto) {
    return res.status(404).json({ mensagem: "Piloto não encontrado!" });
  }

  if (id) {
    piloto.id = Number(id);
  }

  if (numero) {
    piloto.numero = Number(numero);
  }

  if (nome) {
    piloto.nome = nome;
  }

  if (equipe) {
    piloto.equipe = equipe;
  }

  res.json(piloto);
});

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
app.delete("/pilotos/:id", autenticar, (req, res) => {
  const deleteId = Number(req.params.id);

  // prettier-ignore
  const deleteIndex = pilotos.findIndex((piloto) => piloto.id === deleteId);

  if (deleteIndex === -1) {
    return res.status(404).json({ mensagem: "Piloto não encontrado! " });
  }

  pilotos.splice(deleteIndex, 1);

  res.json({ mensagem: "Piloto removido com sucesso" });
});

app.listen(port, () => {
  console.log(`Servidor online em ${link}`);
});
