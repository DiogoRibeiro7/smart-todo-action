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
      - uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 20

      - run: corepack enable
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

See the [examples](examples/) directory for a complete workflow configuration.

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

## 🗂️ Project Structure

```plaintext
smart-todo-action/
├── .github/workflows/
│   ├── bump_version.yml
│   ├── lint_workflows.yml
│   ├── publish_release.yml
│   ├── run_tests.yml
│   └── todo.yml
├── src/
│   ├── core/
│   ├── integrations/
│   ├── parser/
│   ├── templates/
│   ├── utils/
│   ├── ActionMain.ts
│   └── main.ts
├── tests/
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

## 🚢 Release Flow

- Main integration flow: `develop -> main` (via pull request).
- Releases are published manually using the **Publish Release** workflow.
- Run the workflow from the `main` branch to create the `v<package.json version>` tag and GitHub release.

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

## 💬 Community Support

If you need help or want to discuss ideas, join our community spaces
([details](SUPPORT.md)):

- [GitHub Discussions](https://github.com/DiogoRibeiro7/smart-todo-action/discussions)
- [Discord](https://discord.gg/smart-todo-action)

