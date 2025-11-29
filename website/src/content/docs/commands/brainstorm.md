---
title: /brainstorm
description: Interactive design session using one-question-at-a-time methodology
---

# /brainstorm

Start an interactive brainstorming session to refine rough ideas into fully-formed designs through collaborative dialogue.

## Purpose

The `/brainstorm` command uses a proven one-question-at-a-time methodology to help you design features, architectures, and solutions. It guides you through thoughtful decision-making via sequential questions and validates designs incrementally.

## Usage

```bash
/brainstorm [topic or feature to design]
```

## Arguments

- **topic**: The topic, feature, or problem you want to brainstorm about

## How It Works

The brainstorming process follows three phases:

### Phase 1: Understanding

**Goal:** Clarify requirements through sequential questioning

The assistant asks **one question at a time** and waits for your response before proceeding. Questions are typically multiple-choice to reduce cognitive load.

**Example interaction:**
```
Claude: "What type of authentication should we support?
         a) Username/password only
         b) OAuth providers (Google, GitHub)
         c) Both options
         d) Magic link (passwordless)"

You: "b"

Claude: "Which OAuth providers should we integrate?
         a) Google only
         b) GitHub only
         c) Both Google and GitHub
         d) Let me specify others..."
```

### Phase 2: Exploration

**Goal:** Present alternatives with clear trade-offs

The assistant presents 2-3 approaches with their pros and cons, leading with the recommended option:

```markdown
## Approach 1: JWT-based (Recommended)
- Stateless, highly scalable
- Works well with microservices
- Cons: Can't revoke instantly

## Approach 2: Session-based
- Easy revocation control
- Simpler mental model
- Cons: Requires session store (Redis/DB)

Which approach aligns better with your goals?
```

### Phase 3: Design Presentation

**Goal:** Present validated design incrementally

The design is presented in digestible 200-300 word sections:
1. Architecture overview
2. Component breakdown
3. Data flow
4. Error handling
5. Testing considerations

You validate each section before moving to the next.

## Core Principles

### YAGNI Ruthlessly

Features are aggressively pruned:
- Questions every "nice to have"
- Starts with minimal viable design
- "We might need this later" means remove it

### One Question at a Time

Sequential questioning produces better results:
- Gives you time to think deeply
- Prevents overwhelming with choices
- Creates natural conversation flow

### Multiple-Choice Preference

Structured options when possible:
- Reduces cognitive load
- Surfaces the assistant's understanding
- Makes decisions concrete

## Output

After the design is validated, a design document is created:

```markdown
# Design: [Feature Name]
Date: [YYYY-MM-DD]

## Summary
[2-3 sentence overview]

## Architecture
[Architecture decisions made]

## Components
[Component breakdown with responsibilities]

## Data Flow
[How data moves through the system]

## Error Handling
[Error scenarios and handling strategies]

## Testing Strategy
[How the feature will be tested]

## Open Questions
[Any remaining unknowns]
```

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--mode=[mode]` | Use specific behavioral mode | `--mode=brainstorm` |
| `--depth=[1-5]` | Exploration depth level | `--depth=4` |
| `--format=[fmt]` | Output format (concise/detailed) | `--format=detailed` |
| `--save=[path]` | Save design document to file | `--save=docs/design.md` |
| `--quick` | Shorter session, fewer questions | `--quick` |
| `--comprehensive` | Longer session, thorough exploration | `--comprehensive` |

### Session Depth

| Level | Questions | Exploration |
|-------|-----------|-------------|
| 1 | 2-3 | Quick validation only |
| 2 | 4-5 | Standard session |
| 3 | 6-8 | Thorough exploration |
| 4 | 8-10 | Comprehensive |
| 5 | 10+ | Exhaustive, all angles |

## Examples

### Quick Feature Design

```bash
/brainstorm --quick "simple file upload feature"
```

Runs a short session (2-3 questions) to design a straightforward file upload.

### Comprehensive Architecture Design

```bash
/brainstorm --comprehensive "authentication system design"
```

Runs an extensive session (10+ questions) exploring architecture thoroughly.

### Design with Custom Depth

```bash
/brainstorm --depth=4 "microservices architecture"
```

Runs a comprehensive session with 8-10 questions exploring the microservices approach.

### Save Design to File

```bash
/brainstorm --save=docs/payment-design.md "payment integration"
```

Creates a design document and saves it to the specified file.

### Deep Research Mode

```bash
/brainstorm --mode=deep-research "distributed caching strategy"
```

Uses deep-research mode for thorough analysis with citations.

## Workflow Integration

### Brainstorm → Plan → Execute

1. **Design the feature:**
   ```bash
   /brainstorm "OAuth authentication"
   ```

2. **Create detailed implementation plan:**
   ```bash
   /plan --detailed "implement OAuth from design doc"
   ```

3. **Execute with automation:**
   ```bash
   /execute-plan path/to/plan.md
   ```

### Research → Brainstorm → Plan

1. **Research options:**
   ```bash
   /research --compare "state management libraries"
   ```

2. **Design the solution:**
   ```bash
   /brainstorm "state management architecture"
   ```

3. **Plan implementation:**
   ```bash
   /plan "implement state management"
   ```

## When to Use

**Good use cases:**
- Designing new features with unclear requirements
- Exploring architectural decisions
- Evaluating multiple approaches
- Refining vague ideas into concrete designs
- Making technology choices

**When NOT to use:**
- Clear "mechanical" processes with known implementation
- Simple bug fixes with obvious solutions
- Tasks with explicit requirements already defined

For these cases, use direct implementation instead.

## Best Practices

### Prepare Context
Before brainstorming, have ready:
- Current architecture understanding
- Constraints (performance, budget, timeline)
- Related features or systems
- Team capabilities

### Engage Actively
- Take time to think through each question
- Ask for clarification when needed
- Push back if suggestions don't fit
- Validate each section before moving on

### Document Decisions
- Save designs to version control
- Include rationale for decisions
- Note rejected alternatives
- Track open questions

### Follow Through
After brainstorming:
1. Commit design document to repo
2. Share with team for feedback
3. Use `/plan --detailed` for implementation planning
4. Reference design during development

## Tips for Better Sessions

1. **Be specific** about constraints and requirements
2. **Mention existing systems** that need integration
3. **State preferences** if you have strong opinions
4. **Ask "why"** to understand recommendations
5. **Take breaks** for complex designs (use `--checkpoint`)

## Related Commands

- [/plan](/claudekit/commands/plan) - Create implementation plans from designs
- [/execute-plan](/claudekit/commands/execute-plan) - Execute plans with automation
- [/research](/claudekit/commands/research) - Research technologies before designing
- [/review](/claudekit/commands/review) - Review existing designs

## Customization

Brainstorming behavior can be customized via `CLAUDE.md`:
- Question style (sequential vs all-at-once)
- Default depth level
- Required design sections
- Output format preferences

See the [Configuration Guide](/claudekit/configuration) for details.
