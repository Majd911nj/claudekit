---
title: Commands Overview
description: All Claude Kit commands organized by category.
---

# Commands Overview

Claude Kit provides 27+ slash commands that automate common development workflows. Commands are organized into categories based on their purpose.

## Command Categories

### Development Commands

Core commands for building features and fixing bugs:

| Command | Description |
|---------|-------------|
| [`/feature`](/claudekit/commands/feature/) | End-to-end feature development workflow |
| [`/fix`](/claudekit/commands/fix/) | Smart debugging and bug fixing |
| [`/review`](/claudekit/commands/review/) | Comprehensive code review |
| [`/test`](/claudekit/commands/test/) | Generate tests for code |
| [`/refactor`](/claudekit/commands/refactor/) | Code refactoring workflow |
| [`/debug`](/claudekit/commands/debug/) | Interactive debugging session |
| [`/tdd`](/claudekit/commands/tdd/) | Test-driven development workflow |

### Planning Commands

Commands for planning and research:

| Command | Description |
|---------|-------------|
| [`/plan`](/claudekit/commands/plan/) | Create structured implementation plans |
| [`/brainstorm`](/claudekit/commands/brainstorm/) | Interactive design and ideation |
| [`/execute-plan`](/claudekit/commands/execute-plan/) | Execute a plan with subagents |
| [`/research`](/claudekit/commands/research/) | Technology research and analysis |

### Git & Deployment Commands

Commands for version control and deployment:

| Command | Description |
|---------|-------------|
| [`/ship`](/claudekit/commands/ship/) | Commit and create PR workflow |
| [`/commit`](/claudekit/commands/commit/) | Create a git commit |
| [`/pr`](/claudekit/commands/pr/) | Create a pull request |
| [`/deploy`](/claudekit/commands/deploy/) | Deployment workflow |
| [`/changelog`](/claudekit/commands/changelog/) | Generate changelog entries |

### Documentation Commands

Commands for generating documentation:

| Command | Description |
|---------|-------------|
| [`/doc`](/claudekit/commands/doc/) | Generate documentation |
| [`/api-gen`](/claudekit/commands/api-gen/) | Generate API documentation |

### Utility Commands

Helper commands for various tasks:

| Command | Description |
|---------|-------------|
| [`/mode`](/claudekit/commands/mode/) | Switch behavioral modes |
| [`/index`](/claudekit/commands/index/) | Generate project structure index |
| [`/load`](/claudekit/commands/load/) | Load project context |
| [`/checkpoint`](/claudekit/commands/checkpoint/) | Save/restore session state |
| [`/spawn`](/claudekit/commands/spawn/) | Launch parallel background tasks |
| [`/status`](/claudekit/commands/status/) | Show project status |
| [`/help`](/claudekit/commands/help/) | Show help information |
| [`/optimize`](/claudekit/commands/optimize/) | Optimize code performance |
| [`/security-scan`](/claudekit/commands/security-scan/) | Security vulnerability scan |

## Command Structure

All commands follow a consistent structure:

```bash
/command [arguments] [--flags]
```

### Arguments

Most commands accept a description or target as the main argument:

```bash
/feature "add user authentication"
/fix "TypeError in UserService.ts"
/review src/auth/
```

### Flags

Commands support flags for customization:

| Flag | Description | Example |
|------|-------------|---------|
| `--mode=[mode]` | Use specific behavioral mode | `--mode=implementation` |
| `--depth=[1-5]` | Thoroughness level | `--depth=3` |
| `--format=[fmt]` | Output format | `--format=concise` |
| `--save=[path]` | Save output to file | `--save=plan.md` |
| `--checkpoint` | Create state checkpoint | `--checkpoint` |
| `--persona=[type]` | Apply persona expertise | `--persona=security` |

### Flag Examples

```bash
# Use implementation mode for faster coding
/feature --mode=implementation "add logging utility"

# Deep security review
/review --persona=security --depth=5 src/auth/

# Concise output
/fix --format=concise "typo in error message"

# Save plan to file
/plan --save=plans/auth.md "implement authentication"
```

## Common Workflows

### Feature Development

```bash
# 1. Brainstorm the approach
/brainstorm "how should we implement user roles?"

# 2. Create a detailed plan
/plan "implement role-based access control"

# 3. Build the feature
/feature "add RBAC with admin and user roles"

# 4. Ship it
/ship "feat: add role-based access control"
```

### Bug Fixing

```bash
# 1. Debug the issue
/fix "users can't login after password reset"

# 2. Review the fix
/review src/auth/password-reset.ts

# 3. Ship the fix
/ship "fix: resolve password reset login issue"
```

### Code Quality

```bash
# 1. Review code
/review src/services/

# 2. Run security scan
/security-scan src/

# 3. Optimize performance
/optimize src/services/data-processor.ts
```

## Getting Help

Get help for any command:

```bash
/help              # Show all commands
/help feature      # Show /feature details
/help fix          # Show /fix details
```

## Next Steps

- [/feature](/claudekit/commands/feature/) — Learn the flagship command
- [/fix](/claudekit/commands/fix/) — Master debugging workflow
- [Modes](/claudekit/modes/overview/) — Optimize Claude's behavior
