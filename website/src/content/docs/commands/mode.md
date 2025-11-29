---
title: /mode
description: Switch between behavioral modes to optimize responses for different task types
---

# /mode

## Purpose

Switch between behavioral modes to optimize responses for different task types. Modes adjust communication style, output format, and problem-solving approach.

## Usage

```bash
/mode [mode-name]
```

## Arguments

- **mode-name** (optional): The mode to activate. If omitted, shows the current active mode.

## Available Modes

| Mode | Description | Best For |
|------|-------------|----------|
| `default` | Balanced standard behavior | General tasks |
| `brainstorm` | Creative exploration, more questions | Design, ideation |
| `token-efficient` | Compressed, concise output | High-volume, cost savings |
| `deep-research` | Thorough analysis, citations | Investigation, audits |
| `implementation` | Code-focused, minimal prose | Executing plans |
| `review` | Critical analysis, finding issues | Code review, QA |
| `orchestration` | Multi-task coordination | Complex parallel work |

## Mode Details

### Default Mode
- Standard balanced responses
- Mix of explanation and code
- Normal verification steps

### Brainstorm Mode
- Ask more clarifying questions
- Present multiple alternatives
- Explore trade-offs explicitly
- Delay convergence on solutions

### Token-Efficient Mode
- Minimal explanations
- Code-only responses where possible
- Skip obvious context
- 30-70% token savings

### Deep-Research Mode
- Thorough investigation
- Evidence and citations
- Confidence levels stated
- Comprehensive analysis

### Implementation Mode
- Jump straight to code
- Progress indicators
- Minimal discussion
- Execute don't deliberate

### Review Mode
- Look for issues first
- Categorized findings
- Severity levels
- Actionable feedback

### Orchestration Mode
- Task breakdown
- Parallel execution planning
- Result aggregation
- Coordination focus

## Flags

| Flag | Description |
|------|-------------|
| `--info` | Show detailed mode description |
| `--list` | List all available modes |

## Examples

```bash
# Switch to brainstorm mode for design discussions
/mode brainstorm

# Switch to efficient mode for cost savings
/mode token-efficient

# Show current active mode
/mode

# List all available modes
/mode --list

# Reset to default mode
/mode default
```

## Mode Persistence

- Modes persist for the entire session
- Explicitly switch when task type changes
- Mode affects all subsequent responses
- Can be overridden per-command with flags

## Command Flag Override

Override mode for a single command:

```bash
/feature --mode=implementation "Add login feature"
/review --mode=deep-research src/auth/
/plan --mode=brainstorm "Design notification system"
```

## Recommended Workflows

### Feature Development

```bash
/mode brainstorm           # Explore approaches
# [discuss design]
/mode implementation       # Execute plan
# [write code]
/mode review               # Check quality
# [review code]
```

### Bug Investigation

```bash
/mode deep-research        # Investigate thoroughly
# [analyze bug]
/mode implementation       # Apply fix
# [fix bug]
/mode default              # Return to normal
```

### Cost-Conscious Session

```bash
/mode token-efficient      # Set for session
# [work on multiple tasks]
/mode default              # Reset when done
```

## Mode Files

Mode definitions are stored in `.claude/modes/`:
- `default.md`
- `brainstorm.md`
- `token-efficient.md`
- `deep-research.md`
- `implementation.md`
- `review.md`
- `orchestration.md`

Customize modes by editing these files in your project.

## Related Commands

- [/help](/claudekit/commands/help) - Get help on any command
- [/status](/claudekit/commands/status) - Check project status
