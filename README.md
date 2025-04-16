# 🧠 smart-todo-action

A GitHub Action that scans your codebase for inline TODOs, FIXMEs, and BUG comments, and automatically creates GitHub Issues — with support for labels, metadata parsing, and semantic enrichment.

---

## 🚀 Features

- ✅ Detects `TODO`, `FIXME`, `BUG`, and `HACK` comments
- ✅ Supports multiple languages: `.ts`, `.js`, `.py`, `.go`, `.html`, etc.
- ✅ Extracts metadata like `priority`, `due`, etc.
- ✅ Automatically labels issues based on type and metadata
- ✅ Creates labels on the fly if they don't exist

---

## ⚙️ Usage

### 1. Add the Action to your workflow

```yaml
name: Smart TODO Tracker

on:
  push:
    branches: [main]

jobs:
  smart-todo:
    runs-on: ubuntu-latest
    permissions:
      issues: write

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - run: yarn install
      - run: yarn prepare

      - name: Run Smart TODO Action
        uses: ./
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

## 📝 Example TODOs

```ts
// TODO(priority=high, due=2025-06-01): Refactor this method for performance
// FIXME: Handle null input properly
// BUG: This causes a crash when file is empty
```

## 🏷️ Automatic Labels

Based on your TODO comment, the following labels will be applied:

| Tag   | Label(s)                                      |
|--------|-----------------------------------------------|
| TODO   | `enhancement`, `priority:high`, `due:2025-06-01` |
| FIXME  | `bug`                                         |
| BUG    | `bug`                                         |
| HACK   | `technical-debt`                              |

If a label like `priority:high` or `due:2025-06-01` doesn't exist, it will be automatically created.

---

## 📌 Notes

- Max **5 issues** are created per run to avoid rate limiting
- **Duplicate detection** is not yet implemented _(coming soon)_
- All labels are **auto-created with default colors** if missing

---

## 📤 Coming Soon

- ✅ Issue deduplication  
- ✅ Custom templates for issue bodies  
- ✅ CLI usage outside GitHub  
- ✅ LLM-powered summarization and classification
- ✅ Support for more languages and comment styles
- ✅ Customizable label creation and management
- ✅ Integration with project management tools (e.g., Jira, Trello)
- ✅ Support for multiple repositories in a single run
- ✅ Rate limiting and error handling improvements
- ✅ Customizable issue creation frequency (e.g., daily, weekly)
- ✅ Support for user-defined metadata tags
- ✅ Customizable issue assignment (e.g., to specific users or teams)
- ✅ Support for issue templates and custom fields
- ✅ Integration with CI/CD pipelines for automated issue tracking
- ✅ Support for issue comments and discussions
- ✅ Customizable notification settings (e.g., email, Slack)
- ✅ Support for issue closing and resolution tracking
- ✅ Customizable issue lifecycle management (e.g., open, in progress, closed)