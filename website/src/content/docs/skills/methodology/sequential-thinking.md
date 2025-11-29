---
title: Sequential Thinking
description: Step-by-step reasoning with evidence and confidence tracking
---

The Sequential Thinking skill provides a structured methodology for complex problem analysis using explicit evidence collection and confidence tracking.

## Overview

Sequential Thinking breaks down complex problems into systematic steps with documented evidence, hypotheses, and confidence scores. This approach creates an audit trail of decision-making and prevents jumping to conclusions.

**Use for**: Complex debugging, architecture decisions, security analysis, performance investigation

## When to Use

- Complex debugging
- Architecture decisions
- Security analysis
- Performance investigation
- Any problem with multiple possible causes
- When decisions need documentation

## The Sequential Process

### Step 1: Define the Question

Clearly state what you're investigating:

```markdown
## Question
What is causing the authentication timeout for users with special characters in passwords?
```

### Step 2: Gather Evidence

Collect all relevant information systematically:

```markdown
## Evidence Collection

### Evidence 1: Error Logs
- Source: `logs/auth-service.log`
- Finding: Timeout occurs at password encoding step
- Confidence: High (direct observation)

### Evidence 2: Code Review
- Source: `src/auth/password.ts:42`
- Finding: URL encoding applied to password
- Confidence: High (code inspection)

### Evidence 3: Test Results
- Source: Manual testing
- Finding: Works with alphanumeric, fails with `@#$`
- Confidence: High (reproducible)
```

### Step 3: Form Hypotheses

Generate possible explanations:

```markdown
## Hypotheses

### Hypothesis A: URL Encoding Issue
- Evidence supporting: E1, E2, E3
- Evidence against: None
- Probability: 80%

### Hypothesis B: Character Set Mismatch
- Evidence supporting: E3
- Evidence against: E2 (UTF-8 used)
- Probability: 15%

### Hypothesis C: Database Encoding
- Evidence supporting: None directly
- Evidence against: E1 (fails before DB)
- Probability: 5%
```

### Step 4: Test Hypotheses

Verify the most likely explanation:

```markdown
## Testing

### Test for Hypothesis A
Action: Remove URL encoding, use base64 instead
Result: Password `test@123` now works
Conclusion: Hypothesis A confirmed
```

### Step 5: Document Conclusion

State the final answer with confidence:

```markdown
## Conclusion

**Root Cause**: URL encoding in password.ts:42 mangles special characters

**Confidence**: 9/10

**Evidence Chain**:
1. Timeout at encoding step (logs)
2. URL encoding in code (review)
3. Special char passwords fail (testing)
4. Removing encoding fixes issue (verification)

**Fix**: Replace URL encoding with base64 at line 42
```

## Output Template

```markdown
# Sequential Analysis: [Problem Description]

## Question
[Clear statement of what we're investigating]

## Evidence

### Evidence 1: [Title]
- Source: [where found]
- Finding: [what it shows]
- Confidence: [High/Medium/Low]

### Evidence 2: [Title]
...

## Hypotheses

### Hypothesis A: [Name]
- Supporting evidence: [list]
- Contradicting evidence: [list]
- Probability: [X%]

### Hypothesis B: [Name]
...

## Testing

### Test 1: [What tested]
- Action: [what was done]
- Expected: [what should happen if hypothesis true]
- Actual: [what happened]
- Result: [confirms/refutes hypothesis]

## Conclusion

**Answer**: [clear statement]
**Confidence**: [X/10]
**Key Evidence**: [most important findings]
**Recommended Action**: [what to do next]
```

## Confidence Scoring

| Score | Meaning | Evidence Required |
|-------|---------|-------------------|
| 9-10 | Certain | Multiple independent confirmations |
| 7-8 | High | Strong evidence, tested hypothesis |
| 5-6 | Medium | Good evidence, some uncertainty |
| 3-4 | Low | Limited evidence, multiple possibilities |
| 1-2 | Guess | Insufficient evidence |

## Anti-Patterns

### Jumping to Conclusions

```
❌ "The bug is probably in the database"
✅ "Let me gather evidence before hypothesizing"
```

### Confirmation Bias

```
❌ Only looking for evidence supporting first guess
✅ Actively seeking contradicting evidence
```

### Skipping Documentation

```
❌ Fixing without recording reasoning
✅ Document even simple analysis for future reference
```

## Activation

### Via Mode

```bash
/mode deep-research
# Enables sequential thinking for session
```

### Via Command

```bash
/research --sequential "authentication timeout"
/debug --sequential "performance degradation"
```

### Explicit Request

```
"Use sequential thinking to analyze why the cache is returning stale data"
```

## Example Analysis

```markdown
# Sequential Analysis: API Response Time Degradation

## Question
Why did API response times increase from 100ms to 3000ms after deployment?

## Evidence

### Evidence 1: Deployment Timing
- Source: Deployment logs
- Finding: Degradation started 5 minutes after deploy at 2:34 PM
- Confidence: High (exact timing match)

### Evidence 2: Database Query Logs
- Source: PostgreSQL slow query log
- Finding: No new slow queries, same query times as before
- Confidence: High (database not the cause)

### Evidence 3: Code Changes
- Source: git diff deploy-123
- Finding: Added Redis caching to user lookup
- Confidence: High (code inspection)

### Evidence 4: Redis Metrics
- Source: Redis monitoring
- Finding: Redis responding in < 1ms per request
- Confidence: High (Redis not slow)

### Evidence 5: Network Latency
- Source: Application metrics
- Finding: 2900ms spent waiting for external API
- Confidence: High (measured directly)

### Evidence 6: Code Review of Caching Logic
- Source: src/services/user.ts:45-60
- Finding: Cache miss triggers external API call
- Confidence: High (code inspection)

### Evidence 7: Cache Hit Rate
- Source: Application metrics
- Finding: Cache hit rate: 5% (95% miss rate)
- Confidence: High (measured)

## Hypotheses

### Hypothesis A: Cache Not Working Properly
- Supporting: E3 (caching added), E7 (low hit rate)
- Contradicting: E4 (Redis is fast)
- Probability: 60%
- Details: Cache might not be storing data correctly

### Hypothesis B: External API Became Slow
- Supporting: E5 (external API latency)
- Contradicting: E1 (timing matches deploy, not external change)
- Probability: 20%

### Hypothesis C: Cache Key Mismatch
- Supporting: E3 (new code), E7 (low hit rate), E6 (cache logic)
- Contradicting: None
- Probability: 90% (after code review)
- Details: New code might generate different cache keys than lookup

## Testing

### Test 1: Verify Cache Storage
- Action: Log cache keys on write and read
- Expected: Keys should match
- Actual: Write key: `user:123`, Read key: `user:{"id":"123"}`
- Result: CONFIRMED - Key mismatch found

### Test 2: Fix Cache Key Format
- Action: Standardize cache key format in both write and read
- Expected: Hit rate should increase dramatically
- Actual: Hit rate increased to 95%, response time back to 100ms
- Result: CONFIRMED - This was the root cause

## Conclusion

**Root Cause**: Cache key format mismatch between write and read operations

**Confidence**: 10/10 (tested and verified)

**Evidence Chain**:
1. Timing matches deployment (E1)
2. Caching logic was added (E3)
3. Cache hit rate extremely low (E7)
4. Cache keys don't match between read/write (Test 1)
5. Fixing keys resolves issue (Test 2)

**Fix Applied**: Standardized cache key format in user.ts:45-60

**Recommended Follow-up**:
1. Add unit tests for cache key generation
2. Add monitoring for cache hit rate
3. Review other services for similar issues
```

## Integration with Other Skills

### With Systematic Debugging

Sequential Thinking provides the framework, [Systematic Debugging](/claudekit/skills/methodology/systematic-debugging) provides the debugging-specific workflow.

### With TDD

After identifying root cause:
1. Write test that reproduces issue (TDD red)
2. Fix based on conclusion (TDD green)
3. Verify test passes (TDD verify)

### With Verification

All conclusions must be verified with [evidence-based completion](/claudekit/skills/methodology/verification).

## Best Practices

### Number Your Evidence

Makes it easy to reference: "E1 and E3 support Hypothesis A"

### Update Probabilities

As you gather evidence, adjust hypothesis probabilities

### Document Contradictions

Evidence against a hypothesis is as valuable as evidence for it

### Test Highest Probability First

Focus effort on most likely causes

## Common Use Cases

### Security Analysis

```markdown
Question: Is this authentication bypass a real vulnerability?
Evidence: Code review, test results, security logs
Hypotheses: Multiple attack vectors
Testing: Actual exploit attempts
Conclusion: Confirmed vulnerability with 9/10 confidence
```

### Performance Investigation

```markdown
Question: What's causing 95th percentile latency spike?
Evidence: Metrics, logs, profiling data
Hypotheses: Database, network, algorithm
Testing: Controlled experiments
Conclusion: Database connection pool exhaustion
```

### Architecture Decision

```markdown
Question: Should we use microservices or monolith?
Evidence: Team size, requirements, constraints
Hypotheses: Different architectural patterns
Testing: Prototype both approaches
Conclusion: Monolith recommended with 8/10 confidence
```

## Next Steps

After completing sequential analysis:

1. **Implement fix** based on conclusion
2. **Add regression test** to prevent recurrence
3. **Document learning** for future reference
4. **Review similar code** for related issues

## Related Skills

- [Systematic Debugging](/claudekit/skills/methodology/systematic-debugging) - Debugging methodology
- [Verification](/claudekit/skills/methodology/verification) - Evidence-based completion
- [Root Cause Tracing](/claudekit/skills/methodology/root-cause-tracing) - Deep investigation
