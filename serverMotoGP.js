import express from "express";

const app = express();
const port = 9393;

const link = `http://localhost:${port}`;

app.use(express.json());

// prettier-ignore
const pilotos = [
  { numero: 1, nome: "Jorge Martín", equipe: "Aprilia Racing" },
  { numero: 5, nome: "Johann Zarco", equipe: "LCR Honda" },
  { numero: 10, nome: "Luca Marini", equipe: "Repsol Honda Team" },
  { numero: 12, nome: "Maverick Viñales", equipe: "Red Bull KTM Tech3" },
  { numero: 20, nome: "Fabio Quartararo", equipe: "Monster Energy Yamaha MotoGP" },
  { numero: 21, nome: "Franco Morbidelli", equipe: "VR46" },
  { numero: 23, nome: "Enea Bastianini", equipe: "Red Bull KTM Tech3" },
  { numero: 25, nome: "Raúl Fernández", equipe: "Trackhouse Racing" },
  { numero: 33, nome: "Brad Binder", equipe: "Red Bull KTM Factory Racing" },
  { numero: 35, nome: "Somkiat Chantra", equipe: "LCR Honda" },
  { numero: 36, nome: "Joan Mir", equipe: "Repsol Honda Team" },
  { numero: 37, nome: "Pedro Acosta", equipe: "Red Bull KTM Factory Racing" },
  { numero: 42, nome: "Álex Rins", equipe: "Monster Energy Yamaha MotoGP" },
  { numero: 43, nome: "Jack Miller", equipe: "Prima Pramac Racing" },
  { numero: 49, nome: "Fabio Di Giannantonio", equipe: "VR46" },
  { numero: 54, nome: "Fermín Aldeguer", equipe: "Gresini Racing" },
  { numero: 63, nome: "Francesco Bagnaia", equipe: "Ducati Lenovo Team" },
  { numero: 72, nome: "Marco Bezzecchi", equipe: "Aprilia Racing" },
  { numero: 73, nome: "Álex Márquez", equipe: "Gresini Racing" },
  { numero: 79, nome: "Ai Ogura", equipe: "Trackhouse Racing" },
  { numero: 88, nome: "Miguel Oliveira", equipe: "Prima Pramac Racing" },
  { numero: 93, nome: "Marc Márquez", equipe: "Ducati Lenovo Team" },
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

 app.get("/numeros/:buscar", (req, res) => {
  const buscar = Number(req.params.buscar);
  const numero = pilotos.find((numeros) => numeros.numero === buscar);

  if (!numero) {
    return res .status(404).json({mensagem: "O piloto não foi encontrado"});
  }

  res.json(numero)

 });

app.post("/pilotos", (req, res) => {
  const { numero, nome, equipe } = req.body.dados;

  if (!numero || !nome || !equipe) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos devem ser preenchidos",
              recebido: req.body
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
    numero: numero,
    nome: nome,
    equipe: equipe
  };

  pilotos.push(novoPiloto);

  res.status(201).json({
    mensagem: "Piloto adicionado ao grid!",
    piloto: novoPiloto,
  });
});

app.listen(port, () => {
  console.log(`Servidor online em ${link}`);
});
