# ATLAS UNIVERSE — Relatório de Arquitetura e Auditoria Técnica (Fase 0)

## 1. Inventário de Ficheiros
- `app/page.tsx`: Ponto de entrada do Dashboard. Realiza consulta Server-side no Supabase (`select('*')`).
- `app/organizations/page.tsx`: Página de listagem e criação de organizações via Server Action (`createOrganization`).
- `components/Sidebar.tsx`: Componente de navegação lateral.
- `lib/supabase.ts`: Instância do cliente Supabase configurada com variáveis públicas.
- `.env.local`: Guarda `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## 2. Diagnóstico da Tabela `organizations`
- **Campos esperados:** `id`, `name`, `slug`, `industry`, `business_model`, `created_at`, `updated_at`.
- **Status RLS:** Desativado temporariamente (Ponto de Atenção de Segurança).

## 3. Riscos Identificados & Ações Recomendadas
1. **Risco de Segurança (RLS Desativado):** Qualquer utilizador anon/público consegue ler e escrever na tabela `organizations`.
- *Ação:* Preparar a migração para o módulo de Autenticação do Supabase e reativar o RLS com políticas baseadas em pertença à organização.