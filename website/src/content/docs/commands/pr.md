---
title: /pr
description: Create a well-documented pull request with proper description and checks
---

# /pr

Create comprehensive pull requests with auto-generated descriptions, checklists, and proper formatting.

## Purpose

Generates pull requests that:
- Include detailed change summaries
- Provide test plans and checklists
- Link to related issues
- Follow your team's PR template
- Are ready for reviewer attention

Use this when you've already committed changes and just need the PR (for full workflow, use `/ship`).

## Usage

```bash
/pr [title]
```

**Auto-generate title from commits:**
```bash
/pr auto
```

## Arguments

| Argument | Description |
|----------|-------------|
| `[title]` | PR title in conventional commit format |
| `auto` | Generate title from recent commits |

## Workflow

### Step 1: Prepare Changes

The command first validates your branch is ready:

```bash
git status
git diff main...HEAD
```

Analyzes:
- All commits on your branch
- Files changed
- Lines added/removed
- Potential conflicts

### Step 2: Verify Ready

Checks that your branch meets PR requirements:

**Required checks:**
- [ ] All tests passing
- [ ] Code has been reviewed (or self-reviewed)
- [ ] No merge conflicts with base branch
- [ ] Branch is pushed to remote

**If checks fail**, you'll get guidance on what to fix before creating the PR.

### Step 3: Create Pull Request

Uses GitHub CLI to create the PR:

```bash
gh pr create \
  --title "type(scope): description" \
  --body "[generated body]"
```

The PR body includes:
- Summary of changes
- Test plan
- Screenshots (for UI changes)
- Checklist
- Related issues

## Examples

### Feature PR

**Create PR for new feature:**

```bash
/pr "add OAuth2 authentication support"
```

**Generated PR:**

**Title:** `feat(auth): add OAuth2 authentication support`

**Body:**
```markdown
## Summary
- Implement Google OAuth2 provider
- Implement GitHub OAuth2 provider
- Add token refresh mechanism
- Update user model for OAuth data
- Add comprehensive test coverage

## Test Plan
- [x] Unit tests for OAuth providers
- [x] Integration tests for auth flow
- [x] Manual testing with Google account
- [x] Manual testing with GitHub account
- [x] Token refresh tested

## Changes
**Added:**
- `src/auth/oauth/google.ts` - Google OAuth implementation
- `src/auth/oauth/github.ts` - GitHub OAuth implementation
- `tests/auth/oauth.test.ts` - OAuth test suite

**Modified:**
- `src/models/user.ts` - Added OAuth fields
- `src/auth/routes.ts` - Added OAuth routes

## Checklist
- [x] Tests added/updated
- [x] Documentation updated
- [x] No breaking changes
- [x] Follows code style guidelines

Closes #123

🤖 Generated with Claude Code
```

### Bug Fix PR

**Create PR for bug fix:**

```bash
/pr "fix null pointer crash in user profile"
```

**Generated PR:**

**Title:** `fix(api): handle null user in profile endpoint`

**Body:**
```markdown
## Summary
- Fixed crash when accessing deleted user profiles
- Added null check before user data access
- Return proper 404 response for missing users
- Added regression test

## Bug Details
The profile endpoint crashed with a null pointer exception when
attempting to access a user that had been deleted. This occurred
because the endpoint didn't check if the user exists before
accessing user properties.

## Test Plan
- [x] Unit test for deleted user scenario
- [x] Integration test for 404 response
- [x] Manual testing with deleted user ID
- [x] Verified fix doesn't affect existing functionality

## Changes
**Modified:**
- `src/api/profile.ts` - Added null check
- `tests/api/profile.test.ts` - Added regression test

## Checklist
- [x] Tests added/updated
- [x] No breaking changes
- [x] Follows code style guidelines

Fixes #456

🤖 Generated with Claude Code
```

### Auto-Generated PR

**Let the command create title from commits:**

```bash
/pr auto
```

Analyzes your commits and generates an appropriate title:

```
feat(ui): add dark mode support
refactor(ui): improve theme switching
test(ui): add dark mode tests
```

**Generated title:** `feat(ui): add dark mode support`

### Documentation PR

**Create PR for docs:**

```bash
/pr "update API documentation"
```

**Generated PR:**

**Title:** `docs(api): update API documentation`

**Body:**
```markdown
## Summary
- Updated endpoint documentation
- Added request/response examples
- Fixed broken links
- Added authentication section
- Improved error documentation

## Changes
**Modified:**
- `docs/api.md` - Updated all sections
- `README.md` - Fixed API links

## Checklist
- [x] Documentation updated
- [x] Examples tested
- [x] Links verified
- [x] No breaking changes

🤖 Generated with Claude Code
```

## PR Body Template

The generated PR follows this structure:

```markdown
## Summary
Brief overview of changes with bullet points

## [Conditional Sections]
- **Bug Details** (for fixes)
- **Feature Description** (for features)
- **Breaking Changes** (if applicable)

## Test Plan
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing
- [ ] Specific scenarios tested

## Screenshots
[For UI changes - automatically detected]

## Changes
**Added:**
- List of new files

**Modified:**
- List of changed files

**Removed:**
- List of deleted files

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Follows code style

[Issue references]

🤖 Generated with Claude Code
```

## Output

After creating the PR, you'll see:

```markdown
## Pull Request Created

**URL**: https://github.com/org/repo/pull/123
**Title**: feat(auth): add OAuth support
**Base**: main ← feature/oauth

### Changes
- 5 files changed
- +234 -12 lines

### Status
✓ Ready for review
✓ All checks passing
✓ No conflicts

### Next Steps
1. Request reviews from: @teammate1, @teammate2
2. Address feedback
3. Merge when approved
```

## Pre-PR Validation

The command checks:

- [ ] **Branch is pushed** - Must exist on remote
- [ ] **Tests passing** - All CI checks green
- [ ] **No conflicts** - Clean merge with base branch
- [ ] **Commits are valid** - No WIP or fixup commits
- [ ] **Required files updated** - Changelog, docs, etc.

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--base=[branch]` | Target branch (default: main) | `/pr --base=develop "new feature"` |
| `--draft` | Create as draft PR | `/pr --draft "work in progress"` |
| `--reviewers=[users]` | Request specific reviewers | `/pr --reviewers=alice,bob "feature"` |
| `--mode=[mode]` | Behavioral mode | `/pr --mode=token-efficient auto` |

## Related Commands

- [/ship](/claudekit/commands/ship/) - Full commit + PR workflow
- [/commit](/claudekit/commands/commit/) - Create commits
- [/review](/claudekit/commands/review/) - Review code before PR
- [/changelog](/claudekit/commands/changelog/) - Generate changelog

## Tips

**Use 'auto' for multi-commit PRs**: When your branch has several related commits, let the command analyze them to generate the best title.

**Draft PRs for WIP**: Use `--draft` flag for work-in-progress PRs that aren't ready for review.

**Request reviewers**: Add `--reviewers` to automatically request reviews from specific team members.

**Link issues**: Reference issues in your title or use keywords like "Closes #123" to auto-link.

**Customize template**: Modify the PR template in `CLAUDE.md` under "PR Requirements".

**Screenshot detection**: For UI changes, the command will prompt you to add screenshots to the PR body.
