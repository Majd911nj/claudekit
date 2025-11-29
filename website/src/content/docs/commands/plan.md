---
title: /plan
description: Create structured implementation plans with task breakdown and time estimates
---

# /plan

Create structured implementation plans with task breakdown, dependencies, and time estimates for complex work.

## Purpose

The `/plan` command helps you transform complex features or tasks into actionable, well-organized implementation plans. It breaks down work into manageable chunks, identifies dependencies, estimates effort, and highlights risks.

## Usage

```bash
/plan [task description or feature request]
```

## Arguments

- **task description**: Description of the feature, task, or work you need planned

## How It Works

### Phase 1: Understanding

The planner first clarifies what you're trying to build:
- Identifies core functionality needed
- Lists explicit and implicit requirements
- Defines acceptance criteria
- Asks clarifying questions if needed

### Phase 2: Research

Next, it explores your codebase to understand context:
- Finds related implementations
- Identifies patterns to follow
- Locates integration points
- Notes existing conventions

### Phase 3: Task Breakdown

Work is decomposed into clear, actionable tasks:
- Each task takes 15-60 minutes (standard mode)
- Clear completion criteria for each task
- Dependencies mapped out
- Tasks sized as S/M/L/XL

### Phase 4: Documentation

Finally, a comprehensive plan document is created:
- Task list with phases
- Files to create/modify
- Risk assessment
- Success criteria

## Planning Modes

### Standard Mode

Default planning with 15-60 minute tasks:

```bash
/plan "implement user authentication"
```

**Task sizes:**
- **S**: < 30 minutes
- **M**: 30-60 minutes
- **L**: 1-2 hours
- **XL**: 2-4 hours

### Detailed Mode

Superpowers-style planning with 2-5 minute tasks and exact code:

```bash
/plan --detailed "implement user authentication"
```

**Features:**
- Bite-sized tasks (2-5 minutes each)
- Exact file paths included
- Complete code samples (not descriptions)
- TDD steps per task (write test → verify fail → implement → verify pass → commit)
- Expected command outputs specified

**When to use detailed mode:**
- Complex features requiring precision
- When you want automated execution with `/execute-plan`
- Team members new to the codebase
- When you want minimal decision-making during implementation

## Output Format

Plans include the following sections:

### Summary
Brief overview of what will be built

### Scope
- **In Scope**: What will be done
- **Out of Scope**: What won't be done
- **Assumptions**: Key assumptions made

### Tasks
Organized into phases with dependencies:

| # | Task | Size | Depends On |
|---|------|------|------------|
| 1 | Create data model | M | - |
| 2 | Set up database migration | S | 1 |
| 3 | Add model tests | M | 1 |

### Files to Create/Modify
Complete list of files that will be touched

### Dependencies
External packages and internal prerequisites

### Risks
Potential issues and mitigation strategies

### Success Criteria
Checklist for determining completion

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--detailed` | Use 2-5 min tasks with exact code | `--detailed` |
| `--mode=[mode]` | Use specific behavioral mode | `--mode=brainstorm` |
| `--depth=[1-5]` | Planning thoroughness level | `--depth=4` |
| `--format=[fmt]` | Output format (concise/detailed/json) | `--format=detailed` |
| `--save=[path]` | Save plan to file | `--save=plans/auth.md` |
| `--checkpoint` | Create checkpoint after planning | `--checkpoint` |

### Mode Recommendations

| Mode | Best For |
|------|----------|
| `default` | Standard planning |
| `brainstorm` | Exploratory planning, multiple approaches |
| `deep-research` | Complex features needing investigation |
| `implementation` | Quick plans for clear tasks |

## Examples

### Basic Feature Planning

```bash
/plan "add password reset functionality"
```

Creates a standard plan with 15-60 minute tasks for implementing password reset.

### Detailed Planning for Execution

```bash
/plan --detailed "implement OAuth2 authentication"
```

Creates a detailed plan with 2-5 minute tasks, ready for automated execution with `/execute-plan`.

### Planning with Brainstorming Mode

```bash
/plan --mode=brainstorm "redesign checkout flow"
```

Uses brainstorming mode to explore multiple approaches before settling on a plan.

### Saving Plan to File

```bash
/plan --save=plans/payment-integration.md "integrate Stripe payments"
```

Creates plan and saves it to the specified file for later reference.

### Comprehensive Deep Planning

```bash
/plan --depth=5 --save=plans/migration.md "migrate from MongoDB to PostgreSQL"
```

Creates an exhaustive plan with thorough analysis for a complex migration.

## Workflow Integration

### Planning → Execution

1. Create detailed plan:
   ```bash
   /plan --detailed "feature description"
   ```

2. Execute plan with subagents:
   ```bash
   /execute-plan path/to/plan.md
   ```

### Design → Planning → Execution

1. Brainstorm design:
   ```bash
   /brainstorm "feature concept"
   ```

2. Create implementation plan:
   ```bash
   /plan --detailed "feature from design"
   ```

3. Execute with automation:
   ```bash
   /execute-plan path/to/plan.md
   ```

## Best Practices

### When to Use Standard Mode
- Quick features with clear requirements
- Experienced developers familiar with codebase
- Exploratory or research-heavy tasks
- When you want flexibility during implementation

### When to Use Detailed Mode
- Complex features requiring precision
- When multiple developers will implement
- Features requiring automated execution
- When you want to minimize implementation decisions

### Tips for Better Plans
1. **Be specific** in your task description
2. **Include context** about existing implementations
3. **Mention constraints** (performance, security, etc.)
4. **State preferences** for approaches or technologies
5. **Ask for comparisons** if uncertain about approach

## Related Commands

- [/brainstorm](/claudekit/commands/brainstorm) - Design features before planning implementation
- [/execute-plan](/claudekit/commands/execute-plan) - Execute detailed plans with subagents
- [/research](/claudekit/commands/research) - Research technologies before planning
- [/tdd](/claudekit/commands/tdd) - Test-driven development workflow

## Customization

Plans can be customized via `CLAUDE.md`:
- Task size definitions
- Required plan sections
- Estimation approach
- Risk assessment criteria

See the [Configuration Guide](/claudekit/configuration) for details.
