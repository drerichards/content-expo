# Building a Component Library System: Design System Blueprint

This guide provides a blueprint for structuring a comprehensive design system based on proven architectural patterns.

## Executive Summary

A well-structured design system is a comprehensive, modular React component library that follows these core principles:

- **Package separation** - Different concerns split into scoped packages
- **Token-based theming** - CSS variables for consistent design
- **Styled Components** - CSS-in-JS with TypeScript support
- **Dark mode support** - Built-in theme switching
- **Accessibility-first** - WCAG compliance throughout
- **Monorepo structure** - Independent versioning per package

---

## 1. Package Architecture

### Core Package Structure

A modular design system can be split into **packages by domain**, each with a specific purpose:

```
@yourorg/ds-tokens        - Design tokens (colors, spacing, etc.)
@yourorg/ds-utilities     - Theme utilities, helpers, CSS utilities
@yourorg/ds-icons         - Icon component library
@yourorg/ds-uikit         - Basic UI components (Button, Modal, etc.)
@yourorg/ds-form          - Form components (Input, Checkbox, etc.)
@yourorg/ds-grid          - Data grid component
@yourorg/ds-toolbar       - Toolbar/navigation components
@yourorg/ds-editor        - Rich text editor components
@yourorg/ds-filter        - Filter/search components
@yourorg/ds-details       - Detail view components
```

### Package Usage Example

In your package.json:

```json
"@yourorg/ds-tokens": "^1.0.0",
"@yourorg/ds-utilities": "^1.0.0",
"@yourorg/ds-icons": "^1.0.0",
"@yourorg/ds-uikit": "^1.0.0",
"@yourorg/ds-form": "^1.0.0"
```

### Why This Architecture Works

1. **Independent versioning** - Each package can be updated separately
2. **Reduced bundle size** - Only import what you need
3. **Clear boundaries** - Each package has a specific domain
4. **Team ownership** - Different teams can own different packages
5. **Migration friendly** - Can upgrade packages incrementally

---

## 2. Design Tokens System

### What Are Design Tokens?

Design tokens are the foundational design decisions (colors, spacing, typography) stored as variables that can be consumed across platforms.

### Token Structure

The tokens package provides:

- Color palette
- Spacing scale
- Typography scale
- Border radius values
- Shadow definitions
- Z-index layers

### Token Usage via CSS Variables

Design systems use CSS custom properties (variables) with a clear naming convention:

```css
--ds-color-[category]-[variant]-[shade]
--ds-spacing-[size]
--ds-size-[dimension]
--ds-util__[utility]--[variant]
--ds-component__[component]--[variant]__[property]
```

Example token names:

```typescript
// Color tokens
--ds-color-border-normal
--ds-color-border-hover
--ds-color-gray-200
--ds-color-warning-400

// Component-specific tokens
--ds-button--empty--normal__text
--ds-button--empty--hover__text
--ds-button--empty--hover__icon

// Utility tokens
--ds-util__border--light
```

### How Tokens Enable Theming

Tokens allow theme changes by swapping CSS variable values:

```typescript
<ThemeProvider mode={theme}>
  {children}
</ThemeProvider>
```

The `ThemeProvider` from your utilities package changes all token values when the mode switches between `light`, `dark`, or `auto`.

---

## 3. Utility System

### Purpose

The utilities package provides:

- Theme helper functions
- Spacing utilities
- Color utilities
- Size utilities
- Icon size constants
- Text style utilities
- Motion/animation utilities
- Border radius helpers

### Common Utilities

Utility package exports:

```typescript
import {
  theme, // Theme object with colors
  iconSizes, // Standard icon sizes
  color, // Color utilities
  spacing, // Spacing scale
  spacingPx, // Spacing in pixels
  sizePx, // Size values in pixels
  text, // Text style utilities
  motion, // Animation utilities
  borderRadius, // Border radius values
  shadow, // Shadow utilities
} from "@yourorg/ds-utilities";
```

### Example Usage

```typescript
import { iconSizes, color } from "@yourorg/ds-utilities";

<CrossCircle
  size={iconSizes.small}
  color={color.iconActive}
/>
```

```typescript
import { borderRadius, theme } from "@yourorg/ds-utilities";

const StyledCard = styled.div`
  border-radius: ${borderRadius.medium};
  background-color: ${theme.gray100};
`;
```

### Theme Object Structure

The `theme` object provides semantic color values:

```typescript
theme.blue500;
theme.green400;
theme.gray900;
theme.gray200;
theme.warning400;
theme.iconNormal;
theme.iconActive;
theme.iconInverse;
theme.textPrimary;
theme.textInverse;
```

---

## 4. Icon System

### Icon Architecture

A comprehensive icon library includes:

- SVG-based icons
- Consistent sizing
- Color customization
- TypeScript support

### Icon Usage Pattern

```typescript
import {
  CaretDown,
  Info,
  Warning,
  Checkmark,
  Cancel
} from "@planview/pv-icons";

<CaretDown size={iconSizes.medium} color={color.iconNormal} />
```

### Common Icon Categories

- Navigation: `CaretDown`, `ArrowUp`, `ArrowDown`, `ArrowUpDouble`
- Status: `Checkmark`, `Cancel`, `Warning`, `Info`
- Actions: `Edit`, `Trash`, `PlusCircle`, `CrossCircle`
- Users: `User`, `UserAdmin`, `Globe`
- Content: `Heart`, `ThumbsUp`, `EmotionHappy`, `Review`

---

## 5. UI Kit Components

### Core Components

**Buttons:**

```typescript
import {
  ButtonPrimary, // Primary action button
  ButtonGhost, // Secondary button
  ButtonEmpty, // Tertiary/icon button
} from "@yourorg/ds-uikit";
```

**Feedback:**

```typescript
import {
  Tooltip, // Hover tooltips
  Modal, // Dialog/modal windows
  MODAL_MEDIUM, // Modal size constants
  DESTRUCTIVE, // Modal variant
  GENERIC, // Modal variant
} from "@yourorg/ds-uikit";
```

**Data Display:**

```typescript
import {
  ListItem, // List item component
  Divider, // Section divider
  Combobox, // Searchable select
  DropdownMenu, // Dropdown menu
} from "@yourorg/ds-uikit";
```

### Component Usage Example

```typescript
import { Modal, MODAL_MEDIUM, DESTRUCTIVE, GENERIC } from "@yourorg/ds-uikit";

<Modal
  size={MODAL_MEDIUM}
  variant={isDestructive ? DESTRUCTIVE : GENERIC}
  title={title}
  onClose={onClose}
>
  {content}
</Modal>
```

---

## 6. Form System

### Form Components

The form package provides:

```typescript
import {
  Combobox, // Searchable dropdown
  Checkbox, // Checkbox input
  CheckboxGroup, // Group of checkboxes
  Input, // Text input
  InputNumeric, // Number input
  Textarea, // Multiline text
  Layout, // Form layout helper
  Section, // Form section wrapper
} from "@yourorg/ds-form";
```

### Form Integration Example

```typescript
import { useForm } from "@mantine/form";
import { Checkbox, Input, InputNumeric, Layout, Section } from "@yourorg/ds-form";

const form = useForm({
  initialValues: {...},
  validate: {...}
});

<Layout columns={2}>
  <Checkbox
    label="Enable feature"
    selected={form.values.enabled}
    {...form.getInputProps("enabled", { type: "checkbox" })}
  />
  <InputNumeric
    label="Value"
    {...form.getInputProps("value")}
  />
</Layout>
```

---

## 7. Styled Components Integration

### Why Styled Components?

The codebase uses `styled-components` (v6) for:

- Component-scoped styles
- Dynamic styling based on props
- TypeScript support
- No className conflicts

### Integration Pattern

```typescript
import styled, { css } from "styled-components";
import { Combobox as DSCombobox } from "@yourorg/ds-uikit";
import { theme } from "@yourorg/ds-utilities";

// Extend design system component with custom styles
export const CustomCombobox = styled(DSCombobox)<{
  $legacyStyle: boolean;
}>`
  ${(props) =>
    props.$legacyStyle &&
    css`
      --ds-color-border-normal: ${theme.gray200};
      --ds-color-border-hover: ${theme.gray200};
      & > div {
        border-radius: unset;
      }
    `}
`;
```

### CSS Variable Overrides

Components can be customized by overriding CSS variables:

```typescript
<Card
  style={{
    "--card-background-color": backgroundColor,
    "--card-border-color": borderColor,
    "--card-text-color": textColor,
    "--ds-button--empty--normal__text": infoColor,
    "--ds-button--empty--hover__icon": hoverColor,
  }}
>
  {content}
</Card>
```

---

## 8. Theme Provider Architecture

### Theme Context Setup

```typescript
import { ThemeProvider } from "@yourorg/ds-utilities";

type ColorMode = "light" | "dark" | "auto";

export function ThemeContextProvider({
  enableDarkMode,
  children
}: {
  enableDarkMode: boolean;
  children: ReactNode
}) {
  const [theme, setTheme] = useState<ColorMode>(
    enableDarkMode ? "auto" : "light"
  );

  useEffect(() => {
    if (!enableDarkMode) return;

    const value = window.localStorage.getItem("app:theme");
    if (value === "light" || value === "dark" || value === "auto") {
      setTheme(value);
    }
  }, [enableDarkMode]);

  return (
    <ThemeProvider mode={theme}>
      {children}
    </ThemeProvider>
  );
}
```

### Theme Usage in Components

The `ThemeProvider` updates all CSS variables when the mode changes, automatically updating all components.

---

## 9. TypeScript Integration

### Type Imports

TypeScript type imports for component types:

```typescript
import type { ComboboxOption, ComboboxGroup } from "@yourorg/ds-uikit";
import type { Column } from "@yourorg/ds-grid";
```

### Component Prop Types

PVDS exports TypeScript types for all component props:

```typescript
interface CustomComponentProps {
  options: ComboboxOption[];
  groups: ComboboxGroup[];
  onSelect: (option: ComboboxOption) => void;
}
```

---

## 10. Accessibility Features

### Built-in Accessibility

Design system components should include:

- ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance

### Example: Color Contrast Calculation

```typescript
import Color from "color";

const WCAG_AA_TEXT_CONTRAST_RATIO = 4.5;
const WCAG_AA_GRAPHIC_CONTRAST_RATIO = 3.0;

function isReadableText(color1: string, color2: string): boolean {
  return (
    new Color(color1).contrast(new Color(color2)) >= WCAG_AA_TEXT_CONTRAST_RATIO
  );
}

function chosenTextColor(backgroundColor: string) {
  if (isDark(backgroundColor)) {
    return color.textInverse;
  }
  return color.textPrimary;
}
```

---

## 11. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)

1. **Set up monorepo structure**
   - Use pnpm workspaces or Yarn workspaces
   - Create package structure: tokens, utilities, icons, uikit
   - Set up TypeScript configuration
   - Configure build tools (Rollup/Vite)

2. **Design tokens package**
   - Define color palette
   - Create spacing scale
   - Define typography scale
   - Set up CSS variable generation
   - Create light/dark theme tokens

3. **Utilities package**
   - Theme helper functions
   - Spacing utilities
   - Color utilities
   - Size constants
   - Export typed objects

### Phase 2: Core Components (Weeks 5-8)

4. **Icon system**
   - Set up SVG icon processing
   - Create Icon wrapper component
   - Build icon collection
   - Add size/color props
   - Generate TypeScript types

5. **Basic UI Kit**
   - Button variants (Primary, Ghost, Empty)
   - Tooltip component
   - Modal/Dialog component
   - Divider component
   - Set up styled-components

### Phase 3: Forms & Data (Weeks 9-12)

6. **Form components package**
   - Input components (Text, Number, Textarea)
   - Checkbox/Radio components
   - Select/Combobox components
   - Form layout helpers
   - Validation support

7. **Data components**
   - List/ListItem components
   - Dropdown menu
   - Basic grid/table
   - Pagination

### Phase 4: Advanced Features (Weeks 13-16)

8. **Theme provider**
   - Theme context setup
   - Mode switching (light/dark/auto)
   - LocalStorage persistence
   - CSS variable injection

9. **Documentation**
   - Set up Storybook
   - Document all components
   - Add usage examples
   - Create migration guides

10. **Testing & Accessibility**
    - Unit tests (Jest/Vitest)
    - Accessibility tests
    - Visual regression tests
    - Performance optimization

---

## 12. Key Technical Decisions

### Package Manager: pnpm

Use pnpm for:

- Efficient disk space usage
- Strict dependency resolution
- Fast installation
- Monorepo support

### Build Tool: Rollup or Vite

For library builds:

- Multiple output formats (ESM, CJS)
- Tree-shaking support
- TypeScript declaration generation
- CSS extraction

### CSS-in-JS: Styled Components

Benefits:

- Component-scoped styles
- Dynamic styling
- TypeScript support
- CSS variable integration
- No build step for CSS

### CSS Variables Strategy

Use CSS variables for:

- Theme switching
- Component customization
- Runtime updates
- No style recalculation

### TypeScript Configuration

- Strict mode enabled
- Path aliases for imports
- Declaration files generated
- Type-only imports enforced

---

## 13. Component Development Patterns

### Pattern 1: Extend Design System Components

```typescript
import styled from "styled-components";
import { Button } from "@yourlib/uikit";
import { theme } from "@yourlib/utilities";

export const CustomButton = styled(Button)`
  border-radius: 4px;
  background: ${theme.primary500};

  &:hover {
    background: ${theme.primary600};
  }
`;
```

### Pattern 2: CSS Variable Overrides

```typescript
export const ThemedCard = styled.div`
  background: var(--card-bg, ${theme.surface});
  color: var(--card-text, ${theme.textPrimary});

  /* Allow override via inline styles */
`;

// Usage
<ThemedCard style={{ "--card-bg": customColor }}>
  Content
</ThemedCard>
```

### Pattern 3: Compound Components

```typescript
export const Card = styled.div`...`;
Card.Header = styled.div`...`;
Card.Body = styled.div`...`;
Card.Footer = styled.div`...`;

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### Pattern 4: Polymorphic Components

```typescript
type ButtonProps<T extends React.ElementType = "button"> = {
  as?: T;
  variant?: "primary" | "ghost" | "empty";
} & React.ComponentPropsWithoutRef<T>;

export function Button<T extends React.ElementType = "button">({
  as,
  variant = "primary",
  ...props
}: ButtonProps<T>) {
  const Component = as || "button";
  return <StyledButton as={Component} $variant={variant} {...props} />;
}

// Usage
<Button>Click me</Button>
<Button as="a" href="/link">Link button</Button>
```

---

## 14. Testing Strategy

### Unit Tests

```typescript
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    screen.getByText("Click").click();
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Accessibility Tests

```typescript
import { axe } from "jest-axe";

it("has no accessibility violations", async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Visual Regression Tests

Use Chromatic or Percy for visual testing in Storybook.

---

## 15. Documentation with Storybook

### Story Structure

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "ghost", "empty"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};
```

### Documentation Pages

Create MDX docs for:

- Getting started guide
- Installation instructions
- Theme configuration
- Migration guides
- Best practices
- Accessibility statement

---

## 16. Publishing & Versioning

### Package Publishing

1. Use semantic versioning (semver)
2. Independent package versions
3. Automated releases with Changesets
4. npm publish for public packages
5. Private registry for internal packages

### Changelog Management

```bash
# Add changeset
npx changeset add

# Version packages
npx changeset version

# Publish
npx changeset publish
```

---

## 17. Migration & Adoption Strategy

### Gradual Migration

1. **Start with tokens**
   - Replace hardcoded colors with tokens
   - Update spacing values
   - Use consistent typography

2. **Add utilities**
   - Import theme helpers
   - Use utility functions
   - Replace custom helpers

3. **Adopt components**
   - Replace custom buttons with design system
   - Update form components
   - Migrate to design system modals

4. **Custom components**
   - Build custom components using primitives
   - Extend design system components
   - Contribute back to design system

---

## 18. Resources & References

### Key Implementation Areas

- Theme Context Setup
- Component Styling Patterns
- Form Integration
- Icon Usage
- Styled Components Architecture

### External Resources

- [Storybook Documentation](https://storybook.js.org/)
- [Styled Components Docs](https://styled-components.com/)
- [Design Tokens Specification](https://design-tokens.github.io/community-group/)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 19. Common Pitfalls to Avoid

### 1. Over-coupling Components

❌ Don't make components depend on specific app state
✅ Keep components pure and configurable

### 2. Inconsistent Naming

❌ Mixing naming conventions (camelCase, kebab-case)
✅ Stick to one convention (CSS variables: kebab-case, JS: camelCase)

### 3. Breaking Changes

❌ Changing component APIs without deprecation
✅ Use deprecation warnings and migration guides

### 4. Missing TypeScript Types

❌ Using `any` types
✅ Export proper types for all components

### 5. No Accessibility Testing

❌ Ignoring keyboard navigation and screen readers
✅ Test with automated tools and manual testing

### 6. Hardcoded Values

❌ Using magic numbers in components
✅ Always use tokens and variables

### 7. Missing Documentation

❌ No examples or usage guidelines
✅ Comprehensive Storybook docs with examples

---

## 20. Success Metrics

Track these metrics to measure adoption:

1. **Component Coverage** - % of UI using design system
2. **Consistency Score** - Color/spacing consistency across app
3. **Bundle Size** - Size impact of design system
4. **Developer Satisfaction** - Team feedback on usage
5. **Accessibility Score** - WCAG compliance rate
6. **Time to Build** - Speed of building new features
7. **Design Drift** - Variations from design specs

---

## Conclusion

This blueprint demonstrates best practices for building a scalable, maintainable component library:

✅ **Modular architecture** with clear package boundaries
✅ **Token-based theming** enabling consistent design
✅ **CSS variables** for runtime customization
✅ **TypeScript support** for type safety
✅ **Accessibility-first** approach
✅ **Flexible styling** with styled-components
✅ **Comprehensive documentation** with Storybook
✅ **Independent versioning** for gradual adoption

By following these patterns, you can build a similar system that scales with your organization's needs while maintaining design consistency and developer experience.

---

**Next Steps:**

1. Review this guide with your team
2. Decide on package structure and naming
3. Set up monorepo infrastructure
4. Start with tokens and utilities packages
5. Build out core components iteratively
6. Document as you go with Storybook
7. Get feedback and iterate

Good luck building your design system! 🎨
