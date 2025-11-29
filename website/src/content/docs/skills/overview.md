---
title: Skills Overview
description: Comprehensive guide to all Claude Kit skills organized by category
---

Claude Kit includes a rich library of skills that provide deep expertise in methodologies, languages, frameworks, and tools. Skills are automatically activated when relevant to your task, or can be explicitly invoked.

## What Are Skills?

Skills are knowledge modules that enhance Claude's capabilities in specific domains. Each skill contains:

- **Best practices** for the technology or methodology
- **Common patterns** and code examples
- **Anti-patterns** to avoid
- **Activation conditions** - when the skill is used
- **Integration points** with other skills

## Skill Categories

### Methodology Skills

Development methodologies and workflows for high-quality software delivery.

| Skill | Purpose | Key Feature |
|-------|---------|-------------|
| [Brainstorming](/claudekit/skills/methodology/brainstorming) | Interactive design refinement | One question at a time |
| [Writing Plans](/claudekit/skills/methodology/writing-plans) | Detailed implementation plans | 2-5 minute tasks |
| [Executing Plans](/claudekit/skills/methodology/executing-plans) | Automated plan execution | Fresh agents per task |
| [Test-Driven Development](/claudekit/skills/methodology/tdd) | TDD workflow | Red-green-refactor cycle |
| [Systematic Debugging](/claudekit/skills/methodology/systematic-debugging) | Root-cause debugging | Four-phase process |
| [Code Review](/claudekit/skills/methodology/code-review) | Request & receive reviews | Categorized feedback |
| [Sequential Thinking](/claudekit/skills/methodology/sequential-thinking) | Complex problem analysis | Evidence-based reasoning |
| [Verification Before Completion](/claudekit/skills/methodology/verification) | Mandatory verification | Never claim without proof |
| [Testing Anti-Patterns](/claudekit/skills/methodology/testing-anti-patterns) | Avoid common test mistakes | Mock behavior detection |

### Language Skills

Modern programming language expertise with best practices.

| Skill | Purpose | Key Features |
|-------|---------|--------------|
| [Python](/claudekit/skills/languages/python) | Python development | Type hints, async, dataclasses |
| [TypeScript](/claudekit/skills/languages/typescript) | TypeScript development | Strict typing, utility types |
| [JavaScript](/claudekit/skills/languages/javascript) | Modern JavaScript | ES6+, async patterns |

### Framework Skills

Full-stack framework knowledge and patterns.

| Skill | Purpose | Key Features |
|-------|---------|--------------|
| [React](/claudekit/skills/frameworks/react) | React components | Hooks, context, patterns |
| [Next.js](/claudekit/skills/frameworks/nextjs) | Next.js App Router | Server components, actions |
| [FastAPI](/claudekit/skills/frameworks/fastapi) | FastAPI REST APIs | Pydantic, async, OpenAPI |
| [Django](/claudekit/skills/frameworks/django) | Django web apps | ORM, views, REST framework |

### Database Skills

Database design and query optimization.

- **PostgreSQL** - Relational database expertise
- **MongoDB** - Document database patterns

### Testing Skills

Test frameworks and testing methodologies.

- **pytest** - Python testing with fixtures
- **vitest** - Fast Vite-based testing

### DevOps Skills

Deployment and infrastructure automation.

- **Docker** - Container best practices
- **GitHub Actions** - CI/CD workflows

### Frontend Skills

Modern frontend development tools.

- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - React component library

### Security Skills

Security best practices and vulnerability prevention.

- **OWASP** - Web security standards

### API Skills

API design and documentation.

- **OpenAPI** - REST API specification

### Optimization Skills

Performance and cost optimization.

- **Token Efficient** - Reduce API costs

## How Skills Are Activated

### Automatic Activation

Skills activate automatically based on context:

```typescript
// Working with a .ts file automatically activates:
// - TypeScript skill
// - JavaScript skill (parent)

// Using React components activates:
// - React skill
// - TypeScript skill
// - JavaScript skill
```

### Explicit Activation

Reference skills directly in commands:

```bash
# Use specific methodology
/plan --methodology=tdd "add user authentication"

# Activate debugging skill
/fix --use-skill=systematic-debugging "timeout error"

# Enable sequential thinking
/research --sequential "performance bottleneck"
```

### Mode-Based Activation

Certain modes activate related skills:

```bash
# Deep research mode enables:
/mode deep-research
# - Sequential thinking
# - Root cause tracing
# - Evidence collection

# Implementation mode enables:
/mode implementation
# - TDD
# - Verification before completion
# - Testing anti-patterns awareness
```

## Combining Skills

Skills work together synergistically:

### Planning to Execution

1. **Brainstorming** - Design the solution
2. **Writing Plans** - Break into tasks
3. **Executing Plans** - Automated implementation
4. **Code Review** - Quality gates

### Bug Fixing

1. **Systematic Debugging** - Find root cause
2. **Sequential Thinking** - Analyze evidence
3. **TDD** - Write regression test
4. **Verification** - Confirm fix works

### Feature Development

1. **Brainstorming** - Explore approaches
2. **Writing Plans** - Detailed tasks
3. **TDD** - Test-first implementation
4. **Code Review** - Review and iterate
5. **Verification** - Confirm completion

## Customizing Skills

Skills can be customized in your `.claude/CLAUDE.md`:

```markdown
## Skill Overrides

### TDD Strictness
- Level: Strict (no code without tests)
- Red-Green-Refactor: Always required

### Code Review
- Required reviewers: 1 minimum
- Security review: Required for auth changes
- Performance review: Required for queries

### Brainstorming
- Style: Interactive (one question at a time)
- YAGNI: Ruthless (remove all "might need")
```

## Creating Custom Skills

Add project-specific skills:

```bash
.claude/skills/
├── custom/
│   ├── company-api-patterns/
│   │   └── SKILL.md
│   └── deployment-checklist/
│       └── SKILL.md
```

See [Custom Skills Guide](/claudekit/guides/custom-skills) for details.

## Skill Reference

For detailed documentation on each skill:

- **Methodology**: See individual skill pages linked above
- **Languages**: Python, TypeScript, JavaScript skill pages
- **Frameworks**: React, Next.js, FastAPI, Django pages
- **Other Categories**: Browse `/skills/` directory

## Best Practices

### Let Skills Guide You

Trust the methodologies:

```bash
# Instead of:
"Just write some code for X"

# Use:
"/brainstorm X" → design first
"/plan X" → break into tasks
"/execute-plan" → implement systematically
```

### Combine Complementary Skills

Use skills together:

```bash
# TDD + Systematic Debugging
1. Write failing test (TDD)
2. Investigate why it fails (Debugging)
3. Fix root cause (Debugging)
4. Verify test passes (Verification)

# Brainstorming + Sequential Thinking
1. Explore options (Brainstorming)
2. Analyze each deeply (Sequential Thinking)
3. Choose with evidence (Sequential Thinking)
```

### Respect Skill Constraints

Skills enforce quality standards:

- **TDD**: No production code without failing test first
- **Verification**: Never claim completion without proof
- **Code Review**: All critical issues must be fixed
- **Systematic Debugging**: Three-fix rule stops runaway debugging

These aren't suggestions - they're requirements.

## Next Steps

- Explore [Methodology Skills](/claudekit/skills/methodology/brainstorming)
- Learn [Language Skills](/claudekit/skills/languages/python)
- Check [Framework Skills](/claudekit/skills/frameworks/react)
- Try [Custom Skills](/claudekit/guides/custom-skills)
