# Kernel Learning Roadmap
## Your Path from Software Engineer to Principal-Level Thinking

**Version**: 1.0  
**Created**: 2026-02-14  
**Goal**: Transform Kernel into your principal-engineer training ground while mastering JavaScript/TypeScript, system design, and production architecture

---

## The Mission

Build Kernel as a **reference implementation** that demonstrates all 12 architectural qualities:

| Quality | What It Means | When You'll Master It |
|---------|---------------|----------------------|
| **Availability** | System stays up and accessible | Phase 3 (error boundaries, retries) |
| **Reliability** | Consistent, predictable behavior | Phase 2 (testing, validation) |
| **Testability** | Easy to verify correctness | Phase 1-2 (unit, integration, E2E) |
| **Scalability** | Handles growth gracefully | Phase 4 (caching, lazy loading, code splitting) |
| **Security** | Protected from threats | Phase 2 (auth), Phase 5 (hardening) |
| **Agility** | Easy to change and adapt | Phase 1 (BBA boundaries, modularity) |
| **Fault Tolerance** | Graceful degradation | Phase 3 (offline mode, fallbacks) |
| **Elasticity** | Adapts to load dynamically | Phase 4 (CDN, edge caching) |
| **Recoverability** | Can restore after failure | Phase 3 (error recovery, state persistence) |
| **Performance** | Fast, efficient, optimized | Phase 2 (React Query), Phase 4 (Core Web Vitals) |
| **Deployability** | Smooth, automated releases | Phase 5 (CI/CD, preview environments) |
| **Learnability** | Code teaches itself | All phases (ADRs, patterns, documentation) |

**By the end**: Kernel demonstrates every quality. You can explain **why** each decision was made, **what** tradeoffs exist, and **when** to apply each pattern.

---

## Your Current State

**What you have**:
- ✅ Clean BBA architecture (no violations)
- ✅ Working video search (YouTube API)
- ✅ Working bookmarks (localStorage)
- ✅ React Query for data fetching
- ✅ TypeScript strict mode

**What needs work**:
- ❌ 7 TypeScript errors (import paths, missing types, type mismatches)
- ❌ No testing infrastructure
- ❌ No error handling strategy
- ❌ No CI/CD pipeline
- ❌ Article feature incomplete (30%)
- ❌ No production deployment

**Starting Phase**: Phase 1 (Foundation)

---

## The 5 Phases

### Phase Structure

Each phase follows this pattern:
1. **Goals** - What you'll achieve
2. **Teaches** - Architectural patterns you'll master
3. **Deliverables** - Concrete outputs
4. **Workflows** - Which `.claude/skills/` to use
5. **Success Criteria** - How to know you're done
6. **Time Estimate** - Realistic timeline
7. **Complexity Gates** - What must be solid before advancing

---

## PHASE 1: Foundation (Weeks 1-2)

**Tagline**: *Fix what's broken, document why it matters*

### Goals
1. Resolve all 7 TypeScript errors
2. Establish ADR documentation practice
3. Internalize BBA layer model
4. Master the verification gate system
5. Create reusable workflows for common tasks

### Architectural Qualities Addressed
- **Learnability** - Every decision documented in ADRs
- **Agility** - Clean boundaries make changes safe
- **Testability** - Type safety enables confident refactoring

### Deliverables
- [ ] 7 TypeScript errors resolved
- [ ] 7 ADRs documenting architectural decisions
- [ ] All BBA gates passing (green)
- [ ] Build succeeds cleanly
- [ ] Pattern library started (`.claude/patterns/`)

### Workflows to Master
1. `fix-typescript-import-error.md` - Use 3 times (Errors 1, 2, 7)
2. `add-missing-type-definition.md` - Use 2 times (Errors 3, 4)
3. `fix-type-mismatch.md` - Use 2 times (Errors 5, 6)

### Teaching Moments
**Week 1**: Layer boundaries
- Why upward imports break modularity
- Feature-local vs shared types
- Import path rules (relative vs alias)

**Week 2**: Type transformation
- Boundary adapters (API → Domain → UI)
- When to transform vs when to align
- Mapper pattern at architectural seams

### Success Criteria
- [ ] `npx tsc --noEmit` returns zero errors
- [ ] `npm run build` succeeds
- [ ] `.claude/verification/run-gates.sh` shows all green
- [ ] 7 ADRs exist in `.claude/decisions/`
- [ ] Can explain BBA layer rules without referencing docs
- [ ] Comfortable creating new workflows from template

### Time Estimate
- **Optimistic**: 6-8 hours (if workflows are followed exactly)
- **Realistic**: 10-15 hours (including learning, mistakes, iteration)
- **Pessimistic**: 20 hours (if many detours or conceptual struggles)

### Exit Criteria (Must Pass Before Phase 2)
1. ✅ All TypeScript errors resolved
2. ✅ Zero BBA violations
3. ✅ Build passes
4. ✅ ADR pattern established
5. ✅ Verification script understood and used

### What You'll Learn
- **Technical**: TypeScript module system, type manipulation, BBA architecture
- **Process**: Workflow execution, verification gates, documentation
- **Mindset**: Type-first thinking, boundary awareness, incremental verification

---

## PHASE 2: Reliability & Testing (Weeks 3-4)

**Tagline**: *Make the video feature bulletproof*

### Goals
1. Add comprehensive testing infrastructure
2. Implement error handling strategy
3. Add loading and error states to UI
4. Optimize data fetching with React Query
5. Complete the video feature as reference implementation

### Architectural Qualities Addressed
- **Reliability** - Tests catch regressions
- **Testability** - Infrastructure in place
- **Performance** - Optimized fetching, caching
- **Availability** - Error states, retries
- **Security** - Input validation, API key protection

### Deliverables
- [ ] Testing setup (Vitest + React Testing Library + Playwright)
- [ ] Unit tests for critical paths (80%+ coverage)
- [ ] Integration tests for features
- [ ] E2E test for search → bookmark flow
- [ ] Error boundaries at feature boundaries
- [ ] Retry logic with exponential backoff
- [ ] Loading skeletons for async content
- [ ] Empty states with helpful messaging
- [ ] React Query optimized (stale times, refetch policies)

### New Workflows to Create
1. `add-unit-test.md` - Testing component logic
2. `add-integration-test.md` - Testing feature flows
3. `add-error-boundary.md` - Graceful error handling
4. `add-retry-logic.md` - Network resilience

### Teaching Moments
**Week 3**: Testing strategy
- What to test (critical paths, edge cases)
- Unit vs integration vs E2E
- Testing state management (hooks, context)
- Mocking external APIs

**Week 4**: Error handling
- Error boundary placement (feature level)
- Retry strategies (exponential backoff)
- User feedback (toasts, inline errors)
- Graceful degradation

### Success Criteria
- [ ] Test suite runs and passes
- [ ] Coverage reports show 80%+ for features
- [ ] E2E test covers main user flow
- [ ] Error scenarios render helpful UI (not crashes)
- [ ] Network failures trigger retries
- [ ] React Query cache optimized (no excessive refetches)
- [ ] Can break something and test catches it

### Time Estimate
- **Optimistic**: 12-16 hours
- **Realistic**: 20-25 hours
- **Pessimistic**: 30-35 hours

### Exit Criteria (Must Pass Before Phase 3)
1. ✅ Tests exist and pass
2. ✅ Error boundaries in place
3. ✅ Retry logic implemented
4. ✅ Loading states implemented
5. ✅ Video feature is production-quality

### What You'll Learn
- **Technical**: Testing patterns, error boundaries, async state management, React Query optimization
- **Process**: TDD workflow, test pyramid, CI integration readiness
- **Mindset**: Defensive programming, user-first error handling, performance budgets

---

## PHASE 3: Feature Replication & Patterns (Weeks 5-6)

**Tagline**: *Build the article feature by following the video pattern*

### Goals
1. Complete the article feature (API integration, search, display)
2. Extract shared patterns from video + article
3. Document reusable patterns in pattern library
4. Build cross-feature orchestration at interface layer
5. Add advanced bookmark features (tags, export, sync)

### Architectural Qualities Addressed
- **Agility** - Pattern reuse speeds development
- **Fault Tolerance** - Offline mode, localStorage sync
- **Recoverability** - State persistence, data export
- **Learnability** - Pattern library grows

### Deliverables
- [ ] Article feature complete (choose API: News API, Dev.to, or RSS)
- [ ] Article search integrated into search page
- [ ] Cross-content-type search works (video + article)
- [ ] Bookmark tags/categories added
- [ ] Bookmark export/import (JSON)
- [ ] Bookmark sync across tabs (localStorage events)
- [ ] Pattern library with 5+ patterns documented
- [ ] Comparison doc: video vs article (what generalized, what stayed specific)

### New Workflows to Create
1. `add-feature-domain.md` - Full feature creation checklist
2. `integrate-new-api.md` - External API integration pattern
3. `add-cross-feature-orchestration.md` - Interface layer coordination

### Teaching Moments
**Week 5**: Pattern recognition
- When to abstract (3+ uses)
- When to stay concrete (premature abstraction)
- Extracting shared logic without coupling
- Feature-specific vs cross-feature concerns

**Week 6**: State persistence
- LocalStorage patterns (sync, limits, serialization)
- Cross-tab communication
- Import/export data formats
- Migration strategies

### Success Criteria
- [ ] Article feature works like video feature
- [ ] Both features searchable from same interface
- [ ] Bookmarks work for both content types
- [ ] Pattern library has documented patterns
- [ ] Can build a third content type in <4 hours using patterns
- [ ] ADR explains why article differs from video (if it does)

### Time Estimate
- **Optimistic**: 15-20 hours
- **Realistic**: 25-30 hours
- **Pessimistic**: 35-40 hours

### Exit Criteria (Must Pass Before Phase 4)
1. ✅ Two complete features (video + article)
2. ✅ Cross-feature search works
3. ✅ Pattern library established
4. ✅ Advanced bookmark features added
5. ✅ Can articulate when to use each pattern

### What You'll Learn
- **Technical**: API integration patterns, cross-feature orchestration, state synchronization, data export/import
- **Process**: Pattern extraction, abstraction boundaries, code reuse
- **Mindset**: When to DRY, when to stay wet, vertical slice thinking

---

## PHASE 4: Performance & Scalability (Weeks 7-8)

**Tagline**: *Make it fast and make it scale*

### Goals
1. Measure and optimize performance
2. Implement advanced caching strategies
3. Add lazy loading and code splitting
4. Optimize bundle size
5. Meet Core Web Vitals thresholds

### Architectural Qualities Addressed
- **Performance** - Sub-second interactions
- **Scalability** - Handles growth
- **Elasticity** - Adapts to demand

### Deliverables
- [ ] Performance monitoring setup (Vercel Analytics or similar)
- [ ] Core Web Vitals dashboard
- [ ] Route-based code splitting
- [ ] Component lazy loading (below the fold)
- [ ] Image optimization (next/image, lazy loading)
- [ ] Bundle analysis and optimization
- [ ] Service Worker for offline support (basic)
- [ ] React Query advanced patterns (prefetching, optimistic updates)
- [ ] Performance budget established (< 100KB main bundle)

### New Workflows to Create
1. `optimize-bundle-size.md` - Bundle analysis and reduction
2. `add-lazy-loading.md` - Code splitting patterns
3. `measure-web-vitals.md` - Performance monitoring

### Teaching Moments
**Week 7**: Performance measurement
- Core Web Vitals (LCP, FID, CLS)
- Bundle analysis (webpack-bundle-analyzer)
- Lighthouse audits
- Performance budgets

**Week 8**: Optimization techniques
- Code splitting strategies (route, component, vendor)
- Lazy loading (React.lazy, dynamic imports)
- Caching layers (React Query, service worker, CDN)
- Image optimization (formats, sizing, lazy load)

### Success Criteria
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Main bundle < 100KB gzipped
- [ ] Lighthouse score > 90
- [ ] Offline mode works for cached content
- [ ] Perceived performance is excellent (loading states, optimistic updates)

### Time Estimate
- **Optimistic**: 12-16 hours
- **Realistic**: 18-24 hours
- **Pessimistic**: 28-32 hours

### Exit Criteria (Must Pass Before Phase 5)
1. ✅ Core Web Vitals meet thresholds
2. ✅ Bundle size optimized
3. ✅ Performance monitoring in place
4. ✅ Lazy loading implemented
5. ✅ Offline support works

### What You'll Learn
- **Technical**: Performance optimization, code splitting, caching strategies, Web Vitals, service workers
- **Process**: Performance budgets, continuous monitoring, regression detection
- **Mindset**: Performance as a feature, user-perceived speed, progressive enhancement

---

## PHASE 5: Production Hardening & Deployment (Weeks 9-10)

**Tagline**: *Ship it to the world*

### Goals
1. Add authentication (Clerk or similar)
2. Implement comprehensive monitoring
3. Build CI/CD pipeline
4. Deploy to production
5. Add security hardening

### Architectural Qualities Addressed
- **Security** - Auth, XSS protection, CSP
- **Deployability** - Automated CI/CD
- **Availability** - Production monitoring
- **Recoverability** - Error tracking, rollback capability

### Deliverables
- [ ] Authentication implemented (sign in, sign out, protected routes)
- [ ] Error tracking (Sentry or similar)
- [ ] Performance monitoring (Vercel Analytics or similar)
- [ ] CI/CD pipeline (GitHub Actions)
  - [ ] Run tests on every PR
  - [ ] Type check on every push
  - [ ] Deploy preview environments
  - [ ] Deploy to production on merge
- [ ] Environment management (dev, staging, prod)
- [ ] Security headers (CSP, HSTS, etc.)
- [ ] Rate limiting (protect API keys)
- [ ] Production deployment (Vercel or similar)
- [ ] Custom domain configured
- [ ] Analytics integrated

### New Workflows to Create
1. `add-authentication.md` - Auth setup and protected routes
2. `setup-monitoring.md` - Error tracking and analytics
3. `create-ci-cd-pipeline.md` - Automated deployment
4. `deploy-to-production.md` - Production checklist

### Teaching Moments
**Week 9**: Security & monitoring
- Authentication patterns (OAuth, session management)
- Security headers (CSP, XSS protection)
- Error tracking setup
- Performance monitoring
- Privacy considerations

**Week 10**: Deployment automation
- CI/CD pipelines (test, build, deploy)
- Environment variables and secrets
- Preview deployments
- Rollback strategies
- Production checklist

### Success Criteria
- [ ] Authentication works (sign in/out, protected routes)
- [ ] Errors are tracked and reported
- [ ] Performance is monitored
- [ ] CI/CD pipeline works (test → build → deploy)
- [ ] Production deployment is live
- [ ] Can roll back a deployment
- [ ] Security headers in place
- [ ] Analytics show real usage data

### Time Estimate
- **Optimistic**: 15-20 hours
- **Realistic**: 24-30 hours
- **Pessimistic**: 35-40 hours

### Exit Criteria (Production Launch)
1. ✅ Deployed to production with custom domain
2. ✅ Authentication working
3. ✅ Monitoring shows data
4. ✅ CI/CD pipeline deploying automatically
5. ✅ Security audit passed
6. ✅ Can share link publicly

### What You'll Learn
- **Technical**: Authentication, security headers, CI/CD, environment management, monitoring
- **Process**: Production checklist, deployment strategy, incident response
- **Mindset**: Production thinking, observability, security-first, automation

---

## Automation & Agents Progression

### Phase 1-2: Manual + Prompts
**Tool**: Claude.ai (this conversation)  
**Usage**: Create workflows, answer questions, explain concepts  
**Output**: Documentation, workflows, ADRs

**Transition to Claude Code**: After Phase 1 complete
- Copy `.claude/` directory to your project
- Use Claude Code in terminal to execute workflows
- Claude Code follows workflows from `.claude/skills/`

### Phase 3: Workflows (Skills)
**Tool**: Claude Code  
**Usage**: Execute workflows step-by-step  
**Automation Level**: Low (you trigger each workflow)

**Example**:
```bash
# You run workflow manually
claude-code "Follow .claude/skills/add-feature-domain.md to create snippet feature"
```

### Phase 4: Chained Workflows
**Tool**: Claude Code  
**Usage**: Chain workflows together  
**Automation Level**: Medium (workflows call other workflows)

**Example**:
```bash
# Workflow chains: create feature → add tests → add error handling → deploy
claude-code "Complete feature creation workflow for snippet content type"
# Automatically runs: add-feature-domain.md → add-unit-test.md → add-error-boundary.md
```

### Phase 5: Multi-Agent Orchestration
**Tool**: Claude Code + Sub-agents (advanced)  
**Usage**: Parallel development with specialized agents  
**Automation Level**: High (you orchestrate, agents execute)

**Example**:
```bash
# Orchestrator splits work across agents
claude-code "Add real-time bookmark sync feature"

# Behind the scenes:
# Agent A (Backend): WebSocket server, Redis pub/sub
# Agent B (Frontend): Optimistic UI, conflict resolution
# Agent C (Testing): Integration tests, load tests
# Agent D (Docs): ADR, API docs, user guide
```

**When to introduce**: After Phase 4, when patterns are solid

---

## Milestones & Checkpoints

### Milestone 1: Foundation Complete (End of Phase 1)
**Date Target**: Week 2  
**Deliverable**: TypeScript errors fixed, BBA solid, workflows mastered  
**Celebration**: Commit with message "Phase 1 complete: Foundation solid"

### Milestone 2: Production-Quality Feature (End of Phase 2)
**Date Target**: Week 4  
**Deliverable**: Video feature bulletproof (tested, error-handled, optimized)  
**Celebration**: Demo the feature to someone, show the test suite

### Milestone 3: Pattern Library Established (End of Phase 3)
**Date Target**: Week 6  
**Deliverable**: Two features built, patterns extracted, third feature would take hours not days  
**Celebration**: Write a blog post about your architectural patterns

### Milestone 4: Performance Optimized (End of Phase 4)
**Date Target**: Week 8  
**Deliverable**: Core Web Vitals green, bundle optimized, perceived speed excellent  
**Celebration**: Run Lighthouse, screenshot the score, share it

### Milestone 5: Production Launch (End of Phase 5)
**Date Target**: Week 10  
**Deliverable**: Kernel is live, authenticated, monitored, deployed  
**Celebration**: **Share the link publicly, this is your portfolio piece**

---

## Success Metrics

### Technical Metrics
- [ ] Zero TypeScript errors
- [ ] Zero BBA violations
- [ ] 80%+ test coverage
- [ ] Core Web Vitals all green
- [ ] Lighthouse score > 90
- [ ] Bundle size < 100KB
- [ ] Zero production errors (first week)

### Learning Metrics
- [ ] 25+ ADRs documenting decisions
- [ ] 10+ reusable workflows created
- [ ] 10+ patterns documented
- [ ] Can explain every architectural decision
- [ ] Can build new feature in <4 hours
- [ ] Can onboard someone else to codebase in 30 minutes

### Career Metrics
- [ ] Portfolio piece for job applications
- [ ] Blog post demonstrating expertise
- [ ] GitHub repo showcasing skills
- [ ] Can discuss system design in interviews
- [ ] Can explain tradeoffs at principal level
- [ ] Feel confident about senior/principal promotion

---

## How to Use This Roadmap

### Weekly Routine
**Monday**: Review phase goals, pick next task  
**Tuesday-Thursday**: Execute workflows, build features  
**Friday**: Run verification, create ADRs, reflect on learning  
**Saturday**: Study related topics (system design, DS/Algo)  
**Sunday**: Rest or optional learning

### Daily Workflow
1. Start: Review CLAUDE.md (remind yourself of rules)
2. Pick: Choose next task from current phase
3. Execute: Follow workflow from `.claude/skills/`
4. Verify: Run `.claude/verification/run-gates.sh`
5. Document: Create ADR if architectural decision made
6. Reflect: Update pattern library with learnings

### When Stuck
1. Re-read CLAUDE.md decision trees
2. Check pattern library for similar problems
3. Review related ADRs
4. Ask specific question in new session (provide context)
5. Don't thrash - if stuck >30 min, ask for help

### Staying Motivated
- **Small wins**: Celebrate each green gate
- **Visible progress**: Track ADRs, workflows created
- **Share learnings**: Blog, tweet, discuss with others
- **Connect to goals**: Each phase = skill for promotion
- **End vision**: Kernel as portfolio piece for principal role

---

## Phase Transitions

### Before Moving to Next Phase
1. ✅ All deliverables complete
2. ✅ Success criteria met
3. ✅ Exit criteria passed
4. ✅ ADRs document key decisions
5. ✅ Patterns extracted and documented
6. ✅ Verification gates all green

**Don't skip phases.** Each builds on the previous. Weak foundation = unstable house.

---

## Beyond Phase 5: Continuous Evolution

After production launch, Kernel becomes your **permanent learning lab**:

### Advanced Features (Phase 6+)
- Real-time collaboration (WebSockets, CRDTs)
- AI-powered recommendations (embeddings, vector search)
- Mobile app (React Native, shared codebase)
- Browser extension (Chrome extension API)
- Desktop app (Electron, Tauri)

### Advanced Architecture (Phase 6+)
- Microservices (feature → service)
- Event-driven architecture (event bus)
- GraphQL (instead of REST)
- Server Components (React Server Components)
- Edge computing (Cloudflare Workers)

### Advanced Skills (Phase 6+)
- Multi-agent development (parallel feature work)
- AI-assisted refactoring (large-scale changes)
- Performance profiling (flame graphs, heap dumps)
- A/B testing framework
- Feature flags system

**Kernel never stops teaching.** It grows with you from junior → mid → senior → principal → staff.

---

## Tracking Progress

### Create a Progress Log

```markdown
# Kernel Progress Log

## Week 1
- [x] Fixed Errors 1-3 (import errors)
- [x] Created ADR-001, ADR-002, ADR-003
- [ ] Fixed Errors 4-7
- **Blocker**: Confused about type mismatch pattern
- **Learning**: BBA layer rules are clicking

## Week 2
...
```

### Update This Roadmap

As you complete phases:
1. Check off deliverables
2. Note actual time vs estimate
3. Document unexpected challenges
4. Update workflows with learnings
5. Add new phases as goals evolve

---

## Final Thoughts

**This is a marathon, not a sprint.** 10 weeks is ambitious but realistic if you:
- Follow workflows systematically
- Verify at every step
- Document decisions
- Learn from mistakes
- Ask when stuck

**Kernel is more than an app.** It's:
- Your principal-engineer training ground
- Your portfolio showcase
- Your pattern library
- Your architectural reference
- Your learning documentation

**By the end**, you'll have:
- Production app demonstrating all 12 architectural qualities
- Deep understanding of system design
- 25+ ADRs teaching architectural thinking
- 10+ reusable workflows
- 10+ documented patterns
- Confidence to tackle senior/principal roles

**Start with Phase 1, Error 1.** Fix it following the workflow. Create ADR-002. Run verification. Repeat.

**One error at a time. One phase at a time. One skill at a time.**

**You've got this.** 🚀

---

## Quick Start (Right Now)

```bash
# 1. Copy this roadmap to your project
cp /path/to/LEARNING_ROADMAP.md ~/kernel/.claude/

# 2. Read CLAUDE.md to understand the operating contract
cat ~/kernel/.claude/CLAUDE.md

# 3. Start Phase 1, Task 1
cat ~/kernel/.claude/skills/fix-typescript-import-error.md

# 4. Fix Error #1 (Bookmark import in bookmarkService.ts)
# Follow the workflow step-by-step

# 5. Run verification
.claude/verification/run-gates.sh

# 6. Create ADR-002
cp .claude/templates/ADR_TEMPLATE.md .claude/decisions/ADR-002-fix-bookmark-import.md
# Fill it out

# 7. Commit
git add .
git commit -m "Phase 1: Fix Bookmark type import (ADR-002)"

# 8. Repeat for Errors 2-7
```

**You're building more than an app. You're building yourself into a principal engineer.**

**Let's go.** 🎯
