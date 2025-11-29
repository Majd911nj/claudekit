---
title: /checkpoint
description: Save and restore conversation context using git-based checkpoints
---

# /checkpoint

## Purpose

Save and restore conversation context using git-based checkpoints. Enables session recovery and state preservation for complex, multi-session work.

## Usage

```bash
/checkpoint [operation] [name] [flags]
```

## Operations

### Save Checkpoint

Create a checkpoint of current state:

```bash
/checkpoint save [name]
```

**Process:**
1. Create git stash with descriptive message
2. Record current context (files being worked on, task state)
3. Save checkpoint metadata to `.claude/checkpoints/[name].json`

**Metadata Format:**
```json
{
  "name": "feature-auth",
  "created": "2024-01-15T14:30:00Z",
  "git_stash": "stash@{0}",
  "files_in_context": ["src/auth/login.ts", "src/auth/token.ts"],
  "current_task": "Implementing JWT refresh",
  "notes": "User-provided notes"
}
```

### List Checkpoints

Show available checkpoints:

```bash
/checkpoint list
```

**Output:**
```markdown
## Available Checkpoints

| Name | Created | Task | Stash |
|------|---------|------|-------|
| feature-auth | 2h ago | JWT refresh | stash@{0} |
| bugfix-login | 1d ago | Login timeout | stash@{1} |
```

### Restore Checkpoint

Restore a previous checkpoint:

```bash
/checkpoint restore [name]
```

**Process:**
1. Apply git stash
2. Load checkpoint metadata
3. Summarize restored context
4. Ready to continue work

### Delete Checkpoint

Remove a checkpoint:

```bash
/checkpoint delete [name]
```

## Flags

| Flag | Description |
|------|-------------|
| `--notes="[text]"` | Add notes to checkpoint |
| `--force` | Overwrite existing checkpoint |
| `--include-uncommitted` | Include uncommitted changes |
| `--dry-run` | Show what would be saved |

## Examples

```bash
# Save current state
/checkpoint save auth-progress

# Save with notes
/checkpoint save auth --notes="WIP: implementing token refresh"

# Show all checkpoints
/checkpoint list

# Restore a checkpoint
/checkpoint restore auth-progress

# Remove old checkpoint
/checkpoint delete old-checkpoint

# Preview what will be saved
/checkpoint save feature-x --dry-run
```

## Auto-Checkpoint

For complex tasks, checkpoints are automatically suggested:
- Before major refactoring
- When switching contexts
- Before risky operations
- At natural breakpoints

## Best Practices

1. **Name Descriptively**: Use task-related names (e.g., `auth-oauth-integration`)
2. **Add Notes**: Future you will thank present you
3. **Checkpoint Often**: Before context switches or risky changes
4. **Clean Up**: Delete obsolete checkpoints regularly

## Recovery Workflow

When resuming work after a break:

```bash
# 1. See what checkpoints exist
/checkpoint list

# 2. Restore the relevant context
/checkpoint restore feature-auth

# 3. Continue where you left off
# Context is loaded, files are restored
```

## Use Cases

### Multi-Day Feature Work

```bash
# End of day 1
/checkpoint save oauth-day1 --notes="Completed user model, starting token service"

# Start of day 2
/checkpoint restore oauth-day1
```

### Experimental Changes

```bash
# Before trying risky refactor
/checkpoint save before-refactor

# If refactor doesn't work out
/checkpoint restore before-refactor
```

### Context Switching

```bash
# Save current work
/checkpoint save feature-payments

# Switch to urgent bug
/fix "login timeout issue"

# Return to feature work
/checkpoint restore feature-payments
```

## Limitations

- Checkpoints use git stash (requires git repository)
- Large uncommitted changes may be slow to save/restore
- Metadata stored in `.claude/checkpoints/`
- Consider committing before checkpointing for safety

## Related Commands

- [/load](/claudekit/commands/load) - Load specific components
- [/status](/claudekit/commands/status) - Check current project status
- [/spawn](/claudekit/commands/spawn) - Launch parallel tasks
