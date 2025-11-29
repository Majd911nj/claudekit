---
title: /execute-plan
description: Execute detailed implementation plans using subagents with code review gates
---

# /execute-plan

Execute a detailed implementation plan using fresh subagents per task with mandatory code review gates between tasks.

## Purpose

The `/execute-plan` command automates plan execution while maintaining high quality through systematic code reviews. It spawns fresh subagents for each task, preventing context pollution and ensuring focused implementation.

## Usage

```bash
/execute-plan [plan-file-path]
```

## Arguments

- **plan-file-path**: Path to the plan file (created with `/plan --detailed`)

## Core Pattern

**"Fresh subagent per task + review between tasks = high quality, fast iteration"**

### Why Fresh Agents?

- Prevents context pollution between tasks
- Each task gets focused attention
- Failures don't cascade to other tasks
- Easier to retry individual tasks

### Why Code Review Between Tasks?

- Catches issues early before they compound
- Ensures code matches intent
- Prevents technical debt accumulation
- Creates natural checkpoints for rollback

## How It Works

### Step 1: Load Plan

1. Reads the plan file
2. Verifies plan is complete and approved
3. Creates TodoWrite tracking with all tasks
4. Sets first task to `in_progress`

### Step 2: Execute Task (For Each Task)

For each task in the plan:

1. **Dispatch fresh subagent** with task details
2. **Subagent implements** following TDD cycle:
   - Write failing test
   - Verify test fails
   - Implement minimally
   - Verify test passes
   - Commit changes
3. **Subagent returns** completion summary

### Step 3: Code Review

After each task completes:

1. Dispatch code-reviewer subagent
2. Review scope: **only changes from current task**
3. Reviewer returns findings categorized as:
   - **Critical**: Must fix before proceeding
   - **Important**: Should fix before proceeding
   - **Minor**: Can fix later

### Step 4: Handle Review Findings

```
IF Critical or Important issues found:
  1. Dispatch fix subagent for each issue
  2. Re-request code review
  3. Repeat until no Critical/Important issues

IF only Minor issues:
  1. Note for later cleanup
  2. Proceed to next task
```

### Step 5: Mark Complete

1. Update TodoWrite - mark task completed
2. Move to next task
3. Repeat from Step 2

### Step 6: Final Review

After all tasks complete:

1. Dispatch comprehensive code review
2. Review entire implementation against plan
3. Verify all success criteria met
4. Run full test suite
5. Use `finishing-development-branch` skill

## Critical Rules

### Never Skip Code Reviews

Every single task must be reviewed before proceeding. No exceptions.

### Never Proceed with Critical Issues

Critical issues must be fixed immediately:
```
implement → review → fix critical → re-review → proceed
```

### Never Run Parallel Implementation

Tasks run **sequentially**, one at a time:
```
WRONG: Run Task 1, 2, 3 simultaneously
RIGHT: Task 1 → Review → Task 2 → Review → Task 3 → Review
```

### Always Read Plan Before Implementing

```
WRONG: Start coding based on memory of plan
RIGHT: Read plan file, extract task details, then implement
```

## Error Handling

### When a Task Fails

1. Capture error details
2. Attempt fix (max 2 retries)
3. If still failing:
   - Pause execution
   - Report to user with:
     - Which task failed
     - Error details
     - Suggested resolution
   - Wait for user decision

### When Review Finds Major Issues

1. List all Critical/Important issues
2. Dispatch fix subagent for each
3. Re-run code review
4. If issues persist after 2 cycles:
   - Pause execution
   - Report to user
   - May need plan revision

## Output

### Progress Updates

During execution, you see real-time progress:

```markdown
## Execution Progress

### Task 1: Create User model ✓
- Files modified: src/models/user.ts
- Tests added: 3
- Review: Passed

### Task 2: Add validation ✓
- Files modified: src/models/user.ts
- Tests added: 2
- Review: Passed (1 minor deferred)

### Task 3: Create endpoint [IN PROGRESS]
- Status: Implementing...
```

### Completion Summary

When execution completes:

```markdown
## Execution Complete

### Summary
- Tasks completed: 8/8
- Tests added: 24
- Coverage: 92%

### Files Created
- src/models/user.ts
- src/services/user-service.ts
- src/routes/user.ts

### Files Modified
- src/routes/index.ts
- src/types/index.ts

### Deferred Items
- Minor: Variable rename in user-service.ts line 12

### Next Steps
- Run full test suite
- Use /ship to create PR
```

## Prerequisites

Before using this command:

1. **Plan file exists** and is complete
2. **Plan was created** with `/plan --detailed`
3. **Plan has been reviewed** and approved
4. **Tests can be run** (`npm test` or `pytest` works)

## Examples

### Execute a Saved Plan

```bash
/execute-plan plans/user-authentication.md
```

Executes the detailed plan from the specified file.

### After Creating a Plan

```bash
# Step 1: Create detailed plan
/plan --detailed --save=plans/oauth.md "implement OAuth2 authentication"

# Step 2: Execute the plan
/execute-plan plans/oauth.md
```

Complete workflow from planning to automated execution.

### Resume After Pause

If execution pauses due to an error:

```bash
# Fix the issue manually, then resume
/execute-plan --resume plans/oauth.md
```

Resumes from the last completed task.

## Best Practices

### Before Execution

1. **Review the plan** - Make sure it's accurate
2. **Check environment** - Tests run, dependencies installed
3. **Clean working directory** - Commit or stash changes
4. **Set aside time** - Don't interrupt during execution

### During Execution

1. **Monitor progress** - Watch for warnings or issues
2. **Don't interrupt** - Let tasks complete
3. **Review deferred items** - Note minor issues for cleanup

### After Execution

1. **Run full test suite** - Verify everything works
2. **Review deferred issues** - Fix minor items
3. **Manual testing** - Test critical paths
4. **Create PR** - Use `/ship` command

## Workflow Integration

### Complete Feature Development Flow

```bash
# 1. Brainstorm design
/brainstorm "user authentication system"

# 2. Create detailed plan
/plan --detailed --save=plans/auth.md "implement authentication from design"

# 3. Execute plan with automation
/execute-plan plans/auth.md

# 4. Ship to production
/ship "feat: add user authentication system"
```

### Plan Review Flow

```bash
# 1. Create plan
/plan --detailed --save=plans/feature.md "feature description"

# 2. Review plan with team
/review plans/feature.md

# 3. Execute reviewed plan
/execute-plan plans/feature.md
```

## Troubleshooting

### "Plan file not found"
- Check the file path is correct
- Use absolute paths or paths relative to repo root

### "Plan not detailed enough"
- Plan must be created with `--detailed` flag
- Regular plans need manual execution

### "Tests failing during execution"
- Check test environment is set up correctly
- Verify dependencies are installed
- May need to fix plan or environment

### "Code review keeps failing"
- Review the critical issues being reported
- May need to revise the plan
- Consider pausing and fixing manually

## Related Commands

- [/plan](/claudekit/commands/plan) - Create detailed plans for execution
- [/brainstorm](/claudekit/commands/brainstorm) - Design features before planning
- [/ship](/claudekit/commands/ship) - Create PR after execution
- [/review](/claudekit/commands/review) - Review code or plans

## Customization

Execution behavior can be customized via `CLAUDE.md`:
- Review strictness levels
- Retry counts for failures
- Parallel task limits
- TDD enforcement

See the [Configuration Guide](/claudekit/configuration) for details.
