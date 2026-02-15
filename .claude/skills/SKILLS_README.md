# Skills Directory

**What's here**: Executable workflows for common development tasks

---

## Available Workflows

### 1. fix-typescript-import-error.md
**When to use**: TypeScript can't find a type you're importing  
**Typical errors**: 
- `Module has no exported member 'X'`
- `Cannot find module 'Y'`

**What it teaches**: 
- BBA layer boundaries
- Import path rules (relative vs alias)
- Feature-local vs shared types

**Estimated time**: 10-15 minutes  
**Complexity**: Low

---

### 2. add-missing-type-definition.md
**When to use**: Type doesn't exist anywhere in the codebase  
**Typical errors**:
- `Cannot find name 'VideoApiSearchResponse'`
- Type referenced but never defined

**What it teaches**:
- Type ownership (feature vs shared)
- External API type modeling
- Vertical slice architecture

**Estimated time**: 15-20 minutes  
**Complexity**: Medium

---

### 3. fix-type-mismatch.md
**When to use**: Two types are incompatible at a boundary  
**Typical errors**:
- `Type 'A' is not assignable to type 'B'`
- `Missing properties: X, Y, Z`

**What it teaches**:
- Boundary transformation patterns
- Data mapping at architectural seams
- When to transform vs when to align

**Estimated time**: 20-30 minutes  
**Complexity**: Medium-High

---

## How to Use These Workflows

### Step 1: Identify Your Error
```bash
# Run TypeScript compiler
npx tsc --noEmit

# Look at the error type:
# - "has no exported member" → Use fix-typescript-import-error.md
# - "Cannot find name" → Use add-missing-type-definition.md  
# - "not assignable to" → Use fix-type-mismatch.md
```

### Step 2: Open the Relevant Workflow
```bash
# Example
cat .claude/skills/fix-typescript-import-error.md
```

### Step 3: Follow Steps Sequentially
- Don't skip steps (each builds on previous)
- Verify at each step (use provided commands)
- Stop if red gate fails (fix before proceeding)

### Step 4: Create ADR
- Document your decision (even if it seems obvious)
- Future you will thank past you
- Builds your pattern library

### Step 5: Update the Workflow (Optional)
- Found an edge case? Add it to "Failure Recovery"
- Discovered a shortcut? Document in "Variations"
- Workflow got clearer? Update the steps

---

## Workflow Execution Pattern

```
1. Read entire workflow first (understand the full process)
   ↓
2. Check prerequisites (don't start if missing context)
   ↓
3. Execute steps in order (verify after each)
   ↓
4. Run verification gates (red gates MUST pass)
   ↓
5. Create ADR (document the decision)
   ↓
6. Reflect on teaching moment (what did you learn?)
```

---

## Current TypeScript Errors in Kernel

Based on HANDOFF.md, here's how to fix each error:

| Error | Workflow to Use | Estimated Time |
|-------|----------------|----------------|
| Error 1: Bookmark not exported from @/types (bookmarkService.ts) | fix-typescript-import-error.md | 10 min |
| Error 2: Bookmark not exported from @/types (search/mappers) | fix-typescript-import-error.md | 10 min |
| Error 3: VideoApiSearchResponse missing | add-missing-type-definition.md | 15 min |
| Error 4: VideoApiItem missing | add-missing-type-definition.md | 15 min |
| Error 5: VideoSearchResult vs Bookmark mismatch | fix-type-mismatch.md | 25 min |
| Error 6: ContentItem missing duration | fix-type-mismatch.md OR remove duration usage | 15 min |
| Error 7: Search mappers Bookmark import (duplicate of #2) | Same as #2 | - |

**Total estimated time**: ~90 minutes to fix all 7 errors

**Recommended order**:
1. Errors 1-2: Fix import paths (foundational)
2. Errors 3-4: Add missing types (removes blockers)
3. Error 5: Fix type mismatch (uses mappers)
4. Error 6: Remove duration or add to type (cleanup)

---

## Learning Progression

### After Workflow 1 (Import Errors)
You'll understand:
- ✅ BBA layer model
- ✅ When to use relative vs alias imports
- ✅ Feature-local type ownership

### After Workflow 2 (Missing Types)
You'll understand:
- ✅ Where types belong (feature vs shared)
- ✅ API type modeling
- ✅ Type ownership thresholds

### After Workflow 3 (Type Mismatches)
You'll understand:
- ✅ Boundary transformation
- ✅ Mapper pattern
- ✅ When types should differ

### After All 3 Workflows (2-3 times each)
You'll internalize:
- ✅ Type-first thinking
- ✅ Architectural boundaries
- ✅ Dependency direction
- ✅ Clean layer separation

**At this point, you'll rarely need to reference the workflows—the patterns become instinct.**

---

## Workflow Metrics

Track your progress:

```
Workflow: fix-typescript-import-error.md
├─ Completed: 0 times
├─ Average time: N/A
└─ Edge cases found: 0

Workflow: add-missing-type-definition.md
├─ Completed: 0 times
├─ Average time: N/A
└─ Edge cases found: 0

Workflow: fix-type-mismatch.md
├─ Completed: 0 times
├─ Average time: N/A
└─ Edge cases found: 0
```

Update these as you execute workflows. You'll see your time decrease as patterns become familiar.

---

## When Workflows Aren't Enough

**If you hit these situations, stop and ask for guidance:**
- [ ] Workflow doesn't cover your specific error
- [ ] Multiple workflows seem to apply (uncertain which)
- [ ] Following workflow creates new errors
- [ ] Fix violates BBA rules (grep shows violations)
- [ ] Conceptually confused about the architecture

**Don't force a workflow to fit.** Better to pause and clarify than to create architectural debt.

---

## Creating Your Own Workflows

After using these 3+ times, you'll spot new patterns. Create workflows for:
- Tasks you've done 3+ times manually
- Decisions you keep having to remake
- Patterns you want to remember

Use `.claude/templates/WORKFLOW_TEMPLATE.md` as your starting point.

**Examples of future workflows you might create**:
- add-error-boundary.md (after adding 3+ error boundaries)
- create-feature-domain.md (after creating video + article features)
- add-api-integration.md (after integrating 2+ APIs)
- deploy-to-production.md (after manual deploy process is clear)

---

## Workflow Evolution

These workflows will improve:
- **Add edge cases** when you discover them
- **Refine steps** when instructions are unclear
- **Document failures** in "Failure Recovery"
- **Update estimates** as you get faster
- **Mark deprecated** if better approach emerges

Workflows are living documents. Version them, improve them, retire them when better patterns emerge.

---

## Quick Reference

```bash
# See all workflows
ls .claude/skills/

# Search for workflow covering specific topic
grep -r "TypeScript import" .claude/skills/

# Check workflow status
grep "Status:" .claude/skills/*.md

# Find workflows for current phase
grep "Phase: Phase 1" .claude/skills/*.md
```

---

## Next Steps

1. **Read CLAUDE.md** - Understand the operating contract
2. **Pick your first error** - Start with Error #1 (simple import fix)
3. **Follow the workflow** - Step-by-step, verify at gates
4. **Create your first ADR** - Document the decision
5. **Repeat** - Do all 7 errors, building patterns

**By the end of Phase 1, you'll have:**
- 7 ADRs documenting architectural decisions
- Deep understanding of BBA boundaries
- Confidence in type system design
- Foundation for Phase 2 (feature building)

Start with `fix-typescript-import-error.md` → it's the gentlest introduction to the system.
