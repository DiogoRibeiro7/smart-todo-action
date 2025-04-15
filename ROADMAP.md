# 🗺️ Roadmap - Projeto `smart-todo-action`

Um GitHub Action inteligente para rastrear, classificar e transformar TODOs do seu código em issues inteligentes e contextualizadas.

---

## 🧱 Fase 1: Fundações e Paridade com Projeto Original

> Recriação da funcionalidade básica com código limpo, modular e testável.

- [ ] Estrutura inicial do projeto (`src/`, `core/`, `parser/`, etc.)
- [ ] Parser de TODOs/FIXME/BUG com suporte multi-linguagem
- [ ] Sistema de tarefas inicial: integração com GitHub Issues
- [ ] Templates configuráveis para issues
- [ ] Configuração como GitHub Action (`action.yml`, workflow exemplo)
- [ ] Testes unitários com Jest/Vitest

---

## 🧠 Fase 2: Inteligência e Semântica

> Adição de inteligência artificial e compreensão semântica aos TODOs.

- [ ] Classificação automática (`bug`, `refactor`, `enhancement`, etc.)
- [ ] Geração automática de títulos e descrições via LLM
- [ ] Extração de `due date` e `priority` do texto dos TODOs
- [ ] Suporte a tags especiais (`@assignee`, `#module`, etc.)

---

## 🌍 Fase 3: Suporte Estendido

> Tornar o projeto mais flexível, aplicável e adaptável a diferentes realidades.

- [ ] Integração com outros task managers (Jira, Notion, Linear, Trello)
- [ ] Internacionalização (detecção multilíngue de TODOs)
- [ ] Suporte a arquivos `.ipynb`, `.yaml`, `.json`, `.xml`, etc.

---

## 📊 Fase 4: Análise e Relatórios

> Adicionar insights e visualizações sobre o uso e evolução dos TODOs.

- [ ] Geração de dashboard (markdown/HTML) com métricas
- [ ] Agrupamento por pasta, prioridade, autor (`git blame`)
- [ ] Histórico de mudanças nos TODOs
- [ ] Notificações de TODOs próximos da data (`due date`)

---

## 🔁 Fase 5: Otimizações e Distribuição

> Melhorias finais para performance, manutenção e distribuição.

- [ ] Arquitetura modular e plugável
- [ ] CLI standalone (fora do GitHub Actions)
- [ ] >90% de cobertura de testes
- [ ] Documentação completa
- [ ] Publicação oficial no GitHub Marketplace

---

# 🚀 Roadmap para TODO Issue Tracker 2.0

Este projeto tem como objetivo construir uma GitHub Action inteligente para rastrear, classificar e transformar TODOs do seu código em issues contextualizadas, com suporte a análise semântica e integração com múltiplas plataformas.

---

## 🧱 Fase 1: Fundações e Paridade com o Projeto Original

🎯 Objetivo: Recriar a funcionalidade original com código limpo, modular e testável.

- [ ] Criar estrutura base do projeto
  - Pasta `src/` para código-fonte
  - Subpastas: `core/`, `parser/`, `tasks/`, `templates/`, etc.

- [ ] Implementar parser de TODOs
  - Detectar comentários `TODO`, `FIXME`, `BUG`, etc.
  - Suporte a múltiplas linguagens (`.js`, `.ts`, `.py`, `.go`, etc.)

- [ ] Sistema de tarefas inicial: GitHub Issues
  - Criar, atualizar e remover issues com base nos TODOs encontrados

- [ ] Sistema de templates para criação de issues
  - Títulos e descrições personalizáveis via templates

- [ ] Workflow GitHub Action funcional
  - Arquivo `action.yml`
  - Exemplo de uso em `.github/workflows/todo.yml`

- [ ] Testes unitários com Jest ou Vitest

---

## 🧠 Fase 2: Inteligência e Semântica

🎯 Objetivo: Tornar o sistema mais inteligente, aproveitando LLMs e contexto semântico.

- [ ] Classificação automática de TODOs
  - Usar LLMs ou regras heurísticas para classificar como `bug`, `enhancement`, `refactor`, etc.

- [ ] Geração de título e descrição automática via LLM
  - Exemplo: `Revisar algoritmo de ordenação` → `Optimize Sorting Algorithm for Edge Cases`

- [ ] Extração de `due date` e `priority` via parsing
  - Exemplo: `TODO(priority=high, due=2025-06-01): melhorar isso`

---

## 🌍 Fase 3: Suporte Estendido

🎯 Objetivo: Tornar o sistema flexível e útil para ambientes diversos.

- [ ] Suporte a múltiplos sistemas de tarefas
  - GitHub, Jira, Notion, Trello, Linear (via APIs)

- [ ] Internacionalização (i18n)
  - Detecção automática de TODOs em diversas línguas

- [ ] Suporte a mais formatos de arquivos
  - `.ipynb`, `.yaml`, `.md`, `.json`, `.xml`, entre outros

---

## 📊 Fase 4: Análise e Relatórios

🎯 Objetivo: Dar visibilidade sobre o estado e evolução dos TODOs.

- [ ] Dashboard em Markdown ou HTML
  - Total de TODOs
  - Agrupamento por pasta, prioridade, autor (via `git blame`)

- [ ] Histórico de TODOs
  - Rastrear adições e remoções ao longo do tempo

- [ ] Notificações e lembretes
  - Comentários automáticos em PRs/issues ao se aproximar a `due date`

---

## 🔁 Fase 5: Otimizações e Contribuições

🎯 Objetivo: Garantir qualidade e facilitar manutenção.

- [ ] Arquitetura com módulos plugáveis
- [ ] Cobertura de testes superior a 90%
- [ ] Suporte a CLI standalone (fora do GitHub Actions)
- [ ] Documentação completa com exemplos de uso
- [ ] Publicação como GitHub Action oficial no Marketplace

---

## 📌 Observações

- Modularidade, testes e clareza são prioridades desde o início
- Integração com LLMs será opcional e desacoplada do core
