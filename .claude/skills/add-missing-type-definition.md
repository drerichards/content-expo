# Workflow: Add Missing Type Definition

**Version**: 1.0  
**Created**: 2026-02-14  
**Last Updated**: 2026-02-14  
**Status**: Active  
**Estimated Time**: 15-20 minutes  
**Complexity**: Medium

---

## Objective

**What does this workflow accomplish?**

> This workflow **creates missing TypeScript type definitions** by **analyzing how the type is used and placing it in the correct BBA layer**, resulting in **type-safe code with proper type ownership**.

**Why does this workflow exist?**
- TypeScript errors often indicate missing type definitions (not just wrong imports)
- Determining where a type belongs (feature vs shared) requires architectural judgment
- Pattern for creating types that respect BBA boundaries
- Prevents future "type definition sprawl" by establishing ownership

---

## Prerequisites

**Before starting this workflow, verify:**

### Required Knowledge
- [x] Understand BBA layer rules (see CLAUDE.md → THE LAYERS)
- [x] Understand feature-local vs shared types
- [x] Know TypeScript type syntax (type, interface, export)

### Required Context
- [x] Have the TypeScript error showing missing type
- [x] Identified which files attempt to use this type
- [x] Know what the type represents (API response, domain model, UI props, etc.)

### Required Tools
- [x] TypeScript compiler can run
- [x] Text editor with TypeScript support
- [x] grep for searching codebase

**If any prerequisite fails, STOP. Resolve it before proceeding.**

---

## Architecture Context

**What BBA rules apply to this workflow?**

Type ownership follows layer boundaries:
```
Feature-specific types → src/features/{domain}/types.ts
Cross-feature contracts → src/types/index.ts
Shared UI types → src/shared/ui/types/ (if needed)
```

**Type classification**:
- **Domain types**: Models specific to a feature (Video, Bookmark, Article)
- **API types**: External API shapes (VideoApiSearchResponse, YouTubeApiItem)
- **Contract types**: Shared across features (ContentItem, ContentType)
- **UI types**: Component props, presentation models

**Relevant CLAUDE.md sections**:
- THE CONTRACT → Type Safety as Documentation
- THE LAYERS → Layer 4: Product
- Ownership Rules → Features own their vertical slice

---

## Steps

### Step 1: Identify the Missing Type

**What**: Understand what type is missing and where it's needed

**Why**: Determines where the type should be defined

**How**:
1. Run TypeScript compiler to see the error:
   ```bash
   npx tsc --noEmit 2>&1 | grep "has no exported member\|Cannot find"
   ```

2. For each missing type, document:
   - **Type name**: e.g., `VideoApiSearchResponse`
   - **Where it's imported**: File and line number
   - **What imports it**: Feature name (e.g., `features/video/`)
   - **Error type**: 
     - `has no exported member` = type not exported from module
     - `Cannot find name` = type doesn't exist anywhere

3. Example documentation:
   ```
   Type: VideoApiSearchResponse
   Imported in: src/features/video/api/videoService.ts:1
   Imported from: "@/types"
   Error: Module '"@/types"' has no exported member 'VideoApiSearchResponse'
   Feature: video
   ```

**Files affected**: None (analysis step)

**Verification**: Have clear understanding of what's missing

**Expected output**: Documented missing type details

**If verification fails**: 
- Can't determine what the type is → Check how it's used in code
- Type exists but isn't exported → Different problem (export it instead of creating new)

---

### Step 2: Analyze Type Usage

**What**: Understand how the type is used to determine its shape

**Why**: Type definition must match actual usage in code

**How**:
1. Find all places the type is referenced:
   ```bash
   grep -r "VideoApiSearchResponse" src/ --include="*.ts" --include="*.tsx"
   ```

2. Examine the usage context:
   ```typescript
   // Example from videoService.ts
   const response = await fetch(url);
   const data: VideoApiSearchResponse = await response.json();
   // ↑ Type is used for YouTube API response
   
   return data.items.map(mapVideoApiItemToVideoSearchResult);
   // ↑ Type has an 'items' property that's an array
   ```

3. Identify the shape based on usage:
   - What properties are accessed? (`data.items`, `data.nextPageToken`)
   - What types are those properties? (array, string, number, object)
   - Is this from external API docs? (check API documentation)

4. Document the shape:
   ```typescript
   // VideoApiSearchResponse shape based on usage:
   {
     items: VideoApiItem[];  // array of items
     // May have pagination: nextPageToken?: string;
   }
   ```

**Files affected**: None (analysis step)

**Verification**:
```bash
# Confirm you found all usages
grep -r "{TypeName}" src/ --include="*.ts" --include="*.tsx" | wc -l
```

**Expected output**: Clear understanding of type structure

**If verification fails**:
- Type used but never defined → Need to check API docs or runtime data
- Type used inconsistently → May need to refactor usage before defining type

---

### Step 3: Determine Type Ownership

**What**: Decide where the type definition should live

**Why**: Respects BBA ownership rules, prevents type sprawl

**How**:
1. Ask the classification questions:
   
   **Q1: Is this type feature-specific?**
   - Used only within one feature? → **Feature-local type**
   - Used by 2+ features? → Continue to Q2
   
   **Q2: Is this an external API shape?**
   - From YouTube/external API? → **Feature-local API type**
   - Internal domain model? → Continue to Q3
   
   **Q3: Is this a cross-feature contract?**
   - Defines how features communicate? → **Shared contract type**
   - Just happens to be used by multiple features? → **Consider refactoring instead**

2. Apply the decision tree:
   ```
   VideoApiSearchResponse
   ├─ Q1: Feature-specific? YES (only video feature uses it)
   ├─ Q2: External API? YES (YouTube API response)
   └─ Decision: Feature-local → src/features/video/types.ts
   
   ContentItem
   ├─ Q1: Feature-specific? NO (all features use it)
   ├─ Q2: External API? NO (internal model)
   ├─ Q3: Cross-feature contract? YES (how features communicate with interface)
   └─ Decision: Shared → src/types/index.ts
   ```

3. Document the decision:
   ```
   Type: VideoApiSearchResponse
   Location: src/features/video/types.ts
   Reason: Feature-specific API response from YouTube
   Rule: External API types belong to the feature that consumes them
   ```

**Files affected**: None (decision step)

**Verification**: Decision aligns with BBA ownership rules

**Expected output**: Clear decision on file location

**If verification fails**:
- Uncertain if feature-specific → Default to feature-local (can promote later if needed)
- Split between two features → This may indicate need for abstraction at interface layer

---

### Step 4: Define the Type

**What**: Write the TypeScript type definition

**Why**: Creates the missing type with correct structure

**How**:
1. Open the target file (determined in Step 3):
   - Feature-local: `src/features/{domain}/types.ts`
   - Shared: `src/types/index.ts`

2. Add the type definition based on usage analysis (Step 2):
   ```typescript
   // Example: VideoApiSearchResponse
   export type VideoApiSearchResponse = {
     items: VideoApiItem[];
     nextPageToken?: string;
     pageInfo?: {
       totalResults: number;
       resultsPerPage: number;
     };
   };
   
   // Example: VideoApiItem
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

3. If the type references other types (like `VideoApiThumbnail`):
   - Check if those types exist
   - If not, add them in the same file
   - Ensure all referenced types are exported

4. Add documentation comments:
   ```typescript
   /**
    * YouTube API search response shape
    * @see https://developers.google.com/youtube/v3/docs/search/list
    */
   export type VideoApiSearchResponse = {
     items: VideoApiItem[];
   };
   ```

**Files affected**:
- `src/features/{domain}/types.ts` OR `src/types/index.ts` (new type added)

**Verification**:
```bash
# Type is exported
grep "export type {TypeName}" src/features/{domain}/types.ts

# Type syntax is valid
npx tsc --noEmit src/features/{domain}/types.ts
```

**Expected output**: Type definition exists and exports correctly

**If verification fails**:
- Syntax error → Fix TypeScript syntax
- Type still not found → Check export statement
- Circular dependency → May need to split types into separate files

---

### Step 5: Update Import Statements

**What**: Change imports to reference the new type location

**Why**: Points code to the newly created type

**How**:
1. Find all files that tried to import this type:
   ```bash
   grep -r "import.*{TypeName}" src/ --include="*.ts" --include="*.tsx"
   ```

2. For each file, update the import:
   ```typescript
   // BEFORE (wrong path)
   import type { VideoApiSearchResponse } from "@/types";
   
   // AFTER (correct path for feature-local type)
   import type { VideoApiSearchResponse } from "../types";
   ```

3. Apply BBA import rules:
   - Same feature → relative import: `../types`
   - Different feature (interface layer) → alias import: `@/features/video/types`
   - Shared type → alias import: `@/types`

4. Save all updated files

**Files affected**:
- Any file that imports this type (1-5 files typically)

**Verification**:
```bash
# All imports should resolve
npx tsc --noEmit

# No files still importing from wrong location
grep -r 'from "@/types".*{TypeName}' src/features/
# Expected: Zero matches if type is feature-local
```

**Expected output**: All imports point to correct location

**If verification fails**:
- Import path still wrong → Check relative path calculation
- Type still not found → Verify export in Step 4

---

### Step 6: Verify Type Compatibility

**What**: Ensure the type works with existing code

**Why**: Type definition must match actual runtime behavior

**How**:
1. Check that code using the type compiles:
   ```bash
   npx tsc --noEmit
   ```

2. If there are type errors about property access:
   ```typescript
   // Error: Property 'items' does not exist on type 'VideoApiSearchResponse'
   
   // Check your type definition has this property
   export type VideoApiSearchResponse = {
     items: VideoApiItem[];  // ← Must be present
   };
   ```

3. If properties are optional but code treats them as required:
   ```typescript
   // Code assumes it exists
   const title = item.snippet.title;
   
   // Type must not mark it optional
   snippet: {
     title: string;  // Not: title?: string;
   }
   ```

4. Add runtime validation if type safety is uncertain:
   ```typescript
   // In API service
   const data: VideoApiSearchResponse = await response.json();
   
   if (!data.items || !Array.isArray(data.items)) {
     throw new Error("Invalid API response");
   }
   ```

**Files affected**: May need to update code that uses the type

**Verification**:
```bash
# Build should succeed
npm run build

# Run the app and test the feature
npm run dev
# Navigate to feature and verify it works
```

**Expected output**: Type-safe code that compiles and runs

**If verification fails**:
- Runtime errors → Type definition doesn't match API response (check API docs)
- Type errors persist → May have defined type incorrectly, revisit Step 4

---

### Step 7: Create ADR

**What**: Document the type definition decision

**Why**: Records why type lives where it does

**How**:
1. Copy ADR template:
   ```bash
   cp .claude/templates/ADR_TEMPLATE.md .claude/decisions/ADR-{NUMBER}-add-{type-name}-type.md
   ```

2. Fill in key sections:
   - **Context**: Why was this type missing? What does it represent?
   - **Decision**: Where did you place it? (feature vs shared)
   - **Options Considered**: 
     - Put in shared types (why rejected if feature-local)
     - Put in feature types (why chosen)
   - **Consequences**: What does this enable? What dependencies does it create?
   - **Teaching Moment**: Feature ownership vs shared contracts

3. Example teaching moment:
   ```markdown
   ## Teaching Moment
   
   API response types belong to the feature that consumes the API. Even though
   multiple files in the video feature import VideoApiSearchResponse, it stays
   feature-local because:
   1. It's specific to YouTube API (external contract)
   2. No other feature needs YouTube API shapes
   3. If we add Vimeo later, it will have its own API types
   
   This demonstrates vertical slice ownership: features own their API integrations.
   ```

**Files affected**:
- `.claude/decisions/ADR-{NUMBER}-add-{type-name}-type.md` (new file)

**Verification**: ADR documents the decision clearly

**Expected output**: Future reference for why type was placed here

**If verification fails**: N/A (documentation is recommended but optional)

---

## Verification Gates

**After completing all steps, run these checks:**

### Red Gates (must pass)
```bash
# TypeScript type check - should have fewer errors
npx tsc --noEmit
# Expected: Error for missing type is gone

# Build should succeed
npm run build
# Expected: Build succeeds

# Type is exported from correct location
grep "export type {TypeName}" src/features/{domain}/types.ts
# OR
grep "export type {TypeName}" src/types/index.ts
# Expected: Type found in one place only
```

**If any red gate fails**: STOP, review your type definition and imports.

### Yellow Gates (should pass)
```bash
# Type isn't duplicated
grep -r "export type {TypeName}" src/ --include="*.ts"
# Expected: Found in exactly 1 file

# No unused type definitions
# (Will be validated later when we add lint rules)
```

**If any yellow gate fails**: Note for cleanup.

---

## Expected Output

**What artifacts are created?**
- [x] New type definition in appropriate types file
- [x] Updated imports in files that use the type
- [x] ADR documenting the decision

**What should work differently?**
- TypeScript compilation succeeds
- Code using the type is type-safe
- Clear ownership of the type established

**How to verify the output manually**:
1. Run: `npm run build`
2. Test feature that uses the type
3. Verify no runtime errors when type is used

---

## Failure Recovery

**Common failures and solutions:**

### Failure 1: Type definition causes new errors
**Symptoms**:
- Error: `Type 'X' is not assignable to type 'Y'`
- More errors after adding type than before

**Root cause**: Type definition doesn't match actual usage

**Solution**:
1. Review usage in Step 2 again - did you miss a property?
2. Check runtime data - does API actually return this shape?
3. Consider making properties optional (`?`) if they're sometimes missing
4. Add runtime validation to catch mismatches
5. Resume workflow at: Step 6

### Failure 2: Can't decide if type is feature-local or shared
**Symptoms**:
- Type used by 2 features
- Uncertain if it's a cross-feature contract

**Root cause**: Ambiguous ownership, possible architectural issue

**Solution**:
1. Default to feature-local in the feature that first needed it
2. If second feature needs it, evaluate: Should both features use a shared abstraction instead?
3. Document decision in ADR with rationale
4. Can promote to shared later if proven necessary (wait for 3rd usage)

### Failure 3: Circular dependency after adding type
**Symptoms**:
- Error: `Circular dependency detected`
- Types import from each other

**Root cause**: Type relationships too coupled

**Solution**:
1. Split types into separate files (e.g., `api-types.ts`, `domain-types.ts`)
2. Extract shared primitive types to separate file
3. Use type intersection/union instead of extending types
4. May need architectural refactoring (ask for guidance)

**General recovery strategy**:
If stuck:
1. Check if similar type exists that you could reuse
2. Review CLAUDE.md → Type Safety as Documentation
3. Look at existing type definitions in the codebase for patterns
4. Test type definition with simple example before integrating

---

## Teaching Moment

**What architectural principle does this workflow demonstrates?**

This workflow teaches **type ownership and vertical slice architecture**. Types aren't just documentation—they define boundaries and ownership. By carefully choosing where types live, we:
- **Enforce encapsulation**: Feature-specific types stay in features
- **Prevent coupling**: Shared types only for true cross-feature contracts
- **Enable evolution**: Easy to change feature implementation without affecting others
- **Maintain clarity**: Type location indicates its purpose and scope

**Pattern being practiced**: API types belong to the feature consuming the API
- External API shapes (YouTube, News API) are feature-specific
- Even if multiple files use them, they stay feature-local
- This allows replacing API providers without affecting other features

**What you learn by completing this workflow**:
- **Technical skill**: TypeScript type definitions, interfaces, type composition
- **Architectural thinking**: Type ownership, vertical slices, contract boundaries
- **API integration**: Modeling external data sources, runtime validation

**Real-world parallel**: This is like each department (feature) maintaining its own vendor contracts (API types). The central office (shared types) only stores company-wide policies (cross-feature contracts), not every vendor's paperwork.

---

## Variations

**When this workflow needs to be adapted:**

### Variation 1: Type needs to be extracted from existing interface
**When**: Type is currently inline and should be extracted
**Changes**:
- Add Step 3.5: Extract type from inline definition
- Update all usages to import the extracted type
- May create additional type definitions for sub-shapes

### Variation 2: Type is part of a larger type family
**When**: Adding one type that's part of a set (VideoApiItem, VideoApiThumbnail, etc.)
**Changes**:
- Define all related types together in Step 4
- Organize with comments: `// API Response Types`, `// API Item Types`
- Document the type family in ADR

### Variation 3: Type needs runtime validation
**When**: External API type that needs validation
**Changes**:
- Add Step 6.5: Create runtime validator (using Zod or similar)
- Define both TypeScript type and runtime schema
- Use schema to validate API responses

---

## Related Workflows

**Workflows that should be run before this one**:
- None (this is foundational)

**Workflows that typically follow this one**:
- fix-typescript-import-error.md - If imports still need fixing after type is created
- fix-type-mismatch.md - If new type doesn't match existing usage

**Workflows that are alternatives to this one**:
- None (this is the primary pattern for missing types)

---

## Workflow History

**Version 1.0** (2026-02-14)
- Initial creation
- Based on: Adding VideoApiSearchResponse and VideoApiItem types
- Pattern for handling missing external API types

---

## Metadata

**Tags**: #typescript #types #bba #api-integration #architecture  
**Phase**: Phase 1 (Foundation)  
**Frequency**: Per-missing-type (common when adding features or integrations)  
**Automation Candidate**: No (requires architectural judgment)

---

## Success Criteria

You've successfully completed this workflow when:
- [x] Type definition exists in correct location
- [x] All imports reference the new type
- [x] TypeScript compilation succeeds
- [x] Type ownership is clear (feature vs shared)
- [x] ADR documents the decision
- [x] Feature using the type works correctly

**After defining 5+ types, you'll develop intuition for feature vs shared classification.**
