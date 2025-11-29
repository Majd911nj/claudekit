---
title: /review
description: Comprehensive code review with focus on quality, security, performance, and maintainability
---

# /review - Code Review Command

## Purpose

Comprehensive code review that analyzes quality, security, performance, and maintainability. Acts as an automated code reviewer that checks for issues across multiple dimensions before code reaches production.

## Usage

```bash
/review [file path | 'staged' | 'pr' | PR number]
```

## Arguments

- `[file path]` - Review specific file(s), supports glob patterns
- `staged` - Review all staged changes (`git diff --staged`)
- `pr` - Review current branch changes vs main
- `[PR number]` - Review specific pull request from GitHub

## How It Works

The `/review` command executes a comprehensive 5-phase review process:

### Phase 1: Identify Review Scope

1. **Determine What to Review**
   - Single file: Reads the specified file
   - `staged`: Gets staged changes with `git diff --staged`
   - `pr`: Gets branch diff with `git diff main...HEAD`
   - PR number: Fetches PR details with `gh pr view`

2. **Gather Context**
   - Understands the purpose of changes
   - Checks related tests
   - Reviews CLAUDE.md for project standards

### Phase 2: Code Quality Review

Checks each file for:

1. **Correctness**
   - Logic errors and bugs
   - Edge case handling
   - Null/undefined safety
   - Type correctness

2. **Clarity**
   - Clear naming (variables, functions, classes)
   - Readable structure
   - Appropriate comments
   - Self-documenting code

3. **Consistency**
   - Follows project conventions
   - Matches existing patterns
   - Style guide compliance

4. **Complexity**
   - Function length (prefer <30 lines)
   - Cyclomatic complexity
   - Nesting depth

### Phase 3: Security Review

Checks for security issues:

1. **Input Validation**
   - User input sanitization
   - Type validation
   - Size/length limits

2. **Authentication/Authorization**
   - Proper auth checks
   - Role-based access control
   - Session management

3. **Data Protection**
   - Sensitive data handling
   - Encryption where needed
   - PII protection

4. **Injection Prevention**
   - SQL injection
   - XSS vulnerabilities
   - Command injection

5. **Secrets**
   - No hardcoded credentials
   - No API keys in code
   - Proper env var usage

### Phase 4: Performance Review

Checks for performance issues:

1. **Algorithmic Efficiency**
   - Time complexity
   - Unnecessary loops
   - Redundant operations

2. **Memory Usage**
   - Large object creation
   - Memory leaks
   - Unbounded caches

3. **Database**
   - N+1 queries
   - Missing indexes
   - Large result sets

4. **Async Operations**
   - Proper async/await
   - Parallel where possible
   - Timeout handling

### Phase 5: Maintainability Review

Checks for maintainability:

1. **SOLID Principles**
   - Single responsibility
   - Open/closed
   - Dependency injection

2. **DRY**
   - Code duplication
   - Opportunity for reuse

3. **Testing**
   - Test coverage
   - Test quality
   - Edge case tests

4. **Documentation**
   - API documentation
   - Complex logic explanation
   - Usage examples

## Review Output Format

```markdown
## Code Review: src/api/users.ts

**Reviewed**: 1 file, 142 lines
**Verdict**: Request Changes

---

### Critical Issues (Must Fix)

#### 1. [Security] SQL Injection Risk
**File**: `src/api/users.ts:42`
**Severity**: Critical

```typescript
// Current code
const query = `SELECT * FROM users WHERE id = ${userId}`;
```

**Issue**: User input directly interpolated into SQL query.

**Fix**:
```typescript
const query = 'SELECT * FROM users WHERE id = $1';
const result = await db.query(query, [userId]);
```

---

### Recommendations (Should Fix)

#### 1. Missing Error Handling
**File**: `src/services/auth.ts:78`

```typescript
// Current
const user = await db.findUser(email);
return user.password; // May throw if user is null
```

**Suggestion**:
```typescript
const user = await db.findUser(email);
if (!user) {
  throw new NotFoundError('User not found');
}
return user.password;
```

---

### Suggestions (Nice to Have)

1. Consider extracting the validation logic in `src/utils/validate.ts:23` into a separate function for reusability.

2. The constant `MAX_RETRIES` in `src/api/client.ts` could be moved to configuration.

---

### What's Good

- Clean separation of concerns between controller and service layers
- Comprehensive error handling in the authentication flow
- Good test coverage for edge cases in `auth.test.ts`

---

### Summary

Found **1 critical issue** (security), **2 recommendations**, and **2 suggestions**.

**Priority Actions**:
1. Fix SQL injection vulnerability immediately
2. Add null check for user lookup

**Ready for merge**: No - Critical issues must be addressed first
```

## Review Checklist

### Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] Output encoding for rendered content
- [ ] SQL parameterization
- [ ] Proper auth checks
- [ ] No eval() or dynamic code execution

### Quality
- [ ] Clear naming conventions
- [ ] Functions are focused (single responsibility)
- [ ] Error handling is complete
- [ ] No commented-out code
- [ ] No debug statements left

### Testing
- [ ] New code has tests
- [ ] Edge cases covered
- [ ] Tests are deterministic

### Documentation
- [ ] Public APIs documented
- [ ] Complex logic explained
- [ ] Breaking changes noted

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--mode=[mode]` | Use specific behavioral mode | `--mode=review` |
| `--persona=[type]` | Apply persona expertise | `--persona=security` |
| `--depth=[1-5]` | Review thoroughness level (1=quick, 5=exhaustive) | `--depth=5` |
| `--format=[fmt]` | Output format (concise/detailed/json) | `--format=detailed` |
| `--focus=[area]` | Focus on specific area | `--focus=performance` |
| `--save` | Save review to file | `--save` |

### Persona Options

| Persona | Focus Area |
|---------|------------|
| `security` | Vulnerabilities, auth, data protection |
| `performance` | Efficiency, queries, caching |
| `architecture` | Patterns, coupling, SOLID |
| `testing` | Coverage, test quality |
| `accessibility` | A11y compliance |

### Focus Areas

| Focus | Checks |
|-------|--------|
| `security` | OWASP top 10, auth, input validation |
| `performance` | N+1 queries, complexity, memory |
| `quality` | Readability, maintainability |
| `testing` | Coverage, test patterns |

### Flag Examples

```bash
# Security-focused review of auth code
/review --persona=security src/auth/

# Thorough review of staged changes
/review --depth=5 --format=detailed staged

# Performance-focused review
/review --focus=performance src/services/heavy-computation.ts

# Deep review with saved report
/review --mode=deep-research --save pr
```

## Examples

### Review Staged Changes

**Input:**
```bash
/review staged
```

**Output:**
Complete review of all staged changes with:
- Security vulnerability scan
- Code quality assessment
- Performance analysis
- Actionable feedback organized by severity

### Review Pull Request

**Input:**
```bash
/review pr #142
```

**Output:**
- Fetches PR from GitHub
- Reviews all changed files
- Categorizes issues by severity
- Provides approval recommendation

### Security-Focused Review

**Input:**
```bash
/review --persona=security --depth=5 src/api/
```

**Output:**
- Deep security analysis
- OWASP top 10 checks
- Auth/authorization review
- Input validation verification

## Deliverables

After running `/review`, you receive:

1. **Issue List** - Organized by severity (Critical, Recommendations, Suggestions)
2. **Code Examples** - Before/after code snippets for fixes
3. **Checklist Results** - Security, quality, testing, documentation
4. **Verdict** - Approve, Request Changes, or Needs Discussion
5. **Action Items** - Prioritized list of required fixes

## Related Commands

- [/fix](/claudekit/commands/fix) - Fix identified issues
- [/refactor](/claudekit/commands/refactor) - Address code quality suggestions
- [/test](/claudekit/commands/test) - Add missing tests
- [/feature](/claudekit/commands/feature) - Complete feature workflow with review
