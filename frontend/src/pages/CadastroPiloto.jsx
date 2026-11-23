import { useState } from "react";

export default function CadastroPiloto() {
    const [numero, setNumero] = useState("");
    const [nome, setNome] = useState("");
    const [equipe, setEquipe] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    function cadastrar(evento) {
        evento.preventDefault();
        setMensagem("");
        setErro("");

        if (!numero || !nome.trim() || !equipe.trim() || !senha || !confirmarSenha) {
            setErro("Preencha todas as informações do piloto.");
            return;
        }

        if (numero < 1 || numero > 99) {
            setErro("O número do piloto deve estar entre 1 e 99.");
            return;
        }

        if (senha.length < 8) {
            setErro("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        setMensagem(`Piloto ${nome} cadastrado com sucesso!`);
        setNumero("");
        setNome("");
        setEquipe("");
        setSenha("");
        setConfirmarSenha("");
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-10 text-white">
            <div className="absolute inset-0 opacity-20" aria-hidden="true">
                <div className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-red-600 blur-3xl" />
                <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-orange-500 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl lg:grid-cols-[0.75fr_1.25fr]">
                    <section className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-red-600 p-8 lg:flex">
                        <div className="absolute inset-0 opacity-25">
                            <div className="absolute -right-20 top-16 h-72 w-72 rotate-12 rounded-[5rem] border-[28px] border-white" />
                            <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full border-[32px] border-zinc-950" />
                        </div>

                        <div className="relative z-10">
                            <p className="text-sm font-black tracking-[0.35em] text-white/80">MOTO GP</p>
                            <h2 className="mt-3 text-5xl font-black italic leading-[0.9]">RACING<br />ACADEMY</h2>
                        </div>

                        <div className="relative z-10 border-l-4 border-white pl-4">
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">Temporada 2026</p>
                            <p className="mt-1 text-xl font-black italic">PREPARADO PARA<br />A PRÓXIMA CURVA?</p>
                        </div>
                    </section>

                    <section className="p-6 sm:p-10 lg:p-12">
                        <div className="mb-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-red-500">Registro oficial</p>
                            <h1 className="text-3xl font-black italic text-white sm:text-4xl">CADASTRO DO PILOTO</h1>
                            <p className="mt-2 text-sm text-zinc-400">Entre na pista com seus dados de piloto.</p>
                        </div>

                        <form onSubmit={cadastrar} className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-[120px_1fr]">
                                <div>
                                    <label htmlFor="numero" className="mb-2 block text-sm font-bold text-zinc-200">
                                        Número
                                    </label>
                                    <input
                                        id="numero"
                                        type="number"
                                        min="1"
                                        max="99"
                                        value={numero}
                                        onChange={(evento) => setNumero(evento.target.value)}
                                        placeholder="93"
                                        required
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-lg font-black text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="nome" className="mb-2 block text-sm font-bold text-zinc-200">
                                        Nome do piloto
                                    </label>
                                    <input
                                        id="nome"
                                        type="text"
                                        value={nome}
                                        onChange={(evento) => setNome(evento.target.value)}
                                        placeholder="Digite seu nome"
                                        required
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="equipe" className="mb-2 block text-sm font-bold text-zinc-200">
                                    Equipe
                                </label>
                                <input
                                    id="equipe"
                                    type="text"
                                    value={equipe}
                                    onChange={(evento) => setEquipe(evento.target.value)}
                                    placeholder="Ex.: Red Bull Racing"
                                    required
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                />
                            </div>

                            <div>
                                <label htmlFor="senha" className="mb-2 block text-sm font-bold text-zinc-200">
                                    Senha
                                </label>
                                <input
                                    id="senha"
                                    type="password"
                                    value={senha}
                                    onChange={(evento) => setSenha(evento.target.value)}
                                    placeholder="Mínimo de 8 caracteres"
                                    minLength={8}
                                    required
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmarSenha" className="mb-2 block text-sm font-bold text-zinc-200">
                                    Confirmar senha
                                </label>
                                <input
                                    id="confirmarSenha"
                                    type="password"
                                    value={confirmarSenha}
                                    onChange={(evento) => setConfirmarSenha(evento.target.value)}
                                    placeholder="Digite a senha novamente"
                                    required
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                />
                            </div>

                            <button
                                type="submit"
                                className="group flex w-full items-center justify-center gap-3 rounded-lg bg-red-600 px-5 py-4 font-black italic text-white shadow-lg shadow-red-950/40 transition hover:bg-red-500 active:scale-[0.98]"
                            >
                                ENTRAR NA PISTA
                                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                            </button>
                        </form>

                        {mensagem && (
                            <p role="status" className="mt-5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm font-bold text-emerald-400">
                                {mensagem}
                            </p>
                        )}

                        {erro && (
                            <p role="alert" className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm font-bold text-red-400">
                                {erro}
                            </p>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}