#!/bin/bash

# Kernel Verification Gates
# Runs all red gates (must pass) and yellow gates (should pass)
# Exit code 0 = all gates pass, 1 = red gate failed, 2 = yellow gate warned

set -e  # Exit on error for red gates

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
RED_FAILURES=0
YELLOW_WARNINGS=0

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         KERNEL VERIFICATION GATES                              ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# ============================================================================
# RED GATES (Architecture & Type Safety) - MUST PASS
# ============================================================================

echo -e "${BLUE}═══ RED GATES (Must Pass) ═══${NC}"
echo ""

# RED GATE 1: TypeScript Type Check
echo -n "🔴 TypeScript type check... "
if npx tsc --noEmit > /tmp/tsc-output.txt 2>&1; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
    echo ""
    echo -e "${RED}TypeScript errors detected:${NC}"
    cat /tmp/tsc-output.txt
    echo ""
    RED_FAILURES=$((RED_FAILURES + 1))
fi

# RED GATE 2: Build
echo -n "🔴 Build check... "
if npm run build > /tmp/build-output.txt 2>&1; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
    echo ""
    echo -e "${RED}Build failed:${NC}"
    tail -20 /tmp/build-output.txt
    echo ""
    RED_FAILURES=$((RED_FAILURES + 1))
fi

# RED GATE 3: BBA - Shared importing from Features
echo -n "🔴 BBA: Shared → Features (upward dependency)... "
SHARED_TO_FEATURES=$(grep -r "from.*@/features" src/shared/ 2>/dev/null | wc -l)
if [ "$SHARED_TO_FEATURES" -eq 0 ]; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL (${SHARED_TO_FEATURES} violations)${NC}"
    echo ""
    echo -e "${RED}Shared importing from Features (upward dependency violation):${NC}"
    grep -r "from.*@/features" src/shared/ 2>/dev/null || true
    echo ""
    RED_FAILURES=$((RED_FAILURES + 1))
fi

# RED GATE 4: BBA - Features importing from Interface
echo -n "🔴 BBA: Features → Interface (upward dependency)... "
FEATURES_TO_INTERFACE=$(grep -r "from.*@/interface" src/features/ 2>/dev/null | wc -l)
if [ "$FEATURES_TO_INTERFACE" -eq 0 ]; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL (${FEATURES_TO_INTERFACE} violations)${NC}"
    echo ""
    echo -e "${RED}Features importing from Interface (upward dependency violation):${NC}"
    grep -r "from.*@/interface" src/features/ 2>/dev/null || true
    echo ""
    RED_FAILURES=$((RED_FAILURES + 1))
fi

# RED GATE 5: BBA - Cross-feature imports
echo -n "🔴 BBA: Cross-feature imports (horizontal coupling)... "
# This is more complex - we need to check if features import from OTHER features
# For now, flag any @/features/ import in features and manually verify
CROSS_FEATURE=$(grep -r "from.*@/features/" src/features/ --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "from.*@/features/.*/__tests__" | wc -l)
if [ "$CROSS_FEATURE" -eq 0 ]; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${YELLOW}⚠ REVIEW (${CROSS_FEATURE} potential violations)${NC}"
    echo ""
    echo -e "${YELLOW}Potential cross-feature imports (verify these are same-feature):${NC}"
    grep -r "from.*@/features/" src/features/ --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "from.*@/features/.*/__tests__" || true
    echo ""
    echo -e "${YELLOW}Note: These are only violations if importing from a DIFFERENT feature.${NC}"
    echo -e "${YELLOW}Same-feature imports like @/features/video/types in features/video/ are OK.${NC}"
    echo ""
    # Don't increment RED_FAILURES - this needs manual review
fi

echo ""

# ============================================================================
# YELLOW GATES (Code Quality) - SHOULD PASS
# ============================================================================

echo -e "${BLUE}═══ YELLOW GATES (Should Pass) ═══${NC}"
echo ""

# YELLOW GATE 1: Lint Check
echo -n "🟡 ESLint check... "
if npm run lint > /tmp/lint-output.txt 2>&1; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    LINT_WARNINGS=$(grep -c "warning" /tmp/lint-output.txt 2>/dev/null || echo "0")
    LINT_ERRORS=$(grep -c "error" /tmp/lint-output.txt 2>/dev/null || echo "0")
    
    if [ "$LINT_ERRORS" -gt 0 ]; then
        echo -e "${YELLOW}⚠ WARN (${LINT_ERRORS} errors, ${LINT_WARNINGS} warnings)${NC}"
    else
        echo -e "${YELLOW}⚠ WARN (${LINT_WARNINGS} warnings)${NC}"
    fi
    echo ""
    echo -e "${YELLOW}Lint issues:${NC}"
    head -30 /tmp/lint-output.txt
    echo ""
    YELLOW_WARNINGS=$((YELLOW_WARNINGS + 1))
fi

# YELLOW GATE 2: Debug Code in Features/Interface
echo -n "🟡 Debug code check (console.log)... "
DEBUG_COUNT=$(grep -r "console\.log" src/features/ src/interface/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)
if [ "$DEBUG_COUNT" -eq 0 ]; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${YELLOW}⚠ WARN (${DEBUG_COUNT} console.log found)${NC}"
    echo ""
    echo -e "${YELLOW}Debug console.log statements found:${NC}"
    grep -r "console\.log" src/features/ src/interface/ --include="*.ts" --include="*.tsx" 2>/dev/null || true
    echo ""
    YELLOW_WARNINGS=$((YELLOW_WARNINGS + 1))
fi

# YELLOW GATE 3: Large Files
echo -n "🟡 File size check (>200 lines)... "
LARGE_FILES=$(find src/features/ src/interface/ -name "*.tsx" -o -name "*.ts" | xargs wc -l | awk '$1 > 200 {print}' | grep -v "total" | wc -l)
if [ "$LARGE_FILES" -eq 0 ]; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${YELLOW}⚠ WARN (${LARGE_FILES} files >200 lines)${NC}"
    echo ""
    echo -e "${YELLOW}Large files (consider refactoring):${NC}"
    find src/features/ src/interface/ -name "*.tsx" -o -name "*.ts" | xargs wc -l | awk '$1 > 200 {print}' | grep -v "total" || true
    echo ""
    YELLOW_WARNINGS=$((YELLOW_WARNINGS + 1))
fi

# YELLOW GATE 4: Unused Imports/Exports (via lint)
# This is captured by lint check above, so we just note it
echo -n "🟡 Unused code check... "
if grep -q "is defined but never used" /tmp/lint-output.txt 2>/dev/null; then
    echo -e "${YELLOW}⚠ WARN (check lint output)${NC}"
else
    echo -e "${GREEN}✓ PASS${NC}"
fi

echo ""

# ============================================================================
# SUMMARY
# ============================================================================

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    VERIFICATION SUMMARY                        ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

if [ "$RED_FAILURES" -eq 0 ]; then
    echo -e "${GREEN}✓ All red gates passed (architecture & type safety)${NC}"
else
    echo -e "${RED}✗ ${RED_FAILURES} red gate(s) failed (MUST FIX)${NC}"
fi

if [ "$YELLOW_WARNINGS" -eq 0 ]; then
    echo -e "${GREEN}✓ All yellow gates passed (code quality)${NC}"
else
    echo -e "${YELLOW}⚠ ${YELLOW_WARNINGS} yellow gate(s) warned (should address)${NC}"
fi

echo ""

# ============================================================================
# EXIT STATUS
# ============================================================================

if [ "$RED_FAILURES" -gt 0 ]; then
    echo -e "${RED}🛑 VERIFICATION FAILED - Red gates must pass before proceeding${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Review failures above"
    echo "2. Fix red gate violations (see CLAUDE.md for rules)"
    echo "3. Re-run: .claude/verification/run-gates.sh"
    echo ""
    exit 1
elif [ "$YELLOW_WARNINGS" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  VERIFICATION PASSED WITH WARNINGS${NC}"
    echo ""
    echo "Yellow gates warned but you can proceed. Consider addressing:"
    echo "- Lint warnings before final commit"
    echo "- Debug code before production deploy"
    echo "- Large files when convenient"
    echo ""
    exit 2
else
    echo -e "${GREEN}✅ VERIFICATION PASSED - All gates green${NC}"
    echo ""
    echo "Codebase is healthy. Safe to proceed with:"
    echo "- Committing changes"
    echo "- Creating pull requests"
    echo "- Deploying to production"
    echo ""
    exit 0
fi
