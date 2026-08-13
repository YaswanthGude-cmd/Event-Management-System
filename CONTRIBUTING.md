# Contributing Guide

Welcome to the Event Management System project.

## Branch Strategy

- `main` → Stable production code
- `develop` → Integration branch
- `feature/*` → Individual feature development

---

## Workflow

1. Clone the repository.

```bash
git clone https://github.com/YaswanthGude-cmd/Event-Management-System.git
```

2. Switch to your assigned branch.

```bash
git checkout feature/home
```

3. Before starting work, update your local repository.

```bash
git checkout develop
git pull origin develop
git checkout feature/home
git merge develop
```

4. Make your changes.

5. Commit your work.

```bash
git add .
git commit -m "Implemented Home Page"
```

6. Push your branch.

```bash
git push origin feature/home
```

7. Open a Pull Request to `develop`.

---

## Coding Standards

- Use functional React components.
- Use PascalCase for component names.
- Use camelCase for variables and functions.
- Keep components reusable.
- Do not modify another teammate's assigned pages.

---

## Folder Structure

```text
src/
├── components/
├── pages/
├── routes/
├── services/
├── hooks/
├── context/
├── utils/
└── styles/
```

---

## Rules

- Do not push directly to `main`.
- Do not commit to another member's branch.
- Keep commit messages clear.
- Resolve merge conflicts before opening a Pull Request.