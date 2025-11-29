---
title: Orchestration Mode
description: Multi-agent coordination mode for complex parallel tasks
---

# Orchestration Mode

## Overview

Orchestration mode is designed for managing complex tasks that benefit from parallel execution, task delegation, and result aggregation. It optimizes for efficiency through intelligent parallelization and multi-agent coordination.

This mode produces task breakdowns, agent assignments, progress tracking, and synthesized results from parallel work streams.

## When to Use

Orchestration mode is ideal for:

- **Large-scale refactoring** - Changes across many files
- **Multi-file changes** - Coordinated updates to related files
- **Complex feature implementation** - Features spanning multiple areas
- **Parallelizable tasks** - Independent work that can run simultaneously
- **Multi-concern coordination** - Security + performance + features together

## Behavior Changes

### Communication Style

**Coordination-focused:**
- Clear task delegation and assignments
- Progress aggregation across parallel work
- Coordination updates and checkpoints
- Final synthesis of results

**Example:**
```markdown
## Orchestration Plan: Authentication Refactor

### Phase 1: Parallel Analysis
Spawning 3 analysis agents...

Agent #1: Security audit of current auth
Agent #2: Performance analysis of auth endpoints
Agent #3: Research modern auth patterns

[Agents running in parallel...]

Agent #1 complete: Found 3 security issues
Agent #2 complete: Identified 2 bottlenecks
Agent #3 complete: Recommended OAuth2 + JWT refresh

### Phase 2: Synthesis
Combining findings across all agents...

[Synthesized recommendations]

### Phase 3: Parallel Implementation
Spawning 4 implementation agents...
[Implementation proceeds]
```

### Problem-Solving Approach

- **Identify parallelizable work** - What can run simultaneously?
- **Delegate to specialized agents** - Right agent for each task
- **Aggregate results** - Combine findings intelligently
- **Resolve conflicts** - Handle overlapping changes

### Output Format

- Task decomposition with dependencies
- Agent assignments and status
- Progress tracking across all agents
- Quality gates between phases
- Consolidated final results

## Orchestration Process

### Phase 1: Analysis & Decomposition

Break down the work:

```markdown
## Task Decomposition: Multi-Tenant Feature

### Total Work
Add tenant isolation to all services and endpoints

### Parallelizable Tasks (Can run simultaneously)
1. Database schema changes (3 tables)
2. Service layer updates (5 services)
3. API endpoint modifications (8 endpoints)
4. Frontend tenant selector (1 component)
5. Test generation (all above)

### Sequential Tasks (Must run in order)
6. Integration testing (after all above)
7. Migration script (after schema)
8. Documentation (final)

### Estimated Time
- Parallel (tasks 1-5): 4 hours wall time, 15 hours total work
- Sequential (tasks 6-8): 3 hours
- **Total: 7 hours wall time vs 18 hours sequential**
```

### Phase 2: Delegation

Assign to specialized agents:

```markdown
## Agent Assignments

| Task | Agent Type | Status | ETA |
|------|------------|--------|-----|
| DB schema | database-expert | 🔄 Running | 1h |
| User service | code-writer | 🔄 Running | 2h |
| Auth service | code-writer | 🔄 Running | 2h |
| Payment service | code-writer | 🔄 Running | 2h |
| API endpoints | api-specialist | 🔄 Running | 2h |
| Frontend | frontend-dev | 🔄 Running | 3h |
| Tests | tester | ⏸️ Waiting | After code |

Parallel work: 6 agents active
```

### Phase 3: Progress Tracking

Monitor and aggregate:

```markdown
## Progress Update

### Phase 1: Parallel Implementation (4h estimated)

[████████████░░░░░░░░] 60% complete (2.4h elapsed)

**Completed:**
- ✅ DB schema (1h actual)
- ✅ User service (2h actual)
- ✅ Auth service (1.8h actual)

**In Progress:**
- 🔄 Payment service (60% done, 30m remaining)
- 🔄 API endpoints (75% done, 20m remaining)
- 🔄 Frontend (40% done, 1.5h remaining)

**Blocked:**
- ⏸️ Tests (waiting for code completion)

**Issues:**
- ⚠️ Minor conflict: User & Auth services both modified db config
  Resolution: Auth service deferred to User service implementation
```

### Phase 4: Quality Gates

Verify before proceeding:

```markdown
## Quality Gate: Phase 1 → Phase 2

### Completion Check
- [x] All 6 parallel agents complete
- [x] No critical blockers
- [x] All code committed

### Conflict Check
- [x] No file conflicts (1 resolved during execution)
- [x] Logical consistency verified
- [x] API contracts aligned

### Quality Check
- [x] Unit tests pass for all services
- [ ] Integration tests pass (⚠️ 2 failures)
- [x] Lint clean
- [x] Type checks pass

**Action Required:** Fix 2 integration test failures before Phase 2

Spawning debugger agent to fix test failures...
✅ Tests now passing

**Gate Status: PASSED** ✅
Proceeding to Phase 2...
```

### Phase 5: Synthesis

Combine results:

```markdown
## Results Summary

### Completed Work

**Database (1 agent, 1h)**
- Created `tenants` table
- Added `tenant_id` to users, posts, payments
- Created indexes for tenant queries

**Services (3 agents, 2h avg)**
- User service: Tenant filtering on all queries
- Auth service: Tenant validation on login
- Payment service: Tenant isolation for transactions

**API Layer (1 agent, 2h)**
- 8 endpoints updated with tenant middleware
- Tenant extracted from JWT token
- All queries scoped to tenant

**Frontend (1 agent, 3h)**
- Tenant selector component
- Tenant context provider
- All API calls include tenant header

**Tests (1 agent, 2h)**
- 45 new tests across all layers
- Tenant isolation verified
- Cross-tenant access blocked

### Total Impact
- 15 files modified
- 1,247 lines added
- 234 lines removed
- 45 tests added
- All tests passing ✅

### Time Savings
- Sequential execution: ~18 hours
- Parallel execution: ~7 hours
- **Time saved: 11 hours (61% faster)**
```

## Parallelization Patterns

### Pattern 1: Independent File Modifications

**Good for parallel:**
```markdown
Task: Update all service files
- services/user-service.ts
- services/auth-service.ts
- services/payment-service.ts

Each file is independent → Spawn 3 agents
```

**Orchestration:**
```bash
/spawn "Update user-service.ts with tenant support"
/spawn "Update auth-service.ts with tenant support"
/spawn "Update payment-service.ts with tenant support"

# Wait for completion
/spawn --collect

# Proceed with integration
```

### Pattern 2: Research & Analysis

**Good for parallel:**
```markdown
Task: Evaluate authentication options

Research streams:
- Security analysis of current system
- Performance benchmarks
- Competitor analysis
- Industry best practices

All independent → Spawn 4 research agents
```

**Orchestration:**
```bash
/spawn "Security audit current auth system"
/spawn "Performance analysis auth endpoints"
/spawn "Research OAuth2 implementation patterns"
/spawn "Survey competitor auth approaches"

/spawn --collect
# Synthesize findings into recommendation
```

### Pattern 3: Test Generation

**Good for parallel:**
```markdown
Task: Generate tests for 10 services

Each service's tests are independent → 10 parallel agents
```

**Orchestration:**
```bash
/mode orchestration
/test src/services/*.ts

# Internally orchestrates:
# - Spawn agent per service file
# - Generate tests in parallel
# - Aggregate results
# - Report combined status
```

### Pattern 4: Phased Implementation

**Complex dependencies:**
```markdown
Phase 1: Foundation (parallel)
- Database migrations
- Core models
- Base services

Phase 2: Features (parallel, depends on Phase 1)
- API endpoints
- Business logic
- Validation

Phase 3: Integration (sequential, depends on Phase 2)
- End-to-end tests
- Documentation
- Deployment
```

**Orchestration:**
```bash
# Phase 1
/spawn "Database migration"
/spawn "Core models"
/spawn "Base services"
/spawn --collect

# Quality gate: Verify Phase 1

# Phase 2
/spawn "API endpoints"
/spawn "Business logic"
/spawn "Validation layer"
/spawn --collect

# Quality gate: Verify Phase 2

# Phase 3 (sequential)
/test "E2E tests"
/doc "API documentation"
```

## Parallelization Decision Matrix

| Condition | Parallelize? | Reason |
|-----------|--------------|--------|
| No shared files | ✅ Yes | No conflicts possible |
| Independent modules | ✅ Yes | No logical dependencies |
| Research tasks | ✅ Yes | Can aggregate findings |
| Test generation | ✅ Yes | Tests are independent |
| Shared dependencies | ❌ No | Coordination overhead |
| Order matters | ❌ No | Sequential dependency |
| Single source of truth | ❌ No | Risk of conflicts |
| Database migrations | ❌ No | Must be sequential |

## Examples

### Large-Scale Refactoring

**Request:**
```bash
/feature --mode=orchestration "rename User to Account throughout codebase"
```

**Orchestration Mode Response:**
```markdown
## Orchestration Plan: User → Account Rename

### Analysis
Found 47 files referencing "User" across:
- Models: 3 files
- Services: 8 files
- API: 12 endpoints
- Frontend: 18 components
- Tests: 6 test files

### Task Decomposition

**Phase 1: Safe Parallel Renames**
No dependencies between these:

Group A - Backend (3 agents)
1. Models: User.ts, UserProfile.ts, UserSettings.ts
2. Services: user-service.ts, user-auth.ts, user-validation.ts
3. Repositories: user-repo.ts, user-cache.ts

Group B - API (2 agents)
4. Routes: user-routes.ts, user-admin.ts
5. Controllers: user-controller.ts, user-auth-controller.ts

Group C - Frontend (3 agents)
6. Components: UserProfile.tsx, UserSettings.tsx, UserCard.tsx
7. Hooks: useUser.ts, useUserAuth.ts
8. State: user-store.ts, user-actions.ts

Group D - Tests (2 agents)
9. Backend tests: user-service.test.ts, user-repo.test.ts
10. Frontend tests: UserProfile.test.tsx, useUser.test.ts

**Total: 10 parallel agents**

**Phase 2: Integration & Verification**
Sequential (after Phase 1):
11. Database migration
12. Update imports across codebase
13. Run all tests
14. Fix any issues

---

### Execution

**Phase 1: Parallel Rename (Estimated: 2h wall time, 8h work)**

[Agent Status]
Group A (Backend):
  Agent #1 (Models): 🔄 Running...
  Agent #2 (Services): 🔄 Running...
  Agent #3 (Repos): 🔄 Running...

Group B (API):
  Agent #4 (Routes): 🔄 Running...
  Agent #5 (Controllers): 🔄 Running...

Group C (Frontend):
  Agent #6 (Components): 🔄 Running...
  Agent #7 (Hooks): 🔄 Running...
  Agent #8 (State): 🔄 Running...

Group D (Tests):
  Agent #9 (Backend tests): 🔄 Running...
  Agent #10 (Frontend tests): 🔄 Running...

---

**[30 minutes later]**

[Progress: 40%]

Group A (Backend):
  Agent #1: ✅ Complete (3 files, 45 renames)
  Agent #2: 🔄 70% (4/6 files)
  Agent #3: ✅ Complete (2 files, 23 renames)

Group B (API):
  Agent #4: ✅ Complete (2 files, 34 renames)
  Agent #5: 🔄 85% (1 file remaining)

Group C (Frontend):
  Agent #6: 🔄 60% (2/3 files)
  Agent #7: ✅ Complete (2 files, 56 renames)
  Agent #8: ✅ Complete (2 files, 41 renames)

Group D (Tests):
  Agent #9: 🔄 50% (1/2 files)
  Agent #10: 🔄 65% (UserProfile.test done)

---

**[2 hours later]**

Phase 1 Complete ✅

**Results:**
- 47 files modified
- 423 "User" → "Account" renames
- 0 conflicts (agents worked on separate files)
- All unit tests passing in modified files

---

### Quality Gate 1: Phase 1 Verification

**Checklist:**
- [x] All agents completed
- [x] No file conflicts
- [x] All files compile
- [x] Unit tests pass

⚠️ Warning: Found 23 import statements still using old paths
Need import update phase

**Proceeding to Phase 2...**

---

**Phase 2: Integration (Sequential - 1h)**

[1/4] Database migration
```sql
ALTER TABLE users RENAME TO accounts;
ALTER TABLE user_profiles RENAME TO account_profiles;
-- ... more migrations
```
✅ Migration successful

[2/4] Updating imports across codebase
Scanning for import statements...
Found 156 imports to update
Updating... ✅ Done

[3/4] Running full test suite
```
npm run test
```
⚠️ 3 integration tests failing

[4/4] Fixing integration tests
Analyzing failures...
- auth.integration.test.ts: References old "User" model
- api.integration.test.ts: Old endpoint paths
- e2e.test.ts: Old component selectors

Fixing... ✅ All tests passing

---

### Final Results

**Summary:**
- ✅ 47 files renamed successfully
- ✅ 423 code references updated
- ✅ 156 import statements updated
- ✅ Database migration complete
- ✅ All tests passing (234 tests)

**Time Breakdown:**
- Phase 1 (parallel): 2h wall time (8h work)
- Phase 2 (sequential): 1h
- **Total: 3h wall time vs 9h sequential**
- **Time saved: 6 hours (67% faster)**

**Changed Files:**
- Backend: 13 files
- Frontend: 18 files
- Tests: 6 files
- Config: 3 files
- Database: 1 migration
- Documentation: 6 files

Ready to commit:
```bash
git add .
git commit -m "refactor: rename User to Account throughout codebase"
```
```

### Multi-Concern Feature

**Request:**
```bash
/feature --mode=orchestration "add file upload with virus scanning and optimization"
```

**Orchestration Mode Response:**
```markdown
## Orchestration Plan: File Upload Feature

### Requirements Analysis
- File upload API
- Virus scanning (security)
- Image optimization (performance)
- Progress tracking (UX)
- Storage (infrastructure)

### Parallel Workstreams

**Stream 1: Security (Agent #1)**
- Integrate ClamAV for virus scanning
- Set up scanning service
- Add quarantine handling

**Stream 2: Performance (Agent #2)**
- Image optimization (Sharp.js)
- Thumbnail generation
- Format conversion

**Stream 3: Infrastructure (Agent #3)**
- S3 integration
- CDN configuration
- Storage policies

**Stream 4: API (Agent #4)**
- Upload endpoints
- Progress tracking
- Error handling

**Stream 5: Frontend (Agent #5)**
- Upload component
- Progress bar
- Preview functionality

**Stream 6: Tests (Agent #6 - waits for above)**
- Integration tests
- Security tests
- Performance tests

---

### Execution

**Spawning 5 parallel agents...**

Agent #1 (Security): 🔄 Implementing virus scanning...
Agent #2 (Performance): 🔄 Implementing image optimization...
Agent #3 (Infrastructure): 🔄 Setting up S3...
Agent #4 (API): 🔄 Creating endpoints...
Agent #5 (Frontend): 🔄 Building upload component...

---

**[Progress Updates]**

**After 1 hour:**

Agent #1: ✅ Virus scanning complete
- ClamAV integrated
- Async scanning queue
- Quarantine handling

Agent #2: ✅ Image optimization complete
- Sharp.js integrated
- Generates 3 sizes (thumb, medium, full)
- WebP conversion

Agent #3: ✅ S3 setup complete
- Bucket configured
- CloudFront CDN
- Lifecycle policies

Agent #4: 🔄 API 80% complete
- Upload endpoint done
- Progress tracking done
- ⏳ Error handling in progress

Agent #5: 🔄 Frontend 60% complete
- Upload component done
- ⏳ Progress bar in progress
- ⏳ Preview pending

---

**[After 2 hours: All Complete]**

### Quality Gate: Integration Check

**Integration points:**
1. API ↔ Security: ✅ Compatible
2. API ↔ Performance: ✅ Compatible
3. API ↔ Infrastructure: ✅ Compatible
4. Frontend ↔ API: ⚠️ Minor mismatch

**Issue found:**
- Frontend expects progress in % (0-100)
- API returns bytes transferred
- **Resolution:** API updated to include percentage

✅ Integration verified

---

**Spawning Test Agent...**

Agent #6 (Tests): 🔄 Generating tests...

Tests created:
- Unit tests: 24 tests ✅
- Integration tests: 12 tests ✅
- Security tests: 8 tests ✅
- Performance tests: 4 tests ✅

Total: 48 tests, all passing ✅

---

### Final Results

**Feature Complete:**

**Security (Agent #1):**
- ✅ Virus scanning on all uploads
- ✅ Quarantine for infected files
- ✅ Security logging

**Performance (Agent #2):**
- ✅ Image optimization (60% size reduction)
- ✅ Multiple sizes generated
- ✅ WebP format support

**Infrastructure (Agent #3):**
- ✅ S3 storage configured
- ✅ CDN for fast delivery
- ✅ Auto-cleanup old files

**API (Agent #4):**
- ✅ POST /upload endpoint
- ✅ Real-time progress tracking
- ✅ Comprehensive error handling

**Frontend (Agent #5):**
- ✅ Drag-and-drop upload
- ✅ Progress bar
- ✅ Image preview

**Tests (Agent #6):**
- ✅ 48 tests covering all features
- ✅ Security scenarios tested
- ✅ Performance verified

**Time Saved:**
- Sequential estimate: 10 hours
- Parallel actual: 2.5 hours
- **Saved: 7.5 hours (75% faster)**

Ready for review!
```

### Research Synthesis

**Request:**
```bash
/research --mode=orchestration "best state management for our React app"
```

**Orchestration Mode Response:**
```markdown
## Orchestration: State Management Research

### Research Strategy

Spawning 4 parallel research agents:

Agent #1: Analyze current state management usage
Agent #2: Research Redux vs Zustand vs Jotai
Agent #3: Evaluate performance implications
Agent #4: Check team experience and learning curve

---

**[Agents Running...]**

Agent #1 (Current Analysis): 🔄 Analyzing codebase...
Agent #2 (Library Research): 🔄 Researching options...
Agent #3 (Performance): 🔄 Benchmarking...
Agent #4 (Team Assessment): 🔄 Surveying team...

---

**[Results Collection]**

### Agent #1: Current State Analysis

**Findings:**
- 18 components using local useState
- 4 components prop-drilling 3+ levels
- No global state management
- Pain points: Cart state shared across 6 components

**Complexity: LOW**
Current needs are simple, no complex state logic yet.

---

### Agent #2: Library Research

**Options Compared:**

**Redux Toolkit**
- Industry standard, mature
- DevTools excellent
- Learning curve: High
- Boilerplate: Medium (with toolkit)
- Bundle size: 13KB

**Zustand**
- Minimal API, simple
- Hooks-based
- Learning curve: Low
- Boilerplate: Minimal
- Bundle size: 3KB

**Jotai**
- Atomic state management
- Recoil-like but simpler
- Learning curve: Medium
- Boilerplate: Minimal
- Bundle size: 5KB

---

### Agent #3: Performance Analysis

**Benchmark Results:**

| Library | Render Time | Re-renders | Bundle Impact |
|---------|-------------|------------|---------------|
| Redux | 12ms | Optimized | +13KB |
| Zustand | 8ms | Very good | +3KB |
| Jotai | 9ms | Excellent | +5KB |

**Recommendation:** All performant enough for our scale

---

### Agent #4: Team Assessment

**Team Survey Results:**
- Team size: 3 developers
- Redux experience: 1 developer
- Zustand experience: 0 developers
- React experience: All developers

**Time to productivity estimate:**
- Redux: 1 week learning + 2 weeks proficiency
- Zustand: 1 day learning + 3 days proficiency
- Jotai: 2 days learning + 1 week proficiency

---

### Synthesis: Orchestrator Analysis

**Combining all findings:**

**Current Needs (Agent #1):**
- Simple state sharing
- 6 components need cart state
- No complex async logic yet

**Technical Fit (Agent #2):**
- Redux: Overpowered for current needs
- Zustand: Perfect fit for simple state
- Jotai: Good fit, slightly more complex

**Performance (Agent #3):**
- All options performant
- Zustand has smallest bundle
- Not a differentiator

**Team Fit (Agent #4):**
- Zustand fastest to learn
- Redux has more resources but longer ramp-up
- Jotai middle ground

**Decision Matrix:**

| Criteria | Weight | Redux | Zustand | Jotai |
|----------|--------|-------|---------|-------|
| Current needs fit | 30% | 6/10 | 10/10 | 9/10 |
| Learning curve | 25% | 5/10 | 10/10 | 7/10 |
| Performance | 20% | 8/10 | 10/10 | 9/10 |
| Scalability | 15% | 10/10 | 7/10 | 8/10 |
| Ecosystem | 10% | 10/10 | 6/10 | 6/10 |
| **TOTAL** | | **7.15** | **9.25** | **8.15** |

---

### Recommendation: Zustand

**Reasoning:**
1. **Perfect fit for current needs** (Agent #1 + Agent #2)
   - Simple API for simple state
   - No boilerplate overhead

2. **Team can be productive immediately** (Agent #4)
   - 1 day to learn vs 1 week for Redux
   - Hooks-based (team already knows React hooks)

3. **Best performance/size ratio** (Agent #3)
   - 3KB vs 13KB (Redux)
   - Fastest in benchmarks

4. **Future flexibility**
   - Can coexist with other solutions
   - Easy to migrate from if needs grow

**Caveats:**
- If app grows to Reddit-scale complexity, revisit Redux
- For now, Zustand is optimal choice

**Next Steps:**
1. Prototype cart state with Zustand (2 hours)
2. Team review (1 hour)
3. If approved, refactor prop-drilling components (4 hours)

---

**Research Time:**
- Parallel research: 1 hour
- Synthesis: 15 minutes
- **Total: 1.25 hours vs ~4 hours sequential**
```

## Spawn Command Integration

The `/spawn` command is orchestration mode's primary tool:

```bash
# Spawn background task
/spawn "research authentication patterns"

# Check status
/spawn --list
# Output:
# Task #1: "research authentication patterns" [Running] 45% complete

# Collect results
/spawn --collect
# Output:
# Task #1 complete. Results: [findings]

# Spawn multiple
/spawn "analyze security"
/spawn "analyze performance"
/spawn "analyze UX"

/spawn --collect  # Waits for all, returns synthesized results
```

## Quality Gates

Between parallel phases, orchestration mode enforces quality gates:

```markdown
## Quality Gate: Phase 1 → Phase 2

### Completion Check
- [x] All agents completed
- [x] No critical errors
- [ ] All tests passing ← ⚠️ FAILED

**Action:** Cannot proceed to Phase 2 until tests pass

Spawning debugger agent...
✅ Tests fixed

**Gate: PASSED** ✅
Proceeding to Phase 2...
```

## Mode Activation

```bash
# Session-wide orchestration
/mode orchestration

# Single command
/feature --mode=orchestration "complex feature"
/plan --mode=orchestration "large refactor"

# Explicit spawn usage
/spawn "task 1"
/spawn "task 2"
/spawn --collect
```

## Tips for Effective Orchestration

### Identify Good Candidates

**Good for orchestration:**
- Independent file modifications
- Research across different areas
- Test generation for multiple modules
- Parallel implementation streams

**Bad for orchestration:**
- Single-file changes
- Highly coupled modifications
- Sequential dependencies
- Simple tasks

### Structure Dependencies

```markdown
# Clear parallel vs sequential
Phase 1 (Parallel):
- Database schema
- Service interfaces
- API contracts

Phase 2 (Parallel, depends on Phase 1):
- Service implementations
- API implementations
- Frontend

Phase 3 (Sequential, depends on Phase 2):
- Integration tests
- Documentation
```

### Monitor and Adjust

```bash
# Check progress mid-execution
/spawn --list

# If one agent is blocked, can spawn helper
/spawn "help debug agent #3 database connection issue"
```

## Comparison with Other Modes

| Aspect | Orchestration | Implementation | Default |
|--------|---------------|----------------|---------|
| Task coordination | Primary focus | Single-threaded | Single-threaded |
| Parallelization | Automatic | No | No |
| Progress tracking | Detailed | Simple | None |
| Best for | Complex multi-part work | Clear single tasks | General use |

## Configuration

Orchestration mode is customizable in `.claude/modes/orchestration.md`:

- Max parallel agents
- Quality gate strictness
- Progress update frequency
- Synthesis strategies

## Related Modes

- **Implementation Mode**: For single-threaded execution
- **Review Mode**: Can orchestrate multi-persona reviews
- **Deep Research Mode**: Can orchestrate multi-angle research

## Related Commands

- `/spawn` - Launch parallel tasks
- `/execute-plan` - Can use orchestration for parallel execution
- `/feature` - Complex features benefit from orchestration

## Related Documentation

- [Spawn Command](/claudekit/commands/spawn)
- [Parallel Agents Skill](/claudekit/skills/dispatching-parallel-agents)
- [Complex Workflows](/claudekit/guides/complex-workflows)
