---
title: Quick Start
description: Get up and running with Claude Kit in 2 minutes.
---

# Quick Start

This guide will have you using Claude Kit in under 2 minutes.

## Step 1: Start Claude Code

Open your terminal in a project with Claude Kit installed:

```bash
cd your-project
claude
```

## Step 2: Try Your First Command

Let's use the `/help` command to see what's available:

```bash
> /help
```

This shows all available commands organized by category.

## Step 3: Plan a Feature

Try the `/plan` command to break down a task:

```bash
> /plan "add a user profile page"
```

Claude will:
1. Analyze the requirement
2. Break it into actionable tasks
3. Create a structured implementation plan

## Step 4: Implement with `/feature`

Ready to build something? Use the full feature workflow:

```bash
> /feature "add password reset with email verification"
```

This orchestrates:
1. **Planning** — Requirements analysis and task breakdown
2. **Implementation** — Code generation with best practices
3. **Testing** — Unit and integration tests
4. **Review** — Self-review checklist

## Step 5: Switch Modes

Change how Claude behaves with modes:

```bash
> /mode brainstorm
```

Now Claude will:
- Ask more clarifying questions
- Present multiple alternatives
- Explore trade-offs before converging

Other useful modes:

```bash
> /mode implementation    # Code-focused, minimal prose
> /mode token-efficient   # Compressed output, saves tokens
> /mode review            # Critical analysis mode
```

## Common Workflows

### Bug Fixing

```bash
> /fix "TypeError: Cannot read property 'email' of undefined in UserService.ts:45"
```

Claude will analyze the error, find the root cause, implement a fix, and add a regression test.

### Code Review

```bash
> /review src/auth/
```

Get a comprehensive review covering:
- Code quality
- Security vulnerabilities
- Performance issues
- Maintainability

### Ship Changes

```bash
> /ship "feat: add user authentication"
```

Creates a git commit with proper message formatting and optionally opens a PR.

### Research

```bash
> /research "best practices for JWT authentication in Node.js"
```

Claude researches the topic and provides a comprehensive summary with recommendations.

## Tips for Getting Started

### 1. Start with Planning

Before writing code, use `/plan` or `/brainstorm` to think through the approach:

```bash
> /brainstorm "how should we handle file uploads?"
```

### 2. Use the Right Mode

Match the mode to your task:

| Task | Mode |
|------|------|
| Exploring options | `brainstorm` |
| Writing code | `implementation` |
| Reviewing code | `review` |
| Researching | `deep-research` |
| High-volume work | `token-efficient` |

### 3. Leverage Flags

Commands support flags for customization:

```bash
> /feature --skip-tests "add logging utility"
> /review --persona=security src/auth/
> /plan --depth=5 "implement payment flow"
```

### 4. Check Command Help

Get details on any command:

```bash
> /help feature
> /help fix
```

## Next Steps

You're ready to use Claude Kit! Here's where to go next:

- [Configuration](/claudekit/getting-started/configuration/) — Customize Claude Kit for your project
- [Commands Overview](/claudekit/commands/overview/) — See all 27+ commands
- [Modes Overview](/claudekit/modes/overview/) — Learn about all 7 modes
- [Customization](/claudekit/customization/overview/) — Create your own commands
