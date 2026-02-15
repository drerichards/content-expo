# Workflow Template

**Copy this template when creating a new workflow. Workflows live in `.claude/skills/`**

---

# Workflow: {Name in Action Form}

**Version**: 1.0  
**Created**: YYYY-MM-DD  
**Last Updated**: YYYY-MM-DD  
**Status**: Draft | Active | Deprecated  
**Estimated Time**: {X minutes/hours}  
**Complexity**: Low | Medium | High

---

## Objective

**What does this workflow accomplish?**

State the goal in one sentence:
> "This workflow {achieves X} by {doing Y}, resulting in {Z}."

**Why does this workflow exist?**
- What problem does it solve?
- What pattern does it codify?
- What repetitive task does it automate?

---

## Prerequisites

**Before starting this workflow, verify:**

### Required Knowledge
- [ ] Understand BBA layer rules (see CLAUDE.md → THE LAYERS)
- [ ] Understand state tree model (see CLAUDE.md → State Management)
- [ ] Familiar with {specific concept this workflow requires}

### Required Context
- [ ] All TypeScript errors resolved (run `npx tsc --noEmit`)
- [ ] No uncommitted changes (run `git status`)
- [ ] Feature {X} is working (run `npm run dev` and verify)

### Required Tools
- [ ] Dependencies installed (`npm install` completed)
- [ ] Development server can start (`npm run dev` works)
- [ ] Verification script is executable (`.claude/verification/run-gates.sh`)

**If any prerequisite fails, STOP. Resolve it before proceeding.**

---

## Architecture Context

**What BBA rules apply to this workflow?**

Identify the layers involved:
```
Current Layer: {Layer name - Rendering/Styling/Composition/Product}
Target Layer: {Layer name if different}
Import Direction: {Downward/Same-level/Cross-feature/etc}
```

**What state management patterns apply?**
- Hub location: {Where does state live?}
- Props flow: {Downward from where?}
- Event bubbling: {Upward to where?}

**Relevant CLAUDE.md sections**:
- {Link to specific section(s)}

---

## Steps

### Step 1: {Action Verb + What}

**What**: Brief description of what this step accomplishes

**Why**: Why this step is necessary (connects to overall objective)

**How**:
1. Specific action 1
   ```bash
   # Command if applicable
   ```
2. Specific action 2
   ```typescript
   // Code example if applicable
   ```
3. Specific action 3

**Files affected**:
- `path/to/file1.ts` — {what changes}
- `path/to/file2.tsx` — {what changes}

**Verification** (run after this step):
```bash
{Command to verify this step worked}
```

**Expected output**:
```
{What success looks like}
```

**If verification fails**:
- Check: {Common mistake 1}
- Check: {Common mistake 2}
- Fallback: {What to do if still stuck}

---

### Step 2: {Action Verb + What}

{Same structure as Step 1}

---

### Step 3: {Action Verb + What}

{Same structure as Step 1}

---

{Add more steps as needed}

---

## Verification Gates

**After completing all steps, run these checks:**

### Red Gates (must pass)
```bash
# TypeScript type check
npx tsc --noEmit
# Expected: No errors

# Build
npm run build
# Expected: Build succeeds

# BBA: Upward dependency check
grep -r "from.*@/features" src/shared/
# Expected: Zero matches

# {Add workflow-specific red gates}
```

**If any red gate fails**: STOP, fix the issue, re-run verification.

### Yellow Gates (should pass)
```bash
# Lint check
npm run lint
# Expected: No warnings (or documented exceptions)

# Debug code check
grep -r "console.log" src/features/ src/interface/ --include="*.ts" --include="*.tsx"
# Expected: Zero matches

# {Add workflow-specific yellow gates}
```

**If any yellow gate fails**: Document why proceeding (in commit message or TODO).

---

## Expected Output

**What artifacts are created?**
- [ ] New file: `path/to/new/file.ts`
- [ ] Modified file: `path/to/existing/file.tsx`
- [ ] New test: `path/to/test/file.test.ts`
- [ ] ADR: `.claude/decisions/ADR-XXX-{title}.md`

**What should work differently?**
- User action: {What user can now do}
- System behavior: {What happens automatically}
- Developer experience: {What's easier for developers}

**How to verify the output manually**:
1. Start dev server: `npm run dev`
2. Navigate to: {URL}
3. Perform action: {What to click/type}
4. Observe: {Expected behavior}

---

## Failure Recovery

**Common failures and solutions:**

### Failure 1: {Specific error or issue}
**Symptoms**:
- Error message: `{exact error text}`
- Or behavior: {what's wrong}

**Root cause**: {Why this happens}

**Solution**:
1. Action to resolve
2. Command to verify resolution
3. Resume workflow at: Step {X}

### Failure 2: {Another common issue}
{Same structure}

**General recovery strategy**:
If stuck and not covered above:
1. Check CLAUDE.md decision trees for guidance
2. Review related ADRs in `.claude/decisions/`
3. Search pattern library in `.claude/patterns/`
4. If still stuck: Document the blocker and ask for architectural guidance

---

## Teaching Moment

**What architectural principle does this workflow demonstrate?**

Example:
> This workflow demonstrates **separation of concerns** by extracting feature-specific types from shared types. It shows how to maintain clean boundaries in BBA by ensuring features own their domain-specific contracts.

**What pattern is being practiced?**
- Pattern name: {e.g., "Feature-local type ownership"}
- When to use: {Triggers for this pattern}
- Related patterns: {Links to `.claude/patterns/` if they exist}

**What will you learn by completing this workflow?**
- Technical skill: {Specific TypeScript/React/etc skill}
- Architectural thinking: {System design principle}
- Process discipline: {Verification, documentation, etc}

---

## Variations

**When this workflow needs to be adapted:**

### Variation 1: {Scenario where steps differ}
**When**: {Condition that triggers this variation}
**Changes**:
- Skip Step {X}
- Replace Step {Y} with: {alternative step}
- Add additional verification: {extra check}

### Variation 2: {Another scenario}
{Same structure}

---

## Related Workflows

**Workflows that should be run before this one**:
- {Workflow name} - {Why it's a prerequisite}

**Workflows that typically follow this one**:
- {Workflow name} - {What typically comes next}

**Workflows that are alternatives to this one**:
- {Workflow name} - {When to use that instead}

---

## Workflow History

**Version 1.0** (YYYY-MM-DD)
- Initial creation
- Based on: {What task this codifies}

**Version 1.1** (YYYY-MM-DD - if updated)
- Added Step X to handle {edge case}
- Updated verification for {new requirement}
- Clarified {confusing instruction}

---

## Metadata

**Tags**: #{category1} #{category2} #{phase}  
**Phase**: Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5  
**Frequency**: One-time | Per-feature | Per-component | As-needed  
**Automation Candidate**: Yes | No | Partial

---

## Example of a Complete Workflow

See `.claude/skills/fix-typescript-error.md` for a fully filled-out example.

---

## When to Create a Workflow

**Create a workflow when**:
- ✅ Task will be repeated 3+ times
- ✅ Task has 5+ steps that must happen in specific order
- ✅ Task requires multiple verification gates
- ✅ Task teaches an architectural pattern
- ✅ Task has failed before due to missed steps

**Don't create a workflow for**:
- ❌ One-off fixes
- ❌ Exploratory work (still learning the pattern)
- ❌ Simple refactors (1-2 steps, obvious)
- ❌ Tasks that vary wildly each time

**Rule of thumb**: If you've explained how to do it twice, write a workflow for the third time.

---

## Workflow Naming Convention

```
{action}-{subject}.md

Examples:
fix-typescript-error.md
add-error-boundary.md
create-feature-domain.md
refactor-complex-component.md
deploy-to-production.md
```

Use action verbs: fix, add, create, refactor, deploy, test, optimize

---

## Workflow Lifecycle

```
DRAFT → Initial creation, needs testing
  ↓
ACTIVE → Tested and verified, ready for use
  ↓
DEPRECATED → No longer recommended (workflow needs update or replaced)
```

**When updating a workflow**:
1. Increment version number
2. Add entry to "Workflow History"
3. Test the updated workflow on a real task
4. Update "Last Updated" date

**When deprecating a workflow**:
1. Change status to "Deprecated"
2. Add note: "Deprecated in favor of: {new workflow}"
3. Keep the file (it's historical record)

---

## Quick Start Checklist

When creating a new workflow from this template:
- [ ] Fill in all {placeholders}
- [ ] Define clear prerequisites
- [ ] Number steps sequentially
- [ ] Add verification after each step
- [ ] Define both red and yellow gates
- [ ] Include failure recovery for common issues
- [ ] Explain the teaching moment
- [ ] Add relevant tags and metadata
- [ ] Test the workflow on a real task
- [ ] Update status from Draft to Active

**A workflow is only Active after it's been successfully executed at least once.**
