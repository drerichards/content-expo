# Verification Directory

**What's here**: Automated checks for code quality and architectural compliance

---

## Quick Start

```bash
# Run all verification gates
.claude/verification/run-gates.sh

# Exit codes:
# 0 = All gates pass (green)
# 1 = Red gate failed (must fix)
# 2 = Yellow gate warned (should address)
```

---

## The Gate System

### Red Gates (Must Pass) 🔴

**These BLOCK progress. Fix immediately.**

| Gate | What It Checks | Why It Matters |
|------|----------------|----------------|
| TypeScript | `npx tsc --noEmit` | Type safety, prevents runtime errors |
| Build | `npm run build` | Production deployability |
| BBA: Shared→Features | No upward imports | Prevents architectural violations |
| BBA: Features→Interface | No upward imports | Maintains layer boundaries |
| BBA: Cross-feature | No horizontal coupling | Feature independence |

**When a red gate fails:**
1. ❌ STOP - Do not proceed
2. 🔍 Review the specific error
3. 🛠️ Fix the violation (use workflows in `.claude/skills/`)
4. ✅ Re-run verification
5. ➡️ Only proceed when green

**Example red gate failure:**
```
🔴 TypeScript type check... ✗ FAIL

TypeScript errors detected:
src/features/bookmark/api/bookmarkService.ts(1,15): error TS2305: 
Module '"@/types"' has no exported member 'Bookmark'.
```

**How to fix:** Use `.claude/skills/fix-typescript-import-error.md`

---

### Yellow Gates (Should Pass) 🟡

**These WARN. Address when convenient, or document why proceeding.**

| Gate | What It Checks | Why It Matters |
|------|----------------|----------------|
| ESLint | Code style, best practices | Maintainability |
| Debug Code | `console.log` in features | Production readiness |
| File Size | Files >200 lines | Complexity management |
| Unused Code | Unused imports/exports | Clean codebase |

**When a yellow gate warns:**
1. ⚠️ NOTE the warning
2. 🤔 Decide: fix now or defer?
3. 📝 Document if deferring (commit message or TODO)
4. ➡️ OK to proceed

**Example yellow gate warning:**
```
🟡 Debug code check (console.log)... ⚠ WARN (3 console.log found)

Debug console.log statements found:
src/features/bookmark/hooks/useBookmarks.ts:42:    console.log('Bookmarks updated:', newBookmarks);
```

**How to fix:** Remove debug statements before final commit

---

## Understanding Output

### All Gates Pass ✅
```
✅ VERIFICATION PASSED - All gates green

Codebase is healthy. Safe to proceed with:
- Committing changes
- Creating pull requests  
- Deploying to production
```

**What this means:**
- Architecture is clean
- Types are correct
- Code compiles
- No violations detected

**What to do:** Proceed with confidence

---

### Red Gate Failed 🛑
```
🛑 VERIFICATION FAILED - Red gates must pass before proceeding

Next steps:
1. Review failures above
2. Fix red gate violations (see CLAUDE.md for rules)
3. Re-run: .claude/verification/run-gates.sh
```

**What this means:**
- Critical architectural or type issue
- Cannot safely proceed
- Must fix before continuing

**What to do:**
1. Read the error message carefully
2. Identify which workflow applies (see `.claude/skills/README.md`)
3. Follow the workflow step-by-step
4. Re-run gates after fix

---

### Yellow Gate Warned ⚠️
```
⚠️  VERIFICATION PASSED WITH WARNINGS

Yellow gates warned but you can proceed. Consider addressing:
- Lint warnings before final commit
- Debug code before production deploy
- Large files when convenient
```

**What this means:**
- No critical issues
- Quality concerns noted
- Safe to proceed but should address

**What to do:**
- Fix before final commit (best)
- OR document why deferring
- OR address in follow-up PR

---

## When to Run Verification

### Always Run After:
- [ ] Fixing a TypeScript error
- [ ] Adding a new feature
- [ ] Refactoring components
- [ ] Before committing changes
- [ ] Before creating a pull request

### Run Frequently During:
- [ ] Multi-step workflows (after each major step)
- [ ] Large refactors (verify incrementally)
- [ ] Learning (confirm understanding)

### Run Before:
- [ ] Deploying to production
- [ ] Merging to main branch
- [ ] Sharing code with team

---

## Gate Details

### Red Gate 1: TypeScript Type Check

**Command:** `npx tsc --noEmit`

**What it catches:**
- Missing type definitions
- Type mismatches at boundaries
- Incorrect imports
- Type safety violations

**Common failures:**
```
error TS2305: Module has no exported member 'X'
→ Use: fix-typescript-import-error.md

error TS2339: Property 'X' does not exist on type 'Y'  
→ Use: add-missing-type-definition.md

error TS2345: Argument of type 'A' is not assignable to parameter of type 'B'
→ Use: fix-type-mismatch.md
```

---

### Red Gate 2: Build

**Command:** `npm run build`

**What it catches:**
- Compilation errors
- Module resolution failures
- Build configuration issues
- Production blockers

**Common failures:**
```
Module not found: Can't resolve './path/to/file'
→ Check import paths, ensure file exists

Build optimization failed
→ Check for circular dependencies, large bundles
```

---

### Red Gate 3-5: BBA Compliance

**Commands:**
```bash
# Shared importing from Features
grep -r "from.*@/features" src/shared/

# Features importing from Interface  
grep -r "from.*@/interface" src/features/

# Cross-feature imports
grep -r "from.*@/features/" src/features/
```

**What it catches:**
- Upward dependencies (architectural violations)
- Cross-feature coupling (horizontal violations)
- Layer boundary breaches

**Common failures:**
```
src/shared/ui/components/Results/index.tsx:
import { ArticleCard } from "@/features/article/components";

→ Violation: Shared importing from Features (upward)
→ Fix: Move component or pass via props
```

**How to fix:** See CLAUDE.md → THE DECISION TREES → "I Need to Import Something"

---

### Yellow Gate 1: ESLint

**Command:** `npm run lint`

**What it catches:**
- Code style violations
- Best practice issues
- Unused variables/imports
- Potential bugs (not caught by TS)

**Common warnings:**
```
'x' is defined but never used
→ Remove unused code

Missing return type on function
→ Add explicit return type
```

---

### Yellow Gate 2: Debug Code

**Command:** `grep -r "console.log" src/features/ src/interface/`

**What it catches:**
- Leftover debug statements
- Console pollution
- Non-production code

**Why it matters:**
- Debug code in production = unprofessional
- Console spam = harder to debug real issues
- Performance impact (minor but real)

**Legitimate exceptions:**
- Error logging: `console.error` (not flagged)
- Monitoring: Structured logging libraries
- Development utilities: In `src/shared/utils/dev.ts`

---

### Yellow Gate 3: File Size

**Command:** `find src/ -name "*.tsx" | xargs wc -l | awk '$1 > 200'`

**What it catches:**
- Overly complex components
- God objects
- Missing decomposition

**Why it matters:**
- Files >200 lines harder to reason about
- Usually indicates multiple responsibilities
- Harder to test, harder to review

**When >200 lines is OK:**
- Integration/orchestration hubs (state management)
- Complex forms with validation (temporary)
- Mock data files

---

## Customizing Verification

### Add New Gates

Edit `.claude/verification/run-gates.sh`:

```bash
# RED GATE X: Your New Check
echo -n "🔴 Your check description... "
if your_command; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
    RED_FAILURES=$((RED_FAILURES + 1))
fi
```

### Disable a Gate Temporarily

Comment out the gate (add `#` at start of lines):

```bash
# RED GATE 5: BBA - Cross-feature imports
# echo -n "🔴 BBA: Cross-feature imports... "
# ... (rest of gate)
```

**⚠️ Warning:** Only disable temporarily during active refactoring. Re-enable before commit.

### Change Gate Severity

Move a gate between red and yellow sections:
- Red → Yellow: Change `RED_FAILURES` to `YELLOW_WARNINGS`
- Yellow → Red: Change `YELLOW_WARNINGS` to `RED_FAILURES`

---

## Integration with Workflows

### Workflow Pattern

Every workflow in `.claude/skills/` includes verification:

```markdown
### Step 4: Make Change
[... instructions ...]

**Verification**:
```bash
npx tsc --noEmit  # Should pass
```

### Step 5: Next Step
[... continues ...]
```

### After Workflow Completion

Every workflow ends with:

```markdown
## Verification Gates

**After completing all steps, run these checks:**

```bash
.claude/verification/run-gates.sh
```
```

**This ensures:**
- Each step is verified incrementally
- Final state passes all gates
- No regressions introduced

---

## Troubleshooting

### Gates Pass Locally But Fail in CI

**Possible causes:**
- Environment differences (Node version, dependencies)
- Uncommitted files not in CI
- CI has stricter TypeScript config

**Solution:**
- Check `tsconfig.json` matches CI
- Ensure all dependencies in `package.json`
- Test in clean environment (docker or fresh clone)

---

### Gates Fail But I Don't Understand Why

**Steps:**
1. Read the full error output (don't skim)
2. Check which specific file/line failed
3. Look up the error in `.claude/skills/README.md`
4. Follow the recommended workflow
5. If still stuck, document the blocker and ask for help

---

### Gates Take Too Long

**Current timing:**
- Red gates: ~30-60 seconds
- Yellow gates: ~10-20 seconds
- Total: ~60-90 seconds

**If slower:**
- Check `node_modules` size (may need clean install)
- Check for hung processes (`npx tsc` stuck)
- Consider running subsets for faster feedback:
  ```bash
  # Just TypeScript
  npx tsc --noEmit
  
  # Just BBA checks
  grep -r "from.*@/features" src/shared/
  ```

---

## CI/CD Integration (Future)

When ready for automated CI/CD:

```yaml
# .github/workflows/verify.yml
name: Verification Gates

on: [push, pull_request]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: .claude/verification/run-gates.sh
```

**This will:**
- Run gates on every push
- Block PRs if red gates fail
- Warn if yellow gates fail
- Protect main branch

---

## Evolution

### Phase 1 (Current)
- Manual execution
- Local verification
- Learning tool

### Phase 2 (After workflows mastered)
- Pre-commit hook (auto-run on `git commit`)
- Watch mode (re-run on file change)
- Slack/email notifications on failure

### Phase 3 (Production)
- CI/CD integration
- Deployment gates
- Performance budgets
- Security scanning

---

## Quick Reference

```bash
# Run all gates
.claude/verification/run-gates.sh

# Run specific checks manually
npx tsc --noEmit                                    # TypeScript
npm run build                                        # Build
grep -r "from.*@/features" src/shared/              # BBA Shared→Features
grep -r "from.*@/interface" src/features/           # BBA Features→Interface  
npm run lint                                         # Lint
grep -r "console.log" src/features/ src/interface/  # Debug code

# Check script status
echo $?  # 0=pass, 1=red fail, 2=yellow warn

# View script source
cat .claude/verification/run-gates.sh
```

---

## Success Criteria

You're using verification effectively when:
- ✅ Run gates after every meaningful change
- ✅ Red gates = immediate fix (no proceeding)
- ✅ Yellow gates = noted and addressed
- ✅ Rarely surprised by CI failures
- ✅ Confidence in code quality before commit

**The gate system is your safety net. Trust it, use it, improve it.**
