---
title: Deep Research Mode
description: Thorough investigation mode with evidence and citations
---

# Deep Research Mode

## Overview

Deep research mode prioritizes comprehensive investigation over speed. It emphasizes evidence gathering, cross-referencing, citations, and acknowledging uncertainty. Use when accuracy and depth matter more than efficiency.

This mode produces structured reports with confidence levels, sources, and explicit acknowledgment of limitations.

## When to Use

Deep research mode is ideal for:

- **Technology evaluation** - Comparing frameworks, libraries, approaches
- **Architecture research** - Investigating patterns and best practices
- **Security audits** - Finding vulnerabilities and assessing risk
- **Performance analysis** - Identifying bottlenecks and optimization opportunities
- **Complex debugging** - Root cause analysis of difficult bugs
- **Due diligence** - Thorough assessment before major decisions

## Behavior Changes

### Communication Style

**Evidence-based:**
- Cite sources and evidence for claims
- Acknowledge uncertainty explicitly
- Present confidence levels for conclusions
- Include caveats and limitations
- Cross-reference multiple sources

**Example:**
```markdown
## Research: Authentication Approaches

### Finding 1: JWT vs Session Tokens (Confidence: 9/10)

**Evidence:**
- Code analysis: src/auth/jwt.ts (line 45-78)
- Documentation: docs/auth-spec.md
- Industry practice: OWASP guidelines

**Analysis:**
Current implementation uses JWTs stored in localStorage. This is
vulnerable to XSS attacks (OWASP A7:2017).

Sessions with httpOnly cookies provide better XSS protection but
require server state management.

**Recommendation:** Switch to httpOnly cookies unless you have
specific stateless requirements.

### Gaps & Limitations
- Couldn't determine actual XSS risk without security audit
- No data on session volume to assess state management cost
- Need to validate CORS configuration for cookie approach
```

### Problem-Solving Approach

- **Exhaustive exploration** - Check all relevant sources
- **Multiple verification passes** - Cross-check findings
- **Document assumptions** - Make reasoning transparent
- **Assess confidence** - How sure are we?

### Output Format

- Structured research reports
- Evidence sections with sources
- Confidence indicators (1-10 or High/Medium/Low)
- Explicit gaps and limitations
- Methodology explanation

## Research Process

### Phase 1: Scope Definition

Before diving in, clarify:
- What specific questions need answering?
- What would constitute a successful answer?
- What constraints or context matter?

### Phase 2: Information Gathering

Systematically collect:
- **Codebase search** - Grep for relevant patterns, functions, configs
- **Documentation** - READMEs, comments, specifications
- **Dependencies** - package.json, requirements.txt, imports
- **Issue tracking** - Known bugs, feature requests
- **Web research** - Official docs, best practices, security advisories

### Phase 3: Analysis

Process the findings:
- Cross-reference findings across sources
- Identify patterns and contradictions
- Note reliability of each source
- Assess confidence levels
- Document uncertainties

### Phase 4: Synthesis

Draw conclusions:
- Present findings with evidence
- State confidence levels clearly
- Acknowledge what's unknown
- Provide actionable recommendations

## Examples

### Technology Evaluation

**Request:**
```bash
/research --mode=deep-research "should we use GraphQL vs REST?"
```

**Deep Research Response:**
```markdown
## Research: GraphQL vs REST for Our API

### Methodology
- Analyzed current REST API: 12 endpoints, 4 resources
- Reviewed client usage patterns in frontend code
- Checked team experience with both technologies
- Researched complexity and maintenance requirements

---

### Finding 1: Client Usage Patterns (Confidence: 8/10)

**Evidence:**
- `src/frontend/api/users.ts`: 8 REST calls, 5 fetch full objects
  unnecessarily (lines 23, 45, 67, 89, 123)
- Network tab analysis: 40% of data fetched is unused
- Average payload: 2.3KB, estimated needed: 1.1KB

**Analysis:**
Over-fetching is significant. GraphQL would allow clients to request
only needed fields, reducing bandwidth by ~50%.

**Confidence note:** Based on static analysis. Real usage may vary.

---

### Finding 2: Team Expertise (Confidence: 10/10)

**Evidence:**
- Team survey: 3/3 developers experienced with REST
- Team survey: 0/3 developers experienced with GraphQL
- package.json: No GraphQL dependencies

**Analysis:**
Adopting GraphQL requires learning curve. Estimate:
- Initial learning: 2-3 weeks per developer
- Production-ready: 1-2 months
- Expertise: 6+ months

---

### Finding 3: Maintenance Complexity (Confidence: 7/10)

**Evidence:**
- REST: 12 endpoints, ~300 lines route code
- GraphQL (estimated): 1 endpoint, ~400 lines schema + resolvers
- Industry reports: GraphQL schemas grow faster than REST APIs

**Analysis:**
GraphQL adds upfront complexity but may reduce long-term endpoint
proliferation.

**Caveat:** Projection based on typical patterns, not our specific
growth trajectory.

---

### Finding 4: Tooling & Ecosystem (Confidence: 9/10)

**Evidence:**
- REST: Swagger UI, well-supported testing tools
- GraphQL: GraphiQL, Apollo DevTools, strong TypeScript support
- Current stack: Already using TypeScript

**Analysis:**
Both have mature tooling. GraphQL TypeScript integration could improve
type safety across frontend/backend boundary.

---

### Comparison Matrix

| Criterion | REST | GraphQL | Winner |
|-----------|------|---------|--------|
| Team familiarity | ✅ High | ❌ None | REST |
| Over-fetching | ❌ Significant | ✅ Eliminated | GraphQL |
| Type safety | ⚠️ Manual | ✅ Automatic | GraphQL |
| Learning curve | ✅ Minimal | ❌ 2-3 months | REST |
| Long-term maintenance | ⚠️ Endpoint sprawl | ✅ Schema evolution | GraphQL |
| Caching | ✅ HTTP caching | ⚠️ Complex | REST |

---

### Conclusions

**Recommendation: Stick with REST for now** (Confidence: 7/10)

**Reasoning:**
1. **Short-term constraints**: No GraphQL expertise, 2-3 month learning
   curve is significant for 3-person team
2. **Over-fetching is solvable**: Can add field filtering to REST
   (e.g., `?fields=id,name`) for ~80% of benefit
3. **Type safety gains**: Can achieve with TypeScript + OpenAPI codegen

**When to reconsider GraphQL:**
- Team grows beyond 5 developers
- API complexity exceeds 30+ endpoints
- Mobile app launches (bandwidth critical)
- Frontend team becomes GraphQL-experienced

---

### Gaps & Limitations

**What we don't know:**
- Actual bandwidth costs (no production metrics)
- Client device diversity (mobile vs desktop ratio)
- Future feature requirements (may favor GraphQL)
- Whether competitors use GraphQL (market expectation)

**What would change the recommendation:**
- If 50%+ traffic is mobile (bandwidth matters more)
- If hiring GraphQL experts (removes learning curve issue)
- If building public API (GraphQL great for external developers)

---

### Sources

**Codebase:**
- `src/frontend/api/users.ts` (client usage patterns)
- `src/api/routes/` (current REST implementation)
- `package.json` (current dependencies)

**Team:**
- Developer survey (2024-01-15)

**External:**
- OWASP API Security Project
- GraphQL Best Practices (graphql.org)
- "REST vs GraphQL" (2023, Thoughtworks)
```

### Security Audit

**Request:**
```bash
/research --depth=5 --persona=security src/auth/
```

**Deep Research Response:**
```markdown
## Security Audit: Authentication Module

### Methodology
- Code review: All files in src/auth/
- Dependency analysis: Known vulnerabilities
- Pattern matching: Common security anti-patterns
- Standards check: OWASP Top 10 compliance

---

### Critical Findings 🔴

#### Finding 1: Hardcoded Secret (Confidence: 10/10)

**Location:** `src/auth/jwt.ts:12`

**Evidence:**
```typescript
const JWT_SECRET = "mysecretkey123";  // Line 12
```

**Risk:** CRITICAL
- Secret is in version control
- Anyone with repo access can forge tokens
- All tokens compromised if code leaks

**Exploitation:**
```typescript
// Attacker can create valid tokens
const forgedToken = jwt.sign({ userId: 'admin' }, 'mysecretkey123');
```

**Fix:**
```typescript
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET required');
```

**References:**
- OWASP A2:2021 - Cryptographic Failures
- CWE-798: Use of Hard-coded Credentials

---

#### Finding 2: No Rate Limiting (Confidence: 9/10)

**Location:** `src/api/auth.ts:45-67` (login endpoint)

**Evidence:**
- No rate limiting middleware
- No failed attempt tracking
- Can attempt login indefinitely

**Risk:** HIGH
- Brute force attacks viable
- No account lockout
- No monitoring of suspicious activity

**Test:**
```bash
# Can send unlimited login attempts
for i in {1..10000}; do
  curl -X POST /auth/login -d '{"user":"admin","pass":"test'$i'"}'
done
```

**Fix:**
```typescript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts'
});

router.post('/login', loginLimiter, loginHandler);
```

**References:**
- OWASP: Authentication Cheat Sheet
- CWE-307: Improper Restriction of Excessive Authentication Attempts

---

### Important Findings 🟠

#### Finding 3: Weak Password Requirements (Confidence: 8/10)

**Location:** `src/auth/validation.ts:23`

**Evidence:**
```typescript
const passwordValid = password.length >= 6;  // Too weak
```

**Risk:** MEDIUM
- 6 characters easily brute-forced
- No complexity requirements
- Common passwords allowed

**Current weakness:**
- 6 chars, lowercase only = 26^6 = 308M combinations
- Cracked in ~1 hour with modern GPU

**Recommendation:**
- Minimum 12 characters
- Require: uppercase, lowercase, number, symbol
- Check against common password list

**Fix:**
```typescript
import { passwordStrength } from 'check-password-strength';

function validatePassword(password: string): boolean {
  const strength = passwordStrength(password);
  return strength.value === 'Strong' || strength.value === 'Medium';
}
```

---

### Minor Findings 🟡

#### Finding 4: No HTTPS Enforcement (Confidence: 6/10)

**Location:** `src/server.ts:15`

**Evidence:**
```typescript
app.listen(3000);  // HTTP only, no HTTPS redirect
```

**Risk:** LOW (if behind reverse proxy), MEDIUM (if exposed)
- Credentials sent in cleartext if HTTP used
- Session tokens interceptable

**Note:** Risk is LOW if Nginx/Cloudflare handles HTTPS termination.

**Verification needed:**
- Check if reverse proxy handles HTTPS
- Check production deployment config

---

### Positive Findings ✅

**Good practices observed:**
- ✅ Passwords are hashed (bcrypt, src/auth/password.ts:34)
- ✅ JWT tokens expire (1 hour, src/auth/jwt.ts:45)
- ✅ CORS configured (src/middleware/cors.ts)
- ✅ SQL injection protected (using parameterized queries)

---

### Risk Summary

| Severity | Count | Must Fix Before Production |
|----------|-------|----------------------------|
| 🔴 Critical | 2 | Yes - Immediate |
| 🟠 Important | 1 | Yes - Within 1 week |
| 🟡 Minor | 1 | Should fix |

**Overall Risk: HIGH** - Not production-ready in current state.

---

### Remediation Plan

**Phase 1: Critical (Today)**
1. Move JWT_SECRET to environment variable
2. Add rate limiting to login endpoint
3. Deploy to staging and verify

**Phase 2: Important (This Week)**
4. Strengthen password requirements
5. Add password breach checking (haveibeenpwned API)
6. Implement account lockout after failed attempts

**Phase 3: Minor (Next Sprint)**
7. Enforce HTTPS or verify reverse proxy config
8. Add security headers (helmet.js)
9. Set up security monitoring

---

### Gaps & Limitations

**Not Assessed:**
- Session storage security (needs Redis config review)
- Frontend XSS vulnerabilities (outside src/auth/)
- Infrastructure security (firewall, network segmentation)
- Third-party auth (OAuth, if any)

**Assumptions:**
- Assuming production uses HTTPS (needs verification)
- Assuming rate limiting not at reverse proxy level
- Assuming single-server deployment (clustering affects session handling)

**Recommended Follow-ups:**
- Full application security audit (not just auth)
- Penetration testing
- Security logging and monitoring setup

---

### Sources

**Code Reviewed:**
- All files in `src/auth/` (8 files, 450 lines)
- `src/api/auth.ts` (API endpoints)
- `src/middleware/` (security middleware)
- `package.json` (dependencies)

**Standards:**
- OWASP Top 10 (2021)
- OWASP Authentication Cheat Sheet
- CWE Top 25 Most Dangerous Weaknesses

**Tools:**
- Manual code review
- Pattern matching for common vulnerabilities
- npm audit (dependency check)
```

### Performance Investigation

**Request:**
```bash
/research --mode=deep-research "why is /api/posts so slow?"
```

**Deep Research Response:**
```markdown
## Performance Investigation: /api/posts Endpoint

### Methodology
1. Code analysis: Trace request flow
2. Database query analysis: Check execution plans
3. Network analysis: Payload sizes
4. Profiling: Identify bottlenecks

---

### Finding 1: N+1 Query Problem (Confidence: 10/10)

**Location:** `src/services/post-service.ts:45-67`

**Evidence:**
```typescript
// Line 45: Fetches all posts
const posts = await db.posts.findAll();

// Lines 50-55: Loop fetches author for each post
for (const post of posts) {
  post.author = await db.users.findById(post.authorId);  // N queries!
}
```

**Database logs:**
```sql
SELECT * FROM posts;                    -- 1 query
SELECT * FROM users WHERE id = 1;       -- Query 1 of N
SELECT * FROM users WHERE id = 2;       -- Query 2 of N
SELECT * FROM users WHERE id = 3;       -- Query 3 of N
-- ... 100 more queries for 100 posts
```

**Impact:**
- 100 posts = 101 database queries
- Each query: ~10ms
- Total time: ~1,010ms just for queries
- **Actual measurement:** 1,247ms total (from logs)

**Fix:**
```typescript
// Single query with JOIN
const posts = await db.posts.findAll({
  include: [{ model: db.users, as: 'author' }]
});
// Now: 1 query instead of 101
// Expected time: ~50ms
```

**Expected improvement: 95% faster** (1,247ms → 50ms)

**Confidence: 10/10** - Classic N+1 problem, well-documented fix

---

### Finding 2: Large Payload Size (Confidence: 9/10)

**Location:** `src/api/posts.ts:23`

**Evidence:**
```typescript
// Returns everything, no pagination
res.json(posts);  // All 100 posts at once
```

**Measurements:**
- Average post with author: 2.3KB
- 100 posts: 230KB response
- Network time: ~400ms on 3G connection

**Analysis:**
Most clients only show 10 posts at a time. We're sending 10x needed data.

**Fix:**
```typescript
// Add pagination
const limit = parseInt(req.query.limit) || 10;
const offset = parseInt(req.query.offset) || 0;

const posts = await db.posts.findAll({
  limit,
  offset,
  include: [{ model: db.users, as: 'author' }]
});

res.json({
  posts,
  total: await db.posts.count(),
  limit,
  offset
});
```

**Expected improvement:** 230KB → 23KB (90% reduction)

**Confidence: 9/10** - Measured in browser network tab

---

### Finding 3: No Caching (Confidence: 7/10)

**Location:** `src/api/posts.ts` (missing cache layer)

**Evidence:**
- No Cache-Control headers
- No Redis/Memcached integration
- Every request hits database

**Analysis:**
Posts don't change frequently (checked git history: 2-3 updates/hour).
Could cache for 5 minutes.

**Potential improvement:**
```typescript
// Add Redis caching
const cacheKey = `posts:${limit}:${offset}`;
let posts = await redis.get(cacheKey);

if (!posts) {
  posts = await db.posts.findAll({...});
  await redis.setex(cacheKey, 300, JSON.stringify(posts));  // 5 min
}
```

**Expected improvement:**
- Cache hit: ~5ms (vs 50ms from DB)
- 90% cache hit rate (estimated) = 45ms average improvement

**Confidence: 7/10** - Based on typical cache hit rates, needs measurement

---

### Finding 4: Missing Database Indexes (Confidence: 8/10)

**Evidence:**
```sql
EXPLAIN SELECT * FROM posts WHERE authorId = 5;
```

**Result:**
```
Seq Scan on posts  (cost=0.00..180.00 rows=10 width=100)
  Filter: (authorId = 5)
```

**Analysis:**
Sequential scan of entire table. With index, would be index lookup.

**Fix:**
```sql
CREATE INDEX idx_posts_author_id ON posts(authorId);
```

**Expected improvement:** Large dataset improvement
- Current: O(n) - scans all rows
- With index: O(log n) - fast lookup

**Confidence: 8/10** - EXPLAIN shows no index, but impact depends on
table size (currently only 100 rows, so minimal impact now)

---

### Performance Summary

| Issue | Current Impact | Fix Impact | Priority |
|-------|----------------|------------|----------|
| N+1 queries | 1,200ms | -1,150ms (95%) | 🔴 Critical |
| Large payload | 400ms | -360ms (90%) | 🟠 Important |
| No caching | 50ms | -45ms (90%) | 🟡 Nice-to-have |
| No index | Minimal (100 rows) | Future-proofing | 🟡 Nice-to-have |

**Total current time:** ~1,650ms
**After fixes:** ~90ms
**Expected improvement:** 94% faster

---

### Recommended Fix Order

**Phase 1: Quick Win (Today - 30 minutes)**
```typescript
// Fix N+1 problem
const posts = await db.posts.findAll({
  include: [{ model: db.users, as: 'author' }],
  limit: 10,
  offset: 0
});
```
**Impact:** 95% improvement immediately

**Phase 2: Pagination (This Week - 2 hours)**
- Add limit/offset parameters
- Add total count
- Update frontend to paginate

**Impact:** Better UX + smaller payloads

**Phase 3: Caching (Next Sprint - 1 day)**
- Set up Redis
- Add caching layer
- Add cache invalidation on updates

**Impact:** Further 90% improvement on repeated requests

**Phase 4: Indexes (Next Sprint - 30 minutes)**
- Add database indexes
- Monitor query performance

**Impact:** Future-proofing for scale

---

### Gaps & Limitations

**What we measured:**
- ✅ Database query time (from logs)
- ✅ Payload size (from network tab)
- ✅ Query plans (EXPLAIN)

**What we didn't measure:**
- ❌ Real user experience (RUM)
- ❌ Server CPU/memory during load
- ❌ Performance under concurrent requests
- ❌ 95th/99th percentile response times

**Assumptions:**
- Assuming single-server deployment
- Assuming 3G network (400ms for 230KB)
- Assuming 90% cache hit rate (typical, but unverified)

**Recommended follow-ups:**
- Add APM tool (New Relic, DataDog)
- Load testing (100+ concurrent users)
- Real user monitoring
- Database slow query log analysis

---

### Sources

**Code:**
- `src/services/post-service.ts` (logic)
- `src/api/posts.ts` (endpoint)
- Database logs (query times)

**Measurements:**
- Browser DevTools Network tab (payload sizes)
- PostgreSQL EXPLAIN (query plans)
- Application logs (request timing)

**References:**
- "N+1 Query Problem" (guides.rubyonrails.org)
- "Database Indexing Best Practices" (use-the-index-luke.com)
```

## Depth Levels

Control thoroughness with the `--depth` flag:

| Level | Behavior | Use Case |
|-------|----------|----------|
| 1 | Quick scan, surface findings | Initial triage |
| 2 | Standard analysis | Regular research |
| 3 | Thorough investigation | Most deep research |
| 4 | Comprehensive with cross-references | Important decisions |
| 5 | Exhaustive, leave no stone unturned | Critical audits |

**Example:**
```bash
/research --depth=5 "authentication approach"
```

## Tips for Using Deep Research Mode

### When It Provides Most Value

1. **Before major decisions**
   - Framework selection
   - Architecture changes
   - Security implementations

2. **When bugs are mysterious**
   - Intermittent issues
   - Complex interactions
   - Performance problems

3. **For audits and reviews**
   - Security audits
   - Performance reviews
   - Code quality assessments

### Maximize Research Quality

**Provide context:**
```bash
# Less effective
/research "GraphQL"

# More effective
/research "GraphQL vs REST for our 12-endpoint API serving mobile apps"
```

**Ask specific questions:**
```bash
# Vague
/research "improve performance"

# Specific
/research "why is /api/posts taking 1.5s? Database logs show 101 queries."
```

**Share constraints:**
```bash
/research --mode=deep-research "authentication approach for 3-person team
with no GraphQL experience, expecting 10K users"
```

### Combine with Sequential Thinking

For complex problems:

```bash
/research --mode=deep-research --sequential "migrate from MongoDB to
PostgreSQL while maintaining zero downtime"
```

This activates both deep research AND step-by-step reasoning.

## Mode Activation

```bash
# Session-wide deep research
/mode deep-research

# Single command
/research --mode=deep-research [topic]
/fix --mode=deep-research --depth=5 [error]

# With persona for focused research
/review --mode=deep-research --persona=security src/auth/
```

## Output Structure Template

Deep research outputs typically follow this structure:

```markdown
## Research: [Topic]

### Methodology
[How we researched this]

---

### Finding 1: [Title] (Confidence: X/10)
**Evidence:** [Sources, locations, measurements]
**Analysis:** [What this means]
**Impact:** [How significant]

### Finding 2: [Title] (Confidence: X/10)
[Same structure]

---

### Conclusions
- [Conclusion 1] (Confidence: X/10)
- [Recommendation with reasoning]

---

### Gaps & Limitations
- [What we don't know]
- [What would change the recommendation]

---

### Sources
- [Source 1]
- [Source 2]
```

## When NOT to Use

Avoid deep research mode for:

- **Simple, well-understood tasks** - Overkill
- **Time-sensitive fixes** - Too slow
- **Repetitive operations** - Use token-efficient instead
- **Clear, obvious solutions** - Use implementation mode

## Comparison with Other Modes

| Aspect | Deep Research | Brainstorm | Default |
|--------|---------------|------------|---------|
| Thoroughness | Exhaustive | Exploratory | Standard |
| Evidence | Required | Optional | Sometimes |
| Confidence levels | Always | No | No |
| Sources cited | Yes | No | No |
| Speed | Slow | Medium | Fast |
| Token usage | High | High | Medium |

## Configuration

Deep research mode is customizable in `.claude/modes/deep-research.md`:

- Default depth level
- Confidence threshold
- Required evidence types
- Report structure

## Related Modes

- **Review Mode**: For critical analysis (less evidence-focused)
- **Brainstorm Mode**: For exploration (less evidence-focused)
- **Default Mode**: For balanced research without deep investigation

## Related Documentation

- [Research Command](/claudekit/commands/research)
- [Sequential Thinking Skill](/claudekit/skills/sequential-thinking)
- [Security Audits](/claudekit/guides/security)
