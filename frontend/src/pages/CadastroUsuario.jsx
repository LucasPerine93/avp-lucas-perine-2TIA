import { useState } from "react";
import axios from "axios";


export default function CadastroUsuario({ irParaLogin }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    async function cadastrar(evento) {
        evento.preventDefault();
        setMensagem("");
        setErro("");

        if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
            setErro("Preencha todas as informações do usuario");
            return;
        }

        if (senha.length < 8) {
            setErro("Senha curta de mais, pelo menos 8 caracteres");
            return;
        }

        if (senha !== confirmarSenha) {
            setErro("As senhas não são iguais");
            return;
        }

        try {
            const resposta = await axios.post("http://localhost:9393/usuarios/cadastrar", {
                nome,
                email,
                senha
        });

        setMensagem(`Usuario com nome ${nome} cadastrado com sucesso`);
        setNome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");

        irParaLogin();

        } catch (erro) {
            const textoErro =
                erro.response?.data?.mensagem ||
                erro.response?.data?.message ||
                erro.response?.data?.erro ||
                "Erro ao conectar com o servidor.";
            setErro(textoErro);
        }
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-10 text-white">
            <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
                <div className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-red-600 blur-3xl" />
                <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-orange-500 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl lg:grid-cols-[0.75fr_1.25fr]">
                    <section className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-red-600 p-8 lg:flex">
                        <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden="true">
                            <div className="absolute -right-20 top-16 h-72 w-72 rotate-12 rounded-[5rem] border-[28px] border-white" />
                            <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full border-[32px] border-zinc-950" />
                        </div>

                        <div className="relative z-10">
                            <p className="text-sm font-black tracking-[0.35em] text-white/80">MOTO GP</p>
                            <h2 className="mt-3 text-5xl font-black italic leading-[0.9]">
                                RACING
                                <br />
                                ACADEMY
                            </h2>
                        </div>

                        <div className="relative z-10 border-l-4 border-white pl-4">
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">Temporada 2026</p>
                            <p className="mt-1 text-xl font-black italic">
                                ACELERE PARA
                                <br />O PRÓXIMO NÍVEL
                            </p>
                        </div>
                    </section>

                    <section className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                        <div className="mb-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-red-500">
                                Acesso oficial
                            </p>
                            <h1 className="text-3xl font-black italic text-white sm:text-4xl">CADASTRO DE USUÁRIO</h1>
                            <p className="mt-2 text-sm text-zinc-400">
                                Preencha seus dados para acessar o paddock.
                            </p>
                        </div>

                        <form onSubmit={cadastrar} className="space-y-5">
                            <fieldset className="space-y-5 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 sm:p-5">
                                <legend className="px-2 text-xs font-black uppercase tracking-[0.3em] text-red-500">
                                    Dados do usuário
                                </legend>

                                <div>
                                    <label htmlFor="nome" className="mb-2 block text-sm font-bold text-zinc-200">
                                        Nome completo
                                    </label>
                                    <input
                                        id="nome"
                                        type="text"
                                        value={nome}
                                        onChange={(evento) => setNome(evento.target.value)}
                                        placeholder="Digite seu nome completo"
                                        required
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-bold text-zinc-200">
                                        E-mail
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(evento) => setEmail(evento.target.value)}
                                        placeholder="seu@email.com"
                                        required
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                    />
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
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
                                            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="confirmarSenha"
                                            className="mb-2 block text-sm font-bold text-zinc-200"
                                        >
                                            Confirmar senha
                                        </label>
                                        <input
                                            id="confirmarSenha"
                                            type="password"
                                            value={confirmarSenha}
                                            onChange={(evento) => setConfirmarSenha(evento.target.value)}
                                            placeholder="Repita sua senha"
                                            required
                                            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            <button
                                type="submit"
                                className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-red-600 px-5 py-4 font-black italic text-white shadow-lg shadow-red-950/40 transition hover:bg-red-500 active:scale-[0.98]"
                            >
                                CADASTRAR CONTA
                                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                                    →
                                </span>
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <button
                                type="button"
                                onClick={irParaLogin}
                                className="cursor-pointer text-sm font-medium text-zinc-400 transition hover:text-white"
                            >
                                Ja tem conta?{" "}
                                <span className="font-bold text-red-500 underline-offset-4 hover:underline">
                                    Faça login aqui!
                                </span>
                            </button>
                        </div>

                        {mensagem && (
                            <p
                                role="status"
                                className="mt-5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm font-bold text-emerald-400"
                            >
                                {mensagem}
                            </p>
                        )}

                        {erro && (
                            <p
                                role="alert"
                                className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm font-bold text-red-400"
                            >
                                {erro}
                            </p>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}