---
title: Creating Custom Commands
description: Learn how to create custom slash commands for your project-specific workflows.
---

# Creating Custom Commands

Custom commands let you automate project-specific workflows with simple slash commands. This guide shows you how to create commands that integrate seamlessly with Claude Kit.

## Command File Structure

Commands are markdown files in `.claude/commands/`:

```
.claude/commands/
├── your-command.md      # /your-command
├── deploy-prod.md       # /deploy-prod
└── weekly-report.md     # /weekly-report
```

The filename (without `.md`) becomes the command name.

## Command Template

Here's the complete template for a command file:

```markdown
# /command-name - Short Description

## Purpose

Brief description of what this command does and why it exists.

## Usage

\`\`\`
/command-name [arguments]
\`\`\`

## Arguments

- `$ARGUMENTS`: Description of what arguments this command accepts

---

Execute workflow for: **$ARGUMENTS**

## Workflow

### Phase 1: First Step

Description of what happens in this phase.

1. **Task 1**
   - Details about task 1
   - What to check or do

2. **Task 2**
   - Details about task 2
   - Expected outcomes

### Phase 2: Second Step

Description of next phase.

1. **Task 1**
   - Details
   - Actions

## Output

Describe what the command should produce:

\`\`\`markdown
## [Command Name] Complete

### Summary
[What was done]

### Results
- Item 1
- Item 2

### Next Steps
1. Next action
2. Another action
\`\`\`

## Example

**Input**: `/command-name example input`

**Output**: Description of what happens with this example

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--flag-name` | What this flag does | `--flag-name=value` |

<!-- CUSTOMIZATION POINT -->
## Variations

Optional section for project-specific variations.
```

## Command Anatomy

### 1. Header Section

```markdown
# /deploy - Deploy Application

## Purpose

Deploy the application to specified environment with pre-deployment checks,
database migrations, and post-deployment verification.
```

The header includes:

- **Title**: Command name and one-line description
- **Purpose**: Detailed explanation of what and why

### 2. Usage Section

```markdown
## Usage

\`\`\`
/deploy [environment] [--skip-tests]
\`\`\`

## Arguments

- `environment`: Target environment (staging, production)
- `--skip-tests`: Skip running tests before deployment
```

Define:

- How to invoke the command
- What arguments it accepts
- Optional flags

### 3. Separator Line

```markdown
---

Deploy to **$ARGUMENTS** environment:
```

The `---` separator is important:

- Everything above is documentation
- Everything below is the instruction Claude executes
- Use `$ARGUMENTS` to inject user input

### 4. Workflow Section

```markdown
## Workflow

### Phase 1: Pre-deployment Checks

1. **Verify Environment**
   - Check environment exists
   - Verify credentials
   - Confirm deployment is allowed

2. **Run Tests**
   - Execute full test suite
   - Check code coverage
   - Fail if tests don't pass
```

Break down the command into:

- Logical phases
- Numbered steps within phases
- Clear success criteria

### 5. Output Section

```markdown
## Output

\`\`\`markdown
## Deployment Complete

### Environment
Production

### Changes Deployed
- API v2.3.1
- Database migration: add_user_preferences
- Updated 15 files

### Verification
- Health check: ✓ Passed
- Smoke tests: ✓ Passed

### Rollback Command
/rollback production v2.3.0
\`\`\`
```

Show what the successful output should look like.

### 6. Examples Section

```markdown
## Example

**Input**: `/deploy production`

**Output**:
1. Runs test suite (2 min)
2. Builds production bundle (1 min)
3. Deploys to production servers
4. Runs smoke tests
5. Reports deployment status
```

Provide concrete examples of usage.

### 7. Flags Section

```markdown
## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--skip-tests` | Skip pre-deployment tests | `/deploy staging --skip-tests` |
| `--force` | Force deployment without confirmation | `/deploy prod --force` |
| `--rollback` | Rollback to previous version | `/deploy prod --rollback` |
```

Document all available flags.

## Complete Example: Custom Deploy Command

Here's a real-world example:

```markdown
# /deploy - Deploy Application

## Purpose

Deploy the application to specified environment with automated checks,
database migrations, and verification steps.

## Usage

\`\`\`
/deploy [environment]
\`\`\`

## Arguments

- `environment`: Target environment (staging, production)

---

Deploy to **$ARGUMENTS** environment:

## Workflow

### Phase 1: Pre-deployment Checks

1. **Verify Environment Configuration**
   - Check `.env.[environment]` file exists
   - Verify required secrets are set
   - Confirm environment is accessible

2. **Run Test Suite**
   ```bash
   pnpm test
   pnpm test:e2e
   ```
   - All tests must pass
   - Coverage must be >= 80%

3. **Check for Breaking Changes**
   - Review CHANGELOG.md
   - Identify migration requirements
   - Confirm database backup exists

### Phase 2: Build

1. **Build Production Bundle**
   ```bash
   pnpm build
   ```
   - Verify build completes without errors
   - Check bundle size
   - Validate output directory

2. **Run Database Migrations**
   ```bash
   pnpm migrate:$ARGUMENTS
   ```
   - Apply pending migrations
   - Verify migration success
   - Create rollback script

### Phase 3: Deploy

1. **Deploy to Environment**
   ```bash
   pnpm deploy:$ARGUMENTS
   ```
   - Upload built assets
   - Update environment variables
   - Restart services

2. **Health Checks**
   - Wait for services to start (30s)
   - Verify API health endpoint
   - Check database connectivity

### Phase 4: Verification

1. **Run Smoke Tests**
   ```bash
   pnpm smoke:$ARGUMENTS
   ```
   - Test critical user paths
   - Verify external integrations
   - Check error rates

2. **Monitor Deployment**
   - Check application logs for errors
   - Monitor performance metrics
   - Verify no spike in error rate

### Phase 5: Documentation

1. **Update Deployment Log**
   - Record deployment time
   - Note version deployed
   - List any manual steps taken

2. **Notify Team**
   - Post to Slack #deployments channel
   - Include deployment summary
   - Provide rollback instructions

## Output

\`\`\`markdown
## Deployment Complete: $ARGUMENTS

### Version
v2.3.1 (commit: abc1234)

### Deployment Time
2024-01-15 14:30 UTC (Duration: 4m 32s)

### Changes Deployed
- Feature: User profile redesign
- Fix: Payment processing timeout
- Database: Migration #045 (add_user_preferences)

### Verification Results
- Health Check: ✓ Passed
- Smoke Tests: ✓ All passed (12/12)
- Error Rate: 0.01% (normal)

### Rollback Command
If issues arise, rollback with:
\`/rollback $ARGUMENTS v2.3.0\`

### Monitoring
- Dashboard: https://monitoring.example.com
- Logs: https://logs.example.com
\`\`\`

## Example

**Input**: `/deploy production`

**Output**:
1. Runs full test suite (3 min)
2. Builds production bundle (2 min)
3. Applies database migrations (30s)
4. Deploys to production cluster (1 min)
5. Runs smoke tests (1 min)
6. Posts deployment notification to Slack
7. Provides rollback command

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--skip-tests` | Skip test suite (not recommended for production) | `--skip-tests` |
| `--skip-migrations` | Skip database migrations | `--skip-migrations` |
| `--dry-run` | Simulate deployment without executing | `--dry-run` |
| `--force` | Skip confirmation prompts | `--force` |

### Flag Usage

```bash
/deploy staging --skip-tests          # Deploy to staging without tests
/deploy production --dry-run          # Simulate production deployment
/deploy production --skip-migrations  # Deploy without DB changes
```

<!-- CUSTOMIZATION POINT -->
## Project-Specific Variations

Modify the workflow based on your deployment strategy:

- Add CDN cache invalidation steps
- Include blue-green deployment logic
- Add feature flag configuration
- Include monitoring alert setup
```

## Best Practices

### 1. Keep Commands Focused

Each command should do ONE thing well:

```markdown
# Good: Focused commands
/deploy [env]           # Just deployment
/migrate [env]          # Just migrations
/rollback [env]         # Just rollback

# Bad: Doing too much
/deploy-and-test-and-notify [env]
```

### 2. Use Clear Phase Names

```markdown
# Good: Clear phases
### Phase 1: Pre-deployment Checks
### Phase 2: Build and Test
### Phase 3: Deploy

# Bad: Vague phases
### Phase 1: Setup
### Phase 2: Main stuff
### Phase 3: Finish
```

### 3. Provide Verification Steps

```markdown
## Workflow

### Phase 2: Build

1. **Build Application**
   ```bash
   pnpm build
   ```

   **Verification**:
   - Check `dist/` folder exists
   - Verify no build errors in output
   - Confirm bundle size < 500KB
```

### 4. Include Error Handling

```markdown
### Phase 3: Deploy

1. **Deploy to Server**
   - Upload build artifacts

   **If deployment fails**:
   - Check server connectivity
   - Verify deployment credentials
   - Review server logs at `/var/log/app.log`
   - Consider using `--force` flag
```

### 5. Add Real Examples

```markdown
## Example

**Scenario**: Deploy new feature to staging

**Input**: `/deploy staging`

**What happens**:
1. ✓ Tests pass (2m 15s)
2. ✓ Build succeeds (45s)
3. ✓ Migrations applied (2 migrations)
4. ✓ Deployment complete (30s)
5. ✓ Smoke tests pass (5/5)

**Output**: Deployment summary with rollback command
```

## Common Command Patterns

### Pattern 1: Multi-Step Workflow

```markdown
# /release - Create Release

## Workflow

### Phase 1: Prepare
1. Verify clean working directory
2. Pull latest changes
3. Run full test suite

### Phase 2: Version
1. Bump version number
2. Update CHANGELOG.md
3. Commit version changes

### Phase 3: Release
1. Create git tag
2. Push to remote
3. Trigger CI/CD pipeline

### Phase 4: Verify
1. Wait for CI build
2. Verify release artifacts
3. Post release notes
```

### Pattern 2: Interactive Workflow

```markdown
# /onboard - Onboard New Team Member

## Workflow

### Phase 1: Environment Setup
1. **Ask for GitHub username**
   - Add to organization
   - Add to relevant teams

2. **Ask for preferred IDE**
   - Provide setup instructions
   - Share configuration files
```

### Pattern 3: Conditional Workflow

```markdown
# /optimize - Optimize Performance

## Workflow

### Phase 1: Analyze
1. Run performance profiler
2. Identify bottlenecks

   **If database is bottleneck**:
   - Go to Phase 2: Database Optimization

   **If API is bottleneck**:
   - Go to Phase 3: API Optimization
```

## Testing Your Command

After creating a command, test it:

1. **Invoke it**: `/your-command test input`
2. **Verify behavior**: Check that Claude follows the workflow
3. **Test flags**: Try each flag combination
4. **Check output**: Ensure output matches template

## Next Steps

- [Create Custom Modes](/claudekit/customization/creating-modes/) — Define behavioral patterns
- [Create Custom Skills](/claudekit/customization/creating-skills/) — Add knowledge modules
- [Configure CLAUDE.md](/claudekit/customization/claude-md/) — Set project standards

## Examples to Study

Check these built-in commands for inspiration:

- `/feature` — Complex multi-phase workflow
- `/fix` — Debugging workflow with error handling
- `/ship` — Git workflow automation
- `/tdd` — Methodology-driven development
