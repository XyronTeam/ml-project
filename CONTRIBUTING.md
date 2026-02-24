# ML Project – Development Guidelines

## Branching Strategy

- `main` → Stable production branch.
- `dev` → Active development branch.
- Never commit or merge directly into `main`.
- All work must go through `dev`.

## Workflow

1. Create an **Issue** describing the task.
2. Create a new branch from the Issue.
   - Base branch must be: `dev`
3. Work locally on your branch.
4. Make small, focused commits.
5. Push your branch.
6. Open a Pull Request → target branch: `dev`.
7. Merge only after review/approval.

`dev` will be merged into `main` when stable.

---

## Branch Naming

Branch names must be simple and descriptive:

Examples:
- `feature-preprocessing`
- `feature-train-logistic`
- `fix-scaling-bug`
- `refactor-utils`

Use lowercase and hyphens only.

---

## Commit Message Guidelines

- Keep commits small and focused.
- Do not push large amounts of unrelated code in one commit.
- Use clear action verbs:

Examples:
- `Add preprocessing pipeline`
- `Fix missing value handling`
- `Refactor training function`

To automatically close an Issue:
# ML Project – Development Guidelines

## Branching Strategy

- `main` → Stable production branch.
- `dev` → Active development branch.
- Never commit or merge directly into `main`.
- All work must go through `dev`.

## Workflow

1. Create an **Issue** describing the task.
2. Create a new branch from the Issue.
   - Base branch must be: `dev`
3. Work locally on your branch.
4. Make small, focused commits.
5. Push your branch.
6. Open a Pull Request → target branch: `dev`.
7. Merge only after review/approval.

`dev` will be merged into `main` when stable.

---

## Branch Naming

Branch names must be simple and descriptive:

Examples:
- `feature-preprocessing`
- `feature-train-logistic`
- `fix-scaling-bug`
- `refactor-utils`

Use lowercase and hyphens only.

---

## Commit Message Guidelines

- Keep commits small and focused.
- Do not push large amounts of unrelated code in one commit.
- Use clear action verbs:

Examples:
- `Add preprocessing pipeline`
- `Fix missing value handling`
- `Refactor training function`

To automatically close an Issue:
Fix scaling bug. Closes #12
Add training notebook. Closes #8


---

## Code Organization

- Keep notebooks clean and high-level.
- Do not implement complex logic inside notebooks.
- All core logic must be written inside the `src/` directory.
- Import and use functions inside notebooks.

Notebooks should remain abstract and readable.

---

## General Rules

- Do not push directly to `main`.
- Always use Pull Requests.
- Do not upload large datasets to GitHub.
- Follow the existing project structure.
- Write clean, readable, maintainable code.

If unsure about any change, open an Issue first.