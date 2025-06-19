# 🧠 smart-todo-action

A GitHub Action that scans your codebase for inline TODOs, FIXMEs, and BUG comments, and automatically creates GitHub Issues — with support for labels, metadata parsing, and semantic enrichment.

For citation information, see [CITATION.cff](CITATION.cff).

---

## 🚀 Features

- ✅ Detects `TODO`, `FIXME`, `BUG`, and `HACK` comments
- ✅ Supports many languages: `.ts`, `.js`, `.py`, `.go`, `.c`, `.cpp`, `.rs`, `.html`, `.yaml`, etc.
- ✅ Skips common directories like `node_modules`, `dist`, and `coverage`
- ✅ Extracts metadata like `priority`, `due`, etc.
- ✅ Parses structured tags (`@assignee`, `#module`, `key=value`)
- ✅ Warns about overdue TODOs
- ✅ Automatically labels issues based on type and metadata
- ✅ Creates labels on the fly if they don't exist
- ✅ Supports custom label colors and descriptions via JSON config
- ✅ Custom templates for issue titles and bodies
- ✅ LLM-powered issue title and body generation
- ✅ Automatic retry logic for OpenAI API calls
- ✅ Supports multiple LLM providers: OpenAI or Gemini
- ✅ Command-line interface for local usage
- ✅ Optional Jira synchronization

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
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: yarn install
      - run: yarn prepare

      - name: Run Smart TODO Action
        uses: ./
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          limit: 5
          llm: true
          llm-provider: openai # or 'gemini'
```

Set `OPENAI_API_KEY` or `GEMINI_API_KEY` secrets based on your chosen provider.

### 2. Run the CLI locally

Use the bundled command-line interface to scan a directory on your machine and
optionally generate a markdown report:

```bash
npx todo-action --dir src --report
```

Flags:

- `--dir`, `-d` – Directory to scan (defaults to the current directory)
- `--report`, `-r` – Write a `TODO_REPORT.md` file with all results

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

- Max **5 issues** are created per run to avoid rate limiting (configurable via the `limit` input)
- **Duplicate detection** prevents reopening the same TODO multiple times
- All labels are **auto-created with default colors** if missing
- Provide a JSON file via `label-config` to override colors and descriptions

---

## 📤 Coming Soon

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


```plaintext
smart-todo-action/
├── .github/
│   └── workflows/
│       └── todo.yml
│
├── dist/
│   └── index.js
│
├── src/
│   ├── core/
│   │   ├── issueManager.ts
│   │   ├── labelManager.ts          # 🆕 Label logic (static + metadata + creation)
│   │   ├── report.ts
│   │   ├── todoUtils.ts
│   │   └── __tests__/               # (opcional) unit tests
│
│   ├── parser/
│   │   ├── extractTodosFromDir.ts
│   │   ├── extractTodosFromFile.ts
│   │   └── types.ts
│
│   ├── templates/
│   │   ├── issueTitle.txt
│   │   ├── issueBody.md
│   │   └── utils.ts
│
│   └── ActionMain.ts
│
├── .gitignore
├── action.yml
├── package.json
├── tsconfig.json
└── README.md
```

## 🔖 Versioning

The `check-version` script ensures the `package.json` version matches the
current Git tag. It runs in CI and can be invoked locally with:

```bash
yarn check-version
```

## 📜 Citation

If you use **smart-todo-action**, please cite it using the metadata in [CITATION.cff](CITATION.cff). This file contains the DOI and author information for reference managers.

## 👤 Author

This project is maintained by [Diogo Ribeiro](https://github.com/DiogoRibeiro7).

- **ORCID:** [0009-0001-2022-7072](https://orcid.org/0009-0001-2022-7072)
- **Affiliation:** ESMAD - Instituto Politécnico do Porto
- **Personal email:** <diogo.debastos.ribeiro@gmail.com>
- **Professional email:** <dfr@esmad.ipp.pt>


## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and make sure to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

