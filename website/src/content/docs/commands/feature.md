---
title: /feature
description: End-to-end feature development workflow with planning, implementation, testing, and review
---

# /feature - Feature Development Workflow

## Purpose

Complete end-to-end feature development workflow that orchestrates planning, implementation guidance, testing, and code review. This command guides you through the entire lifecycle of building a new feature from requirements to merge-ready code.

## Usage

```bash
/feature [feature description or issue reference]
```

## Arguments

- `[feature description]` - Natural language description of the feature to build
- `[issue reference]` - GitHub issue number or ticket ID

## How It Works

The `/feature` command executes a comprehensive 6-phase workflow:

### Phase 1: Planning

First, the command analyzes your feature request and creates an implementation plan:

1. **Understand Requirements**
   - Parses the feature description thoroughly
   - Identifies acceptance criteria
   - Lists assumptions that need validation
   - Clarifies any ambiguous requirements with you

2. **Explore Codebase**
   - Finds related existing implementations
   - Identifies patterns and conventions to follow
   - Locates integration points
   - Notes dependencies

3. **Create Task Breakdown**
   - Decomposes into atomic, verifiable tasks
   - Orders tasks by dependencies
   - Includes testing requirements
   - Estimates complexity (S/M/L)

4. **Track with TodoWrite** - All tasks are tracked for progress

### Phase 2: Research (If Needed)

If the feature involves unfamiliar technology:

1. Research best practices and patterns
2. Find examples in the codebase or documentation
3. Identify potential pitfalls
4. Document key decisions

### Phase 3: Implementation Guidance

For each implementation task:

1. **Identify Target Files**
   - Existing files to modify
   - New files to create
   - Tests to add/update

2. **Provide Implementation Direction**
   - Code structure recommendations
   - Patterns to follow
   - Edge cases to handle
   - Error handling approach

3. **Review Progress**
   - Mark tasks complete as you go
   - Identify blockers early
   - Adjust plan if needed

### Phase 4: Testing

After implementation:

1. **Generate Tests**
   - Unit tests for new functions
   - Integration tests for workflows
   - Edge case coverage

2. **Run Test Suite**
   ```bash
   # Python
   pytest -v --cov=src

   # TypeScript
   pnpm test
   ```

3. **Verify Coverage**
   - Ensure new code is tested
   - Coverage should not decrease

### Phase 5: Code Review

Before completion:

1. **Self-Review Checklist**
   - Code follows project conventions
   - No security vulnerabilities
   - Error handling is complete
   - Documentation updated
   - Tests are passing

2. **Review Staged Changes**
   ```bash
   git diff --staged
   ```

3. **Address Any Issues**
   - Fix critical issues immediately
   - Note recommendations for future

### Phase 6: Completion

1. **Verify All Tasks Complete**
   - All TodoWrite items done
   - All tests passing
   - Documentation updated

2. **Prepare for Commit**
   - Stage appropriate files
   - Generate commit message
   - Create PR if requested

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--mode=[mode]` | Use specific behavioral mode | `--mode=implementation` |
| `--depth=[1-5]` | Planning thoroughness level (1=quick, 5=exhaustive) | `--depth=3` |
| `--checkpoint` | Create checkpoint before starting | `--checkpoint` |
| `--skip-tests` | Skip test generation phase | `--skip-tests` |
| `--skip-review` | Skip code review phase | `--skip-review` |
| `--format=[fmt]` | Output format (concise/detailed) | `--format=concise` |

### Flag Examples

```bash
# Implementation-focused mode with minimal prose
/feature --mode=implementation "add user profile page"

# Thorough planning with session checkpoint
/feature --depth=5 --checkpoint "implement payment flow"

# Quick feature with concise output
/feature --format=concise "add logging utility"
```

## Examples

### Basic Feature

**Input:**
```bash
/feature Add password reset functionality with email verification
```

**Output:**
1. Implementation plan with 8 tasks covering model, service, routes, email, tests
2. Step-by-step implementation of password reset flow
3. Tests for happy path and error cases
4. Updated API documentation
5. Commit message and PR description ready

### Feature with Issue Reference

**Input:**
```bash
/feature #142 - Add dark mode toggle
```

**Output:**
1. Fetches context from GitHub issue #142
2. Creates plan based on acceptance criteria
3. Implements theme switching logic
4. Adds tests for theme persistence
5. Updates component documentation

## Deliverables

After running `/feature`, you receive:

1. **Implementation Plan** - Structured task breakdown with estimates
2. **Code Changes** - Complete feature implementation
3. **Tests** - Comprehensive test coverage
4. **Documentation** - Updated docs and comments
5. **Commit/PR** - Ready for code review and merge

## Related Commands

- [/plan](/claudekit/commands/plan) - Create implementation plan only
- [/test](/claudekit/commands/test) - Generate tests for existing code
- [/review](/claudekit/commands/review) - Comprehensive code review
- [/tdd](/claudekit/commands/tdd) - Test-driven development approach
