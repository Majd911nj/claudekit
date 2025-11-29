---
title: /help
description: Display available commands and their usage
---

# /help

## Purpose

Display available commands and their usage. Get quick reference for Claude Kit commands or detailed help for specific commands.

## Usage

```bash
/help [command-name]
```

## Arguments

- **command-name** (optional): Specific command to get help for. If omitted, shows all available commands.

## Available Commands

### Development Workflow

| Command | Description |
|---------|-------------|
| `/feature` | Full feature development workflow |
| `/fix` | Debug and fix bugs |
| `/review` | Comprehensive code review |
| `/test` | Generate tests |
| `/tdd` | Test-driven development workflow |
| `/refactor` | Improve code structure |

### Planning & Design

| Command | Description |
|---------|-------------|
| `/plan` | Create detailed implementation plan |
| `/brainstorm` | Interactive design session |
| `/execute-plan` | Execute plan with subagents |
| `/research` | Technology research |

### Git & Deployment

| Command | Description |
|---------|-------------|
| `/commit` | Create commit with message |
| `/ship` | Commit + PR workflow |
| `/pr` | Create pull request |
| `/deploy` | Deploy to environment |

### Documentation

| Command | Description |
|---------|-------------|
| `/doc` | Generate documentation |
| `/api-gen` | Generate API code and docs |

### Security & Quality

| Command | Description |
|---------|-------------|
| `/security-scan` | Scan for vulnerabilities |
| `/optimize` | Performance optimization |

### Context Management

| Command | Description |
|---------|-------------|
| `/mode` | Switch behavioral mode |
| `/index` | Generate project index |
| `/load` | Load components into context |
| `/checkpoint` | Save/restore session state |
| `/spawn` | Launch parallel tasks |

### Utilities

| Command | Description |
|---------|-------------|
| `/status` | Project status overview |
| `/help` | Display this help |

## Examples

```bash
# Show all commands
/help

# Get help for specific command
/help feature

# Get help for mode command
/help mode

# Get help for checkpoint
/help checkpoint
```

## Getting Detailed Help

For detailed help on a specific command:

```bash
/help [command-name]
```

This will show:
- Command purpose
- Usage syntax
- Available arguments
- Supported flags
- Workflow steps
- Practical examples

## Command Categories

### Core Workflow
Commands for the main development cycle: `/feature`, `/fix`, `/review`, `/test`

### Enhanced Methodology
Advanced workflows: `/plan --detailed`, `/brainstorm`, `/tdd`, `/execute-plan`

### Context Management
Optimize your session: `/mode`, `/index`, `/load`, `/checkpoint`, `/spawn`

### Quality & Security
Code quality tools: `/security-scan`, `/optimize`, `/review`

### Documentation
Generate docs: `/doc`, `/api-gen`

## Universal Flags

Most commands support these flags:

| Flag | Description |
|------|-------------|
| `--mode=[mode]` | Override behavioral mode |
| `--depth=[1-5]` | Thoroughness level |
| `--format=[fmt]` | Output format (concise/detailed/json) |
| `--save=[path]` | Save output to file |

## Quick Start

New to Claude Kit? Try these commands:

```bash
# 1. See project structure
/index

# 2. Check current status
/status

# 3. Load a component to work on
/load api

# 4. Start development
/feature "Add user authentication"
```

## Related Resources

- **CLAUDE.md**: Project-specific configuration
- **Skills**: `.claude/skills/` directory
- **Modes**: `.claude/modes/` directory
- **Commands**: `.claude/commands/` directory

## Need More Help?

- Check command documentation in `/claudekit/commands/`
- Review skills in `/claudekit/skills/`
- Read methodology guides in `/claudekit/methodology/`
- See examples in project CLAUDE.md

## Related Commands

- [/status](/claudekit/commands/status) - Check project status
- [/mode](/claudekit/commands/mode) - Switch modes
