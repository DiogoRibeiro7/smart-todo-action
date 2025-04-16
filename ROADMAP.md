# 🗺️ Roadmap — `smart-todo-action`

A smart GitHub Action that detects, classifies, and transforms inline TODOs in your codebase into actionable GitHub Issues — with semantic analysis and integration with task management systems.

---

## 🧱 Phase 1: Foundations & Core Features

> Rebuild the original functionality with clean, modular, and testable code.

- [X] Project structure and folder setup (`src/`, `core/`, `parser/`, etc.)
- [X] TODO/FIXME/BUG parser with multi-language support
- [ ] Initial task system: GitHub Issues integration
- [ ] Configurable issue templates
- [ ] GitHub Action integration (`action.yml`, workflow example)
- [ ] Unit tests with Vitest or Jest

---

## 🧠 Phase 2: Intelligence & Semantics

> Bring context-awareness and automation through LLMs and structured tags.

- [ ] Automatic classification (`bug`, `refactor`, `enhancement`, etc.)
- [ ] LLM-powered title/description generation  
  _e.g., `Review sort algorithm` → `Optimize Sorting Algorithm for Edge Cases`_
- [ ] Parse structured metadata: `priority`, `due`, etc.  
  _e.g., `TODO(priority=high, due=2025-06-01): improve this logic`_
- [ ] Support for structured tags (`@assignee`, `#module`, etc.)

---

## 🌍 Phase 3: Extended Support

> Make the system flexible, extensible, and applicable to diverse environments.

- [ ] Multi-platform task integration (GitHub, Jira, Notion, Trello, Linear)
- [ ] Internationalization (i18n): multilingual TODO detection
- [ ] File format support: `.ipynb`, `.yaml`, `.json`, `.xml`, etc.

---

## 📊 Phase 4: Insights & Reporting

> Provide visibility into the evolution and structure of tracked TODOs.

- [X] Markdown/HTML dashboard with summary statistics  
  _Total TODOs, grouped by folder, priority, author (`git blame`) — **now sorted by `priority` and `due` date**_

- [ ] TODO history tracking (added/removed/modified)
- [ ] Due date notifications or PR comments

---

## 🔁 Phase 5: Optimization & Distribution

> Final touches to ensure performance, scalability, and community usability.

- [ ] Plugin-based architecture
- [ ] CLI support (standalone usage outside GitHub Actions)
- [ ] >90% test coverage
- [ ] Full documentation with usage examples
- [ ] Publish to GitHub Marketplace

---

## 📌 Notes

- Clean architecture and modularity are core principles from day one.
- LLM functionality will be optional and clearly separated from core logic.
- Built with automation, extensibility, and developer workflows in mind.
