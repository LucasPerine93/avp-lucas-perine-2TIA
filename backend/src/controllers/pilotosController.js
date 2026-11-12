import * as pilotosModel from "../models/pilotosModel.js";

export async function listarPilotos(req, res) {
  try {
    const resposta = await pilotosModel.listar();
    res.json(resposta);

  } catch (erro) {
    return res.status(500).json({ message: "Erro no banco | Detalhes do erro: ", data: erro });
  }
}

export async function buscarPorId(req, res) {
  try {
    const id = Number(req.params.id);
    const buscarId = await pilotosModel.buscarPorId(id);

    if (!buscarId) {
      return res.status(404).json({ mensagem: "O piloto não foi encontrado" });
    }

    res.json(buscarId);

  } catch (erro) {
    return res.status(500).json({ message: "Erro no banco | Detalhes do erro: ", data: erro });
  }
}

export async function criarPiloto(req, res) {
  try {
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

    const buscarNumero = await pilotosModel.buscarPorNumero(num);

    if (buscarNumero) {
      return res
        .status(400)
        .json({ mensagem: "Esse numero ja existe, escolha outro" });
    }

    const nomePiloto = String(nome);
    const buscarNome = await pilotosModel.buscarPorNome(nomePiloto);

    if (buscarNome) {
      return res
        .status(400)
        .json({ mensagem: "Esse nome ja existe, escolha outro" });
    }

    const pilotoAtualizado = {
      numero: num,
      nome: nome,
      equipe: equipe,
    };

    const novoPiloto = await pilotosModel.criar(pilotoAtualizado);

    res.status(201).json({
      mensagem: "Piloto adicionado ao grid!",
      piloto: novoPiloto,
    });

  } catch (erro) {
    return res.status(500).json({ message: "Erro no banco | Detalhes do erro: ", data: erro });
  }
}

export async function editarPiloto(req, res) {
  try {
    const buscarId = Number(req.params.id);
    const { numero, nome, equipe } = req.body;

    if (!buscarId) {
      return res.status(404).json({ mensagem: "ID do Piloto não enviado!" });
    }

    const piloto = await pilotosModel.buscarPorId(buscarId);

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

    await pilotosModel.atualizar(buscarId, piloto)
    return res.status(200).json({ message: "Piloto atualizado com sucesso!", piloto: piloto });

  } catch (erro) {
    return res.status(500).json({ message: "Erro no banco | Detalhes do erro: ", data: erro });
  }
}

export async function deletarPiloto(req, res) {
  try {
    const deleteId = Number(req.params.id);
    const pilotoDeletar = await pilotosModel.buscarPorId(deleteId);

    if (!pilotoDeletar) {
      return res.status(404).json({ mensagem: "Piloto não encontrado! " });
    }

    await pilotosModel.deletar(deleteId);

    res.json({ mensagem: "Piloto removido com sucesso" });

  } catch (erro) {
    return res.status(500).json({ message: "Erro no banco | Detalhes do erro: ", data: erro });
  }
}
