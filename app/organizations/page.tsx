import Sidebar from '@/components/Sidebar'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { Suspense } from 'react'

// Função de Server Action inteligente que cria tudo sozinha nos bastidores
async function createOrganization(formData: FormData) {
  'use server'

  const name = formData.get('name')?.toString()
  const slug = formData.get('slug')?.toString()

  if (!name || !slug) return

  // 1. Cria a organização
  const { data: newOrg, error: orgError } = await supabase
    .from('organizations')
    .insert([{ name, slug }])
    .select()
    .single()

  if (orgError || !newOrg) {
    console.error('Erro ao criar organização:', orgError)
    return
  }

  // 2. Procura um utilizador existente ou cria um automático para teste
  let userId: string | null = null
  const { data: existingUsers } = await supabase.from('users').select('id').limit(1)

  if (existingUsers && existingUsers.length > 0) {
    userId = existingUsers[0].id
  } else {
    // Como a tabela exige um ID válido, criamos um utilizador automático
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert([{ email: `admin-${Date.now()}@atlas.local`, full_name: 'Administrador Global' }])
      .select()
      .single()

    if (!userError && newUser) {
      userId = newUser.id
    }
  }

  // 3. Procura um papel (role) existente ou cria um automático de 'owner'
  let roleId: string | null = null
  const { data: existingRoles } = await supabase.from('roles').select('id').limit(1)

  if (existingRoles && existingRoles.length > 0) {
    roleId = existingRoles[0].id
  } else {
    const { data: newRole, error: roleError } = await supabase
      .from('roles')
      .insert([{ name: 'owner', description: 'Dono do Workspace' }])
      .select()
      .single()

    if (!roleError && newRole) {
      roleId = newRole.id
    }
  }

  // 4. Se tivermos o utilizador e o papel, finalmente gravamos a ligação na tabela memberships!
  if (userId && roleId) {
    const { error: memberError } = await supabase.from('memberships').insert([
      {
        organization_id: newOrg.id,
        user_id: userId,
        role_id: roleId,
        status: 'active'
      }
    ])

    if (memberError) {
      console.error('Erro ao criar membership:', memberError)
    }
  }

  // Atualiza a página instantaneamente
  revalidatePath('/organizations')
}

// Componente para listar as organizações
async function OrganizationsList() {
  const { data: organizations } = await supabase.from('organizations').select('*')

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-800 text-zinc-400 text-xs">
            <th className="pb-3 font-medium">Nome</th>
            <th className="pb-3 font-medium">Slug</th>
            <th className="pb-3 font-medium">Criado em</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50">
          {organizations?.map((org) => (
            <tr key={org.id} className="hover:bg-zinc-800/30 transition-colors">
              <td className="py-3 text-white font-medium">{org.name}</td>
              <td className="py-3 text-zinc-400">{org.slug}</td>
              <td className="py-3 text-zinc-500 text-xs">
                {new Date(org.created_at).toLocaleDateString('pt-PT')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function OrganizationsPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white font-mono">
      <Sidebar />

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-8 border-b border-zinc-800 pb-4">
          <h2 className="text-2xl font-bold">Gestão de Organizações</h2>
          <p className="text-sm text-zinc-400">Crie e gerencie os workspaces do Atlas Universe com segurança multi-tenant.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna da Esquerda: Formulário de Criação */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-xl h-fit">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Nova Organização</h3>
            
            <form action={createOrganization} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Nome da Organização</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Ex: Atlas Corp" 
                  required
                  className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Slug (Identificador URL)</label>
                <input 
                  type="text" 
                  name="slug" 
                  placeholder="Ex: atlas-corp" 
                  required
                  className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button 
                type="submit"
                className="mt-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2 rounded transition-colors"
              >
                Adicionar Organização
              </button>
            </form>
          </div>

          {/* Coluna da Direita: Lista de Organizações Existentes */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Organizações no Sistema:</h3>
            
            <Suspense fallback={<p className="text-sm text-zinc-500">A carregar organizações...</p>}>
              <OrganizationsList />
            </Suspense>
          </div>

        </div>
      </main>
    </div>
  )
}