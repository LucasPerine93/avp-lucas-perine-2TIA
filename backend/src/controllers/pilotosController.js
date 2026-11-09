import * as pilotosModel from "../models/pilotosModel";

export function listarPilotos(req, res) {
  res.json(pilotos);
}

export function buscarPilotoPorId(req, res) {
  const buscar = Number(req.params.id);
  const id = pilotos.find((piloto) => piloto.id === buscar);

  if (!id) {
    return res.status(404).json({ mensagem: "O piloto não foi encontrado" });
  }

  res.json(id);
}

export function atualizarPiloto(req, res) {
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
}

export function editarPiloto(req, res) {
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
}

export function deletarPiloto(req, res) {
  const deleteId = Number(req.params.id);

  // prettier-ignore
  const deleteIndex = pilotos.findIndex((piloto) => piloto.id === deleteId);

  if (deleteIndex === -1) {
    return res.status(404).json({ mensagem: "Piloto não encontrado! " });
  }

  pilotos.splice(deleteIndex, 1);

  res.json({ mensagem: "Piloto removido com sucesso" });
}
