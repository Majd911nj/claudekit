---
title: Modes Overview
description: Understanding Claude Kit behavioral modes
---

# Behavioral Modes

Modes adjust Claude's communication style, output format, and problem-solving approach. Choose the right mode for your task to optimize efficiency and results.

## Quick Reference

| Mode | Best For | Token Usage | Output Style |
|------|----------|-------------|--------------|
| [Default](/claudekit/modes/default) | General development tasks | Standard | Balanced explanation + code |
| [Brainstorm](/claudekit/modes/brainstorm) | Design, ideation, exploration | Higher | Questions, alternatives, comparisons |
| [Token-Efficient](/claudekit/modes/token-efficient) | High-volume, simple tasks | 30-70% less | Minimal prose, code-focused |
| [Deep Research](/claudekit/modes/deep-research) | Investigation, audits | Higher | Structured reports, citations |
| [Implementation](/claudekit/modes/implementation) | Executing clear plans | Lower | Code blocks, minimal explanation |
| [Review](/claudekit/modes/review) | Code review, QA | Standard | Categorized findings, actionable feedback |
| [Orchestration](/claudekit/modes/orchestration) | Complex multi-task coordination | Variable | Task delegation, progress tracking |

## Mode Selection Guide

### By Development Phase

```mermaid
graph LR
    A[New Feature] --> B[Brainstorm Mode]
    B --> C[Plan Created]
    C --> D[Implementation Mode]
    D --> E[Code Complete]
    E --> F[Review Mode]
    F --> G[Ship]
```

### By Task Type

| Task | Recommended Mode | Alternative |
|------|------------------|-------------|
| "How should I structure this?" | Brainstorm | Default |
| "Implement this feature" | Implementation | Default |
| "Fix this bug" | Default | Deep Research (if complex) |
| "Review this PR" | Review | Default + --persona=security |
| "Research this approach" | Deep Research | Brainstorm |
| "Generate 10 similar files" | Token-Efficient | Implementation |
| "Coordinate multi-file refactor" | Orchestration | Default |

### By Team Experience

| Experience Level | Recommended Modes |
|------------------|-------------------|
| Junior developers | Default, Brainstorm (for learning) |
| Senior developers | Token-Efficient, Implementation (for speed) |
| Mixed teams | Default, Review (for knowledge sharing) |

## Switching Modes

### Session-Wide Mode Change

```bash
/mode brainstorm              # All subsequent commands use brainstorm mode
/mode token-efficient         # Switch to token-efficient for the session
/mode default                 # Return to standard behavior
```

### Single Command Override

```bash
/plan --mode=brainstorm "new feature"
/fix --format=concise "error message"
/review --mode=review --persona=security src/auth/
```

### Mode Combinations

Some modes work well together via flags:

```bash
# Deep research with concise output
/research --mode=deep-research --format=concise [topic]

# Implementation with checkpoints
/execute-plan --mode=implementation --checkpoint [file]

# Brainstorm with saved output
/brainstorm --mode=brainstorm --save=plans/design.md [topic]
```

## Understanding Mode Behavior

Each mode modifies three key aspects:

### 1. Communication Style
- **Verbose modes** (Brainstorm, Deep Research): More questions, explanations, alternatives
- **Concise modes** (Token-Efficient, Implementation): Direct answers, minimal prose
- **Balanced modes** (Default, Review): Clear but not excessive

### 2. Problem-Solving Approach
- **Exploratory** (Brainstorm, Deep Research): Consider many options, delay decisions
- **Decisive** (Implementation, Token-Efficient): Make reasonable defaults, execute
- **Critical** (Review): Question assumptions, find issues

### 3. Output Format
- **Structured reports** (Deep Research, Review): Categorized, formatted findings
- **Code-focused** (Implementation, Token-Efficient): Minimal text, maximum code
- **Discussion-oriented** (Brainstorm, Default): Balanced code and explanation

## Mode Feature Matrix

| Feature | Default | Brainstorm | Token-Efficient | Deep Research | Implementation | Review | Orchestration |
|---------|---------|------------|-----------------|---------------|----------------|--------|---------------|
| Ask clarifying questions | Sometimes | Frequently | Rarely | Sometimes | Rarely | Sometimes | Sometimes |
| Present alternatives | Sometimes | Always | No | Sometimes | No | Sometimes | No |
| Detailed explanations | Yes | Yes | No | Yes | No | Yes | Moderate |
| Code comments | Standard | Verbose | Minimal | Standard | Minimal | Standard | Standard |
| Progress updates | No | No | No | Yes | Yes | No | Yes |
| Confidence levels | No | No | No | Yes | No | No | No |
| File citations | No | No | No | Yes | No | Yes | No |
| Task parallelization | No | No | No | No | No | No | Yes |

## Best Practices

### Start Broad, Then Focus
```bash
# 1. Explore options
/brainstorm "authentication approach"

# 2. Plan implementation
/plan --mode=default "implement OAuth2"

# 3. Execute efficiently
/execute-plan --mode=implementation plan.md

# 4. Review thoroughly
/review --mode=review src/auth/
```

### Match Mode to Iteration
- **First iteration**: Use Brainstorm or Default to explore
- **Subsequent iterations**: Use Implementation or Token-Efficient for speed
- **Final iteration**: Use Review to catch issues

### Know When to Switch
- Stuck on implementation? → Switch to Brainstorm
- Plan is clear? → Switch to Implementation
- Need to save costs? → Switch to Token-Efficient
- Complex bug? → Switch to Deep Research

## Common Patterns

### Feature Development
```bash
/mode brainstorm
/brainstorm "user profile feature"
# Explore options, make decisions

/mode implementation
/feature "user profile with avatar upload"
# Execute the plan

/mode review
/review src/features/profile/
# Quality check before merge
```

### Bug Investigation
```bash
/mode deep-research
/fix --depth=5 "memory leak in worker process"
# Thorough investigation

/mode implementation
# Apply the fix

/mode review
/review --persona=performance src/workers/
# Verify fix and performance
```

### Batch Operations
```bash
/mode token-efficient
/test --format=ultra src/services/*.ts
# Generate tests for all services efficiently
```

## Custom Mode Configuration

Advanced users can customize mode behavior in `.claude/modes/`. Each mode is defined in a markdown file that specifies:

- Communication patterns
- Output formats
- Problem-solving approaches
- Activation conditions

See individual mode pages for detailed behavior specifications.

## Related Documentation

- [Commands Reference](/claudekit/commands/overview) - Using modes with commands
- [Flags & Options](/claudekit/advanced/flags) - Mode-related flags
- [Token Optimization](/claudekit/optimization/token-efficient) - Cost-saving strategies
