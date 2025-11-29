---
title: Introduction
description: Learn what Claude Kit is and how it can accelerate your development workflow.
---

# Introduction to Claude Kit

Claude Kit is an open-source toolkit that transforms Claude Code into a production-ready AI development team. It provides pre-built commands, intelligent modes, and battle-tested skills that accelerate your development workflow.

## What is Claude Kit?

Claude Kit is a collection of:

- **27+ Commands** — Slash commands like `/feature`, `/fix`, `/review` that automate development workflows
- **7 Modes** — Behavioral configurations that optimize Claude for specific tasks (brainstorming, implementation, review, etc.)
- **34+ Skills** — Pre-built knowledge modules for languages, frameworks, testing, security, and development methodologies

All of this lives in a `.claude` folder that you add to your project, giving Claude Code the context and structure it needs to be truly productive.

## Why Claude Kit?

### The Problem with Raw Claude Code

While Claude Code is powerful, using it without structure leads to common issues:

| Problem | Symptom |
|---------|---------|
| **Context Spirals** | Token budgets run out, Claude loses track of what it was doing |
| **Inconsistent Output** | Quality varies wildly between sessions |
| **Manual Workflows** | You copy the same prompts between projects |
| **No Structure** | Every session starts from scratch |

### How Claude Kit Helps

Claude Kit solves these problems with:

1. **Structured Workflows** — Commands like `/feature` orchestrate multi-phase development automatically
2. **Context Control** — Modes and skills give Claude exactly the context it needs
3. **Consistent Quality** — Built-in code review, testing standards, and security checks
4. **Full Customization** — Add your own commands, modes, and skills

## Key Features

### Commands

Commands automate common development tasks:

```bash
/feature "add user authentication"  # Full feature workflow
/fix "TypeError in UserService"     # Smart debugging
/review src/auth/                   # Code review
/ship "feat: add auth"              # Git commit + PR
```

### Modes

Modes change Claude's behavior for different task types:

```bash
/mode brainstorm    # Creative exploration, more questions
/mode implementation # Code-focused, minimal prose
/mode review        # Critical analysis, finds issues
```

### Skills

Skills provide pre-built knowledge for:

- **Languages**: Python, TypeScript, JavaScript
- **Frameworks**: React, Next.js, FastAPI, Django
- **Testing**: pytest, vitest, Playwright
- **Methodologies**: TDD, systematic debugging, code review

## Who is Claude Kit For?

Claude Kit is designed for:

- **Solo developers** who want to ship faster
- **Small teams (1-3 developers)** working on multi-stack projects
- **Anyone using Claude Code** who wants more structure and consistency

## Next Steps

Ready to get started?

1. [Install Claude Kit](/claudekit/getting-started/installation/) — Add it to your project
2. [Quick Start](/claudekit/getting-started/quick-start/) — Your first command in 2 minutes
3. [Configuration](/claudekit/getting-started/configuration/) — Customize for your project

Or dive into the features:

- [Commands Reference](/claudekit/commands/overview/) — All 27+ commands
- [Modes Reference](/claudekit/modes/overview/) — All 7 behavioral modes
- [Skills Reference](/claudekit/skills/overview/) — All 34+ skill modules
