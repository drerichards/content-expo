# Workflow: Fix TypeScript Import Error

**Version**: 1.0  
**Created**: 2026-02-14  
**Last Updated**: 2026-02-14  
**Status**: Active  
**Estimated Time**: 10-15 minutes  
**Complexity**: Low

---

## Objective

**What does this workflow accomplish?**

> This workflow **resolves TypeScript import errors** by **identifying the correct import path based on BBA layer rules**, resulting in **type-safe code that respects architectural boundaries**.

**Why does this workflow exist?**
- TypeScript import errors often indicate BBA violations (importing from wrong layer)
- Pattern emerges: fix the same type of error across multiple files
- Codifies the decision-making process for determining correct import paths
- Prevents future violations by teaching the layer model

---

## Prerequisites

**Before starting this workflow, verify:**

### Required Knowledge
- [x] Understand BBA layer rules (see CLAUDE.md → THE LAYERS)
- [x] Understand the four layers: Rendering → Styling → Composition → Product
- [x] Know that imports flow downward only (never upward)

### Required Context
- [x] Have the TypeScript error message from `npx tsc --noEmit`
- [x] Identified which file has the broken import
- [x] Identified which type/module is being imported

### Required Tools
- [x] TypeScript compiler can run (`npx tsc --version`)
- [x] grep is available for verification

**If any prerequisite fails, STOP. Resolve it before proceeding.**

---

## Architecture Context

**What BBA rules apply to this workflow?**

Import direction must be downward or same-level:
```
Rendering (Layer 1)
    ↓ can import from: nothing
Styling (Layer 2)
    ↓ can import from: Rendering
Composition (Layer 3)
    ↓ can import from: Rendering, Styling
Product (Layer 4 - features/, interface/)
    ↓ can import from: Rendering, Styling, Composition
    Special rule: interface/ can import from features/
    Special rule: features/ CANNOT import from interface/
    Special rule: features/ CANNOT import from other features/
```

**Relevant CLAUDE.md sections**:
- THE CONTRACT → Ownership Rules
- THE LAYERS → Layer 4: Product
- THE DECISION TREES → "I Need to Import Something"

---

## Steps

### Step 1: Identify the Error Details

**What**: Capture the exact error information

**Why**: Need to know what's being imported and where from

**How**:
1. Run TypeScript compiler:
   ```bash
   npx tsc --noEmit 2>&1 | grep "error TS2305\|error TS2307"
   ```

2. For each import error, note:
   - **File path**: Where the error occurs (e.g., `src/features/bookmark/api/bookmarkService.ts`)
   - **Line number**: Which line has the broken import
   - **What's being imported**: Type or module name (e.g., `Bookmark`)
   - **Where it's imported from**: The import path (e.g., `"@/types"`)
   - **Error message**: Full text of the error

3. Document the error:
   ```
   File: src/features/bookmark/api/bookmarkService.ts
   Line: 1
   Import: Bookmark
   From: "@/types"
   Error: Module '"@/types"' has no exported member 'Bookmark'
   ```

**Files affected**: None (just gathering information)

**Verification**: N/A (information gathering step)

**Expected output**: Clear understanding of what's broken

**If verification fails**: N/A

---

### Step 2: Determine the Layers Involved

**What**: Identify which BBA layers are involved in the import

**Why**: Layer rules determine valid import directions

**How**:
1. Identify the **current file's layer**:
   ```bash
   # Check the file path
   # src/shared/ui/base/ → Rendering (Layer 1)
   # src/shared/styles/ or src/shared/ui/options/ → Styling (Layer 2)
   # src/shared/ui/block|layout|containers/ → Composition (Layer 3)
   # src/features/ or src/interface/ → Product (Layer 4)
   ```

2. Identify where the **imported type actually lives**:
   ```bash
   # Search for the type definition
   grep -r "export.*type.*Bookmark" src/ --include="*.ts" --include="*.tsx"
   ```

3. Determine the **target layer** based on where the type is defined

4. Document the layers:
   ```
   Current layer: Product (features/bookmark/)
   Target layer: Product (features/bookmark/) - same feature
   Import direction: Same-level (feature importing from itself)
   ```

**Files affected**: None (analysis step)

**Verification**:
```bash
# Verify you found the type definition
grep -r "export.*type.*{TypeName}" src/
# Should return the file where the type is actually defined
```

**Expected output**: Clear understanding of layer relationship

**If verification fails**:
- Type not found anywhere → Need to create it (see workflow: add-missing-type-definition.md)
- Type found in multiple places → Type duplication issue (need to consolidate first)

---

### Step 3: Apply BBA Import Rules

**What**: Determine the correct import path based on layer rules

**Why**: Ensures architectural compliance

**How**:
1. Check the layer relationship:
   - Same layer? → Use relative import
   - Lower layer (downward)? → Use alias import
   - Upper layer (upward)? → VIOLATION - must refactor
   - Cross-feature (horizontal)? → VIOLATION - must refactor

2. For **same-layer imports** (most common in features):
   ```typescript
   // ✅ CORRECT: Feature importing from own files
   import type { Bookmark } from "../types";
   import { getBookmarks } from "./bookmarkService";
   ```

3. For **downward imports** (Product → Composition/Styling/Rendering):
   ```typescript
   // ✅ CORRECT: Feature importing from shared
   import { BlockButton } from "@/shared/ui/block";
   import { colors } from "@/shared/styles/tokens";
   ```

4. For **upward violations** (Feature → Interface):
   ```typescript
   // ❌ WRONG: Feature cannot import from interface
   import { useSearchPanel } from "@/interface/search/hooks";
   
   // ✅ FIX: Pass via props instead
   // In interface layer component:
   const { isPanelExpanded, onToggleExpand } = useSearchPanel();
   return <FeatureComponent isPanelExpanded={isPanelExpanded} onToggleExpand={onToggleExpand} />
   ```

5. For **cross-feature violations** (Feature A → Feature B):
   ```typescript
   // ❌ WRONG: Feature cannot import from other features
   import { ArticleCard } from "@/features/article/components";
   
   // ✅ FIX: Coordinate through interface layer or use composition
   // See CLAUDE.md → THE DECISION TREES for refactoring strategies
   ```

**Files affected**: The file with the broken import

**Verification**: Review the import rule against CLAUDE.md decision tree

**Expected output**: Clear decision on correct import path

**If verification fails**:
- Still upward/cross-feature → Need to refactor architecture (stop this workflow, ask for guidance)
- Uncertain about layer → Re-read CLAUDE.md → THE LAYERS

---

### Step 4: Update the Import Statement

**What**: Change the import to use the correct path

**Why**: Fixes the TypeScript error

**How**:
1. Open the file with the broken import
   
2. Locate the import statement (use the line number from Step 1)

3. Replace with the correct import:
   ```typescript
   // Example: Fixing bookmark type import
   
   // BEFORE (wrong - importing from shared when type is feature-local)
   import type { Bookmark } from "@/types";
   
   // AFTER (correct - importing from own feature's types)
   import type { Bookmark } from "../types";
   ```

4. Save the file

**Files affected**:
- The file with the broken import (one line change)

**Verification**:
```bash
# Run TypeScript compiler on just this file
npx tsc --noEmit src/path/to/file.ts

# Should show one fewer error than before
npx tsc --noEmit 2>&1 | wc -l
```

**Expected output**: 
- File compiles without this specific import error
- Overall error count reduced by 1

**If verification fails**:
- Still get import error → Check that the type is actually exported from the target file
- New errors appear → May have broken other imports, check for cascading effects

---

### Step 5: Verify BBA Compliance

**What**: Ensure the fix doesn't violate BBA rules

**Why**: Import errors often expose architectural violations

**How**:
1. Check for upward dependencies (Shared → Features):
   ```bash
   grep -r "from.*@/features" src/shared/
   # Expected: No matches
   ```

2. Check for upward dependencies (Features → Interface):
   ```bash
   grep -r "from.*@/interface" src/features/
   # Expected: No matches
   ```

3. Check for cross-feature imports:
   ```bash
   grep -r "from.*@/features/" src/features/ --include="*.tsx" --include="*.ts"
   # Expected: Only imports within same feature directory
   ```

4. If any matches found, document them for future fixes

**Files affected**: None (verification only)

**Verification**: Commands above return zero violations

**Expected output**: All BBA checks pass

**If verification fails**:
- Your fix introduced a violation → Revert and reconsider the approach
- Found unrelated violations → Note them but continue (will fix separately)

---

### Step 6: Create ADR

**What**: Document the architectural decision

**Why**: Builds knowledge library, prevents future mistakes

**How**:
1. Copy ADR template:
   ```bash
   cp .claude/templates/ADR_TEMPLATE.md .claude/decisions/ADR-{NUMBER}-fix-{type-name}-import.md
   ```

2. Fill in the ADR sections:
   - **Context**: What was the error? Why did it occur?
   - **Decision**: What import path did you choose?
   - **Options Considered**: What alternatives existed?
   - **Consequences**: What does this fix enable/prevent?
   - **Teaching Moment**: What BBA principle does this demonstrate?

3. Reference from code (optional):
   ```typescript
   // Import fixed per ADR-002: Features own their types
   import type { Bookmark } from "../types";
   ```

**Files affected**:
- `.claude/decisions/ADR-{NUMBER}-fix-{type-name}-import.md` (new file)

**Verification**: ADR file exists and is complete

**Expected output**: Documented decision for future reference

**If verification fails**: N/A (documentation is optional but recommended)

---

## Verification Gates

**After completing all steps, run these checks:**

### Red Gates (must pass)
```bash
# TypeScript type check - error count should decrease
npx tsc --noEmit
# Expected: No error for the specific import you fixed

# Build should succeed
npm run build
# Expected: Build succeeds

# BBA: Shared not importing from Features
grep -r "from.*@/features" src/shared/
# Expected: Zero matches

# BBA: Features not importing from Interface
grep -r "from.*@/interface" src/features/
# Expected: Zero matches
```

**If any red gate fails**: STOP, review your changes, ensure import is correct.

### Yellow Gates (should pass)
```bash
# Lint check
npm run lint
# Expected: No new warnings introduced

# File hasn't grown significantly
wc -l src/path/to/fixed/file.ts
# Expected: Line count same or decreased (just changed import)
```

**If any yellow gate fails**: Note the warning, decide if it needs immediate fix.

---

## Expected Output

**What artifacts are created?**
- [x] Updated file: The file with the corrected import
- [x] New ADR: `.claude/decisions/ADR-{NUMBER}-fix-{type-name}-import.md`
- [x] One fewer TypeScript error

**What should work differently?**
- TypeScript compilation succeeds for this file
- Import respects BBA layer boundaries
- Pattern established for similar fixes

**How to verify the output manually**:
1. Run: `npx tsc --noEmit`
2. Check: Error count decreased
3. Review: No new architectural violations introduced

---

## Failure Recovery

**Common failures and solutions:**

### Failure 1: Type still not found after fixing import
**Symptoms**:
- Error: `Cannot find module '../types'`
- Or: `Module has no exported member 'TypeName'`

**Root cause**: Type doesn't exist where you're looking for it

**Solution**:
1. Verify type exists: `grep -r "export.*type.*TypeName" src/`
2. Check if type is actually exported (not just defined)
3. If type doesn't exist → Use workflow: add-missing-type-definition.md
4. Resume this workflow at: Step 4

### Failure 2: Fix creates new TypeScript errors
**Symptoms**:
- New errors appear in other files
- Error count increases instead of decreases

**Root cause**: Other files depended on the incorrect import path

**Solution**:
1. Identify affected files: `grep -r "from.*@/types.*TypeName" src/`
2. Apply this workflow to each affected file
3. Consider: Should this type be in shared types after all? (If 3+ files use it)

### Failure 3: Import is correct but still violates BBA
**Symptoms**:
- Import path is technically correct
- But BBA grep checks show violations

**Root cause**: Architectural issue, not import path issue

**Solution**:
1. STOP this workflow
2. Document the violation
3. Ask for architectural guidance on refactoring
4. May need to: extract shared component, pass via props, or lift state

**General recovery strategy**:
If stuck and not covered above:
1. Re-read CLAUDE.md → THE DECISION TREES → "I Need to Import Something"
2. Check if similar fix exists in `.claude/decisions/` ADRs
3. Verify you correctly identified the layers involved (Step 2)
4. If still stuck: Document the blocker and ask for architectural guidance

---

## Teaching Moment

**What architectural principle does this workflow demonstrate?**

This workflow teaches **layer-aware imports** - the core discipline of BBA. Every import is a dependency relationship. By enforcing import direction (downward only), we prevent:
- **Circular dependencies**: Upper layers depending on lower layers that depend on upper layers
- **Tight coupling**: Features becoming entangled with each other
- **Unclear ownership**: Ambiguity about which layer owns which code

**Pattern being practiced**: Feature-local type ownership
- Features own their vertical slice
- Types defined in features stay in features (until proven shared)
- Shared types are only for truly cross-feature contracts

**What you learn by completing this workflow**:
- **Technical skill**: TypeScript module resolution, import paths, type exports
- **Architectural thinking**: Layer boundaries, dependency direction, vertical slices
- **Process discipline**: Verify at each step, document decisions, build patterns

**Real-world parallel**: This is like organizing a company where departments (features) don't share internal forms (types) with other departments unless absolutely necessary. Central office (shared/) only contains truly company-wide resources.

---

## Variations

**When this workflow needs to be adapted:**

### Variation 1: Type is duplicated across multiple locations
**When**: `grep` finds the type defined in 2+ places
**Changes**:
- Before Step 4: Consolidate type definitions (choose canonical location)
- If used by 3+ features → Move to `src/types/index.ts`
- If used by 1 feature → Keep in that feature, delete others
- Document consolidation in ADR

### Variation 2: Import error is in a test file
**When**: Error occurs in `*.test.ts` or `*.spec.ts`
**Changes**:
- Same layer rules apply
- Tests can import from implementation files in same feature
- Test utilities can live in `src/shared/test-utils/` if reused

### Variation 3: Type needs to be promoted to shared
**When**: After fixing, realize type is used by 3+ features
**Changes**:
- Add Step 7: Move type definition to `src/types/index.ts`
- Update all imports to use `@/types`
- Document why it's now shared (ADR should explain the threshold)

---

## Related Workflows

**Workflows that should be run before this one**:
- None (this is a foundational workflow)

**Workflows that typically follow this one**:
- add-missing-type-definition.md - If type doesn't exist
- fix-type-mismatch.md - If types are incompatible after fixing import

**Workflows that are alternatives to this one**:
- None (this is the primary pattern for import errors)

---

## Workflow History

**Version 1.0** (2026-02-14)
- Initial creation
- Based on: Fixing Bookmark import in bookmarkService.ts (ADR-001)
- Pattern identified after fixing 2+ similar errors

---

## Metadata

**Tags**: #typescript #imports #bba #architecture #types  
**Phase**: Phase 1 (Foundation)  
**Frequency**: Per-import-error (will be common in Phase 1)  
**Automation Candidate**: Partial (could auto-detect layer violations, but fix requires judgment)

---

## Success Criteria

You've successfully completed this workflow when:
- [x] TypeScript error is resolved
- [x] Import uses correct path (relative or alias)
- [x] BBA compliance checks pass
- [x] ADR documents the decision
- [x] Pattern is clear for next time

**After using this workflow 3+ times, you'll internalize the layer model and won't need to reference the workflow for simple import fixes.**
