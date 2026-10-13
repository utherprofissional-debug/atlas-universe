# ATLAS UNIVERSE — Documento Mestre de Continuidade

## 1. Visão do Produto
O ATLAS UNIVERSE é um sistema operacional inteligente para empresas. O seu primeiro produto comercial (MVP) é focado em pequenas lojas virtuais para a criação e gestão de campanhas de marketing completas (DNA Empresarial, Kit de Marca, Produtos, Calculadora e Campanhas Geradas por IA).

## 2. Diretrizes Principais
- **Prioridade:** Funcionalidade → Profundidade → Experiência do Utilizador → Estética.
- **Desenvolvimento:** Incremental, focado na aprendizagem dos dois sócios, com auditoria prévia antes de qualquer alteração de código.
- **Segurança:** Isolamento rigoroso multi-empresa via `organization_id` e políticas RLS no Supabase.

## 3. Estado Atual da Stack (Fase 0)
- **Framework:** Next.js (App Router, TypeScript)
- **Estilização:** Tailwind CSS
- **Base de Dados:** Supabase (PostgreSQL) com `@supabase/supabase-js`
- **Rotas Existentes:**
  - `app/page.tsx`: Dashboard geral e verificação do Supabase
  - `app/organizations/page.tsx`: Gestão de Organizações com formulário via Server Actions
- **Componentes:** `components/Sidebar.tsx`
- **Segurança Atual:** RLS temporariamente desativado na tabela `organizations` para testes de escrita local.