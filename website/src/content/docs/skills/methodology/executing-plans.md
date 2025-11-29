---
title: Executing Plans
description: Subagent-driven plan execution with quality gates
---

The Executing Plans skill automates implementation of detailed plans using fresh agents per task and mandatory code review between tasks.

## Overview

Executing Plans bridges planning and delivery through systematic, quality-gated execution. Each task runs in isolation with independent review, preventing context pollution and ensuring consistent quality.

**Core Pattern**: Fresh subagent per task + review between tasks = high quality, fast iteration

## When to Use

- Executing plans created with [Writing Plans](/claudekit/skills/methodology/writing-plans) skill
- Staying in current session with independent tasks
- Wanting quality gates without human delays
- Systematic implementation with verification

## When NOT to Use

- Plan needs review first (use brainstorming)
- Tasks are tightly coupled and need shared context
- Plan requires revision during execution

## The Workflow

### Step 1: Load Plan

```markdown
1. Read the plan file
2. Verify plan is complete and approved
3. Create task tracking with all tasks
4. Set first task to in_progress
```

### Step 2: Execute Task

For each task:

```markdown
1. Dispatch fresh subagent with task details
2. Subagent implements following TDD cycle:
   - Write failing test
   - Verify test fails
   - Implement minimally
   - Verify test passes
   - Commit
3. Subagent returns completion summary
```

### Step 3: Code Review

After each task:

```markdown
1. Dispatch code-reviewer subagent
2. Review scope: only changes from current task
3. Reviewer returns findings:
   - Critical: Must fix before proceeding
   - Important: Should fix before proceeding
   - Minor: Can fix later
```

### Step 4: Handle Review Findings

```markdown
IF Critical or Important issues found:
  1. Dispatch fix subagent for each issue
  2. Re-request code review
  3. Repeat until no Critical/Important issues

IF only Minor issues:
  1. Note for later cleanup
  2. Proceed to next task
```

### Step 5: Mark Complete

```markdown
1. Update task tracking - mark task completed
2. Move to next task
3. Repeat from Step 2
```

### Step 6: Final Review

After all tasks complete:

```markdown
1. Dispatch comprehensive code review
2. Review entire implementation against plan
3. Verify all success criteria met
4. Run full test suite
5. Use finishing-development-branch skill
```

## Critical Rules

### Never Skip Code Reviews

Every task must be reviewed before proceeding. No exceptions.

**Why**: Catches issues when they're easiest to fix.

### Never Proceed with Critical Issues

Critical issues must be fixed immediately:

```
implement → review → fix critical → re-review → proceed
```

**Not**:
```
implement → review → note issue → proceed anyway
```

### Never Run Parallel Implementation

Tasks run sequentially:

```
❌ WRONG: Run Task 1, 2, 3 simultaneously
✅ RIGHT: Run Task 1 → Review → Task 2 → Review → Task 3 → Review
```

**Why**: Each task may depend on previous tasks being correct.

### Always Read Plan Before Implementing

```
❌ WRONG: Start coding based on memory of plan
✅ RIGHT: Read plan file, extract task details, then implement
```

## Subagent Communication

### Implementation Subagent Prompt

```markdown
## Task: Add verified flag to User model

**Context**: Executing plan for Email Verification feature

**Files to modify**:
- Modify: src/models/user.ts
- Test: src/models/user.test.ts

**Steps**:
1. Write failing test for verified flag
2. Verify test fails (run npm test)
3. Add verified field to User model
4. Verify test passes
5. Commit changes

**Requirements**:
- Follow TDD: test first, then implement
- Commit after completion
- Return summary of what was done

**Output expected**:
- Files modified: [list]
- Tests added: [count]
- Commit hash: [hash]
- Any issues encountered: [none or details]
```

### Code Review Subagent Prompt

```markdown
## Code Review Request

**Scope**: Changes from Task 3: Add login endpoint

**Files changed**:
- src/routes/auth.ts
- src/routes/auth.test.ts
- src/middleware/auth.ts

**Review against**:
- Plan requirements for this task
- Code quality standards
- Security best practices
- Test coverage requirements

**Return**:
- Critical issues (must fix before continuing)
- Important issues (should fix before continuing)
- Minor issues (can defer)
- Approval status (approved / needs fixes)
```

## Task Tracking

Track status throughout execution:

```markdown
| Task | Status | Reviewed |
|------|--------|----------|
| Task 1: Create model | completed | ✓ |
| Task 2: Add validation | completed | ✓ |
| Task 3: Create endpoint | in_progress | - |
| Task 4: Add tests | pending | - |
| Task 5: Documentation | pending | - |
```

Status values:
- `pending` - Not started
- `in_progress` - Currently being implemented
- `completed` - Done and reviewed

## Error Handling

### Task Fails

```markdown
1. Capture error details
2. Attempt fix (max 2 retries)
3. If still failing, pause execution
4. Report to user with:
   - Which task failed
   - Error details
   - Suggested resolution
5. Wait for user decision
```

### Review Finds Major Issues

```markdown
1. List all Critical/Important issues
2. Dispatch fix subagent for each
3. Re-run code review
4. If issues persist after 2 cycles:
   - Pause execution
   - Report to user
   - May need plan revision
```

## Activation

### Via Command

```bash
/execute-plan plans/feature-x.md
/execute-plan plans/feature-x.md --parallel-reviews  # Review multiple tasks
```

### From Writing Plans

```bash
/plan "add email verification"
# Plan created at plans/email-verification.md

"Would you like to execute this plan now?"
> Yes

# Begins execution automatically
```

## Example Execution

```markdown
## Plan Execution: Email Verification

### Status: In Progress (Task 3 of 8)

---

### Task 1: Add verified flag ✓
**Implementation**: Completed in 3 minutes
- Added `verified: boolean` field to User model
- Test: user.test.ts (1 new test)
- Commit: a1b2c3d

**Code Review**: Approved
- No issues found
- Test coverage: 100%

---

### Task 2: Create verification token ✓
**Implementation**: Completed in 4 minutes
- Added token generation utility
- Test: token.test.ts (3 new tests)
- Commit: e4f5g6h

**Code Review**: 1 Important issue found
- Issue: Token expiry not validated
- Fix: Added expiry check
- Re-review: Approved

---

### Task 3: Send verification email ⏳
**Status**: Implementation in progress...
```

## Completion Checklist

Before declaring plan execution complete:

- [ ] All tasks marked completed
- [ ] All code reviews passed
- [ ] Full test suite passes
- [ ] No Critical issues outstanding
- [ ] No Important issues outstanding
- [ ] Final comprehensive review done
- [ ] Ready for branch cleanup/merge

## Integration with Other Skills

### From Writing Plans

```bash
# 1. Create plan
/plan "feature X"

# 2. Execute plan
/execute-plan plans/feature-x.md
```

### With TDD

Every task implementation follows [TDD](/claudekit/skills/methodology/tdd):
1. Write failing test
2. Verify it fails
3. Implement minimally
4. Verify it passes

### With Code Review

Automatic [code review](/claudekit/skills/methodology/code-review) after each task:
- Categorizes issues (Critical/Important/Minor)
- Enforces fixes before proceeding
- Maintains code quality

### With Verification

Uses [verification before completion](/claudekit/skills/methodology/verification):
- Never claims completion without proof
- Runs tests to verify
- Checks actual output

## Best Practices

### Review Scope

Keep review focused on current task:

```
✅ "Review changes in src/auth.ts from Task 5"
❌ "Review the entire codebase"
```

### Fresh Agents

Each task gets a clean slate:

```
Task 1 Agent: Focuses only on Task 1
Task 2 Agent: No memory of Task 1 details
Task 3 Agent: No memory of Task 1 or 2
```

**Benefit**: No context pollution, clearer focus.

### Incremental Quality

Fix issues immediately:

```
Task → Review → Issues Found → Fix → Re-review → Pass → Next Task
```

**Not**:
```
Task 1 → Issues noted
Task 2 → More issues noted
Task 3 → Try to fix all issues (context lost)
```

## Common Patterns

### Standard Task

```markdown
1. Load task from plan
2. Dispatch implementation agent
3. Agent implements with TDD
4. Agent commits
5. Dispatch review agent
6. If approved → next task
7. If issues → fix → re-review
```

### Error Recovery

```markdown
1. Task fails
2. Capture error
3. Attempt automatic fix
4. If fix works → review → proceed
5. If fix fails → pause → report to user
```

### Quality Gate

```markdown
After each task:
1. Code review categorizes issues
2. Critical → Must fix (block)
3. Important → Should fix (block)
4. Minor → Note for later (allow)
```

## Troubleshooting

### Task Keeps Failing

```markdown
Problem: Task 5 fails 3 times

Actions:
1. STOP execution
2. Review task requirements
3. Check if plan needs adjustment
4. May need to revise approach
5. Consult user before continuing
```

### Review Never Passes

```markdown
Problem: Task 2 reviewed 3 times, still has issues

Actions:
1. PAUSE execution
2. Review the review feedback
3. May indicate plan gap
4. May need design discussion
5. Don't iterate endlessly
```

### Tests Pass Individually, Fail Together

```markdown
Problem: Each task's tests pass, but full suite fails

Actions:
1. Identify test interdependencies
2. Fix test isolation
3. May need test setup/teardown improvements
4. Run full suite after each task (not just new tests)
```

## Next Steps

After plan execution completes:

1. **Final verification**: Run full test suite
2. **Cleanup**: Address Minor issues noted during reviews
3. **Documentation**: Update docs if needed
4. **Branch finishing**: Use finishing-development-branch skill

## Related Skills

- [Writing Plans](/claudekit/skills/methodology/writing-plans) - Create plans to execute
- [TDD](/claudekit/skills/methodology/tdd) - Test-first implementation
- [Code Review](/claudekit/skills/methodology/code-review) - Quality gates
- [Verification](/claudekit/skills/methodology/verification) - Prove completion
