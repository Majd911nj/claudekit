---
title: /index
description: Generate a comprehensive project structure index for faster navigation
slug: commands/index-cmd
---

# /index

## Purpose

Generate a comprehensive project structure index for faster navigation and context loading. Creates a `PROJECT_INDEX.md` file mapping the codebase structure.

## Usage

```bash
/index [flags]
```

## Workflow

### Step 1: Scan Project Structure

Scans the entire project directory structure, excluding:
- `node_modules/`
- `.git/`
- `__pycache__/`
- `dist/`, `build/`, `.next/`
- `venv/`, `.venv/`
- Coverage and cache directories

### Step 2: Identify Key Components

Categorizes files by type:
- **Entry Points**: Main files, index files, app entry
- **API/Routes**: Endpoint definitions
- **Models/Types**: Data structures, schemas
- **Services**: Business logic
- **Utilities**: Helper functions
- **Tests**: Test files
- **Configuration**: Config files, env templates
- **Documentation**: README, docs

### Step 3: Map Dependencies

Identifies:
- Package managers and dependencies (package.json, requirements.txt, etc.)
- Internal import relationships between key files
- External service integrations

### Step 4: Generate Index

Creates `PROJECT_INDEX.md` with this structure:

```markdown
# Project Index: [Project Name]

Generated: [timestamp]

## Quick Navigation

| Category | Key Files |
|----------|-----------|
| Entry Points | [list] |
| API Routes | [list] |
| Core Services | [list] |
| Models | [list] |

## Directory Structure

[tree view]

## Key Files

### Entry Points
- `[path]` - [description]

### API/Routes
- `[path]` - [description]

### Services
- `[path]` - [description]

### Models/Types
- `[path]` - [description]

## Dependencies

### External
- [package]: [purpose]

### Internal
- [module] → [depends on]

## Architecture Notes
[Brief description of patterns observed]
```

## Flags

| Flag | Description |
|------|-------------|
| `--depth=[N]` | Limit directory depth (default: 5) |
| `--include=[pattern]` | Include additional patterns |
| `--exclude=[pattern]` | Exclude additional patterns |
| `--output=[path]` | Custom output path |

## Examples

```bash
# Generate standard project index
/index

# Generate shallow index (3 levels deep)
/index --depth=3

# Include GraphQL files in the index
/index --include="*.graphql"

# Save to custom location
/index --output=docs/INDEX.md
```

## Output

After generating the index, you'll receive:
1. Index file location
2. Number of files indexed
3. Key components discovered
4. Suggestion to use `/load` to load specific components

## Benefits

- **Faster Navigation**: Quickly locate files and components
- **Context Loading**: Use with `/load` for efficient context management
- **Onboarding**: Help new team members understand codebase structure
- **Documentation**: Auto-generated architecture overview

## Related Commands

- [/load](/claudekit/commands/load) - Load specific components into context
- [/status](/claudekit/commands/status) - Check current project status
