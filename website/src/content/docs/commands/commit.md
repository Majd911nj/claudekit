---
title: /commit
description: Create a well-formatted commit with auto-generated conventional commit messages
---

# /commit

Smart commit creation with auto-generated messages that follow the Conventional Commits standard.

## Purpose

Creates well-structured commits by:
- Analyzing your staged changes
- Auto-generating descriptive commit messages
- Following Conventional Commits format
- Adding helpful metadata and co-author attribution

Perfect for when you want to commit without creating a PR (use `/ship` for the full workflow).

## Usage

```bash
/commit [optional hint]
```

## Arguments

| Argument | Description | Example |
|----------|-------------|---------|
| `[hint]` | Optional hint for message focus | `auth`, `bugfix`, `refactor` |

The hint helps guide the message generation but isn't required.

## Workflow

### Step 1: Analyze Changes

The command first examines your repository state:

```bash
git status
git diff --staged
git log --oneline -5
```

This provides context about:
- What files are staged
- What changes were made
- Recent commit history

### Step 2: Categorize Changes

Automatically determines the commit type:

| Type | Used For |
|------|----------|
| `feat` | New features |
| `fix` | Bug fixes |
| `docs` | Documentation only |
| `style` | Formatting, whitespace |
| `refactor` | Code restructuring without behavior change |
| `test` | Adding or updating tests |
| `chore` | Maintenance (deps, config, etc.) |

### Step 3: Generate Message

Creates a message following this format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Components:**
- **Type**: From categorization above
- **Scope**: Affected area (auth, api, ui, etc.)
- **Subject**: Concise description (max 50 chars)
- **Body**: Detailed explanation with bullet points
- **Footer**: Issue references, breaking changes

### Step 4: Create Commit

Executes the commit with the generated message:

```bash
git commit -m "$(cat <<'EOF'
type(scope): subject

- Change 1
- Change 2

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

## Examples

### Feature Commit

**Staged changes:** New authentication files

```bash
/commit auth
```

**Generated commit:**
```
feat(auth): add password reset functionality

- Add reset token generation
- Implement email sending
- Add rate limiting for reset requests

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Bug Fix Commit

**Staged changes:** Fix in profile endpoint

```bash
/commit
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

### Refactor Commit

**Staged changes:** Database code reorganization

```bash
/commit refactor
```

**Generated commit:**
```
refactor(database): extract query builders

Split large database service into focused modules
for better maintainability and testing.

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Documentation Commit

**Staged changes:** README updates

```bash
/commit docs
```

**Generated commit:**
```
docs(readme): update installation instructions

- Add prerequisites section
- Update configuration examples
- Fix broken links

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Test Commit

**Staged changes:** New test files

```bash
/commit test
```

**Generated commit:**
```
test(auth): add missing login tests

- Add test for invalid credentials
- Add test for locked account
- Add test for expired session

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Chore Commit

**Staged changes:** Package updates

```bash
/commit
```

**Generated commit:**
```
chore(deps): update dependencies

- Update React to 18.2
- Update TypeScript to 5.3
- Remove unused packages

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Commit Message Guidelines

### Subject Line Rules
- **Max 50 characters** - Keep it concise
- **Imperative mood** - "Add" not "Added" or "Adds"
- **No period** at the end
- **Capitalize** the first letter
- **Be specific** - Describe what changed, not why

### Body Guidelines
- **Wrap at 72 characters** for readability
- **Explain what and why**, not how
- **Use bullet points** for multiple changes
- **Reference issues** when applicable

### Good vs Bad Examples

**Good:**
```
feat(auth): add OAuth2 support

- Implement Google and GitHub providers
- Add token refresh mechanism
- Update user model for OAuth data

Closes #123
```

**Bad:**
```
Added oauth stuff

I added oauth because we need it. It works now.
```

## Output

After creating the commit, you'll see:

```markdown
## Commit Created

**Hash**: `abc1234`
**Branch**: `feature/auth-improvements`

### Message
```
feat(auth): add OAuth2 login support

- Implement Google OAuth provider
- Implement GitHub OAuth provider
- Add session token generation
- Update user model for OAuth data

Closes #789
```

### Files Changed
| Status | File |
|--------|------|
| M | src/auth/providers.ts |
| A | src/auth/oauth/google.ts |
| A | src/auth/oauth/github.ts |
| M | src/models/user.ts |
| A | tests/auth/oauth.test.ts |

### Stats
- 5 files changed
- 234 insertions(+)
- 12 deletions(-)

### Next Steps
```bash
# Push to remote
git push -u origin feature/auth-improvements

# Create PR
gh pr create
```
```

## Pre-Commit Checks

Before committing, the command validates:

- [ ] No secrets in staged files
- [ ] No debug statements (`console.log`, `debugger`, `print`)
- [ ] No unintentional TODO comments
- [ ] Code is properly formatted

If issues are found, you'll be prompted to fix them first.

## Amending Commits

If pre-commit hooks modify files automatically (like formatters), the command handles it:

```bash
# Stage modified files and amend
git add -A
git commit --amend --no-edit
```

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--mode=[mode]` | Behavioral mode | `/commit --mode=token-efficient` |
| `--format=[fmt]` | Output format | `/commit --format=concise` |
| `--no-verify` | Skip pre-commit hooks | `/commit --no-verify` |

## Related Commands

- [/ship](/claudekit/commands/ship/) - Full workflow with commit + PR
- [/pr](/claudekit/commands/pr/) - Create PR from commits
- [/changelog](/claudekit/commands/changelog/) - Generate changelog from commits

## Tips

**Use descriptive hints**: While optional, hints like `auth`, `api`, or `ui` help generate more accurate messages.

**Review before committing**: The command shows you the message before creating the commit, so you can verify it's accurate.

**Amend if needed**: If the generated message isn't quite right, you can amend it:
```bash
git commit --amend
```

**Customize format**: Modify commit message format in `CLAUDE.md` under "Git Conventions".

**Breaking changes**: For breaking changes, the footer will include:
```
BREAKING CHANGE: describe the breaking change
```
