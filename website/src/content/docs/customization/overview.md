---
title: Customization Overview
description: Learn how to customize Claude Kit with your own commands, modes, skills, and project settings.
---

# Customization Overview

Claude Kit is designed to be fully customizable. You can create your own commands, modes, and skills, and configure Claude's behavior for your specific project needs.

## What Can You Customize?

### 1. Commands

Create custom slash commands for your team's specific workflows:

```bash
/deploy-staging    # Your deployment workflow
/audit-deps        # Custom dependency audit
/release-notes     # Generate release notes your way
```

[Learn how to create commands →](/claudekit/customization/creating-commands/)

### 2. Modes

Define behavioral modes for different work contexts:

```bash
/mode pair-programming    # Your pair programming style
/mode documentation       # Documentation-focused mode
/mode production-debug    # Emergency debugging mode
```

[Learn how to create modes →](/claudekit/customization/creating-modes/)

### 3. Skills

Add knowledge modules for your tech stack:

```bash
.claude/skills/
├── languages/rust/         # Rust best practices
├── frameworks/svelte/      # Svelte patterns
└── custom/your-api/        # Your internal API docs
```

[Learn how to create skills →](/claudekit/customization/creating-skills/)

### 4. CLAUDE.md Configuration

Configure project-specific behavior, conventions, and agent overrides:

- Tech stack and architecture
- Code conventions
- Testing standards
- Security requirements
- Agent behavior overrides

[CLAUDE.md reference →](/claudekit/customization/claude-md/)

## Customization Levels

Claude Kit supports three levels of customization:

| Level | What to Change | When to Use |
|-------|----------------|-------------|
| **Configuration** | Edit `CLAUDE.md` | Set project conventions, tech stack, standards |
| **Composition** | Add modes and skills | Extend behavior without coding |
| **Extension** | Create commands | Build custom workflows |

## Quick Start Examples

### Example 1: Add a Custom Command

Create `.claude/commands/deploy.md`:

```markdown
# /deploy - Deploy Application

## Usage
/deploy [environment]

---

Deploy to **$ARGUMENTS** environment:

1. Run tests
2. Build production bundle
3. Deploy to environment
4. Verify deployment
```

[Full command creation guide →](/claudekit/customization/creating-commands/)

### Example 2: Configure for Your Stack

Edit `.claude/CLAUDE.md`:

```markdown
## Tech Stack

- **Backend**: Ruby on Rails
- **Frontend**: Vue.js
- **Database**: MySQL
- **Testing**: RSpec, Cypress
```

[Full CLAUDE.md guide →](/claudekit/customization/claude-md/)

### Example 3: Add a Custom Skill

Create `.claude/skills/custom/internal-api/SKILL.md`:

```markdown
# Internal API Standards

## Authentication
All endpoints require JWT bearer tokens...

## Error Handling
Use standard error format...
```

[Full skill creation guide →](/claudekit/customization/creating-skills/)

## File Structure

Claude Kit customizations live in your `.claude` folder:

```
.claude/
├── CLAUDE.md                    # Main configuration
├── commands/                    # Custom commands
│   ├── deploy.md
│   └── your-command.md
├── modes/                       # Custom modes
│   ├── your-mode.md
│   └── another-mode.md
└── skills/                      # Custom skills
    ├── custom/
    │   └── your-skill/
    │       └── SKILL.md
    └── overrides/
        └── language/
            └── SKILL.md
```

## Best Practices

### Start Small

Don't try to customize everything at once:

1. **First**: Configure `CLAUDE.md` for your project
2. **Then**: Add a mode or two for your common workflows
3. **Finally**: Create custom commands for repeated tasks

### Document Your Customizations

Add comments to your custom files explaining:

- Why the customization exists
- When to use it
- What it does differently

### Share Customizations

Custom commands and modes are project-specific, so they should be:

- Committed to version control
- Documented in your project README
- Shared with your team

### Keep Skills Focused

Each skill should:

- Cover one specific topic
- Be 50-200 lines
- Include practical examples
- Reference official docs

## Common Customization Patterns

### Pattern 1: Strict TDD Workflow

Add to `CLAUDE.md`:

```markdown
## Tester Agent
- **TDD Required**: Always write tests first
- **Coverage Minimum**: 90%
- **Test Type**: Integration tests for all endpoints
```

### Pattern 2: Security-First Reviews

Create `.claude/modes/security-audit.md`:

```markdown
# Security Audit Mode

Focus exclusively on security issues:
- Authentication/authorization
- Input validation
- XSS/CSRF protection
- Secrets management
```

### Pattern 3: Custom Git Workflow

Create `.claude/commands/finish-feature.md`:

```markdown
# /finish-feature - Complete Feature

1. Squash commits
2. Update changelog
3. Create PR with template
4. Assign reviewers
```

## Next Steps

Choose what to customize:

- [Create Custom Commands](/claudekit/customization/creating-commands/) — Build workflow automation
- [Create Custom Modes](/claudekit/customization/creating-modes/) — Define behavioral patterns
- [Create Custom Skills](/claudekit/customization/creating-skills/) — Add knowledge modules
- [Configure CLAUDE.md](/claudekit/customization/claude-md/) — Set project standards

## Getting Help

- Check the [example commands](https://github.com/yourusername/claudekit/tree/main/.claude/commands) in the repo
- Look at [built-in modes](https://github.com/yourusername/claudekit/tree/main/.claude/modes) for patterns
- Review [existing skills](https://github.com/yourusername/claudekit/tree/main/.claude/skills) for structure
