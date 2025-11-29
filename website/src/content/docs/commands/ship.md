---
title: /ship
description: Complete workflow to commit changes, run reviews, execute tests, and create a pull request
---

# /ship

The ultimate command for shipping code. Runs quality checks, creates commits, and generates pull requests in one streamlined workflow.

## Purpose

Complete end-to-end workflow that:
- Reviews your code for quality and security
- Runs the test suite
- Creates a well-formatted commit
- Pushes changes to remote
- Generates a pull request ready for review

## Usage

```bash
/ship [commit message]
```

**Quick mode** (skip review):
```bash
/ship quick
```

## Arguments

| Argument | Description |
|----------|-------------|
| `[commit message]` | Your commit message - used as the commit subject line |
| `quick` | Skip code review and auto-generate commit message |

## Workflow

The `/ship` command follows a comprehensive 5-phase workflow:

### Phase 1: Pre-Ship Checks

First, the command validates your changes:

```bash
git status
git diff --staged
```

**Automatic validation:**
- No secrets or API keys in code
- No debug statements (`console.log`, `print()`)
- No large blocks of commented-out code
- Identifies all modified, added, and deleted files

### Phase 2: Code Review (unless 'quick' mode)

Runs an automated self-review:

- **Code quality**: Checks style compliance and best practices
- **Security**: Identifies potential vulnerabilities
- **Type safety**: Verifies TypeScript types, Python type hints
- **Critical issues**: Must be fixed before proceeding
- **Recommendations**: Noted but don't block the ship

### Phase 3: Run Tests

Executes your test suite and validates coverage:

**Python projects:**
```bash
pytest -v
```

**TypeScript/JavaScript projects:**
```bash
pnpm test
```

**Validation checks:**
- All tests must pass
- No new warnings introduced
- Code coverage not decreased
- New code has test coverage

### Phase 4: Create Commit

Creates a conventional commit with auto-generated message:

```bash
git add -A
git commit -m "type(scope): subject

body explaining the changes

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
```

The commit message follows [Conventional Commits](https://www.conventionalcommits.org/) format.

### Phase 5: Push and Create PR

Pushes your branch and creates a pull request:

```bash
git push -u origin [branch-name]
gh pr create --title "type(scope): description" --body "[PR body]"
```

The PR includes:
- Summary of changes
- Test plan checklist
- Manual testing notes
- Link to related issues

## Examples

### Standard Ship

Ship a new authentication feature:

```bash
/ship "add OAuth2 login support"
```

**Generated commit:**
```
feat(auth): add OAuth2 login support

- Implement Google OAuth provider
- Implement GitHub OAuth provider
- Add session token generation
- Update user model for OAuth data

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Quick Ship

For small changes where you want to skip the review:

```bash
/ship quick
```

Auto-generates everything and creates the PR immediately.

### Bug Fix Ship

```bash
/ship "fix null user crash in profile endpoint"
```

**Generated commit:**
```
fix(api): handle null user in profile endpoint

The profile endpoint crashed when accessing deleted users.
Added null check and proper 404 response.

Fixes #456

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Output

After successful completion, you'll see a comprehensive ship report:

```markdown
## Ship Complete

### Commit
**Hash**: `abc1234`
**Message**: `feat(auth): add password reset functionality`

### Changes
| File | Change |
|------|--------|
| `src/auth/reset.ts` | Added |
| `src/auth/routes.ts` | Modified |
| `tests/auth/reset.test.ts` | Added |

### Checks
- [x] Code review passed
- [x] Tests passing (42 tests)
- [x] Coverage: 85% (+3%)
- [x] No security issues

### Pull Request
**URL**: https://github.com/org/repo/pull/123
**Title**: feat(auth): add password reset functionality
**Base**: main
**Status**: Ready for review

### Next Steps
1. Request review from team
2. Address any feedback
3. Merge when approved
```

## Commit Message Formats

The command auto-generates appropriate commit messages based on your changes:

### Feature Addition
```
feat(scope): add [feature]

- Added [component/function]
- Implemented [functionality]
- Added tests for [scenarios]
```

### Bug Fix
```
fix(scope): resolve [issue]

- Fixed [bug description]
- Added null check for [case]
- Updated tests
```

### Refactoring
```
refactor(scope): improve [area]

- Extracted [logic] to [location]
- Renamed [old] to [new]
- Simplified [complex code]
```

### Documentation
```
docs(scope): update [documentation]

- Added [section]
- Fixed [errors]
- Updated [examples]
```

## Pre-Ship Checklist

The command automatically validates:

- [ ] All changes are staged
- [ ] No unintended files included
- [ ] Tests pass
- [ ] No secrets in code
- [ ] No debug statements
- [ ] Commit message is descriptive
- [ ] PR description is complete

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--mode=[mode]` | Override behavioral mode | `/ship --mode=token-efficient "fix bug"` |
| `--format=[fmt]` | Output format (concise/detailed) | `/ship --format=concise quick` |
| `--skip-tests` | Skip test execution | `/ship --skip-tests "docs update"` |

## Related Commands

- [/commit](/claudekit/commands/commit/) - Create a commit without PR
- [/pr](/claudekit/commands/pr/) - Create PR from existing commits
- [/review](/claudekit/commands/review/) - Run code review separately
- [/test](/claudekit/commands/test/) - Run tests separately

## Tips

**For small changes**: Use `/ship quick` to skip the review and speed up the process.

**For critical changes**: Let the full workflow run to catch potential issues before they reach reviewers.

**For documentation**: Use `--skip-tests` to avoid running the full test suite.

**Customization**: Modify ship behavior in `CLAUDE.md` under "Agent Behavior Overrides".
