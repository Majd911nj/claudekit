# Claude Kit

A comprehensive toolkit for Claude Code to accelerate development workflows for teams working with Python and JavaScript/TypeScript.

## Features

- **20 Specialized Agents** - From planning to deployment
- **27+ Slash Commands** - Workflow automation with flag support
- **30+ Skills** - Framework, language, methodology, and optimization expertise
- **7 Behavioral Modes** - Task-specific response optimization
- **Command Flag System** - Combinable `--flag` syntax for customization
- **Token Optimization** - 30-70% cost savings with compressed output modes
- **MCP Integrations** - Context7, Sequential Thinking, Puppeteer, Magic
- **Context Management** - Project indexing, checkpoints, parallel tasks

## Quick Start

1. Copy the `.claude` folder to your project root
2. Customize `.claude/CLAUDE.md` for your project
3. Start using commands like `/feature`, `/review`, `/test`

## Directory Structure

```
.claude/
├── CLAUDE.md              # Project context (customize this!)
├── settings.json          # Hooks, permissions, and MCP config
├── agents/                # 20 specialized agents
├── commands/              # 27+ workflow commands
├── modes/                 # 7 behavioral mode definitions
├── mcp/                   # MCP server configurations
└── skills/                # Framework, language, and methodology skills
    ├── frameworks/        # FastAPI, Next.js, React, etc.
    ├── languages/         # Python, TypeScript, JavaScript
    ├── methodology/       # TDD, debugging, planning (14 skills)
    └── optimization/      # Token efficiency patterns
```

## Agents

### Core Development
| Agent | Description |
|-------|-------------|
| `planner` | Task decomposition and planning |
| `researcher` | Technology research |
| `debugger` | Error analysis and fixing |
| `tester` | Test generation |
| `code-reviewer` | Code review with security focus |
| `scout` | Codebase exploration |

### Operations
| Agent | Description |
|-------|-------------|
| `git-manager` | Git operations and PRs |
| `docs-manager` | Documentation generation |
| `project-manager` | Progress tracking |
| `database-admin` | Schema and migrations |
| `ui-ux-designer` | UI component creation |

### Extended
| Agent | Description |
|-------|-------------|
| `cicd-manager` | CI/CD pipeline management |
| `security-auditor` | Security reviews |
| `api-designer` | API design and OpenAPI |
| `vulnerability-scanner` | Security scanning |
| `pipeline-architect` | Pipeline optimization |

## Commands

### Development Workflow
```bash
/feature [description]   # Full feature development
/fix [error]            # Debug and fix bugs
/review [file]          # Code review
/test [scope]           # Generate tests
/tdd [feature]          # Test-driven development
```

### Git & Deployment
```bash
/commit [message]       # Smart commit
/ship [message]         # Commit + PR
/pr [title]             # Create pull request
/deploy [env]           # Deploy to environment
```

### Documentation & Planning
```bash
/plan [task]            # Create implementation plan
/plan --detailed [task] # Detailed plan (2-5 min tasks)
/brainstorm [topic]     # Interactive design session
/execute-plan [file]    # Subagent-driven execution
/doc [target]           # Generate documentation
/research [topic]       # Research technology
```

### Security & Quality
```bash
/security-scan          # Scan for vulnerabilities
/api-gen [resource]     # Generate API code
/refactor [file]        # Improve code structure
/optimize [file]        # Performance optimization
```

### Context & Modes (New)
```bash
/mode [name]            # Switch behavioral mode
/index                  # Generate project index
/load [component]       # Load project context
/checkpoint [action]    # Save/restore session state
/spawn [task]           # Launch parallel background task
```

## Skills

### Languages
- Python, TypeScript, JavaScript

### Frameworks
- FastAPI, Django, Next.js, React

### Databases
- PostgreSQL, MongoDB

### DevOps
- Docker, GitHub Actions

### Frontend
- Tailwind CSS, shadcn/ui

### Security
- OWASP best practices

### Testing
- pytest, vitest

### Optimization
- Token-efficient output patterns
- Sequential thinking methodology

### Methodology (Superpowers)

| Category | Skills |
|----------|--------|
| **Planning** | brainstorming, writing-plans, executing-plans |
| **Testing** | test-driven-development, verification-before-completion, testing-anti-patterns |
| **Debugging** | systematic-debugging, root-cause-tracing, defense-in-depth |
| **Collaboration** | dispatching-parallel-agents, requesting-code-review, receiving-code-review, finishing-development-branch |

Key methodology principles:
- **TDD Strict**: No production code without failing test first
- **Verification**: Evidence-based completion claims
- **Quality Gates**: Code review between every task
- **Bite-sized Tasks**: 2-5 minute increments with exact code
- **Sequential Thinking**: Step-by-step reasoning with confidence scores

## Behavioral Modes

Switch modes to optimize responses for different task types:

| Mode | Description | Best For |
|------|-------------|----------|
| `default` | Balanced standard behavior | General tasks |
| `brainstorm` | Creative exploration, questions | Design, ideation |
| `token-efficient` | Compressed, concise output | Cost savings |
| `deep-research` | Thorough analysis, citations | Investigation |
| `implementation` | Code-focused, minimal prose | Executing plans |
| `review` | Critical analysis, finding issues | Code review |
| `orchestration` | Multi-task coordination | Parallel work |

```bash
/mode brainstorm              # Switch for session
/feature --mode=implementation # Override per command
```

## Command Flags

All commands support combinable flags:

```bash
# Mode and depth
/plan --mode=brainstorm --depth=5 "feature design"

# Persona-based review
/review --persona=security --format=detailed src/auth/

# Token optimization
/fix --format=concise "error message"

# Save output
/research --save=docs/research.md "auth libraries"
```

### Available Flags

| Flag | Description |
|------|-------------|
| `--mode=[mode]` | Behavioral mode |
| `--depth=[1-5]` | Thoroughness (1=quick, 5=exhaustive) |
| `--format=[fmt]` | Output format (concise/detailed/json) |
| `--persona=[type]` | Expertise focus (security/performance/architecture) |
| `--save=[path]` | Save output to file |
| `--checkpoint` | Create state checkpoint |

## Token Optimization

Reduce costs by 30-70% with compressed output modes:

| Level | Activation | Savings |
|-------|------------|---------|
| Concise | `--format=concise` | 30-40% |
| Ultra | `--format=ultra` | 60-70% |
| Session | `/mode token-efficient` | 30-70% |

## MCP Integrations

Optional MCP servers for extended capabilities:

| Server | Purpose |
|--------|---------|
| Context7 | Up-to-date library documentation |
| Sequential | Multi-step reasoning tools |
| Puppeteer | Browser automation |
| Magic | UI component generation |

Setup: See `.claude/mcp/README.md`

## Customization

### CLAUDE.md

The `.claude/CLAUDE.md` file is your project context. Customize it with:

```markdown
# Project: Your Project Name

## Tech Stack
- **Backend**: FastAPI
- **Frontend**: Next.js
- **Database**: PostgreSQL

## Conventions
- Use type hints
- 80% test coverage
- Conventional commits

## Agent Overrides
### Tester
- Framework: pytest
- Coverage: 90%
```

### Adding Custom Commands

Create a new file in `.claude/commands/`:

```markdown
# /my-command

## Purpose
Description of your command.

---

Your prompt content here.

Use $ARGUMENTS for command arguments.
```

### Adding Custom Skills

Create a new skill in `.claude/skills/category/skillname/SKILL.md`:

```markdown
# Skill Name

## Description
Brief description for matching.

---

## Patterns
Your patterns and examples here.
```

## Workflow Chains

### Feature Development
```
/feature → planner → implement → code-reviewer → tester → git-manager
```

### Bug Fix
```
/fix → debugger → scout → implement → tester → code-reviewer
```

### Ship Code
```
/ship → code-reviewer → tester → security-scan → git-manager
```

### Superpowers Workflow (Detailed)
```
/brainstorm → /plan --detailed → /execute-plan → /ship
```
Uses one-question-at-a-time design, 2-5 min tasks with exact code, subagent execution with code review gates.

### Parallel Research
```
/spawn "research auth" → /spawn "analyze security" → /spawn --collect
```
Launch multiple background tasks, then aggregate results.

### Cost-Optimized Session
```
/mode token-efficient → [work on tasks] → /mode default
```
Enable compressed outputs for high-volume sessions.

## Requirements

- Claude Code 1.0+
- Git
- Node.js or Python (depending on your stack)

## License

MIT

---

Built with duthaho
