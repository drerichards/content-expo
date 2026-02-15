# Session Handoff — BBA Architecture Audit

You are continuing work on **Kernel**, a personal learning engine / content explorer. The codebase is governed by **BBA (Block-Based Architecture)** and the **WAT framework** (Workflows, Agents, Tools). Read `docs/WAT.md` before doing anything — it is your operating contract.

---

## Project Stack

- Next.js 16.1.1, React 19.2.3, TypeScript 5, TailwindCSS 4, React Query 5
- CSS Modules for all component styling (no inline styles, no styled-components)
- Package manager: npm
- Git branch: `init-refactor-bba` (tracks `origin/init-refactor-bba`)

---

## User Communication Rules

- Communication style: "laymans while jargoning" — direct technical, no filler
- Short responses only
- Code > explanation
- No renaming without approval
- No new abstractions unless asked
- Use `const` arrow functions for React components — never function declarations
- Only Next.js route files (`page.tsx`, `layout.tsx`) keep `export default function`
- One file, one change, one idea — then verify

---

## What Was Completed (A1–B4)

All 8 tasks from the plan at `.claude/plans/lucky-munching-parnas.md` are done. Nothing is uncommitted-to-git but all changes are unstaged. Here's what happened:

### A1: Fix VideoDetailHeader upward import (DONE)
- **Problem**: `VideoDetailHeader.tsx` imported `useSearchPanel` from `@/interface/` (Feature → Interface = upward dependency)
- **Fix**: Removed context import. Added `isPanelExpanded: boolean` and `onToggleExpand: () => void` as props. `SearchContentPanel` now passes them down from its own `useSearchPanel()` call.
- **Files changed**: `src/features/video/components/VideoContent/VideoDetailHeader.tsx`, `src/features/video/components/VideoContent/index.tsx`, `src/interface/search/components/SearchContentPanel/index.tsx`

### A2: Delete dead Results component (DONE)
- **Problem**: `src/shared/ui/components/Results/index.tsx` imported from `@/features/` (Shared → Product = upward dependency)
- **Fix**: Deleted entirely — `SearchResultsPanel` already handles result rendering.
- **Files deleted**: `src/shared/ui/components/Results/index.tsx`, `src/shared/ui/components/Results/ResultsList.module.css`

### A3: Delete dead BookmarksList (DONE)
- **Problem**: `BookmarksList` imported `ArticleCard` from `@/features/article/` (Feature → Feature = horizontal coupling)
- **Fix**: Grep confirmed zero external consumers. Deleted entirely rather than refactoring with render prop.
- **Files deleted**: `src/features/bookmark/components/BookmarksList/index.tsx`, `src/features/bookmark/components/BookmarksList/BookmarksList.module.css`

### A4: Delete dead stub features (DONE)
- **Problem**: 4 stub feature directories (`playlist`, `snippet`, `stack`, `thread`) imported non-existent `CardBase` from shared
- **Fix**: All 4 had zero external consumers, used `fakeTypes.ts`, and violated conventions. Deleted all 4 directories + `src/app/fakeTypes.ts`.
- **Files deleted**: `src/features/playlist/` (entire dir), `src/features/snippet/` (entire dir), `src/features/stack/` (entire dir), `src/features/thread/` (entire dir), `src/app/fakeTypes.ts`

### B1: Fix type duplication (DONE)
- **Problem**: `ContentType` defined in both `src/types/index.ts` (unexported) and `src/features/bookmark/types.ts` (local copy)
- **Fix**: Exported `ContentType` from `src/types/index.ts`. Replaced local definition in `src/features/bookmark/types.ts` with `import type { ContentType } from "@/types"`.
- **Files changed**: `src/types/index.ts`, `src/features/bookmark/types.ts`

### B2: Remove debug console.log (DONE)
- Removed 2 `console.log` + 1 debug `useEffect` from `src/features/bookmark/hooks/useBookmarks.ts`
- Removed 1 `console.log` from `src/features/bookmark/api/bookmarkService.ts`
- Removed 1 `console.log` from `src/features/article/api/articleService.ts` (bonus find), prefixed unused param with `_`
- **Verification**: `grep -r "console.log" src/features/ src/interface/` returns zero in component/hook files. `console.error` retained in `bookmarkService.ts` (legitimate error handling).

### B3: Resolve TODO/FIX comments (DONE)
- Removed `// FIX: adapt toggleBookmark...` from `src/interface/search/hooks/useSearchPage.ts` (stale — bookmark toggle handled via context)
- Removed `// FIX: remove any reference to videos` from `src/interface/search/index.tsx` (premature — video is only content type with real search)
- Also removed file path comments from tops of both files

### B4: Standardize export pattern (DONE)
- Converted 10 files from `export default` to named exports
- Updated 5 import sites to use `{ }` import syntax
- Converted 3 shared containers from `function` declarations to `const` arrow functions
- `ErrorBoundary` kept as `export class` (React error boundaries require class components)
- `page.tsx` kept `export default function` (Next.js App Router requirement)
- **Verification**: `grep -r "export default" src/features/ src/interface/ src/shared/` returns zero

---

## Current Git State

Branch: `init-refactor-bba` — **all changes are unstaged**. No commits have been made for any of the A1–B4 work. The user has not requested a commit yet. Run `git status` to see the full list of modified/deleted files.

---

## Remaining TypeScript Errors (7 total — all pre-existing)

Run `npx tsc --noEmit` to verify. None of these were introduced by A1–B4 work. They all existed before:

### Error 1: `Bookmark` not exported from `@/types`
```
src/features/bookmark/api/bookmarkService.ts(1,15): error TS2305: Module '"@/types"' has no exported member 'Bookmark'.
src/interface/search/mappers/index.tsx(1,10): error TS2305: Module '"@/types"' has no exported member 'Bookmark'.
```
**Root cause**: `bookmarkService.ts` and `search/mappers/index.tsx` import `Bookmark` from `@/types`, but `Bookmark` is defined in `src/features/bookmark/types.ts`, not `src/types/index.ts`.
**Analysis**: This is also a BBA violation. `bookmarkService.ts` (inside bookmark feature) should import from its own `../types`, not from `@/types`. The search mappers file (`src/interface/search/mappers/index.tsx`) legitimately needs `Bookmark` — it could either:
  - Import from `@/features/bookmark/types` (legal: Interface can import from Features)
  - Or `Bookmark` gets re-exported from `@/types` if it's a shared contract

**Current file contents to be aware of**:
- `src/features/bookmark/types.ts` defines: `Bookmark` (with fields: id, provider, providerId, type, title, source, url, savedAt, publishedAt, description)
- `src/types/index.ts` has: `ContentType`, `ContentItem`, `VideoSearchResult`, `VideoApiThumbnail`, `SearchControlsProps`, `ResultsPanelProps`, `SearchDetailPanelProps`
- `src/features/bookmark/api/bookmarkService.ts` line 1: `import type { Bookmark } from "@/types"` — should be `from "../types"`
- `src/interface/search/mappers/index.tsx` line 1: `import { Bookmark, ContentItem } from "@/types"` — needs `Bookmark` imported from `@/features/bookmark/types` instead

### Error 2: `VideoApiSearchResponse` not exported from `@/types`
```
src/features/video/api/videoService.ts(1,29): error TS2305: Module '"@/types"' has no exported member 'VideoApiSearchResponse'.
```
**Root cause**: `videoService.ts` imports `VideoApiSearchResponse` from `@/types`, but this type doesn't exist anywhere in the codebase.
**Fix needed**: Define `VideoApiSearchResponse` in `src/features/video/types.ts` (it's a YouTube API response shape). It should look something like:
```typescript
export type VideoApiSearchResponse = {
  items: VideoApiItem[];
};
```
Then update `videoService.ts` to import from `../types` instead of `@/types`.

### Error 3: `VideoApiItem` not exported from `@/types`
```
src/features/video/mappers/index.ts(1,29): error TS2305: Module '"@/types"' has no exported member 'VideoApiItem'.
```
**Root cause**: Same pattern — `VideoApiItem` doesn't exist anywhere. The video mapper uses it to type YouTube API response items.
**Fix needed**: Define `VideoApiItem` in `src/features/video/types.ts`. Based on how the mapper uses it (`item.snippet.thumbnails.default`, `item.snippet.title`, `item.id.videoId`, etc.), the shape is:
```typescript
export type VideoApiItem = {
  id: string | { videoId: string };
  snippet: {
    title: string;
    channelId: string;
    channelTitle: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default?: VideoApiThumbnail;
      medium?: VideoApiThumbnail;
      high?: VideoApiThumbnail;
    };
  };
};
```
Also update `videoService.ts` and `video/mappers/index.ts` imports from `@/types` to `../types`.

### Error 4: `VideoSearchResult` not assignable to `Bookmark`
```
src/interface/search/components/SearchResultsPanel/index.tsx(67,58): error TS2345: Argument of type 'VideoSearchResult' is not assignable to parameter of type 'Bookmark'.
  Type 'VideoSearchResult' is missing the following properties from type 'Bookmark': provider, providerId, savedAt
```
**Root cause**: In `SearchResultsPanel` line 67: `onToggleBookmark={() => toggleBookmark(video)}` — `toggleBookmark` expects a `Bookmark` but receives a `VideoSearchResult`. These types have different shapes.
**Fix needed**: The `SearchResultsPanel` calls `useBookmarks()` directly (which returns `toggleBookmark(bookmark: Bookmark)`). It should either:
  - Map the `VideoSearchResult` to a `Bookmark` before passing to `toggleBookmark` (using `mapContentItemToBookmark` or similar)
  - Or use the `BookmarkContext` pattern that `SearchContentPanel` uses instead of calling `useBookmarks()` directly

### Error 5 & 6: `duration` property doesn't exist on `ContentItem`
```
src/interface/search/components/UpNextPanel.tsx(30,21): error TS2339: Property 'duration' does not exist on type 'ContentItem'.
src/interface/search/components/UpNextPanel.tsx(31,61): error TS2339: Property 'duration' does not exist on type 'ContentItem'.
```
**Root cause**: `UpNextPanel.tsx` references `item.duration` but `ContentItem` type has no `duration` field.
**Fix needed**: Either:
  - Add `duration?: string` to `ContentItem` in `src/types/index.ts`
  - Or remove the duration rendering from `UpNextPanel.tsx` (lines 30-32)

---

## Codebase Architecture Snapshot

### File Tree (what remains after cleanup)
```
src/
  app/
    (routes)/search/page.tsx      # Next.js route → renders SearchPageUI
    api/                          # API routes (not audited)
    layout.tsx                    # Root layout: Providers > SearchControlsProvider > AppFrame
    providers.tsx                 # Root: ErrorProvider > QueryClientProvider > BookmarkProvider
    page.tsx                      # Home page (not audited)
  features/
    article/                      # Stub — only has ArticleCard component + empty API
      api/articleService.ts       # Returns [] (placeholder)
      components/ArticleCard/     # Presentational card
      hooks/useArticleSearch.ts   # (not yet checked)
    bookmark/
      api/bookmarkService.ts      # localStorage CRUD via BookmarkService class
      components/                 # Empty after BookmarksList deletion
      context/BookmarkContext.tsx  # React context wrapping useBookmarks
      hooks/useBookmarks.ts       # State + localStorage via bookmarkService
      types.ts                    # Bookmark type definition
    video/
      api/videoService.ts         # Fetches /api/video?q=... → maps response
      components/
        VideoCard/                # Search result card (thumbnail + meta)
        VideoContent/             # Detail view (header + body)
          VideoDetailHeader.tsx   # Title, source, bookmark/expand/close buttons (leaf)
          VideoDetailBody.tsx     # Video embed + summary panel (leaf)
          index.tsx               # Composition: Container > Header + Body
      hooks/useVideoSearch.ts     # React Query wrapper for video search
      mappers/index.ts            # YouTube API → VideoSearchResult
      types.ts                    # VideoSearchResult, VideoApiThumbnail
  interface/
    navigation/
      AppSideNavigation/          # Side nav (not audited in detail)
      AppTopNavigation/           # Top nav with search input + filters
        SearchControls/           # Search bar wrapper
        SearchFilters/            # Context/level dropdowns
        SearchInput/              # Text input
    search/
      index.tsx                   # SearchPageUI — the Hub (orchestrates everything)
      SearchPage.module.css
      components/
        SearchPanels.tsx          # Panel layout logic (results vs content)
        SearchResultsPanel/       # Video results list (Sub-hub)
        SearchContentPanel/       # Selected item detail view (Sub-hub)
        SearchPageLayout/         # Page layout wrapper
        UpNextPanel.tsx           # Suggested next items
        index.ts                  # Barrel exports
      context/
        SearchControlsContext.tsx # Lifts search controls to layout level
        SearchPanelContext.tsx    # Panel expand/collapse state
      hooks/
        useSearchPage.ts          # All search page state (the Branch)
        useContentData.ts         # Mock data hook
      mappers/
        index.tsx                 # ContentItem ↔ Bookmark mappers
  shared/
    context/ErrorContext.tsx       # Global error state
    hooks/                        # useDebounce, useLocalStorage
    styles/                       # Tokens, helpers, options, CSS
    ui/
      base/                       # Layer 1: Base component (single DOM element)
      block/                      # Layer 3: Block components (Button, Card, Text, etc.)
      components/ErrorBoundary/   # React class error boundary
      containers/                 # PanelContainer, ContentContainer, AsidePanel(SidePanel)
      frame/AppFrame/             # App shell layout
      layout/                     # LayoutRow, LayoutColumn, LayoutPanel, LayoutMain
      options/                    # Finite value sets for styling
      variants/                   # Variant system
  types/index.ts                  # Shared type definitions
  data/mockData.ts                # Mock content items
docs/
  WAT.md                          # Agent operating contract (READ THIS FIRST)
  DsGUIDE.md                     # Design system reference
refs/                             # Read-only reference docs (BBA canon, PRD, etc.)
workflows/                        # Task SOPs (a1–a4, b1–b4) — all completed
```

### BBA Layer Map
```
Layer 1 (Rendering):  src/shared/ui/base/           → Base component
Layer 2 (Styling):    src/shared/styles/             → Tokens, helpers, options
Layer 3 (Composition): src/shared/ui/block/          → Block components
                       src/shared/ui/layout/         → Layout components
                       src/shared/ui/containers/     → Containers
Layer 4 (Product):    src/features/                  → Feature slices
                      src/interface/                 → Cross-feature orchestration
```

### Dependency Direction (verified clean)
```
Rendering → Styling → Composition → Product (nothing imports upward)
grep -r "from.*@/features" src/shared/    → zero results
grep -r "from.*@/interface" src/features/ → zero results
```

### State Tree (Tree Model)
```
Root (app/providers.tsx)
├── ErrorProvider                          # Global error context
├── QueryClientProvider                    # React Query
└── BookmarkProvider                       # Bookmark state (localStorage-backed)
    └── SearchControlsProvider             # Lifts search controls to layout
        └── AppFrame
            ├── AppTopNavigation           # Reads SearchControlsContext
            ├── AppSideNavigation
            └── SearchPage
                └── SearchPanelProvider    # Panel expand/collapse
                    ├── SearchResultsPanel # Uses useBookmarks() directly
                    └── SearchContentPanel # Uses useBookmarkContext() + useSearchPanel()
```

### Key Type Definitions

**`ContentItem`** (src/types/index.ts) — the universal content shape:
```typescript
{ id, type: ContentType, title, description, source, url, publishedAt }
```

**`VideoSearchResult`** (src/types/index.ts AND src/features/video/types.ts — duplicated!):
```typescript
{ id, type: "video", title, channelId, channelTitle?, description, source, url, publishedAt, thumbnails }
```
Note: This type is defined in BOTH locations. `src/types/index.ts` has it for shared use, `src/features/video/types.ts` has it for feature-local use. Some files import from one, some from the other. This duplication should be resolved.

**`Bookmark`** (src/features/bookmark/types.ts):
```typescript
{ id, provider: "video"|"web", providerId, type: ContentType, title, source, url, savedAt, publishedAt, description }
```

### Known Type Duplication Issue
`VideoSearchResult` and `VideoApiThumbnail` are defined in both:
- `src/types/index.ts` (lines 15-32)
- `src/features/video/types.ts` (lines 1-18)

These are identical definitions. The canonical location per BBA should be decided:
- If `VideoSearchResult` is only used by the video feature + interface layer → keep in `src/features/video/types.ts`, remove from `src/types/index.ts`
- If it's used across multiple features → keep in `src/types/index.ts`

Currently used by: `src/types/index.ts` (in `ResultsPanelProps`), `src/features/video/hooks/useVideoSearch.ts`, `src/features/video/api/videoService.ts`, `src/interface/search/components/SearchResultsPanel/index.tsx`, `src/data/mockData.ts`

---

## What To Do Next

### Priority 1: Fix the 7 TypeScript Errors

These block the build. Fix in this order:

1. **Fix `bookmarkService.ts` import** — change `import type { Bookmark } from "@/types"` to `import type { Bookmark } from "../types"`. This is both a TS error fix and a BBA compliance fix (feature should import from own types, not from shared types that don't export it).

2. **Fix `search/mappers/index.tsx` import** — change `import { Bookmark, ContentItem } from "@/types"` to import `Bookmark` from `@/features/bookmark/types` and `ContentItem` from `@/types`. This is legal per BBA (Interface can import from Features).

3. **Define missing video API types** — add to `src/features/video/types.ts`:
   ```typescript
   export type VideoApiItem = {
     id: string | { videoId: string };
     snippet: {
       title: string;
       channelId: string;
       channelTitle: string;
       description: string;
       publishedAt: string;
       thumbnails: {
         default?: VideoApiThumbnail;
         medium?: VideoApiThumbnail;
         high?: VideoApiThumbnail;
       };
     };
   };

   export type VideoApiSearchResponse = {
     items: VideoApiItem[];
   };
   ```
   Then update `videoService.ts` line 1: change `from "@/types"` to `from "../types"`.
   And `video/mappers/index.ts` line 1: change `from "@/types"` to `from "../types"`.

4. **Fix `SearchResultsPanel` toggleBookmark type mismatch** — line 67 passes `VideoSearchResult` where `Bookmark` is expected. Either:
   - Map the video to a bookmark first: `onToggleBookmark={() => toggleBookmark(mapVideoToBookmark(video))}`
   - Or switch from `useBookmarks()` to `useBookmarkContext()` and handle mapping at a higher level
   - Ask the user which approach they prefer

5. **Fix `UpNextPanel` duration reference** — either add `duration?: string` to `ContentItem` or remove the duration rendering (lines 30-32 of `UpNextPanel.tsx`). The mock data has no `duration` field, so removing is cleaner.

### Priority 2: Resolve Type Duplication

`VideoSearchResult` and `VideoApiThumbnail` exist in both `src/types/index.ts` and `src/features/video/types.ts`. Consolidate to one location. The `ResultsPanelProps` type in `src/types/index.ts` references `VideoSearchResult`, which creates a dependency on video types from the shared types file. This is a subtle BBA concern — shared types shouldn't depend on feature-specific types.

Options:
- Move `VideoSearchResult` to `src/features/video/types.ts` only, and move `ResultsPanelProps` to `src/interface/search/` (where it's actually consumed)
- Or keep `VideoSearchResult` in `src/types/` as a shared contract

### Priority 3: Commit the work

All A1–B4 changes are unstaged. The user hasn't requested a commit yet. When they do, use a descriptive commit message covering all 8 tasks.

### Priority 4: Future work (user hasn't requested)

The plan file mentions deferred items:
- Radix UI integration
- DsGUIDE.md enhancements
- The `article` feature is mostly a stub (empty API, no search integration)
- `providers.tsx` uses `function` declarations (not `const` arrow) — technically violates the convention but it's in `app/` layer

---

## Verification Commands

Run these after any change:

```bash
# TypeScript type check
npx tsc --noEmit

# BBA dependency checks
grep -r "from.*@/features" src/shared/           # Must return zero
grep -r "from.*@/interface" src/features/         # Must return zero
grep -r "from.*@/features/" src/features/ --include="*.tsx" --include="*.ts"  # Flag cross-feature

# Debug code
grep -r "console.log" src/features/ src/interface/ --include="*.ts" --include="*.tsx"  # Must return zero

# Export pattern
grep -r "export default" src/features/ src/interface/ src/shared/  # Must return zero

# Build
npm run build
```

---

## Files You Should Read First

1. `docs/WAT.md` — your operating contract (BBA rules, state model, communication rules)
2. `docs/DsGUIDE.md` — design system reference (for any UI work)
3. `src/types/index.ts` — shared type definitions
4. `src/features/video/types.ts` — video-specific types (has duplication issue)
5. `src/features/bookmark/types.ts` — bookmark type definition
6. `refs/kernel_bba_canon_markdown.md` — authoritative BBA source
