import express from "express";

const app = express();
const port = 9393;

const link = `http://localhost:${port}`;

app.use(express.json());

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

app.get("/", (req, res) => {
  res.json(pilotos);
});

app.get("/pilotos", (req, res) => {
  const nomeDosPilotos = pilotos.map((pilotoNome) => pilotoNome.nome);
  res.json(nomeDosPilotos);
});

app.get("/equipes", (req, res) => {
  const equipes = pilotos.map((equipe) => equipe.equipe);
  res.json(equipes);
});

app.get("/numeros", (req, res) => {
  const numeros = pilotos.map((numero) => numero.numero);
  res.json(numeros);
});

app.get("/id/:buscar", (req, res) => {
  const buscar = Number(req.params.buscar);
  const id = pilotos.find((id) => id.id === buscar);

  if (!id) {
    return res.status(404).json({ mensagem: "O piloto não foi encontrado" });
  }

  res.json(id);
});

app.post("/pilotos", (req, res) => {
  const { numero, nome, equipe } = req.body;

  if (!numero || !nome || !equipe) {
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

app.patch("/pilotos/:numero", (req, res) => {
  const buscarNumero = Number(req.params.numero);
  const { numero, nome, equipe } = req.body;

  const piloto = pilotos.find((piloto) => piloto.numero === buscarNumero);

  if (!piloto) {
    return res.status(404).json({ mensagem: "Piloto não encontrado!" });
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

app.delete("/pilotos/:delete", (req, res) => {
  const deleteNumero = Number(req.params.delete);

  // prettier-ignore
  const deleteIndex = pilotos.findIndex((piloto) => piloto.numero === deleteNumero);

  if (deleteIndex === -1) {
    return res.status(404).json({ mensagem: "Piloto não encontrado! " });
  }

  pilotos.splice(deleteIndex, 1);

  res.json({ mensagem: "Piloto removido com sucesso" });
});

app.listen(port, () => {
  console.log(`Servidor online em ${link}`);
});
