# .claude Directory - Kernel Learning System

**What's here**: Your complete AI-assisted development system for building Kernel into a principal-engineer portfolio piece

---

## Quick Start

```bash
# 1. Read the operating contract (10 min)
cat CLAUDE.md

# 2. Review the roadmap (15 min)
cat LEARNING_ROADMAP.md

# 3. Start Phase 1, fix first error (30 min)
cat skills/fix-typescript-import-error.md
# Follow it step-by-step for Error #1

# 4. Run verification
verification/run-gates.sh

# 5. Document your decision
cp templates/ADR_TEMPLATE.md decisions/ADR-002-{your-fix}.md
# Fill it out

# Repeat for all 7 errors
```

---

## Directory Structure

```
.claude/
├── README.md                          ← You are here
├── CLAUDE.md                          ← Operating contract (read first)
├── LEARNING_ROADMAP.md                ← Full 5-phase plan
│
├── templates/                         ← Scaffolds
│   ├── README.md                      ← How to use templates
│   ├── ADR_TEMPLATE.md               ← Architecture Decision Record scaffold
│   └── WORKFLOW_TEMPLATE.md          ← Workflow creation scaffold
│
├── decisions/                         ← Architectural decisions
│   └── ADR-001-fix-bookmark-type-import.md  ← Example ADR
│
├── skills/                            ← Executable workflows
│   ├── README.md                      ← How to use workflows
│   ├── fix-typescript-import-error.md
│   ├── add-missing-type-definition.md
│   └── fix-type-mismatch.md
│
├── verification/                      ← Automated checks
│   ├── README.md                      ← Gate system explained
│   └── run-gates.sh                   ← Run all verification gates
│
└── patterns/                          ← Your pattern library (grows over time)
    └── (will be populated as you learn)
```

---

## What Each File Does

### Core Documents

**CLAUDE.md** - The operating contract
- WAT framework (Workflows, Agents, Tools)
- BBA layer rules and boundaries
- State management model (tree structure)
- Verification gate system (red vs yellow)
- Decision trees for common scenarios
- **Read this first** - it's your persistent context

**LEARNING_ROADMAP.md** - The master plan
- 5 phases from foundation to production
- 12 architectural qualities mapped to phases
- Milestones, success criteria, time estimates
- Automation progression (prompts → workflows → agents)
- Career connection (junior → senior → principal)
- **Read this second** - it's your north star

### Templates

**ADR_TEMPLATE.md** - Document architectural decisions
- Use when: Making a choice that affects system design
- Location: Copy to `decisions/ADR-{NUMBER}-{title}.md`
- Example: `decisions/ADR-001-fix-bookmark-type-import.md`

**WORKFLOW_TEMPLATE.md** - Create reusable task instructions
- Use when: Done a task 3+ times manually
- Location: Copy to `skills/{action}-{subject}.md`
- Example: After fixing 5 errors, create `fix-common-error-pattern.md`

### Skills (Workflows)

**fix-typescript-import-error.md** - Most common error type
- When: `Module has no exported member 'X'`
- Teaches: BBA layer rules, import direction
- Time: 10-15 minutes

**add-missing-type-definition.md** - Create types
- When: Type doesn't exist anywhere
- Teaches: Type ownership (feature vs shared)
- Time: 15-20 minutes

**fix-type-mismatch.md** - Incompatible types
- When: `Type 'A' is not assignable to type 'B'`
- Teaches: Boundary transformation, mapper pattern
- Time: 20-30 minutes

### Verification

**run-gates.sh** - Automated quality checks
- Red gates: TypeScript, build, BBA compliance (must pass)
- Yellow gates: Lint, debug code, file size (should pass)
- Exit codes: 0=pass, 1=red fail, 2=yellow warn
- Run after every change

---

## The Learning System

### How It Works

```
You (Human)
    ↓
CLAUDE.md (Rules)
    ↓
Skills (Workflows)
    ↓
Claude Code (Execution)
    ↓
Verification (Gates)
    ↓
ADRs (Documentation)
    ↓
Patterns (Library)
    ↓
Kernel Evolves
```

### The Cycle

1. **Pick a task** from current phase (LEARNING_ROADMAP.md)
2. **Find the workflow** in `skills/` directory
3. **Follow steps** sequentially, verify at each gate
4. **Run verification** (.claude/verification/run-gates.sh)
5. **Document decision** (create ADR from template)
6. **Extract pattern** (add to patterns/ when pattern emerges)
7. **Repeat** for next task

### Why This Works

**Workflows** - You don't have to remember everything  
**Verification** - Catches mistakes immediately  
**ADRs** - You learn by teaching (future you)  
**Patterns** - Your architectural toolkit grows  
**Incremental** - Small wins compound

---

## Current Phase: Phase 1 (Foundation)

### Goals
- Fix 7 TypeScript errors
- Master BBA boundaries
- Establish ADR practice
- Internalize verification workflow

### Next Steps

1. **Error #1**: Bookmark import in `bookmarkService.ts`
   - Workflow: `skills/fix-typescript-import-error.md`
   - Expected time: 15 minutes
   - Create: `decisions/ADR-002-fix-bookmark-import.md`

2. **Error #2**: Bookmark import in `search/mappers`
   - Workflow: Same as #1
   - Expected time: 10 minutes (faster second time)
   - Create: `decisions/ADR-003-fix-search-mapper-import.md`

3. **Errors #3-4**: Missing API types
   - Workflow: `skills/add-missing-type-definition.md`
   - Expected time: 15 minutes each
   - Create: ADR for each

4. **Error #5**: VideoSearchResult → Bookmark mismatch
   - Workflow: `skills/fix-type-mismatch.md`
   - Expected time: 25 minutes
   - Create: ADR documenting transformation

5. **Error #6**: ContentItem duration field
   - Workflow: `skills/fix-type-mismatch.md` (or remove usage)
   - Expected time: 15 minutes
   - Create: ADR

6. **Error #7**: Duplicate of #2 (already fixed)

### Success = Phase 1 Complete

When you finish:
- [ ] All 7 errors resolved
- [ ] `npm run build` succeeds
- [ ] `verification/run-gates.sh` shows all green
- [ ] 7 ADRs exist
- [ ] Understand BBA layer model deeply
- [ ] Ready for Phase 2 (Testing & Reliability)

---

## Tools You'll Use

### Phase 1-2: Claude.ai (This Conversation)
- Ask questions
- Get explanations
- Review decisions
- Create new workflows

### Phase 1 Onward: Claude Code (Terminal)
- Execute workflows
- Make file changes
- Run verification
- Follow skills step-by-step

### Integration Point
After Phase 1 complete:
1. Copy entire `.claude/` directory to your Kernel project
2. Switch to Claude Code for execution
3. Use Claude.ai for questions and workflow creation
4. Claude Code reads CLAUDE.md as context every session

---

## How to Get Help

### When Stuck on a Workflow
1. Re-read the workflow step (did you skip verification?)
2. Check CLAUDE.md decision trees
3. Review related ADRs (`decisions/`)
4. Search pattern library (`patterns/`)
5. Ask in new Claude.ai session (provide context: which workflow, which step, what error)

### When Confused About Architecture
1. Re-read CLAUDE.md → THE LAYERS
2. Review ADR-001 (example of good decision documentation)
3. Draw the layer diagram on paper
4. Trace an import path manually
5. Ask specific question with code examples

### When Verification Fails
1. Read the full error message (don't skim)
2. Check verification/README.md for that gate
3. Identify which file/line failed
4. Look up the error pattern in skills/README.md
5. Follow the recommended workflow

---

## Updating the System

### Add a New Workflow
```bash
# 1. Copy template
cp templates/WORKFLOW_TEMPLATE.md skills/{new-workflow-name}.md

# 2. Fill in all sections
# - Prerequisites, steps, verification, teaching moment

# 3. Test on real task
# Make sure workflow actually works

# 4. Mark as Active
# Change status from "Draft" to "Active"

# 5. Add to skills/README.md
# Document when to use it
```

### Create a New ADR
```bash
# 1. Find next number
ls decisions/ | sort | tail -1
# If last was ADR-007, yours is ADR-008

# 2. Copy template
cp templates/ADR_TEMPLATE.md decisions/ADR-008-{your-decision}.md

# 3. Fill in sections
# - Context, Decision, Options, Consequences, Teaching Moment

# 4. Reference from code (optional)
# Add comment: "// See ADR-008 for why we chose this approach"
```

### Document a Pattern
```bash
# 1. Create pattern file
cat > patterns/boundary-transformation.md << 'EOF'
# Pattern: Boundary Transformation

## Problem
Types don't match at architectural boundaries

## Solution
Create explicit mapper function at the boundary

## Example
```typescript
// src/interface/search/mappers/index.tsx
export const mapVideoToBookmark = (video: VideoSearchResult): Bookmark => {
  return {
    ...video,
    provider: "video",
    savedAt: new Date().toISOString()
  };
};
```

## When to Use
- API response → Domain model
- Search result → Stored item
- Feature A → Feature B (via interface)

## When NOT to Use
- Same concept, types accidentally diverged → Align types instead
EOF

# 2. Reference from ADRs and workflows
```

---

## Metrics to Track

### Phase 1 Metrics
- [ ] TypeScript errors: 7 → 0
- [ ] ADRs created: 0 → 7
- [ ] BBA violations: 0 (maintain)
- [ ] Workflows mastered: 3
- [ ] Time to fix error: Decreasing

### Long-term Metrics
- ADRs: Target 25+ by Phase 5
- Workflows: Target 10+ by Phase 5
- Patterns: Target 10+ by Phase 5
- Test coverage: Target 80%+ by Phase 2
- Core Web Vitals: All green by Phase 4
- Production deployment: Live by Phase 5

---

## Integration with Work

### Skills Transfer to Planview
Many patterns from Kernel apply directly to your work:

**Phase 1 skills** → Clean architecture, type safety  
**Phase 2 skills** → Testing strategy, error handling  
**Phase 3 skills** → Feature development, pattern extraction  
**Phase 4 skills** → Performance optimization, Core Web Vitals  
**Phase 5 skills** → CI/CD, production deployment

**Use Kernel as a sandbox** to try patterns before applying at work.

### Career Progression
This roadmap aligns with your promotion goals:

**Software Engineer II requirements**:
- Autonomous feature ownership ← Phase 3
- System design thinking ← Phases 1-5
- Architectural decision-making ← ADRs throughout
- Production-quality code ← Phases 2-5
- Technical leadership ← Phase 5

**Document everything**. These ADRs become your promotion packet.

---

## Common Questions

### Q: Can I skip a phase?
**A**: No. Each phase builds on the previous. Weak foundation = unstable house.

### Q: What if I get stuck for days?
**A**: Don't thrash. If stuck >2 hours, ask for help with specific details.

### Q: Can I work out of order within a phase?
**A**: Within reason. But some tasks have dependencies (can't test before code exists).

### Q: What if I find a better way?
**A**: Great! Update the workflow, document the improvement, create an ADR explaining why.

### Q: How do I know if I'm ready for the next phase?
**A**: Check the phase exit criteria. All must be ✅ before advancing.

### Q: Can I take breaks between phases?
**A**: Yes, but momentum helps. Try to complete a phase within 2 weeks.

---

## Success Indicators

**You're on track when**:
- ✅ Verification gates pass regularly
- ✅ Time to fix errors decreases
- ✅ ADRs are thorough and insightful
- ✅ You reference CLAUDE.md less over time
- ✅ Patterns emerge naturally
- ✅ You can explain decisions to others

**You're struggling when**:
- ❌ Same errors keep appearing
- ❌ Verification gates frequently red
- ❌ ADRs feel like busywork
- ❌ Not understanding architectural reasons
- ❌ Skipping workflows
- ❌ Avoiding documentation

**If struggling**: Slow down, re-read CLAUDE.md, focus on understanding over speed.

---

## Final Checklist: Am I Ready to Start?

- [ ] I've read CLAUDE.md (operating contract)
- [ ] I've read LEARNING_ROADMAP.md (full plan)
- [ ] I understand the 5 phases
- [ ] I know where I am (Phase 1, Error #1)
- [ ] I have `.claude/` directory in my project
- [ ] I'm ready to create ADRs
- [ ] I commit to following workflows
- [ ] I understand this is a 10-week commitment
- [ ] I'm excited to build Kernel into my portfolio piece

**If all checked**: Open `skills/fix-typescript-import-error.md` and start with Error #1.

**If not all checked**: Re-read CLAUDE.md and LEARNING_ROADMAP.md until clarity.

---

## You're Ready

**This is more than documentation.** This is your:
- Training program
- Reference library
- Decision log
- Pattern toolkit
- Career accelerator

**One error at a time. One decision at a time. One pattern at a time.**

**Start now.** Open the first workflow. Fix the first error. Create the first ADR.

**10 weeks from now**, you'll have a production app and principal-level architectural thinking.

**Let's build.** 🚀
