---
title: /optimize
description: Analyze and optimize code performance
---

# /optimize

## Purpose

Analyze and optimize code performance. Identifies bottlenecks, suggests improvements, and implements optimizations while ensuring correctness.

## Usage

```bash
/optimize [file-or-function]
```

## Arguments

- **file-or-function**: Path to file or function to optimize
  - File path: `src/services/data-processor.ts`
  - Function name: `processUserData`
  - Module: `src/utils/`

## Workflow

### Step 1: Analyze Current Performance

1. **Identify bottlenecks**
   - Analyze time complexity
   - Check space complexity
   - Look for redundant operations

2. **Profile if possible**
   - Check for N+1 queries
   - Identify unnecessary loops
   - Find repeated calculations

### Step 2: Identify Opportunities

1. **Algorithm improvements**
   - Better data structures
   - More efficient algorithms
   - Reduce complexity

2. **Caching opportunities**
   - Memoization
   - Result caching
   - Computed properties

3. **Async optimizations**
   - Parallel execution
   - Batch operations
   - Lazy loading

### Step 3: Implement Optimizations

1. **Make targeted changes**
   - Implement improvements
   - Preserve functionality
   - Add comments

2. **Verify improvements**
   - Test correctness
   - Measure performance
   - Compare before/after

## Output

```markdown
## Optimization Report: [Component]

### Current Performance
- Time complexity: O(n²)
- Space complexity: O(n)
- Estimated execution time: 500ms for 1000 items
- Issues found: 3

### Bottlenecks Identified

1. **Nested loop in data processing**
   - Location: `processData()` lines 45-60
   - Impact: High
   - Current: O(n²)

2. **Redundant database queries**
   - Location: `getUserData()` lines 120-135
   - Impact: Medium
   - Issue: N+1 query pattern

3. **Inefficient array operations**
   - Location: `filterResults()` lines 88-92
   - Impact: Low
   - Issue: Multiple array iterations

### Optimizations Applied

#### 1. Algorithm Improvement
**Before:**
```typescript
// O(n²) nested loop
for (const item of items) {
  for (const tag of tags) {
    if (item.tags.includes(tag)) {
      results.push(item);
    }
  }
}
```

**After:**
```typescript
// O(n) with Set lookup
const tagSet = new Set(tags);
const results = items.filter(item =>
  item.tags.some(tag => tagSet.has(tag))
);
```

**Impact:** Time complexity reduced from O(n²) to O(n)

#### 2. Caching Implementation
**Before:**
```typescript
function calculateScore(user) {
  // Recalculates every time
  return expensiveCalculation(user);
}
```

**After:**
```typescript
const scoreCache = new Map();
function calculateScore(user) {
  if (scoreCache.has(user.id)) {
    return scoreCache.get(user.id);
  }
  const score = expensiveCalculation(user);
  scoreCache.set(user.id, score);
  return score;
}
```

**Impact:** 95% cache hit rate in typical usage

#### 3. Batch Processing
**Before:**
```typescript
for (const userId of userIds) {
  await db.getUser(userId); // N queries
}
```

**After:**
```typescript
const users = await db.getUsers(userIds); // 1 query
```

**Impact:** Reduced database queries from N to 1

### Performance Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Time Complexity | O(n²) | O(n log n) | 90% faster |
| Execution Time | 500ms | 50ms | 10x faster |
| Database Queries | 100 | 1 | 99% reduction |
| Memory Usage | 150MB | 80MB | 47% reduction |

### Testing

All existing tests pass:
- ✅ Unit tests: 45/45
- ✅ Integration tests: 12/12
- ✅ Performance benchmarks added

### Recommendations

1. **Monitor in production**: Track actual performance metrics
2. **Consider further optimization**: Implement pagination for large datasets
3. **Add benchmarks**: Create performance regression tests

### Files Modified
- `src/services/data-processor.ts`
- `tests/data-processor.test.ts` (added benchmarks)
```

## Optimization Strategies

### 1. Algorithm Optimization
- Replace inefficient algorithms
- Use appropriate data structures
- Reduce time/space complexity

### 2. Caching
- Memoize expensive calculations
- Cache API responses
- Use computed properties

### 3. Database Optimization
- Batch queries
- Add indexes
- Optimize query patterns
- Use eager loading

### 4. Async Optimization
- Parallel execution with `Promise.all()`
- Lazy loading
- Stream processing

### 5. Code-Level Optimization
- Avoid premature optimization
- Profile before optimizing
- Focus on hot paths

## Examples

```bash
# Optimize specific file
/optimize src/services/report-generator.ts

# Optimize by function name
/optimize calculateTotalSales

# Optimize entire module
/optimize src/utils/

# Optimize with performance persona
/optimize --persona=performance src/api/users.ts
```

## Flags

| Flag | Description |
|------|-------------|
| `--profile` | Include profiling data |
| `--benchmark` | Add performance benchmarks |
| `--aggressive` | More aggressive optimizations |
| `--safe` | Conservative optimizations only |
| `--persona=performance` | Performance-focused analysis |

## Best Practices

1. **Profile First**: Don't optimize without measuring
2. **Preserve Correctness**: Always verify behavior unchanged
3. **Add Tests**: Include performance regression tests
4. **Document Changes**: Explain why optimizations were made
5. **Measure Impact**: Compare before/after metrics

## Common Optimizations

### N+1 Query Prevention
```typescript
// Before: N+1 queries
const users = await db.getUsers();
for (const user of users) {
  user.posts = await db.getPostsByUser(user.id);
}

// After: 2 queries
const users = await db.getUsers();
const posts = await db.getPostsByUsers(users.map(u => u.id));
// Map posts to users
```

### Memoization
```typescript
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};
```

### Debouncing
```typescript
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};
```

## Related Commands

- [/review](/claudekit/core-commands/review) - Code review with performance checks
- [/test](/claudekit/core-commands/test) - Add performance tests
- [/fix](/claudekit/core-commands/fix) - Fix performance issues
