# 🗺️ Roadmap — `smart-todo-action`

A smart GitHub Action that detects, classifies, and transforms inline TODOs into actionable GitHub Issues — enriched with semantic analysis, metadata extraction, and automated reporting.

---

## 🧱 Phase 1: Core Foundations

> Build a clean, modular, and testable baseline — feature parity with the original idea.

- [x] Project structure (`src/`, `core/`, `parser/`, `templates/`, etc.)
- [x] Multi-language TODO/FIXME/BUG parser
- [x] Frontmatter metadata support (`priority=high`, `due=2025-06-01`)
- [x] GitHub Issues integration with deduplication
- [x] Configurable issue templates (`title`, `body`)
- [x] GitHub Action entrypoint (`action.yml`, `workflow.yml`)
- [x] CI-ready unit tests with Vitest

---

## 🧠 Phase 2: Semantic Intelligence

> Automatically extract meaning and context from TODOs using heuristics and LLMs.

- [x] Heuristic label classification (`refactor`, `bug`, `test`, `doc`, etc.)
- [x] LLM-powered title/body generation  
  _e.g., `Improve sort` → `Optimize Sorting Algorithm for Edge Cases`_
- [x] Enhanced metadata parsing (`@assignee`, `#module`, etc.)
- [x] Semantic label fallback when tag is ambiguous

---

## 🌍 Phase 3: Ecosystem Support

> Expand support to other tools, file types, and languages.

- [ ] Task sync with platforms: Jira, Notion, Trello, Linear
- [ ] Multilingual detection (i18n-ready)
- [ ] Parse formats beyond code: `.ipynb`, `.yaml`, `.json`, `.xml`, etc.

---

## 📊 Phase 4: Reporting & Insights

> Provide visibility into TODO usage and evolution.

- [x] Markdown dashboard (`TODO_REPORT.md`)
  - Group by `priority`, `due`, `semantic label`, and `folder`
- [x] Changelog generation from grouped TODOs (`CHANGELOG.md`)
- [ ] TODO lifecycle tracking (added/removed/changed)
- [ ] Due date notifications (PR comments, issues, or Slack)

---

## 🔁 Phase 5: Performance & Distribution

> Make it fast, reliable, and easy to adopt across the community.

- [ ] Plugin-based architecture (LLM integration, reporters, etc.)
- [x] CLI mode (run locally or in CI/CD)
- [ ] >90% test coverage
- [ ] Full documentation & usage guides
- [ ] Publish to GitHub Marketplace

---

## 🫂 Phase 6: Community Engagement

> Foster an active ecosystem and support network.

- [ ] Contributor guidelines and code of conduct
- [ ] Example workflows and tutorials
- [ ] Discussion board or Discord for support
- [ ] Regular release announcements

---

## 📌 Notes

- Built with extensibility and automation in mind.
- LLM functionality is **optional** and kept separate from core logic.
- Designed for teams who want visibility, traceability, and productivity with minimal friction.

