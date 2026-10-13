export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col p-6 hidden md:flex">
      <div className="mb-8">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          ATLAS UNIVERSE
        </h1>
        <p className="text-xs text-zinc-500 mt-1">SaaS Management</p>
      </div>

      <nav className="flex flex-col gap-2">
        <a href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 text-sm transition-colors">
          📊 Dashboard
        </a>
        <a href="/organizations" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 text-sm transition-colors">
          🏢 Organizações
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 text-sm transition-colors">
          👥 Utilizadores
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 text-sm transition-colors">
          ⚙️ Definições
        </a>
      </nav>
    </aside>
  )
}