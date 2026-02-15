# Workflow: Fix Type Mismatch Error

**Version**: 1.0  
**Created**: 2026-02-14  
**Last Updated**: 2026-02-14  
**Status**: Active  
**Estimated Time**: 20-30 minutes  
**Complexity**: Medium-High

---

## Objective

**What does this workflow accomplish?**

> This workflow **resolves TypeScript type mismatch errors** by **transforming data at architectural boundaries or aligning type definitions**, resulting in **type-safe data flow that respects layer boundaries**.

**Why does this workflow exist?**
- Type mismatches often reveal architectural boundary issues
- Pattern for transforming data between different type shapes
- Codifies decision-making: transform vs align vs refactor
- Prevents "type assertion sprawl" (`as` casting to silence errors)

---

## Prerequisites

**Before starting this workflow, verify:**

### Required Knowledge
- [x] Understand BBA layer rules and boundaries
- [x] Understand the state tree model (hubs, leaves, data flow)
- [x] Know TypeScript type compatibility rules

### Required Context
- [x] Have the TypeScript error showing type mismatch
- [x] Identified which function/component has mismatched types
- [x] Know what each type represents (domain model, API response, UI props)

### Required Tools
- [x] TypeScript compiler can run
- [x] grep for searching type definitions

**If any prerequisite fails, STOP. Resolve it before proceeding.**

---

## Architecture Context

**What BBA rules apply to this workflow?**

Type mismatches often occur at boundaries:
```
API Response (external) → Domain Model (feature) → View Model (UI)
                      ↓                        ↓
               Type transformation      Type transformation
```

**Common mismatch patterns**:
1. **API → Domain**: External shape doesn't match internal model
2. **Domain A → Domain B**: Different features have different models
3. **Domain → UI**: Business model has fields UI doesn't need/want
4. **Search Result → Stored Item**: Transient data vs persisted data

**Relevant CLAUDE.md sections**:
- THE DECISION TREES → "I Need to Import Something"
- State Management: The Tree Model
- THE CONTRACT → Type Safety as Documentation

---

## Steps

### Step 1: Understand the Mismatch

**What**: Identify exactly what types are incompatible and why

**Why**: Determines the correct fix strategy

**How**:
1. Run TypeScript compiler to see the error:
   ```bash
   npx tsc --noEmit 2>&1 | grep "not assignable"
   ```

2. Capture error details:
   ```
   Error location: src/interface/search/components/SearchResultsPanel/index.tsx:67
   Error: Argument of type 'VideoSearchResult' is not assignable to parameter 
          of type 'Bookmark'.
   Missing properties: provider, providerId, savedAt
   ```

3. Find both type definitions:
   ```bash
   grep -r "export.*type.*VideoSearchResult" src/
   grep -r "export.*type.*Bookmark" src/
   ```

4. Compare the types side-by-side:
   ```typescript
   // Type 1: VideoSearchResult (what you have)
   type VideoSearchResult = {
     id: string;
     type: "video";
     title: string;
     channelId: string;
     description: string;
     url: string;
     publishedAt: string;
     thumbnails: {...};
   }
   
   // Type 2: Bookmark (what's expected)
   type Bookmark = {
     id: string;
     provider: "video" | "web";     // ← MISSING
     providerId: string;             // ← MISSING
     type: ContentType;
     title: string;
     source: string;
     url: string;
     savedAt: string;                // ← MISSING
     publishedAt: string;
     description: string;
   }
   ```

5. Document the gap:
   ```
   VideoSearchResult → Bookmark
   Missing: provider, providerId, savedAt
   Different: source vs channelId (semantic difference)
   ```

**Files affected**: None (analysis step)

**Verification**: Clear understanding of type incompatibility

**Expected output**: Documented type comparison

**If verification fails**:
- Types look identical but still error → Check for subtle differences (optional vs required, string vs string literal)
- Can't find one of the types → Use workflow: add-missing-type-definition.md first

---

### Step 2: Classify the Boundary

**What**: Determine what kind of boundary this mismatch represents

**Why**: Different boundaries require different solutions

**How**:
1. Ask the classification questions:
   
   **Q1: Where does this mismatch occur?**
   - [ ] At API boundary (external → internal)
   - [ ] At feature boundary (feature A → feature B)
   - [ ] At layer boundary (hub → leaf)
   - [ ] At storage boundary (transient → persisted)

2. For the example (SearchResultsPanel):
   ```
   Location: src/interface/search/components/SearchResultsPanel/index.tsx:67
   Code: onToggleBookmark={() => toggleBookmark(video)}
   
   Boundary type: Storage boundary
   - video is VideoSearchResult (transient search result)
   - toggleBookmark expects Bookmark (persisted item)
   - Interface layer using feature hook directly
   ```

3. Identify the data flow:
   ```
   Search Results (VideoSearchResult[])
        ↓
   User clicks bookmark button
        ↓
   toggleBookmark(item: Bookmark)
        ↓
   Save to localStorage
   ```

4. Document the boundary:
   ```
   Boundary: Search result → Bookmark storage
   Direction: Transient → Persistent
   Layer: Interface (SearchResultsPanel) → Feature (BookmarkContext)
   ```

**Files affected**: None (analysis step)

**Verification**: Boundary classification matches architecture

**Expected output**: Clear understanding of data flow

**If verification fails**:
- Multiple boundaries involved → May need to refactor architecture
- Unclear which layer owns transformation → Re-read CLAUDE.md state tree model

---

### Step 3: Choose Fix Strategy

**What**: Decide how to resolve the mismatch

**Why**: Different strategies have different architectural implications

**How**:
1. Evaluate the options:

   **Option A: Transform at the boundary** (RECOMMENDED)
   - Where: Create mapper function
   - When: Types represent different concepts (search result vs stored item)
   - Pro: Explicit transformation, clear ownership
   - Con: Requires mapping code
   
   **Option B: Align the types** (RARE)
   - Where: Change one type to match the other
   - When: Types represent same concept but diverged accidentally
   - Pro: Simpler, no transformation needed
   - Con: May break other code, may not be conceptually correct
   
   **Option C: Refactor the architecture** (COMPLEX)
   - Where: Change how components communicate
   - When: Mismatch reveals architectural flaw
   - Pro: Fixes root cause
   - Con: Requires broader changes, more risk

2. For the example, choose Option A:
   ```
   Strategy: Transform at boundary
   Reason: VideoSearchResult and Bookmark are different concepts
   - VideoSearchResult: Transient data from search API
   - Bookmark: Persisted data with metadata (savedAt, provider)
   - They happen to share some fields but serve different purposes
   ```

3. Document the decision:
   ```
   Fix: Create mapVideoSearchResultToBookmark() function
   Location: src/features/bookmark/mappers/ (new directory)
   OR: src/interface/search/mappers/index.tsx (already exists)
   
   Reasoning: Transformation happens at interface layer because:
   - Interface orchestrates between features
   - Bookmark feature shouldn't know about VideoSearchResult
   - Search results can come from multiple sources (video, article)
   ```

**Files affected**: None (decision step)

**Verification**: Strategy aligns with BBA principles

**Expected output**: Clear decision on fix approach

**If verification fails**:
- All options seem wrong → May need architectural guidance
- Multiple strategies viable → Choose simplest that doesn't violate BBA

---

### Step 4: Implement the Transformation

**What**: Create mapper function to transform between types

**Why**: Makes types compatible at the boundary

**How**:
1. Determine mapper location based on BBA:
   ```
   If transformation is feature-specific:
     → src/features/{domain}/mappers/
   
   If transformation is cross-feature orchestration:
     → src/interface/{branch}/mappers/
   ```

2. Create/update the mapper file:
   ```typescript
   // src/interface/search/mappers/index.tsx
   
   import type { VideoSearchResult } from "@/types";
   import type { Bookmark } from "@/features/bookmark/types";
   
   /**
    * Transform a video search result into a bookmark
    * Adds persistence metadata (provider, savedAt) to search result data
    */
   export const mapVideoSearchResultToBookmark = (
     video: VideoSearchResult
   ): Bookmark => {
     return {
       id: video.id,
       provider: "video",                    // Add: Storage provider
       providerId: video.id,                 // Add: Original ID
       type: video.type,                     // Already compatible
       title: video.title,
       source: video.channelTitle || "Unknown",  // Transform: channel → source
       url: video.url,
       savedAt: new Date().toISOString(),   // Add: Current timestamp
       publishedAt: video.publishedAt,
       description: video.description,
     };
   };
   ```

3. Add type safety checks if needed:
   ```typescript
   export const mapVideoSearchResultToBookmark = (
     video: VideoSearchResult
   ): Bookmark => {
     // Validate required fields
     if (!video.id || !video.title) {
       throw new Error("Invalid video result: missing required fields");
     }
     
     return {
       // ... mapping
     };
   };
   ```

4. Document the transformation:
   ```typescript
   /**
    * Transforms transient search results into persistable bookmarks.
    * 
    * Key transformations:
    * - Adds storage metadata (provider, providerId, savedAt)
    * - Maps channelTitle → source (semantic difference)
    * - Preserves all displayable content (title, description, etc.)
    * 
    * @param video - Search result from video API
    * @returns Bookmark ready for localStorage persistence
    */
   ```

**Files affected**:
- `src/interface/search/mappers/index.tsx` (new function)

**Verification**:
```bash
# Function compiles
npx tsc --noEmit src/interface/search/mappers/index.tsx

# Function is exported
grep "export.*mapVideoSearchResultToBookmark" src/interface/search/mappers/index.tsx
```

**Expected output**: Type-safe mapper function

**If verification fails**:
- TypeScript errors in mapper → Check that return type matches Bookmark exactly
- Can't import types → Use workflow: fix-typescript-import-error.md

---

### Step 5: Use the Mapper at the Boundary

**What**: Update the code to transform data before passing it

**Why**: Resolves the type mismatch

**How**:
1. Find the location of the error (from Step 1):
   ```typescript
   // src/interface/search/components/SearchResultsPanel/index.tsx:67
   
   // BEFORE (type mismatch)
   onToggleBookmark={() => toggleBookmark(video)}
   ```

2. Import the mapper:
   ```typescript
   import { mapVideoSearchResultToBookmark } from "../../mappers";
   ```

3. Apply the transformation:
   ```typescript
   // AFTER (type-safe)
   onToggleBookmark={() => toggleBookmark(mapVideoSearchResultToBookmark(video))}
   ```

4. Alternative: Transform earlier in the data flow:
   ```typescript
   // If multiple places need the bookmark version:
   const bookmark = mapVideoSearchResultToBookmark(video);
   
   return (
     <VideoCard
       {...video}
       onToggleBookmark={() => toggleBookmark(bookmark)}
       isBookmarked={isBookmarked(bookmark.id)}
     />
   );
   ```

**Files affected**:
- File with the type mismatch (1-2 line change)

**Verification**:
```bash
# TypeScript error should be gone
npx tsc --noEmit

# Specific error from Step 1 should not appear
npx tsc --noEmit 2>&1 | grep "SearchResultsPanel"
```

**Expected output**: Type mismatch resolved

**If verification fails**:
- New type error → Mapper return type doesn't match expected type
- Same error persists → Import not working, check import path

---

### Step 6: Test the Transformation

**What**: Verify the mapper works correctly at runtime

**Why**: Type safety doesn't guarantee correct business logic

**How**:
1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Test the feature manually:
   - Navigate to search page
   - Perform a search (get VideoSearchResults)
   - Click bookmark button (triggers transformation)
   - Verify bookmark is saved with all required fields
   - Check localStorage to see saved data shape

3. Add console logging (temporarily) to verify transformation:
   ```typescript
   const bookmark = mapVideoSearchResultToBookmark(video);
   console.log("Transformed:", bookmark);
   toggleBookmark(bookmark);
   ```

4. Verify transformed data has:
   - All required fields (provider, providerId, savedAt)
   - Correct values (savedAt is timestamp, provider is "video")
   - Original data preserved (title, description, etc.)

5. Remove console logging after verification

**Files affected**: None (testing only)

**Verification**: Feature works end-to-end

**Expected output**: Bookmarks save and display correctly

**If verification fails**:
- Runtime error → Mapper has logic bug, review transformation in Step 4
- Data missing/wrong → Check field mapping, may have wrong source field
- Feature doesn't work → May have broken something else, check for side effects

---

### Step 7: Consider Edge Cases

**What**: Handle scenarios where transformation might fail

**Why**: Defensive programming, prevent runtime errors

**How**:
1. Identify potential failures:
   - What if required field is missing from source?
   - What if source field is undefined/null?
   - What if transformation throws an error?

2. Add defensive checks to mapper:
   ```typescript
   export const mapVideoSearchResultToBookmark = (
     video: VideoSearchResult
   ): Bookmark => {
     // Defensive: Ensure required fields exist
     const source = video.channelTitle || video.channelId || "Unknown";
     const description = video.description || "";
     
     return {
       id: video.id,
       provider: "video",
       providerId: video.id,
       type: video.type,
       title: video.title,
       source,
       url: video.url,
       savedAt: new Date().toISOString(),
       publishedAt: video.publishedAt,
       description,
     };
   };
   ```

3. Consider error handling at call site:
   ```typescript
   // Option 1: Try-catch
   try {
     const bookmark = mapVideoSearchResultToBookmark(video);
     toggleBookmark(bookmark);
   } catch (error) {
     console.error("Failed to bookmark video:", error);
     showErrorToast("Could not bookmark this item");
   }
   
   // Option 2: Validation before transform
   if (canBookmark(video)) {
     toggleBookmark(mapVideoSearchResultToBookmark(video));
   }
   ```

4. Document edge cases in mapper:
   ```typescript
   /**
    * Note: Gracefully handles missing channelTitle by falling back to
    * channelId or "Unknown". This can happen with deleted/private channels.
    */
   ```

**Files affected**:
- Mapper file (defensive code added)
- Call site (error handling if needed)

**Verification**:
```bash
# Still compiles
npx tsc --noEmit

# Test edge cases manually
# - Try bookmarking video with missing channelTitle
# - Verify doesn't crash
```

**Expected output**: Robust transformation

**If verification fails**: Edge case causes runtime error → Add more defensive checks

---

### Step 8: Create ADR

**What**: Document the type transformation decision

**Why**: Explains why transformation exists and where it happens

**How**:
1. Copy ADR template:
   ```bash
   cp .claude/templates/ADR_TEMPLATE.md .claude/decisions/ADR-{NUMBER}-transform-video-to-bookmark.md
   ```

2. Key sections to document:
   - **Context**: Why types were incompatible (different concepts)
   - **Decision**: Created mapper at interface layer
   - **Options Considered**: 
     - Option A: Transform (chosen) 
     - Option B: Align types (rejected - concepts differ)
     - Option C: Use type assertion (rejected - unsafe)
   - **Consequences**: Explicit transformation, clear boundary
   - **Teaching Moment**: Data transformation at architectural boundaries

3. Example teaching moment:
   ```markdown
   ## Teaching Moment
   
   This demonstrates **boundary transformation pattern**. Types mismatch
   because they represent different concepts:
   
   - VideoSearchResult: Ephemeral data from API (search context)
   - Bookmark: Persistent data in storage (saved context)
   
   The transformation happens at the interface layer because:
   1. Interface orchestrates between features (search + bookmarks)
   2. Bookmark feature shouldn't know about search results
   3. Search results can come from multiple sources (video, article, etc.)
   
   Alternative (bad): Make types the same by adding savedAt to VideoSearchResult
   - Pollutes search results with storage concerns
   - Breaks single responsibility (search result shouldn't know about persistence)
   ```

**Files affected**:
- `.claude/decisions/ADR-{NUMBER}-transform-video-to-bookmark.md` (new file)

**Verification**: ADR clearly explains the transformation

**Expected output**: Documented decision for future reference

**If verification fails**: N/A (documentation is recommended)

---

## Verification Gates

**After completing all steps, run these checks:**

### Red Gates (must pass)
```bash
# TypeScript type check - error should be gone
npx tsc --noEmit
# Expected: No type mismatch error

# Build should succeed
npm run build
# Expected: Build succeeds

# Feature works end-to-end
# Manual test: Search → Bookmark → Verify saved
# Expected: No runtime errors
```

**If any red gate fails**: STOP, review transformation logic.

### Yellow Gates (should pass)
```bash
# Mapper has tests (future: when testing is set up)
# ls src/interface/search/mappers/__tests__/
# Expected: Test file exists

# Mapper is documented
grep -A5 "/**" src/interface/search/mappers/index.tsx
# Expected: JSDoc comments present
```

**If any yellow gate fails**: Note for future improvement.

---

## Expected Output

**What artifacts are created?**
- [x] Mapper function in appropriate location
- [x] Updated code using the mapper
- [x] ADR documenting the transformation
- [x] Tested end-to-end functionality

**What should work differently?**
- Type mismatch resolved
- Data flows correctly through boundary
- Explicit transformation (no hidden coercion)

**How to verify the output manually**:
1. Search for content
2. Bookmark an item
3. Check localStorage for correct shape
4. Reload page, verify bookmark persists

---

## Failure Recovery

**Common failures and solutions:**

### Failure 1: Transformation creates new type error
**Symptoms**:
- New TypeScript error in mapper
- Error: Return type doesn't match Bookmark

**Root cause**: Missed a required field or wrong type

**Solution**:
1. Compare mapper return against Bookmark type definition
2. Check each field: name, type, presence
3. Add any missing fields
4. Fix any type mismatches (string vs string literal, etc.)
5. Resume workflow at: Step 6

### Failure 2: Runtime error when using mapper
**Symptoms**:
- TypeError: Cannot read property 'X' of undefined
- App crashes when bookmarking

**Root cause**: Source data doesn't have expected shape

**Solution**:
1. Add defensive checks (Step 7)
2. Log the source data to see actual shape
3. Handle missing/undefined fields gracefully
4. Consider validation before transformation

### Failure 3: Transformation violates BBA
**Symptoms**:
- Mapper imports from wrong layer
- grep shows new architectural violation

**Root cause**: Mapper in wrong location or imports incorrectly

**Solution**:
1. Check mapper location aligns with boundary type (Step 3)
2. Fix imports using workflow: fix-typescript-import-error.md
3. Mapper should import from features (downward) not other way

**General recovery strategy**:
If stuck:
1. Re-read CLAUDE.md → State Management: The Tree Model
2. Draw the data flow on paper (source → transformation → destination)
3. Check existing mappers in codebase for patterns
4. Consider if mismatch reveals architectural flaw (may need broader refactor)

---

## Teaching Moment

**What architectural principle does this workflow demonstrate?**

This workflow teaches **explicit boundary transformation** - a core principle of clean architecture. Type mismatches aren't errors to suppress—they're signals about boundaries:

- **Different types = different concepts**: VideoSearchResult ≠ Bookmark (even if similar)
- **Boundaries need adapters**: Transformation makes concepts compatible
- **Explicit > implicit**: Mapper function documents the transformation clearly
- **Ownership matters**: Interface layer transforms between features

**Pattern being practiced**: Data transformation at architectural boundaries
- External API → Internal domain (raw response → domain model)
- Transient → Persistent (search result → saved item)
- Feature A → Feature B (via interface layer adapter)

**What you learn by completing this workflow**:
- **Technical skill**: TypeScript type manipulation, data mapping, defensive programming
- **Architectural thinking**: Boundary identification, transformation placement, concept separation
- **Design patterns**: Adapter pattern, mapper pattern, anti-corruption layer

**Real-world parallel**: This is like a language translator at a border. The two sides speak different languages (types), but the translator (mapper) makes communication possible without either side changing their language.

---

## Variations

**When this workflow needs to be adapted:**

### Variation 1: Multiple sources map to same destination
**When**: Articles AND videos both convert to Bookmarks
**Changes**:
- Create separate mappers: `mapArticleToBookmark`, `mapVideoToBookmark`
- May extract common transformation: `createBookmark(commonFields, specificFields)`
- Document pattern in ADR

### Variation 2: Bidirectional transformation needed
**When**: Need to go both ways (A → B and B → A)
**Changes**:
- Create both mappers: `mapAToB`, `mapBToA`
- Ensure round-trip preserves data (test: map(unmap(x)) === x)
- May indicate types should be aligned instead

### Variation 3: Transformation is complex/multi-step
**When**: Mapper logic exceeds ~20 lines
**Changes**:
- Extract sub-transformations: `transformMetadata`, `transformContent`
- Consider builder pattern if many optional fields
- Add unit tests for transformation logic

---

## Related Workflows

**Workflows that should be run before this one**:
- fix-typescript-import-error.md - Ensure types can be imported
- add-missing-type-definition.md - Ensure types exist

**Workflows that typically follow this one**:
- None (this resolves the mismatch)

**Workflows that are alternatives to this one**:
- Refactor architecture (if mismatch reveals design flaw)

---

## Workflow History

**Version 1.0** (2026-02-14)
- Initial creation
- Based on: VideoSearchResult → Bookmark transformation
- Pattern for boundary data mapping

---

## Metadata

**Tags**: #typescript #transformation #boundaries #mappers #architecture  
**Phase**: Phase 1 (Foundation)  
**Frequency**: Per-boundary (moderate - happens at feature interfaces)  
**Automation Candidate**: No (requires conceptual analysis)

---

## Success Criteria

You've successfully completed this workflow when:
- [x] Type mismatch error is resolved
- [x] Mapper function exists at correct boundary
- [x] Data flows correctly at runtime
- [x] Transformation is tested and handles edge cases
- [x] ADR explains why transformation exists
- [x] No type assertions (`as`) used to silence errors

**After creating 3+ mappers, you'll recognize boundary patterns and know where transformations belong.**
