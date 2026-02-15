# Templates Directory

**What's here**: Scaffolds for creating documentation and workflows

---

## Templates

### ADR_TEMPLATE.md
**Purpose**: Document architectural decisions  
**When to use**: Any time you make a choice that affects the system design  
**Location for new ADRs**: `.claude/decisions/ADR-XXX-{title}.md`

**Examples of ADR-worthy decisions**:
- Choosing between state management approaches
- Deciding where to place a feature boundary
- Selecting an API integration pattern
- Defining error handling strategy

**How to use**:
1. Copy `ADR_TEMPLATE.md` to `.claude/decisions/`
2. Rename to `ADR-{next-number}-{kebab-case-title}.md`
3. Fill in all sections
4. Reference from code comments or other ADRs

---

### WORKFLOW_TEMPLATE.md
**Purpose**: Create reusable, executable task instructions  
**When to use**: After doing a task manually 3+ times  
**Location for new workflows**: `.claude/skills/{action}-{subject}.md`

**Examples of workflow-worthy tasks**:
- Adding a new feature domain (after creating video + article)
- Fixing a class of TypeScript errors (after fixing 3+)
- Adding error boundaries (once the pattern is clear)
- Deploying to production (repeatable checklist)

**How to use**:
1. Copy `WORKFLOW_TEMPLATE.md` to `.claude/skills/`
2. Rename to `{action}-{subject}.md` (e.g., `add-feature-domain.md`)
3. Fill in all sections
4. Test on a real task
5. Mark status as "Active" only after successful test

---

## Example Documentation

### ADR-001-fix-bookmark-type-import.md
**Location**: `.claude/decisions/`  
**What it shows**: Fully filled-out ADR for a real TypeScript error fix  
**Use as reference when**: Creating your first ADR

**Key sections to notice**:
- **Context**: Includes the exact error message and root cause
- **Options Considered**: Three alternatives with pros/cons
- **Consequences**: Honest about tradeoffs
- **Teaching Moment**: Explains the broader principle

---

## Directory Structure

```
.claude/
├── templates/              ← You are here
│   ├── README.md          ← This file
│   ├── ADR_TEMPLATE.md    ← Copy this for new ADRs
│   └── WORKFLOW_TEMPLATE.md ← Copy this for new workflows
├── decisions/             ← Completed ADRs live here
│   └── ADR-001-fix-bookmark-type-import.md
├── skills/                ← Completed workflows live here
│   └── (will be populated in Phase 1)
└── patterns/              ← Learned patterns library
    └── (will grow as you learn)
```

---

## Quick Reference

**Creating a new ADR**:
```bash
# Copy template
cp .claude/templates/ADR_TEMPLATE.md .claude/decisions/ADR-002-{title}.md

# Edit the new file
# Fill in all {placeholders}

# Reference it from code
# See ADR-002 for why we chose this approach
```

**Creating a new workflow**:
```bash
# Copy template
cp .claude/templates/WORKFLOW_TEMPLATE.md .claude/skills/{action}-{subject}.md

# Edit the new file
# Fill in all {placeholders}

# Test it on a real task before marking "Active"
```

---

## When to Use Each

| Situation | Template | Why |
|-----------|----------|-----|
| Made an architectural choice | ADR | Documents decision rationale |
| Discovered a repeatable pattern | Workflow | Codifies the steps |
| Fixed the same type of bug 3x | Workflow | Prevents future occurrences |
| Chose between libraries/approaches | ADR | Explains tradeoffs |
| Found a better way to organize code | ADR | Records the new pattern |
| Have a checklist you keep reusing | Workflow | Automates the checklist |

---

## Quality Checklist

**Before marking an ADR as "Accepted"**:
- [ ] Context clearly describes the problem
- [ ] At least 2 alternatives considered
- [ ] Decision stated in one sentence
- [ ] Consequences are honest (not all positive)
- [ ] Teaching moment explains the principle
- [ ] Code examples show before/after

**Before marking a workflow as "Active"**:
- [ ] Prerequisites are specific and verifiable
- [ ] Each step has verification
- [ ] Red gates and yellow gates defined
- [ ] Failure recovery covers common issues
- [ ] Tested successfully at least once
- [ ] Teaching moment explains what pattern you learn

---

## Evolution

These templates will evolve:
- **ADR template**: Add new sections as you discover them
- **Workflow template**: Refine based on what's missing when you use it
- **This README**: Update with new examples and patterns

Templates are living documents. Improve them as you learn what works.
