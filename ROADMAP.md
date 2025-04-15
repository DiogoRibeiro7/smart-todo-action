# 🗺️ Roadmap - Projeto `todo-watcher`

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

## 📌 Observações

- Modularidade e testes são prioridade desde o início
- Uso de LLMs será opcional e bem isolado no código
