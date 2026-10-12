export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-950 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-800 bg-gradient-to-b from-zinc-250 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-zinc-900/50 lg:p-4">
          Status do Sistema:&nbsp;
          <code className="font-bold text-emerald-400">ATLAS Core Online</code>
        </p>
      </div>

      <div className="flex flex-col items-center text-center my-auto">
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
          ATLAS UNIVERSE
        </h1>
        <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mb-8">
          O cérebro operacional digital da sua empresa. Inteligência, gestão e automação unidas em um só lugar.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold transition-all shadow-lg shadow-blue-600/30">
            Acessar Plataforma
          </button>
          <button className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold transition-all border border-slate-700">
            Saiba Mais
          </button>
        </div>
      </div>

      <div className="text-slate-600 text-xs text-center">
        Desenvolvido por Uther e Sócio — Versão 0.1 MVP
      </div>
    </main>
  );
}