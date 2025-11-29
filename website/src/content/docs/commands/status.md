---
title: /status
description: Get current project status including tasks, git state, and recent activity
---

# /status

## Purpose

Get current project status including tasks, git state, and recent activity. Provides a comprehensive overview of where you are in your development workflow.

## Usage

```bash
/status
```

## Workflow

### 1. Check Git Status

```bash
git status
git log --oneline -5
```

Provides:
- Current branch
- Modified/staged/untracked files
- Recent commits

### 2. Review Tasks

Shows:
- Tasks in progress
- Pending tasks
- Tasks completed today

### 3. Recent Activity

Displays:
- Recent commits (last 5)
- Open pull requests
- Open issues

## Output

```markdown
## Project Status

### Git
- Branch: `feature/oauth-integration`
- Status: 3 modified files, 1 staged
- Ahead of origin by 2 commits

### Tasks
- In Progress: 2
  - Implement token refresh
  - Add OAuth callback
- Pending: 5
- Completed Today: 3

### Recent Commits
1. feat: add JWT token generation
2. test: add auth service tests
3. refactor: extract validation logic
4. fix: handle expired tokens
5. docs: update API documentation

### Open Pull Requests
- #123: Add OAuth2 authentication
- #119: Fix session timeout issue

### Active Spawned Tasks
- #1: Research auth patterns (running)
- #2: Security scan (completed)

### Checkpoints
- feature-auth (2h ago)
- oauth-progress (1d ago)
```

## What It Shows

| Section | Information |
|---------|-------------|
| **Git** | Branch, uncommitted changes, sync status |
| **Tasks** | In-progress, pending, completed |
| **Commits** | Last 5 commits on current branch |
| **PRs** | Open pull requests (if GitHub integration) |
| **Spawned Tasks** | Active background tasks |
| **Checkpoints** | Recent session checkpoints |

## Use Cases

### Daily Standup

```bash
# Quick overview before standup
/status

# Shows what you worked on and what's in progress
```

### Context Recovery

```bash
# After coming back from a break
/status

# Reminds you where you left off
```

### Before Switching Branches

```bash
# Check status before switching work
/status

# Ensure nothing uncommitted will be lost
```

### Project Overview

```bash
# Quick snapshot of project state
/status

# See all active work at a glance
```

## Integration with Other Commands

### With /checkpoint

```bash
/status                      # See current state
/checkpoint save progress    # Save before switching
```

### With /spawn

```bash
/spawn --list               # See background tasks
/status                     # See overall status including spawned tasks
```

### With /load

```bash
/status                     # See what's modified
/load src/auth/             # Load the changed component
```

## Tips

1. **Use Regularly**: Quick status check before starting work
2. **Before Commits**: Verify what's changed before committing
3. **Context Switches**: Check status when switching tasks
4. **Team Coordination**: Share status output in team discussions

## Related Commands

- [/checkpoint](/claudekit/commands/checkpoint) - Save/restore session state
- [/spawn](/claudekit/commands/spawn) - Check background tasks
- [/help](/claudekit/commands/help) - Get command help
