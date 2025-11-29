---
title: Configuration
description: How to customize Claude Kit for your project.
---

# Configuration

Claude Kit is highly customizable. This guide covers all configuration options.

## CLAUDE.md

The main configuration file is `.claude/CLAUDE.md`. This file defines:

- Project context and architecture
- Code conventions
- Tech stack details
- Custom instructions

### Basic Structure

```markdown
# Project Name

## Overview
Brief description of your project.

## Tech Stack
- **Languages**: Python, TypeScript
- **Backend**: FastAPI
- **Frontend**: Next.js
- **Database**: PostgreSQL

## Architecture
Describe your project structure.

## Code Conventions
Define naming conventions, style guides, etc.

## Custom Instructions
Any project-specific rules for Claude.
```

### Key Sections

#### Tech Stack

Tell Claude what technologies you're using:

```markdown
## Tech Stack

- **Languages**: Python 3.11, TypeScript 5.0
- **Backend Framework**: FastAPI with SQLAlchemy
- **Frontend Framework**: Next.js 14 with App Router
- **Database**: PostgreSQL 15
- **Testing**: pytest, vitest, Playwright
- **Deployment**: Docker, GitHub Actions
```

#### Code Conventions

Define your project's coding standards:

```markdown
## Code Conventions

### Naming
| Type | Python | TypeScript |
|------|--------|------------|
| Files | `snake_case.py` | `kebab-case.ts` |
| Functions | `snake_case` | `camelCase` |
| Classes | `PascalCase` | `PascalCase` |
| Constants | `UPPER_SNAKE` | `UPPER_SNAKE` |

### Style
- Python: Follow PEP 8, use type hints
- TypeScript: Strict mode, no `any` types
```

#### Security Standards

Define security requirements:

```markdown
## Security Standards

### Forbidden
- No hardcoded secrets
- No `eval()` or dynamic code execution
- No SQL string concatenation
- No `any` types in TypeScript

### Required
- Input validation on all user inputs
- Authentication on protected endpoints
- Secrets via environment variables only
```

## Environment-Specific Config

### Development

```markdown
## Development Environment

\`\`\`bash
# Python
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Node.js
pnpm install
pnpm dev
\`\`\`
```

### Testing

```markdown
## Testing

\`\`\`bash
# Python
pytest -v --cov=src

# Node.js
pnpm test
pnpm test:coverage
\`\`\`

### Coverage Requirements
- Minimum: 80%
- Critical paths: 95%
```

## Agent Behavior Overrides

Customize how specific agents behave:

```markdown
## Agent Behavior Overrides

### Planner Agent
- Break tasks into 15-60 minute chunks
- Always identify testing requirements
- Flag external dependencies

### Code-Reviewer Agent
- Enforce strict typing
- Security-first reviews
- Check for test coverage

### Tester Agent
- Use pytest for Python, vitest for TypeScript
- Generate edge case tests
- Include error scenario tests
```

## Mode Configuration

Set default modes for different situations:

```markdown
## Behavioral Modes

### Default Mode
Use `implementation` mode for coding tasks.

### Review Mode Settings
- Depth: 4 (thorough)
- Personas: security, performance

### Planning Mode Settings
- Task size: 15-60 minutes
- Include testing requirements
```

## Command Flags Defaults

Set default flags for commands:

```markdown
## Command Defaults

### /feature
- Default mode: implementation
- Include tests: yes
- Include review: yes

### /review
- Default persona: security
- Default depth: 3
```

## Git Configuration

Configure Git-related behavior:

```markdown
## Git Conventions

### Branch Naming
- `feature/[ticket]-[description]`
- `fix/[ticket]-[description]`
- `hotfix/[description]`

### Commit Messages
Format: `type(scope): subject`

Types: feat, fix, docs, style, refactor, test, chore

### PR Requirements
- Descriptive title and description
- Linked to issue
- All tests passing
```

## Example Complete Configuration

Here's a complete CLAUDE.md example:

```markdown
# My SaaS Project

## Overview
A B2B SaaS platform for project management.

## Tech Stack
- **Backend**: FastAPI + PostgreSQL
- **Frontend**: Next.js 14 + Tailwind
- **Auth**: Clerk
- **Payments**: Stripe

## Architecture
\`\`\`
src/
├── api/        # FastAPI routes
├── services/   # Business logic
├── models/     # SQLAlchemy models
├── frontend/   # Next.js app
└── tests/      # Test files
\`\`\`

## Code Conventions
- Python: PEP 8, type hints required
- TypeScript: Strict mode, Zod for validation
- Files: snake_case for Python, kebab-case for TS

## Security
- All inputs validated with Pydantic/Zod
- SQL via SQLAlchemy ORM only
- Secrets in environment variables

## Testing
- Python: pytest with 80% coverage minimum
- Frontend: vitest + Playwright
- Run: `pnpm test` or `pytest`

## Git
- Branches: feature/*, fix/*, hotfix/*
- Commits: conventional commits format
- PRs require review before merge
```

## Next Steps

- [Commands Overview](/claudekit/commands/overview/) — Learn available commands
- [Creating Commands](/claudekit/customization/creating-commands/) — Make your own commands
- [Creating Modes](/claudekit/customization/creating-modes/) — Make custom modes
