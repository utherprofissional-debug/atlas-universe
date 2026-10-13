import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/Sidebar'

export default async function Home() {
  const { data: organizations, error } = await supabase.from('organizations').select('*')

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white font-mono">
      {/* Barra Lateral criada no componente Sidebar */}
      <Sidebar />

      {/* Área Principal do Dashboard */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold">Dashboard Geral</h2>
            <p className="text-sm text-zinc-400">Bem-vindo ao centro de comando do Atlas Universe.</p>
          </div>
          <div className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1.5 rounded-full">
            ● Supabase Online
          </div>
        </header>

        {/* Cartão exibindo os dados das Organizações */}
        <div className="grid gap-6">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Organizações Registadas:</h3>
            
            {error ? (
              <p className="text-red-400">Erro ao carregar dados: {error.message}</p>
            ) : (
              <pre className="bg-black p-4 rounded text-xs overflow-auto text-emerald-300">
                {JSON.stringify(organizations, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}