# CLAUDE.md — Kernel Operating Contract

**Version**: 2.0  
**Last Updated**: February 2026  
**Purpose**: Operating instructions for Claude Code when working on Kernel

---

## What This File Does

This is your **persistent context** — the rules that govern every change to Kernel.

**If it's not in this file, it doesn't exist.** Claude Code has no memory between sessions. This file is loaded fresh every time, making it the single source of truth for:
- Architecture rules (BBA)
- State management patterns
- Verification requirements
- Decision-making protocols

**Think of this as onboarding docs for an AI teammate.**

---

## The WAT Framework

**WAT** = Workflows, Agents, Tools

### The Three Layers

```
┌─────────────────────────────────────────┐
│ WORKFLOWS (The Instructions)           │
│ - What to do                            │
│ - Stored in .claude/skills/             │
│ - Reference this file as ground truth   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ AGENTS (The Decision Maker)             │
│ - How to sequence work                  │
│ - That's you, Claude Code               │
│ - Follow workflows, verify at gates     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ TOOLS (The Verification)                │
│ - Deterministic checks                  │
│ - TypeScript, grep, build, tests        │
│ - Red gates BLOCK, yellow gates WARN    │
└─────────────────────────────────────────┘
```

**Separation of concerns**: Workflows define tasks, you execute intelligently, tools verify correctness.

---

## Project Context

**What Kernel Is**: Personal learning engine / content explorer  
**Tech Stack**: Next.js 16.1+, React 19, TypeScript 5, Tailwind 4, React Query 5  
**Current State**: BBA-compliant architecture, video search works, 7 TypeScript errors to fix  
**Goal**: Production-grade reference implementation teaching principal-engineer patterns

**Key Features**:
- Search content (YouTube videos, articles, snippets)
- Bookmark items (localStorage-backed)
- View detailed content (player, metadata, related items)

**Branch**: `init-refactor-bba`  
**Package Manager**: npm

---

## THE CONTRACT — Core Principles

### 1. Architecture Governance: BBA (Block-Based Architecture)

**Four layers, strict dependency direction:**

```
Layer 1: Rendering    (src/shared/ui/base/)
Layer 2: Styling      (src/shared/styles/, src/shared/ui/options/)
Layer 3: Composition  (src/shared/ui/block/, layout/, containers/)
Layer 4: Product      (src/features/, src/interface/)

Direction: Rendering ← Styling ← Composition ← Product
           (nothing imports upward)
```

**Before every import you write:**
1. What layer is the file I'm editing in?
2. What layer is the file I'm importing from?
3. Is the import direction downward or same-level?
4. **If upward → STOP. Find another way.**

### 2. Ownership Rules

- **Features own their vertical slice** — video/, bookmark/, article/
- **Features never import from other features** — cross-feature coordination goes through interface/
- **Shared UI is presentational only** — no state, no business logic, no feature imports
- **Single responsibility** — one component, one concern, one owner

### 3. State Management: The Tree Model

State follows a tree structure with predictable addresses.

**Vocabulary**:

| Term | Definition | Example |
|------|------------|---------|
| **Root** | Global store, shared across app | `app/providers.tsx` (Error, Query, Bookmark contexts) |
| **Domain** | Content vertical (what you work with) | `features/video/`, `features/article/` |
| **Branch** | Capability or feature (what you can do) | `interface/search/` (cross-domain), `features/bookmark/` (domain-specific) |
| **Hub** | First-level smart component — manages state for its branch | `SearchPageUI`, `BookmarkProvider` |
| **Sub-hub** | Nested smart component — reads from context, passes props down | `SearchContentPanel`, `SearchResultsPanel` |
| **Service** | Data operation (API calls, localStorage, external integrations) | `features/video/api/videoService.ts` |
| **Leaf** | Presentational component — props in, UI out, no state | `VideoDetailHeader`, `VideoCard` |

**State Rules**:
1. **State has an address** — Video state → `features/video/context/`. Search orchestration → `interface/search/context/`.
2. **Hubs sit as high as needed** — high enough to reach all leaves that need data, no higher.
3. **Cross-branch coordination only at hubs** — when one action affects multiple branches, logic lives in the hub.
4. **Leaves are dumb** — they receive props and render, don't know data origin.
5. **Feature exports are clean composition** — exported component = leaf components assembled with props.

**Debugging with the tree model**:
- Data is wrong? Trace up to the hub that owns it.
- Component re-rendering? Check which hub/context it subscribes to.
- Need to share state? Lift to the nearest common ancestor hub.

### 4. Type Safety as Documentation

- No `any` without explicit justification
- No type assertions (`as`) without explaining why
- Export types alongside implementation
- Shared types → `src/types/index.ts`
- Feature-specific types → `src/features/{domain}/types.ts`

### 5. Communication Rules

**Code style**:
- Use `const` arrow functions for React components (exception: route files `page.tsx`, `layout.tsx`)
- Named exports only (exception: Next.js route files)
- CSS Modules for all styling (no inline styles, no styled-components)

**AI interaction style**:
- Short responses
- Code > explanation
- No renaming without approval
- No new abstractions unless asked
- One file, one change, one idea — then verify

---

## THE LAYERS — BBA Rules in Detail

### Layer 1: Rendering (src/shared/ui/base/)

**Purpose**: Lowest-level DOM primitives  
**Exports**: `Base` component — one DOM element, forwards props

**Rules**:
- ✅ Can import: Nothing (this is the foundation)
- ❌ Cannot import: Styles, composition, features

**Example**:
```typescript
// Base component receives semantic HTML + props
<Base as="button" {...props} />
```

### Layer 2: Styling (src/shared/styles/)

**Purpose**: Visual design tokens and helpers  
**Contains**: `tokens.css`, `options/` (colors, density, sizes), `helpers/` (element, animations)

**Rules**:
- ✅ Can import: Base components
- ❌ Cannot import: Composition, features

**Pattern**: Options are finite value sets (not arbitrary strings)
```typescript
// Good
<Base color="primary" density="compact" />

// Bad
<Base color="#FF5733" density="14px" />
```

### Layer 3: Composition (src/shared/ui/)

**Purpose**: Reusable UI building blocks  
**Contains**: `block/` (Blocks), `layout/` (Layouts), `containers/` (Containers)

**Rules**:
- ✅ Can import: Base, styling
- ❌ Cannot import: Features, interface

**Blocks encode intent**:
```typescript
// BlockButton, BlockCard, BlockText
<BlockButton variant="primary" onClick={...} />
```

**Layouts handle spatial concerns only**:
```typescript
// LayoutRow, LayoutColumn, LayoutPanel
<LayoutRow gap="medium">{children}</LayoutRow>
```

### Layer 4: Product (src/features/, src/interface/)

**Purpose**: Business logic, domain features, orchestration

**Features** (vertical slices):
```
features/
├── video/          # Everything video-related
│   ├── api/        # YouTube API service
│   ├── components/ # VideoCard, VideoContent
│   ├── hooks/      # useVideoSearch
│   ├── types.ts    # Video-specific types
│   └── context/    # Video state (if needed)
├── bookmark/       # Bookmark management
└── article/        # Article search/display
```

**Interface** (cross-feature orchestration):
```
interface/
├── search/         # Orchestrates search across content types
│   ├── components/ # SearchResultsPanel, SearchContentPanel
│   ├── context/    # SearchControlsContext, SearchPanelContext
│   ├── hooks/      # useSearchPage (coordinates features)
│   └── mappers/    # Transform feature data to common shapes
└── navigation/     # App-wide navigation
```

**Rules**:
- ✅ Can import: Shared (base, styling, composition)
- ✅ Interface can import from features
- ❌ Features cannot import from interface
- ❌ Features cannot import from other features
- ❌ Shared cannot import from features or interface

---

## THE WORKFLOW SYSTEM — How Work Gets Done

### When to Create a Workflow

**Create a workflow (skill) when**:
- Task will be repeated 3+ times
- Task has multiple steps that must happen in order
- Task requires specific verification gates
- Task teaches an architectural pattern

**Don't create a workflow for**:
- One-off fixes
- Simple refactors (single file, obvious change)
- Exploratory work (you're still learning the pattern)

### Workflow Lifecycle

```
1. DRAFT → Write .claude/skills/{name}.md using WORKFLOW_TEMPLATE.md
2. EXECUTE → Follow steps, verify at each gate
3. REFINE → Update workflow based on what broke or was unclear
4. CLOSE → Mark complete, document learnings in pattern library
```

### Workflow Template Structure

Every workflow should have:
1. **Objective** — What this accomplishes
2. **Prerequisites** — What must be true before starting
3. **Steps** — Numbered, actionable, atomic
4. **Verification** — Specific commands to run
5. **Expected Output** — What success looks like
6. **Failure Recovery** — What to do if verification fails
7. **Teaching Moment** — What architectural pattern this demonstrates

See `.claude/templates/WORKFLOW_TEMPLATE.md` for full template.

---

## THE VERIFICATION GATES — Red vs Yellow

### Gate System (Option C)

**Red Gates** = HARD STOP — cannot proceed until resolved  
**Yellow Gates** = WARNING — flag but can proceed with justification

### Red Gates (Architecture & Types)

These catch violations that break the system:

```bash
# TypeScript type check
npx tsc --noEmit
→ ANY error = STOP

# Build
npm run build
→ ANY error = STOP

# BBA: Shared importing from Features
grep -r "from.*@/features" src/shared/
→ ANY match = STOP (upward dependency violation)

# BBA: Features importing from Interface
grep -r "from.*@/interface" src/features/
→ ANY match = STOP (upward dependency violation)

# BBA: Cross-feature imports
grep -r "from.*@/features/" src/features/ --include="*.tsx" --include="*.ts"
→ ANY cross-feature import = STOP (horizontal coupling)
```

**When a red gate fails:**
1. STOP immediately
2. Read the error message fully
3. Fix at the source (no workarounds)
4. Re-run verification
5. Only proceed when gate is green

### Yellow Gates (Style & Optimization)

These catch issues that should be addressed but don't block:

```bash
# Lint warnings (not errors)
npm run lint
→ Warnings = FLAG, document why proceeding

# File size
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l | sort -rn | head -5
→ Files >200 lines = FLAG, consider refactoring

# Debug code in features/interface
grep -r "console.log" src/features/ src/interface/ --include="*.ts" --include="*.tsx"
→ Matches = FLAG, remove before final commit

# Unused imports/variables
npm run lint
→ Unused code warnings = FLAG, clean up when convenient
```

**When a yellow gate fails:**
1. Note the warning
2. Decide: fix now or defer?
3. If deferring, document reason in commit message or TODO
4. Proceed with workflow

### Unified Verification Script

Run all gates at once:

```bash
# .claude/verification/run-gates.sh
./run-gates.sh
```

This runs red gates first, stops on failure. If all red gates pass, runs yellow gates and reports warnings.

See `.claude/verification/run-gates.sh` for implementation.

---

## THE DECISION TREES — Agent Intelligence

### Decision Tree 1: "I Need to Import Something"

```
Start: I need to import X from Y

Q1: What layer is my current file in?
├─ Rendering (base/) → Can only import: nothing
├─ Styling (styles/, options/) → Can import: base
├─ Composition (block/, layout/, containers/) → Can import: base, styling
└─ Product (features/, interface/) → Can import: base, styling, composition

Q2: What layer is the file I'm importing from?
├─ Same layer → ✅ OK
├─ Layer below → ✅ OK
└─ Layer above → ❌ STOP

Q3: If importing from Product layer (features/interface/):
├─ Am I in interface/ importing from features/? → ✅ OK
├─ Am I in features/ importing from interface/? → ❌ STOP (upward)
├─ Am I in features/X importing from features/Y? → ❌ STOP (cross-feature)
└─ Am I in shared/ importing from features/interface/? → ❌ STOP (upward)

Q4: If stuck (need the import but violates rules):
├─ Can I pass via props instead? → Try this first
├─ Can I lift state to a common hub? → Try this second
├─ Should this code be in shared/? → If truly reusable, move it
└─ Still stuck? → Ask for architectural guidance
```

### Decision Tree 2: "Component is Too Complex"

```
Start: Component is >100 lines or hard to reason about

Q1: What kind of component is it?
├─ Leaf (presentational) → Should be <50 lines
├─ Sub-hub (smart + presentational) → Should be <100 lines
└─ Hub (pure orchestration) → 100-150 lines OK

Q2: What's the complexity source?
├─ Too much JSX → Extract leaf components
├─ Too much logic → Extract custom hooks
├─ Too many responsibilities → Violates single responsibility, split
└─ Complex state transformations → Extract pure functions

Q3: Refactor strategy:
├─ JSX complexity → Create {Feature}Header, {Feature}Body, {Feature}Footer
├─ Logic complexity → Create use{Feature}{Action} hooks
├─ State complexity → Consider splitting context or using selectors
└─ Multiple features → Component is in wrong layer (should be in interface/)

Q4: After refactor:
├─ Run verification gates
├─ Check: Is each new piece <50 lines and single-purpose?
└─ Document: What pattern did you apply? (add to pattern library)
```

### Decision Tree 3: "Test is Failing"

```
Start: Test failed after change

Q1: What kind of test failed?
├─ Type check (tsc) → TypeScript error, fix types
├─ Unit test → Logic error, debug the function
├─ Integration test → Component interaction broke
└─ E2E test → User flow broken

Q2: What changed?
├─ Types → Check if shared types need updating
├─ Component → Check if props contract changed
├─ State → Check if context value shape changed
└─ Import → Check if moved/renamed files

Q3: BBA check:
├─ Did I introduce upward dependency? → Fix import direction
├─ Did I introduce cross-feature coupling? → Extract to interface/
└─ Did I break single responsibility? → Split component

Q4: Fix strategy:
├─ Type error → Update type definitions, not assertions
├─ Logic error → Fix implementation, not test
├─ Contract change → Update both sides of contract
└─ Architecture violation → Refactor to follow BBA

Q5: After fix:
├─ Run full verification gates
├─ Check: Did I fix the root cause or add a workaround?
└─ Document: What was the actual issue? (add to anti-pattern library)
```

---

## THE TEACHING LOOP — How This Makes You Better

### After Every Workflow

**1. Document What You Learned**

Create or update:
- `.claude/patterns/{pattern-name}.md` — Successful pattern you want to replicate
- `.claude/anti-patterns/{anti-pattern-name}.md` — Mistake to avoid

**Pattern template**:
```markdown
# Pattern: {Name}

## Problem
What situation requires this pattern?

## Solution
Step-by-step how to implement it.

## Example
Real code from Kernel demonstrating this.

## When to Use
Triggers that indicate this pattern is needed.

## When Not to Use
Situations where this pattern is wrong.
```

**2. Update the Workflow**

If the workflow:
- Had unclear steps → Clarify them
- Missed edge cases → Add them
- Had incorrect verification → Fix it

**Workflows are living documents.** They get smarter every time you use them.

**3. Grow Your Pattern Library**

Track patterns you've mastered:
- ✅ Lift state to common ancestor
- ✅ Pass callbacks down, data up
- ✅ Extract pure functions from components
- ✅ Use render props for flexibility
- ⏳ Optimistic updates with rollback
- ⏳ Error boundaries with retry logic
- ⏳ Lazy loading with suspense

This becomes your **architectural toolkit**.

### Meta-Learning Questions

After completing a feature or major refactor:

**Architecture**:
- What layer violations did I almost make?
- Where did I struggle with state placement?
- What abstractions emerged naturally vs forced?

**Code Quality**:
- What tests would have caught my bugs earlier?
- Where is the code still too clever?
- What would confuse me if I read this in 6 months?

**Process**:
- Which verification gate saved me?
- What should have been a workflow but wasn't?
- What workflow needs refinement?

**Write these down.** They become your next set of improvements.

---

## How Claude Code Should Use This File

### Every Session

1. **Load this file as context** — All rules here are active
2. **Reference workflows** — If a skill exists for the task, follow it
3. **Verify at gates** — Red gates block, yellow gates warn
4. **Update documentation** — Patterns learned, workflows refined

### When in Doubt

1. Check the decision trees in this file
2. Check if a workflow exists in `.claude/skills/`
3. Check the pattern library in `.claude/patterns/`
4. If still unclear, ask for architectural guidance

### Never

- Assume I remember the last session (I don't)
- Violate BBA rules because it's "easier"
- Skip verification because "it should work"
- Create abstractions before you've seen the pattern 3 times

---

## File Structure Reference

```
src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Page routes
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # Context providers tree
├── features/              # Product layer - vertical slices
│   ├── video/            # Video feature
│   ├── bookmark/         # Bookmark feature
│   └── article/          # Article feature
├── interface/            # Product layer - cross-feature orchestration
│   ├── search/           # Search orchestration
│   └── navigation/       # App navigation
├── shared/               # Rendering + Styling + Composition layers
│   ├── ui/
│   │   ├── base/        # Layer 1: Rendering
│   │   ├── block/       # Layer 3: Blocks
│   │   ├── layout/      # Layer 3: Layouts
│   │   └── containers/  # Layer 3: Containers
│   ├── styles/          # Layer 2: Styling
│   │   ├── tokens.css
│   │   ├── options/     # Finite value sets
│   │   └── helpers/     # Pure functions
│   ├── hooks/           # Shared hooks
│   └── context/         # Root-level contexts
├── types/               # Shared type definitions
└── data/                # Mock data

.claude/
├── CLAUDE.md            # This file
├── templates/           # Scaffolds
├── skills/              # Reusable workflows
├── patterns/            # Learned solutions
├── anti-patterns/       # Mistakes to avoid
└── verification/        # Automated checks
```

---

## Quick Reference Commands

```bash
# Verification gates
npx tsc --noEmit                                                     # Red: Type check
npm run build                                                         # Red: Build
grep -r "from.*@/features" src/shared/                               # Red: BBA shared→features
grep -r "from.*@/interface" src/features/                            # Red: BBA features→interface
grep -r "from.*@/features/" src/features/ --include="*.tsx" --include="*.ts"  # Red: BBA cross-feature
npm run lint                                                          # Yellow: Lint warnings
grep -r "console.log" src/features/ src/interface/ --include="*.ts" --include="*.tsx"  # Yellow: Debug code

# Unified verification
.claude/verification/run-gates.sh                                     # All gates

# Dev workflow
npm run dev          # Start dev server
npm run lint-fix     # Auto-fix lint issues
npm run format       # Format with Prettier
```

---

## Bottom Line

**One file. One change. Verify. Repeat.**

You sit between what needs to happen (workflows) and the tools that verify it (gates). Your job is to:
1. Read the workflow
2. Make precise changes that respect BBA
3. Verify with gates
4. Document what you learned

This file is the contract. Follow it, and Kernel becomes your principal-engineer training ground.
