# Sidebar workflows design

## Goal

Refine the Sentra sidebar to match `design/app-sidebar.png`: a dark workspace sidebar with an organization header, a collapse/open control in the header, a dummy workflow list, and an account control in the footer.

## Scope

- Keep the existing shadcn sidebar primitives and `collapsible="icon"` behavior.
- Add the existing `SidebarTrigger` to the sidebar header, aligned opposite the organization switcher.
- Keep the current dummy workflow names.
- Make workflow rows local interactive buttons so clicking one updates the active highlight.
- Keep the existing create-workflow affordance and use the existing “coming soon” toast behavior.
- Preserve the existing Clerk controls, public routes, and page content outside the sidebar shell.

## Interaction

- Desktop: the header trigger collapses the sidebar to its icon rail and expands it again.
- Mobile: the same trigger uses the primitive’s mobile sheet behavior.
- Workflow rows are keyboard-accessible buttons with visible active, hover, and focus states.
- The plus button remains a non-destructive placeholder and displays the existing toast.

## Visual direction

- Use the current dark zinc palette and existing design tokens.
- Keep the organization switcher at the top, with the collapse control at the far right.
- Use generous vertical spacing between workflow rows and a rounded, slightly lighter active row.
- Ensure labels disappear cleanly in the collapsed state through the existing sidebar component behavior.

## Verification

- Run `npm run typecheck`.
- Run `npm run lint`.
- Run `git diff --check`.

