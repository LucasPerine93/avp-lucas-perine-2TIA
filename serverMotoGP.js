import express from "express";

const app = express();
const port = 9393;

const link = `http://localhost:${port}`;

app.use(express.json());

// prettier-ignore
const pilotos = [
  { n: 1, nome: "Jorge Martín", equipe: "Aprilia Racing" },
  { n: 5, nome: "Johann Zarco", equipe: "LCR Honda" },
  { n: 10, nome: "Luca Marini", equipe: "Repsol Honda Team" },
  { n: 12, nome: "Maverick Viñales", equipe: "Red Bull KTM Tech3" },
  { n: 20, nome: "Fabio Quartararo", equipe: "Monster Energy Yamaha MotoGP" },
  { n: 21, nome: "Franco Morbidelli", equipe: "VR46" },
  { n: 23, nome: "Enea Bastianini", equipe: "Red Bull KTM Tech3" },
  { n: 25, nome: "Raúl Fernández", equipe: "Trackhouse Racing" },
  { n: 33, nome: "Brad Binder", equipe: "Red Bull KTM Factory Racing" },
  { n: 35, nome: "Somkiat Chantra", equipe: "LCR Honda" },
  { n: 36, nome: "Joan Mir", equipe: "Repsol Honda Team" },
  { n: 37, nome: "Pedro Acosta", equipe: "Red Bull KTM Factory Racing" },
  { n: 42, nome: "Álex Rins", equipe: "Monster Energy Yamaha MotoGP" },
  { n: 43, nome: "Jack Miller", equipe: "Prima Pramac Racing" },
  { n: 49, nome: "Fabio Di Giannantonio", equipe: "VR46" },
  { n: 54, nome: "Fermín Aldeguer", equipe: "Gresini Racing" },
  { n: 63, nome: "Francesco Bagnaia", equipe: "Ducati Lenovo Team" },
  { n: 72, nome: "Marco Bezzecchi", equipe: "Aprilia Racing" },
  { n: 73, nome: "Álex Márquez", equipe: "Gresini Racing" },
  { n: 79, nome: "Ai Ogura", equipe: "Trackhouse Racing" },
  { n: 88, nome: "Miguel Oliveira", equipe: "Prima Pramac Racing" },
  { n: 93, nome: "Marc Márquez", equipe: "Ducati Lenovo Team" },
];

app.get("/", (req, res) => {
  res.json(pilotos);
});

app.get("/nome", (req, res) => {
  const nomeDosPilotos = pilotos.map((pilotoNome) => pilotoNome.nome);
  res.json(nomeDosPilotos);
});

app.get("/equipes", (req, res) => {
  const equipes = pilotos.map((equipe) => equipe.equipe);
  res.json(equipes);
});

app.listen(port, () => {
  console.log(`Servidor online em ${link}`);
});
