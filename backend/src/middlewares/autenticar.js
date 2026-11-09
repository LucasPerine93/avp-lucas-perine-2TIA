export default function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = process.env.TOKEN_SECRETO;

  if (authHeader !== `Bearer ${token}`) {
    return res.status(401).json({ "erro": "Acesso não autorizado" });
  }

  next();
}