---
title: Review Mode
description: Critical analysis mode for code review and quality assessment
---

# Review Mode

## Overview

Review mode optimizes for critical analysis, finding issues, and providing actionable feedback. It emphasizes thorough examination, categorized findings, and constructive suggestions for improvement.

This mode produces structured reviews with severity levels, specific line references, and clear recommendations.

## When to Use

Review mode is ideal for:

- **Code reviews** - Pull request reviews, pre-merge checks
- **Security audits** - Finding vulnerabilities and security issues
- **Performance reviews** - Identifying optimization opportunities
- **Pre-merge checks** - Final quality gate before merging
- **Quality assessments** - Evaluating code quality and maintainability
- **Architecture reviews** - Assessing structural decisions

## Behavior Changes

### Communication Style

**Direct and constructive:**
- Direct feedback without sugar-coating
- Prioritized findings (critical first)
- Constructive criticism with solutions
- Specific, actionable suggestions
- Line-specific comments

**Example:**
```markdown
## Code Review: user-service.ts

### Critical Issues 🔴

**Issue 1: SQL Injection Vulnerability (Line 45)**
- **Problem:** User input concatenated directly into SQL query
- **Risk:** Attackers can execute arbitrary SQL commands
- **Fix:**
  ```typescript
  // Before (UNSAFE)
  const query = `SELECT * FROM users WHERE email = '${email}'`;

  // After (SAFE)
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await db.query(query, [email]);
  ```

### Verdict
❌ Block merge - 1 critical issue must be fixed
```

### Problem-Solving Approach

- **Look for issues first** - Critical eye, not just validation
- **Question assumptions** - Challenge design decisions
- **Check edge cases** - What could go wrong?
- **Verify against standards** - Compliance with best practices

### Output Format

- Categorized findings by severity
- Severity levels (Critical, Important, Minor, Nitpick)
- Line-specific comments
- Code examples for fixes
- Merge decision at end

## Severity Levels

| Level | Icon | Description | Action Required |
|-------|------|-------------|-----------------|
| **Critical** | 🔴 | Bugs, security issues, data loss risks | Must fix before merge |
| **Important** | 🟠 | Code smells, performance issues, bad practices | Should fix before merge |
| **Minor** | 🟡 | Style issues, naming, minor improvements | Consider fixing |
| **Nitpick** | ⚪ | Personal preferences, minor style | Optional |

## Review Categories

Review mode examines code across multiple dimensions:

| Category | Focus Areas |
|----------|-------------|
| **Correctness** | Does it work? Handle edge cases? Proper error handling? |
| **Security** | Vulnerabilities? Input validation? Auth/authz? Data exposure? |
| **Performance** | Efficiency? Scalability? N+1 queries? Resource usage? |
| **Maintainability** | Readability? Complexity? Documentation? Testability? |
| **Testing** | Test coverage? Test quality? Edge cases tested? |
| **Standards** | Style guide compliance? Best practices? Conventions? |

## Examples

### Code Review

**Request:**
```bash
/review --mode=review src/services/payment-service.ts
```

**Review Mode Response:**
```markdown
## Code Review: payment-service.ts

### Summary
Payment service with Stripe integration. Found 2 critical, 3 important,
and 4 minor issues. Not ready for production.

---

### Critical Issues 🔴

**1. API Key in Logs (Line 45)**
```typescript
// Line 45 - UNSAFE
logger.error(`Payment failed for key ${stripeKey}`, error);
```

**Problem:** Stripe API key exposed in application logs

**Risk:**
- Anyone with log access gets full payment system access
- Key could leak via log aggregation services
- Violates PCI compliance

**Fix:**
```typescript
logger.error('Payment failed', {
  error: error.message,
  customerId: payment.customerId,
  // Never log the API key
});
```

---

**2. No Timeout on API Calls (Line 78)**
```typescript
// Line 78 - PROBLEMATIC
const result = await stripe.charges.create(chargeData);
```

**Problem:** External API call with no timeout

**Risk:**
- Can hang indefinitely if Stripe is down
- Blocks server resources
- Poor user experience

**Fix:**
```typescript
const result = await Promise.race([
  stripe.charges.create(chargeData),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), 30000)
  )
]);
```

Or use axios with timeout config.

---

### Important Issues 🟠

**3. No Retry Logic (Line 78)**

**Problem:** Single attempt at payment, no retries on transient failures

**Impact:**
- Network blips cause failed payments
- Stripe rate limits not handled
- Lost revenue

**Suggestion:**
```typescript
import retry from 'async-retry';

const result = await retry(
  async () => stripe.charges.create(chargeData),
  {
    retries: 3,
    minTimeout: 1000,
    onRetry: (err, attempt) => {
      logger.warn(`Payment retry ${attempt}`, { error: err.message });
    }
  }
);
```

---

**4. Magic Numbers (Line 12, 34, 67)**
```typescript
if (amount < 50) throw new Error('Minimum $0.50');  // Line 12
await delay(1000);  // Line 34
const fee = amount * 0.029 + 30;  // Line 67
```

**Problem:** Hardcoded values with no explanation

**Fix:** Extract to named constants
```typescript
const MIN_CHARGE_CENTS = 50;
const RETRY_DELAY_MS = 1000;
const STRIPE_FEE_PERCENT = 0.029;
const STRIPE_FEE_FIXED_CENTS = 30;

if (amount < MIN_CHARGE_CENTS) {
  throw new Error(`Minimum charge: $${MIN_CHARGE_CENTS / 100}`);
}
```

---

**5. Insufficient Error Handling (Line 89)**
```typescript
} catch (error) {
  throw new Error('Payment failed');
}
```

**Problem:** Generic error loses valuable context

**Impact:**
- Can't distinguish card decline vs network error vs server error
- Makes debugging difficult
- Poor user experience (unhelpful error message)

**Fix:**
```typescript
} catch (error) {
  if (error.type === 'StripeCardError') {
    throw new PaymentError('Card declined', {
      code: error.code,
      message: error.message
    });
  } else if (error.type === 'StripeRateLimitError') {
    throw new PaymentError('Too many requests', { retry: true });
  } else {
    logger.error('Payment processing error', error);
    throw new PaymentError('Payment system unavailable');
  }
}
```

---

### Minor Issues 🟡

**6. Missing JSDoc (All public methods)**
- Public API should be documented
- Add JSDoc with param descriptions, return types, examples

**7. Inconsistent Naming (Line 23 vs 56)**
```typescript
const chargeData = {...};  // Line 23
const paymentData = {...};  // Line 56 (same thing)
```
Pick one convention and stick to it.

**8. Console.log Still Present (Line 101)**
```typescript
console.log('Debug payment:', payment);
```
Remove debug logging or use proper logger.

**9. No Input Validation (Line 15)**
```typescript
async createCharge(amount: number, customerId: string) {
  // No validation that amount is positive, customerId is valid format
}
```

Add validation:
```typescript
if (amount <= 0) throw new Error('Amount must be positive');
if (!customerId.startsWith('cus_')) throw new Error('Invalid customer ID');
```

---

### Positive Notes ✅

**Good practices observed:**
- ✅ Using async/await consistently
- ✅ TypeScript types defined
- ✅ Error handling structure present (just needs improvement)
- ✅ Modular function design
- ✅ Test file exists

---

### Test Coverage Review

Checked `payment-service.test.ts`:

**Coverage:**
- ✅ Successful payment flow tested
- ✅ Card decline tested
- ❌ Network errors not tested
- ❌ Timeout scenarios not tested
- ❌ Retry logic not tested (doesn't exist yet)

**Recommendation:** Add tests for error scenarios once retry/timeout logic added.

---

### Security Checklist

- [x] Input validation - Mostly missing
- [x] API key handling - ⚠️ Logged in errors (critical issue #1)
- [x] Error messages - ⚠️ Too generic (important issue #5)
- [x] Rate limiting - ❌ Not implemented
- [x] PCI compliance - ⚠️ Key logging violates this

---

### Performance Checklist

- [x] Async/await used - ✅ Yes
- [x] N+1 queries - ✅ N/A (external API)
- [x] Caching - ❌ Could cache customer data
- [x] Timeout handling - ❌ Missing (critical issue #2)

---

### Verdict

**❌ Block Merge**

**Issues requiring fixes:**
- 🔴 2 Critical issues (API key logging, no timeout)
- 🟠 3 Important issues (no retry, magic numbers, poor error handling)

**Estimated fix time:** 3-4 hours

**Recommended next steps:**
1. Fix critical issues immediately (1 hour)
2. Add timeout and retry logic (2 hours)
3. Extract constants and improve errors (1 hour)
4. Add missing tests (2 hours)
5. Re-review after fixes

---

### Comparison to Standards

Checked against:
- ✅ TypeScript style guide - Mostly compliant
- ⚠️ Error handling patterns - Needs improvement
- ❌ Security best practices - Violates (key logging)
- ⚠️ PCI DSS requirements - Non-compliant (key logging)
```

### Security-Focused Review

**Request:**
```bash
/review --mode=review --persona=security src/api/auth.ts
```

**Review Mode Response:**
```markdown
## Security Review: auth.ts

Persona: Security Auditor
Standards: OWASP Top 10 (2021), CWE Top 25

---

### Critical Security Issues 🔴

**1. Hardcoded JWT Secret (Line 8)**
```typescript
const JWT_SECRET = 'my-secret-key-123';
```

**Vulnerability:** CWE-798 (Hardcoded Credentials)
**OWASP:** A07:2021 – Identification and Authentication Failures

**Risk:**
- Secret in source control = everyone has it
- Can forge any JWT token
- Complete authentication bypass

**Exploitation:**
```bash
# Attacker can create admin token
jwt.sign({ userId: 1, role: 'admin' }, 'my-secret-key-123')
```

**Fix:**
```typescript
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable required');
}
```

---

**2. No Rate Limiting on Login (Line 45)**

**Vulnerability:** CWE-307 (Improper Authentication Attempts)
**OWASP:** A07:2021 – Identification and Authentication Failures

**Risk:**
- Brute force attacks viable
- Credential stuffing attacks
- No account lockout

**Exploitation:**
```bash
# Attacker can try unlimited passwords
for pwd in $(cat passwords.txt); do
  curl -X POST /login -d "{\"password\":\"$pwd\"}"
done
```

**Fix:**
```typescript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts'
});

router.post('/login', loginLimiter, loginHandler);
```

---

**3. Password in Error Message (Line 67)**
```typescript
logger.error(`Login failed for ${email} with password ${password}`);
```

**Vulnerability:** CWE-209 (Information Exposure Through Error Message)
**OWASP:** A04:2021 – Insecure Design

**Risk:** Passwords logged and visible to anyone with log access

**Fix:**
```typescript
logger.error(`Login failed for ${email}`);
// Never log passwords
```

---

### Important Security Issues 🟠

**4. Weak Password Requirements (Line 23)**
```typescript
if (password.length < 6) {
  return res.status(400).json({ error: 'Password too short' });
}
```

**Vulnerability:** CWE-521 (Weak Password Requirements)

**Risk:**
- 6 characters easily cracked
- No complexity requirements
- Common passwords allowed

**Fix:**
```typescript
import { passwordStrength } from 'check-password-strength';

const strength = passwordStrength(password);
if (strength.value === 'Weak' || strength.value === 'Too weak') {
  return res.status(400).json({
    error: 'Password must be at least 12 characters with uppercase, lowercase, number, and symbol'
  });
}
```

---

**5. JWT Never Expires (Line 34)**
```typescript
const token = jwt.sign({ userId: user.id }, JWT_SECRET);
```

**Vulnerability:** CWE-613 (Insufficient Session Expiration)

**Risk:**
- Stolen token valid forever
- Can't revoke access
- Compromised token = permanent access

**Fix:**
```typescript
const token = jwt.sign(
  { userId: user.id },
  JWT_SECRET,
  { expiresIn: '1h' }
);
```

---

### Minor Security Issues 🟡

**6. No HTTPS Enforcement**
- Check if reverse proxy handles HTTPS
- Add HTTP → HTTPS redirect if not

**7. No CORS Configuration**
- Wide-open CORS is security risk
- Restrict to known origins

**8. Timing Attack on Password Compare**
- Use constant-time comparison
- bcrypt.compare() is already safe (good!)

---

### Security Checklist (OWASP Top 10)

- [x] A01:2021 – Broken Access Control
  - ✅ Auth middleware checks tokens
  - ⚠️ Token never expires (issue #5)

- [x] A02:2021 – Cryptographic Failures
  - ✅ Passwords hashed with bcrypt
  - 🔴 Hardcoded secret (issue #1)

- [x] A03:2021 – Injection
  - ✅ Using parameterized queries
  - ✅ No SQL injection found

- [x] A04:2021 – Insecure Design
  - 🔴 Password in logs (issue #3)
  - 🟠 Weak password policy (issue #4)

- [x] A05:2021 – Security Misconfiguration
  - ⚠️ No HTTPS enforcement (issue #6)
  - ⚠️ No CORS policy (issue #7)

- [x] A07:2021 – Identification and Authentication Failures
  - 🔴 No rate limiting (issue #2)
  - 🟠 Tokens never expire (issue #5)

---

### Verdict

**❌ NOT PRODUCTION-READY**

**Critical vulnerabilities:** 3
**Estimated risk level:** HIGH

**Must fix before any deployment:**
1. Remove hardcoded secret
2. Add rate limiting
3. Remove password from logs

**Recommended timeline:**
- Critical fixes: Today (2-3 hours)
- Important fixes: This week (4-5 hours)
- Full security audit: Next sprint

---

### Recommended Security Additions

Beyond fixing issues:

1. **Add 2FA support**
   - Time-based OTP (TOTP)
   - Backup codes

2. **Implement password reset**
   - Secure token generation
   - Time-limited reset links
   - Email verification

3. **Add security headers**
   ```typescript
   import helmet from 'helmet';
   app.use(helmet());
   ```

4. **Set up security monitoring**
   - Log failed login attempts
   - Alert on suspicious patterns
   - Track token usage

5. **Regular security audits**
   - Automated: npm audit, Snyk
   - Manual: Code review
   - Professional: Penetration testing
```

### Performance-Focused Review

**Request:**
```bash
/review --persona=performance src/api/posts.ts
```

**Review Mode Response:**
```markdown
## Performance Review: posts.ts

Persona: Performance Engineer
Focus: Response time, resource usage, scalability

---

### Critical Performance Issues 🔴

**1. N+1 Query Problem (Line 45-55)**

**Current code:**
```typescript
const posts = await db.posts.findAll();
for (const post of posts) {
  post.author = await db.users.findById(post.authorId);
  post.comments = await db.comments.findByPostId(post.id);
}
```

**Problem:**
- 100 posts = 1 + 100 + 100 = 201 database queries
- Each query: ~10ms
- Total: ~2,000ms just for queries

**Impact:** Page load takes 2+ seconds

**Fix:**
```typescript
const posts = await db.posts.findAll({
  include: [
    { model: db.users, as: 'author' },
    { model: db.comments, as: 'comments' }
  ]
});
// Now: 1 query with JOINs, ~50ms
```

**Expected improvement:** 95% faster (2,000ms → 100ms)

---

### Important Performance Issues 🟠

**2. No Pagination (Line 23)**
```typescript
router.get('/posts', async (req, res) => {
  const posts = await db.posts.findAll();
  res.json(posts);
});
```

**Problem:**
- Returns ALL posts (currently 1,000)
- 2.3KB per post = 2.3MB response
- Mobile users download entire dataset

**Fix:**
```typescript
const limit = Math.min(parseInt(req.query.limit) || 10, 100);
const offset = parseInt(req.query.offset) || 0;

const posts = await db.posts.findAll({ limit, offset });
const total = await db.posts.count();

res.json({ posts, total, limit, offset });
```

**Expected improvement:** 99% smaller response (2.3MB → 23KB)

---

**3. No Caching (Line 23)**

**Problem:**
- Every request hits database
- Posts don't change frequently
- Redundant computation

**Analysis:**
- Checked git history: Posts updated 2-3 times/hour
- Could cache for 5-10 minutes
- 95% of requests could be cache hits

**Fix:**
```typescript
const cacheKey = `posts:${limit}:${offset}`;
let posts = await redis.get(cacheKey);

if (!posts) {
  posts = await db.posts.findAll({...});
  await redis.setex(cacheKey, 300, JSON.stringify(posts));
}
```

**Expected improvement:** 90% faster for cache hits

---

### Minor Performance Issues 🟡

**4. Inefficient Filtering (Line 78)**
```typescript
const filtered = posts.filter(p => p.published);
```

**Problem:** Filtering in application, not database

**Fix:**
```typescript
const posts = await db.posts.findAll({
  where: { published: true }
});
```

---

**5. No Compression (Response Headers)**

**Problem:** Large JSON responses not compressed

**Fix:**
```typescript
import compression from 'compression';
app.use(compression());
```

**Expected improvement:** 60-80% smaller responses

---

**6. Synchronous Processing (Line 89)**
```typescript
for (const post of posts) {
  await analytics.track(post.id);  // Blocks response
}
```

**Problem:** Analytics tracking blocks response

**Fix:**
```typescript
// Fire and forget
Promise.all(posts.map(p => analytics.track(p.id))).catch(err =>
  logger.error('Analytics error', err)
);
// or better: queue for background processing
```

---

### Performance Metrics

**Current Performance:**
- Response time: 2,347ms (p95)
- Payload size: 2.3MB uncompressed
- Database queries: 201 per request
- Cache hit rate: 0% (no cache)

**After Fixes:**
- Response time: ~120ms (p95)
- Payload size: ~23KB compressed
- Database queries: 1 per request
- Cache hit rate: ~90% (estimated)

**Total improvement: 95% faster, 99% less bandwidth**

---

### Scalability Analysis

**Current capacity:**
- Server: 8 concurrent requests max
- Database: 100 connections, saturates quickly
- Bottleneck: N+1 queries

**After fixes:**
- Server: 100+ concurrent requests
- Database: Minimal load with caching
- Bottleneck: Cache size (manageable)

---

### Load Test Recommendations

```bash
# Before fixes
ab -n 1000 -c 10 http://localhost:3000/api/posts
# Expect: Many failures, high latency

# After fixes
ab -n 1000 -c 50 http://localhost:3000/api/posts
# Should handle gracefully
```

---

### Verdict

**🟠 Needs Performance Work**

Not currently scalable beyond 10-20 concurrent users.

**Priority fixes:**
1. Fix N+1 queries (critical for any load)
2. Add pagination (critical for mobile)
3. Implement caching (high impact)

**Estimated fix time:** 1 day

---

### Performance Checklist

- [ ] Database queries optimized
- [ ] Pagination implemented
- [ ] Caching layer added
- [ ] Response compression enabled
- [ ] No blocking operations in request path
- [ ] Load tested

**Recommendation:** Fix N+1 and pagination before launch.
```

## Review Personas

Use `--persona` flag to focus the review:

| Persona | Focus | Best For |
|---------|-------|----------|
| `security` | OWASP Top 10, vulnerabilities, auth | Security-critical code |
| `performance` | Efficiency, queries, caching | High-traffic endpoints |
| `architecture` | Patterns, coupling, design | Structural decisions |
| `testing` | Coverage, quality, edge cases | Test review |

**Example:**
```bash
/review --persona=security src/auth/
/review --persona=performance src/api/
```

## Mode Activation

```bash
# Session-wide review mode
/mode review

# All reviews now use critical analysis
/review src/services/
/review src/api/

# Single command with review mode
/review --mode=review src/payment/

# With specific persona
/review --mode=review --persona=security src/auth/
```

## Tips for Effective Reviews

### Prepare the Code

Before reviewing:
1. Ensure tests pass
2. Run linter
3. Check for obvious issues
4. Have context ready

### Focus Reviews

```bash
# Too broad - hard to review thoroughly
/review src/

# Better - focused review
/review src/services/payment-service.ts
/review src/api/auth.ts --persona=security
```

### Progressive Review

```bash
# Quick first pass
/review --depth=2 src/new-feature/

# Deep dive on concerning areas
/review --depth=5 --persona=security src/new-feature/auth.ts
```

### Combine with Other Modes

```bash
# Review, then fix
/mode review
/review src/feature/
# Identify issues

/mode implementation
/fix "issue 1"
/fix "issue 2"

/mode review
/review src/feature/
# Verify fixes
```

## Checklist Template

Standard checklist used in reviews:

```markdown
### Pre-Review
- [ ] Tests pass
- [ ] Lint clean
- [ ] No console.logs
- [ ] Dependencies updated

### Code Quality
- [ ] Readable and maintainable
- [ ] No code smells
- [ ] Proper error handling
- [ ] Edge cases considered

### Security
- [ ] Input validation
- [ ] No hardcoded secrets
- [ ] Auth/authz correct
- [ ] No security warnings

### Performance
- [ ] No N+1 queries
- [ ] Efficient algorithms
- [ ] Proper indexing
- [ ] No memory leaks

### Testing
- [ ] Tests cover new code
- [ ] Edge cases tested
- [ ] Error scenarios tested
- [ ] Coverage maintained
```

## Comparison with Other Modes

| Aspect | Review | Deep Research | Default |
|--------|--------|---------------|---------|
| Critical analysis | High | Medium | Low |
| Finding issues | Primary goal | Secondary | Incidental |
| Evidence required | Yes | Always | Sometimes |
| Actionable feedback | Always | Sometimes | Sometimes |
| Best for | Code review | Investigation | General use |

## Configuration

Review mode is customizable in `.claude/modes/review.md`:

- Severity thresholds
- Checklist items
- Required categories
- Verdict criteria

## Related Modes

- **Deep Research Mode**: For evidence-based investigation
- **Default Mode**: For less critical review
- **Security Auditor Agent**: Specialized security reviews

## Related Documentation

- [Code Review Guide](/claudekit/guides/code-review)
- [Security Best Practices](/claudekit/guides/security)
- [Review Command](/claudekit/commands/review)
