---
title: /load
description: Load specific project components into context for focused work
---

# /load

## Purpose

Load specific project components into context for focused work. Uses the project index to efficiently load relevant files.

## Usage

```bash
/load [component] [flags]
```

## Arguments

- **component**: Can be a category name, file path, or pattern
  - Category name: `api`, `models`, `services`, `utils`, `tests`, etc.
  - File path: `src/services/user.ts`
  - Pattern: `src/auth/*`

## Workflow

### Step 1: Check for Index

First, checks if `PROJECT_INDEX.md` exists:
- If exists: Uses index for efficient loading
- If not: Suggests running `/index` first, or does quick scan

### Step 2: Identify Component

Parses the requested component:

| Request Type | Action |
|--------------|--------|
| Category name | Load all files in category |
| File path | Load specific file |
| Pattern | Load matching files |
| `--all` | Load key files from all categories |

### Step 3: Load Files

Reads the identified files and summarizes:
- File purposes
- Key exports/functions
- Dependencies
- Current state

### Step 4: Context Summary

Provides a brief summary:

```markdown
## Loaded Context

### Files Loaded (N)
- `path/to/file1.ts` - [purpose]
- `path/to/file2.ts` - [purpose]

### Key Components
- [Component]: [description]

### Ready For
- [Suggested actions based on loaded context]
```

## Component Categories

| Category | What It Loads |
|----------|---------------|
| `api` | API routes and endpoints |
| `models` | Data models and types |
| `services` | Business logic services |
| `utils` | Utility functions |
| `tests` | Test files |
| `config` | Configuration files |
| `auth` | Authentication related |
| `db` | Database related |

## Flags

| Flag | Description |
|------|-------------|
| `--all` | Load all key components |
| `--shallow` | Load only file summaries |
| `--deep` | Load full file contents |
| `--related` | Include related files |

## Examples

```bash
# Load all API routes
/load api

# Load all data models
/load models

# Load specific file
/load src/services/user.ts

# Load auth + related files
/load auth --related

# Load all key components
/load --all

# Quick overview of everything
/load --all --shallow
```

## Best Practices

1. **Start Narrow**: Load specific components first
2. **Expand as Needed**: Use `--related` when you need more context
3. **Check Index**: Run `/index` if loading seems slow
4. **Use Categories**: Category names are faster than patterns

## After Loading

The command suggests next actions:
- "Ready to work on [component]. What would you like to do?"
- "I see [patterns/issues]. Want me to address them?"
- "Related files that might be relevant: [list]"

## Use Cases

### Starting Work on a Feature

```bash
# Load the entire authentication system
/load auth --related

# Now you can work with full context
```

### Bug Investigation

```bash
# Load the specific service and its tests
/load src/services/payment.ts
/load tests/payment.test.ts
```

### Code Review

```bash
# Load all files in a directory
/load src/api/orders/
```

### Architecture Understanding

```bash
# Get overview of all components
/load --all --shallow
```

## Related Commands

- [/index](/claudekit/commands/index) - Generate project structure index
- [/status](/claudekit/commands/status) - Check project status
- [/checkpoint](/claudekit/commands/checkpoint) - Save/restore session state
