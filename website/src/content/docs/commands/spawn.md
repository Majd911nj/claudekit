---
title: /spawn
description: Launch background tasks for parallel execution
---

# /spawn

## Purpose

Launch background tasks for parallel execution. Enables concurrent work on independent tasks with result aggregation.

## Usage

```bash
/spawn "[task description]"
/spawn [operation]
```

## Operations

### Launch Task

Start a new background task:

```bash
/spawn "[task description]"
```

**Process:**
1. Analyze task for parallelizability
2. Launch subagent with task
3. Return task ID for tracking
4. Continue main conversation

**Output:**
```markdown
Spawned: Task #1
- Description: Research authentication patterns
- Status: Running
- Agent: researcher

Continue working. Use `/spawn --list` to check status.
```

### List Tasks

Show running and completed tasks:

```bash
/spawn --list
```

**Output:**
```markdown
## Active Tasks

| ID | Description | Status | Duration |
|----|-------------|--------|----------|
| #1 | Research auth patterns | Running | 2m |
| #2 | Analyze security | Complete | 5m |

## Completed Tasks (last hour)
| #2 | Analyze security | ✅ Complete | Results ready |
```

### Collect Results

Gather results from completed tasks:

```bash
/spawn --collect
```

**Output:**
```markdown
## Collected Results

### Task #1: Research auth patterns
**Status**: Complete
**Findings**:
- Pattern A: JWT with refresh tokens
- Pattern B: Session-based with Redis
- Recommendation: JWT for stateless API

### Task #2: Analyze security
**Status**: Complete
**Findings**:
- 2 high-priority issues found
- See detailed report below
```

### Cancel Task

Stop a running task:

```bash
/spawn --cancel [id]
```

## Task Types

| Type | Best For | Agent Used |
|------|----------|------------|
| Research | Information gathering | researcher |
| Analysis | Code analysis | scout |
| Review | Code review | code-reviewer |
| Test | Test generation | tester |
| Scan | Security scanning | security-auditor |

## Flags

| Flag | Description |
|------|-------------|
| `--list` | Show all tasks |
| `--collect` | Gather completed results |
| `--cancel [id]` | Cancel running task |
| `--wait` | Wait for all tasks to complete |
| `--agent=[type]` | Specify agent type |
| `--priority=[high\|normal]` | Task priority |

## Examples

```bash
# Spawn research task
/spawn "Research OAuth2 best practices"

# Spawn analysis with specific agent
/spawn "Analyze user service for performance" --agent=scout

# Spawn security review
/spawn "Review security of auth module" --agent=security-auditor

# Check task status
/spawn --list

# Collect all results
/spawn --collect

# Wait for all tasks to complete
/spawn --wait

# Cancel a task
/spawn --cancel 1
```

## Parallel Workflows

### Research Phase

```bash
# Launch multiple research tasks
/spawn "Research authentication approaches"
/spawn "Analyze current auth implementation"
/spawn "Review competitor auth patterns"

# Continue other work...

# Wait for all to complete
/spawn --wait

# Collect and synthesize
/spawn --collect
```

### Multi-File Review

```bash
# Review different modules in parallel
/spawn "Review src/auth/ for security"
/spawn "Review src/api/ for performance"
/spawn "Review src/db/ for SQL injection"

# Collect findings
/spawn --collect

# Address issues
```

### Comprehensive Analysis

```bash
# Multiple analysis tasks
/spawn "Analyze dependencies for vulnerabilities"
/spawn "Check code coverage gaps"
/spawn "Find performance bottlenecks"

/spawn --collect
```

## Best Practices

1. **Independent Tasks**: Only spawn truly independent work that doesn't depend on other tasks
2. **Clear Descriptions**: Specific task descriptions get better results
3. **Regular Collection**: Don't let results pile up unchecked
4. **Resource Awareness**: Don't spawn too many concurrent tasks (3-5 is usually optimal)

## Use Cases

### Feature Planning

```bash
# Parallel research before implementation
/spawn "Research state management libraries"
/spawn "Analyze existing state handling code"
/spawn "Find examples of similar features"

/spawn --collect
# Make informed decision based on all research
```

### Code Quality Audit

```bash
# Audit different aspects simultaneously
/spawn "Check for security vulnerabilities"
/spawn "Identify performance issues"
/spawn "Find code duplication"
/spawn "Check test coverage gaps"

/spawn --collect
```

### Documentation Tasks

```bash
# Generate docs for multiple modules
/spawn "Document API endpoints"
/spawn "Generate type documentation"
/spawn "Create usage examples"

/spawn --collect
```

## Limitations

- Tasks cannot communicate with each other
- Results are collected, not streamed
- Heavy tasks may take time to complete
- Some tasks benefit from sequential execution (e.g., dependent work)
- Spawned tasks use additional API tokens

## Combines With

- [/mode orchestration](/claudekit/commands/mode) - Manages multiple spawned tasks
- [/plan](/claudekit/core-commands/plan) - Plan tasks, then spawn parallel execution
- [/checkpoint](/claudekit/commands/checkpoint) - Save state before spawning tasks

## Related Commands

- [/status](/claudekit/commands/status) - Check project status
- [/load](/claudekit/commands/load) - Load components for tasks
