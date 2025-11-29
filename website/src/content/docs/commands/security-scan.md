---
title: /security-scan
description: Scan code and dependencies for security vulnerabilities
---

# /security-scan

## Purpose

Scan code and dependencies for security vulnerabilities. Performs comprehensive security analysis including dependency audits, code pattern scanning, and secret detection.

## Usage

```bash
/security-scan [scope]
```

## Arguments

- **scope** (optional): What to scan
  - `deps` - Dependency vulnerabilities only
  - `code` - Code patterns and vulnerabilities
  - `secrets` - Hardcoded secrets and credentials
  - `all` - Comprehensive scan (default)

## Workflow

### Step 1: Dependency Scan

Check for known vulnerabilities in dependencies:

```bash
# Node.js projects
npm audit

# Python projects
pip-audit
```

Identifies:
- Outdated packages with security issues
- Known CVEs in dependencies
- Severity levels (Critical, High, Medium, Low)
- Available fixes and upgrades

### Step 2: Code Scan

Analyze code for security vulnerabilities:

**Patterns checked:**
- SQL injection vulnerabilities
- XSS (Cross-Site Scripting) risks
- Command injection
- Path traversal
- Insecure deserialization
- Unsafe eval() usage
- Weak cryptography

### Step 3: Secret Detection

Scan for exposed secrets:

**Detected items:**
- API keys
- Passwords
- Tokens and credentials
- Private keys
- Database connection strings
- AWS/cloud credentials

## Output

```markdown
## Security Scan Results

### Summary

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Dependencies | 0 | 2 | 5 | 8 | 15 |
| Code Vulnerabilities | 0 | 1 | 3 | 2 | 6 |
| Exposed Secrets | 0 | 0 | 0 | 0 | 0 |
| **Total** | **0** | **3** | **8** | **10** | **21** |

### Critical Issues

None found ✅

### High Severity Issues (3)

#### 1. SQL Injection Risk
**File:** `src/api/users.ts:45`
**Severity:** High
**Issue:** Unsanitized user input in SQL query

```typescript
// Vulnerable code
const query = `SELECT * FROM users WHERE id = ${userId}`;
```

**Recommendation:**
```typescript
// Use parameterized queries
const query = 'SELECT * FROM users WHERE id = ?';
const result = await db.query(query, [userId]);
```

#### 2. Outdated Dependency: express
**Package:** `express@4.17.1`
**Severity:** High
**CVE:** CVE-2022-24999
**Issue:** Denial of Service vulnerability

**Recommendation:**
```bash
npm install express@4.18.2
```

#### 3. Command Injection Risk
**File:** `src/utils/file-processor.ts:78`
**Severity:** High
**Issue:** Unsanitized input to shell command

```typescript
// Vulnerable code
exec(`convert ${filename} output.pdf`);
```

**Recommendation:**
```typescript
// Use safe alternatives
import { execFile } from 'child_process';
execFile('convert', [filename, 'output.pdf']);
```

### Medium Severity Issues (8)

#### XSS Risk in Template
**File:** `src/views/profile.tsx:23`
**Severity:** Medium

```typescript
// Vulnerable
<div dangerouslySetInnerHTML={{__html: userBio}} />

// Safe
<div>{sanitize(userBio)}</div>
```

#### Weak Password Hashing
**File:** `src/auth/password.ts:12`
**Severity:** Medium

```typescript
// Weak
crypto.createHash('md5').update(password).digest('hex');

// Strong
import bcrypt from 'bcrypt';
await bcrypt.hash(password, 10);
```

[... additional findings ...]

### Dependencies Requiring Updates

| Package | Current | Latest | Severity |
|---------|---------|--------|----------|
| express | 4.17.1 | 4.18.2 | High |
| lodash | 4.17.19 | 4.17.21 | Medium |
| axios | 0.21.1 | 1.6.0 | Medium |

### Remediation Steps

#### Immediate Actions (Critical/High)
1. ✅ No critical issues
2. 🔧 Fix SQL injection in `src/api/users.ts`
3. 🔧 Fix command injection in `src/utils/file-processor.ts`
4. 📦 Update express to 4.18.2

#### Short-term Actions (Medium)
1. Implement input sanitization for XSS prevention
2. Upgrade password hashing to bcrypt
3. Update medium-severity dependencies

#### Long-term Improvements
1. Implement automated security scanning in CI/CD
2. Add security headers middleware
3. Set up dependency update automation
4. Conduct security code review training

### Best Practices Violations

- ❌ Secrets in environment variables (not .env)
- ❌ Missing rate limiting on public endpoints
- ❌ No input validation middleware
- ❌ Missing security headers

### Security Score: 72/100

**Category Scores:**
- Dependencies: 65/100
- Code Security: 78/100
- Secret Management: 100/100
- Best Practices: 60/100
```

## Scan Scopes

### Dependencies Only
```bash
/security-scan deps
```
Fast scan of package vulnerabilities

### Code Only
```bash
/security-scan code
```
Deep code analysis for vulnerability patterns

### Secrets Only
```bash
/security-scan secrets
```
Check for exposed credentials

### Comprehensive
```bash
/security-scan all
```
Full security audit (recommended)

## Examples

```bash
# Full security scan
/security-scan

# Only check dependencies
/security-scan deps

# Code vulnerabilities only
/security-scan code

# Find exposed secrets
/security-scan secrets

# Security-focused review
/review --persona=security src/auth/
```

## Flags

| Flag | Description |
|------|-------------|
| `--fix` | Auto-fix issues where possible |
| `--report=[path]` | Save detailed report to file |
| `--exclude=[pattern]` | Exclude files/patterns |
| `--strict` | Fail on any medium+ severity |

## Common Vulnerabilities

### SQL Injection
```typescript
// Bad
const query = `SELECT * FROM users WHERE email = '${email}'`;

// Good
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [email]);
```

### XSS (Cross-Site Scripting)
```typescript
// Bad
<div dangerouslySetInnerHTML={{__html: userContent}} />

// Good
import DOMPurify from 'dompurify';
<div>{DOMPurify.sanitize(userContent)}</div>
```

### Command Injection
```typescript
// Bad
exec(`ping ${userInput}`);

// Good
execFile('ping', [userInput]);
```

### Hardcoded Secrets
```typescript
// Bad
const apiKey = 'sk_live_abc123xyz';

// Good
const apiKey = process.env.API_KEY;
```

## Best Practices

1. **Regular Scans**: Run security scans regularly, not just before releases
2. **CI/CD Integration**: Automate security scanning in your pipeline
3. **Dependency Updates**: Keep dependencies up to date
4. **Code Review**: Include security in code review process
5. **Principle of Least Privilege**: Minimize permissions and access
6. **Input Validation**: Always validate and sanitize user input
7. **Secrets Management**: Use environment variables and secret management tools

## Related Commands

- [/review --persona=security](/claudekit/core-commands/review) - Security-focused code review
- [/fix](/claudekit/core-commands/fix) - Fix identified vulnerabilities
- [/optimize](/claudekit/commands/optimize) - Performance optimization
