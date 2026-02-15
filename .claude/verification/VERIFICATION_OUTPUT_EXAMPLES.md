# Verification Script Example Output

## Current State (With Known Errors)

```
╔════════════════════════════════════════════════════════════════╗
║         KERNEL VERIFICATION GATES                              ║
╚════════════════════════════════════════════════════════════════╝

═══ RED GATES (Must Pass) ═══

🔴 TypeScript type check... ✗ FAIL

TypeScript errors detected:
src/features/bookmark/api/bookmarkService.ts(1,15): error TS2305: Module '"@/types"' has no exported member 'Bookmark'.
src/features/video/api/videoService.ts(1,29): error TS2305: Module '"@/types"' has no exported member 'VideoApiSearchResponse'.
src/features/video/mappers/index.ts(1,29): error TS2305: Module '"@/types"' has no exported member 'VideoApiItem'.
src/interface/search/components/SearchResultsPanel/index.tsx(67,58): error TS2345: Argument of type 'VideoSearchResult' is not assignable to parameter of type 'Bookmark'.
src/interface/search/components/UpNextPanel.tsx(30,21): error TS2339: Property 'duration' does not exist on type 'ContentItem'.
src/interface/search/components/UpNextPanel.tsx(31,61): error TS2339: Property 'duration' does not exist on type 'ContentItem'.
src/interface/search/mappers/index.tsx(1,10): error TS2305: Module '"@/types"' has no exported member 'Bookmark'.

🔴 Build check... ✗ FAIL

Build failed:
Failed to fetch fonts from Google Fonts (network issue - not a code error)

🔴 BBA: Shared → Features (upward dependency)... ✓ PASS
🔴 BBA: Features → Interface (upward dependency)... ✓ PASS
🔴 BBA: Cross-feature imports (horizontal coupling)... ✓ PASS

═══ YELLOW GATES (Should Pass) ═══

🟡 ESLint check... ✓ PASS
🟡 Debug code check (console.log)... ✓ PASS
🟡 File size check (>200 lines)... ✓ PASS
🟡 Unused code check... ⚠ WARN (check lint output)

╔════════════════════════════════════════════════════════════════╗
║                    VERIFICATION SUMMARY                        ║
╚════════════════════════════════════════════════════════════════╝

✗ 2 red gate(s) failed (MUST FIX)
✓ All yellow gates passed (code quality)

🛑 VERIFICATION FAILED - Red gates must pass before proceeding

Next steps:
1. Review failures above
2. Fix red gate violations (see CLAUDE.md for rules)
3. Re-run: .claude/verification/run-gates.sh
```

---

## After Fixing TypeScript Errors

```
╔════════════════════════════════════════════════════════════════╗
║         KERNEL VERIFICATION GATES                              ║
╚════════════════════════════════════════════════════════════════╝

═══ RED GATES (Must Pass) ═══

🔴 TypeScript type check... ✓ PASS
🔴 Build check... ✓ PASS
🔴 BBA: Shared → Features (upward dependency)... ✓ PASS
🔴 BBA: Features → Interface (upward dependency)... ✓ PASS
🔴 BBA: Cross-feature imports (horizontal coupling)... ✓ PASS

═══ YELLOW GATES (Should Pass) ═══

🟡 ESLint check... ✓ PASS
🟡 Debug code check (console.log)... ✓ PASS
🟡 File size check (>200 lines)... ✓ PASS
🟡 Unused code check... ✓ PASS

╔════════════════════════════════════════════════════════════════╗
║                    VERIFICATION SUMMARY                        ║
╚════════════════════════════════════════════════════════════════╝

✓ All red gates passed (architecture & type safety)
✓ All yellow gates passed (code quality)

✅ VERIFICATION PASSED - All gates green

Codebase is healthy. Safe to proceed with:
- Committing changes
- Creating pull requests
- Deploying to production
```

---

## With Yellow Warnings

```
╔════════════════════════════════════════════════════════════════╗
║         KERNEL VERIFICATION GATES                              ║
╚════════════════════════════════════════════════════════════════╝

═══ RED GATES (Must Pass) ═══

🔴 TypeScript type check... ✓ PASS
🔴 Build check... ✓ PASS
🔴 BBA: Shared → Features (upward dependency)... ✓ PASS
🔴 BBA: Features → Interface (upward dependency)... ✓ PASS
🔴 BBA: Cross-feature imports (horizontal coupling)... ✓ PASS

═══ YELLOW GATES (Should Pass) ═══

🟡 ESLint check... ⚠ WARN (12 warnings)

Lint issues:
  23:5  warning  'selectedItem' is assigned a value but never used  @typescript-eslint/no-unused-vars
  45:8  warning  React Hook useEffect has a missing dependency      react-hooks/exhaustive-deps

🟡 Debug code check (console.log)... ⚠ WARN (3 console.log found)

Debug console.log statements found:
src/features/bookmark/hooks/useBookmarks.ts:42:    console.log('Bookmarks:', bookmarks);
src/interface/search/components/SearchContentPanel/index.tsx:28:    console.log('Selected:', selectedItem);

🟡 File size check (>200 lines)... ⚠ WARN (1 files >200 lines)

Large files (consider refactoring):
  284 src/data/mockData.ts

🟡 Unused code check... ⚠ WARN (check lint output)

╔════════════════════════════════════════════════════════════════╗
║                    VERIFICATION SUMMARY                        ║
╚════════════════════════════════════════════════════════════════╝

✓ All red gates passed (architecture & type safety)
⚠ 3 yellow gate(s) warned (should address)

⚠️  VERIFICATION PASSED WITH WARNINGS

Yellow gates warned but you can proceed. Consider addressing:
- Lint warnings before final commit
- Debug code before production deploy
- Large files when convenient
```

---

## Exit Codes

The script returns different exit codes based on results:

**Exit 0 - All Pass**
```bash
.claude/verification/run-gates.sh
echo $?
# 0
```
All green, safe to proceed

**Exit 1 - Red Failure**
```bash
.claude/verification/run-gates.sh
echo $?
# 1
```
Critical failure, must fix

**Exit 2 - Yellow Warning**
```bash
.claude/verification/run-gates.sh
echo $?
# 2
```
Warnings present, can proceed but should address

---

## Using Exit Codes in Scripts

```bash
# In git pre-commit hook
if ! .claude/verification/run-gates.sh; then
    echo "Verification failed. Fix before committing."
    exit 1
fi

# Or allow yellow warnings
.claude/verification/run-gates.sh
EXIT_CODE=$?
if [ $EXIT_CODE -eq 1 ]; then
    echo "Red gate failed. Cannot commit."
    exit 1
elif [ $EXIT_CODE -eq 2 ]; then
    echo "Yellow warnings present. Commit anyway? (y/n)"
    read -r response
    if [ "$response" != "y" ]; then
        exit 1
    fi
fi
```

---

## Color Coding

- 🔴 **Red** = Must fix (blocking)
- 🟡 **Yellow** = Should fix (warning)
- 🔵 **Blue** = Section header
- ✅ **Green checkmark** = Passed
- ✗ **Red X** = Failed
- ⚠ **Yellow warning** = Warned

---

## Integration with Workflows

Every workflow ends with running verification:

```markdown
## Verification Gates

**After completing all steps, run these checks:**

```bash
.claude/verification/run-gates.sh
```

**Expected output**: All gates green (or documented yellow warnings)
```

This ensures every change is verified before proceeding.
