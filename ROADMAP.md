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

- [ ] Markdown/HTML dashboard with summary statistics  
  _Total TODOs, grouped by folder, priority, author (`git blame`)_
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

---

# 🚀 Roadmap for TODO Issue Tracker 2.0

This project aims to build an intelligent GitHub Action that scans your codebase for TODOs, classifies them, and transforms them into contextualized GitHub Issues — with semantic analysis and multi-platform integration.

---

## 🧱 Phase 1: Foundations and Parity with the Original Project

🎯 Goal: Recreate the original functionality with clean, modular, and testable code.

- [ ] Create the base project structure
  - `src/` folder for source code
  - Subfolders: `core/`, `parser/`, `tasks/`, `templates/`, etc.

- [ ] Implement TODO parser
  - Detect `TODO`, `FIXME`, `BUG`, etc. comments
  - Support for multiple languages (`.js`, `.ts`, `.py`, `.go`, etc.)

- [ ] Initial task system: GitHub Issues
  - Create, update, and remove issues based on detected TODOs

- [ ] Templating system for issue creation
  - Customizable titles and descriptions via templates

- [ ] Functional GitHub Action workflow
  - `action.yml` definition file
  - Example usage in `.github/workflows/todo.yml`

- [ ] Unit testing with Jest or Vitest

---

## 🧠 Phase 2: Intelligence and Semantics

🎯 Goal: Make the system smarter by leveraging LLMs and contextual awareness.

- [ ] Automatic TODO classification
  - Use LLMs or heuristics to classify as `bug`, `enhancement`, `refactor`, etc.

- [ ] Auto-generate issue titles and descriptions using LLMs  
  _Example: `Review sorting algorithm` → `Optimize Sorting Algorithm for Edge Cases`_

- [ ] Extract `due date` and `priority` via inline metadata parsing  
  _Example: `TODO(priority=high, due=2025-06-01): improve this logic`_

---

## 🌍 Phase 3: Extended Support

🎯 Goal: Make the project adaptable to diverse environments and workflows.

- [ ] Support for multiple task management platforms  
  _GitHub, Jira, Notion, Trello, Linear (via APIs)_

- [ ] Internationalization (i18n)  
  _Detect TODOs written in different languages_

- [ ] Support for additional file types  
  _`.ipynb`, `.yaml`, `.md`, `.json`, `.xml`, and more_

---

## 📊 Phase 4: Analysis and Reporting

🎯 Goal: Provide visibility into the state and evolution of TODOs.

- [ ] Markdown/HTML dashboard with metrics  
  _Total TODOs, grouped by folder, priority, author (`git blame`)_

- [ ] TODO history tracking  
  _Track when TODOs are added, removed, or changed over time_

- [ ] Notifications and reminders  
  _Comment on PRs or issues when due dates are approaching_

---

## 🔁 Phase 5: Optimizations and Contributions

🎯 Goal: Ensure quality, performance, and ease of collaboration.

- [ ] Plugin-based modular architecture
- [ ] CLI support (standalone usage outside GitHub Actions)
- [ ] Test coverage >90%
- [ ] Full documentation with usage examples
- [ ] Publish to GitHub Marketplace as an official Action

---

## 📌 Notes

- Modularity, testability, and code clarity are priorities from day one.
- LLM integration will be optional and cleanly decoupled from core logic.
- Designed with automation, extensibility, and developer experience in mind.

