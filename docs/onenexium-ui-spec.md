# OneNexium
## Onboarding + Platform Dashboard
### Complete UI Specification — Every Screen, Every Component, Every State

| 4 Steps | 8 Screens | 3 Roles | All States | Cursor Ready |
|---|---|---|---|---|
| Onboarding | Dashboard | RBAC | Loaded / Empty / Error | With Code Prompts |

---

| Who uses this | Primary principle | Implementation stack |
|---|---|---|
| Non-technical business owners — coaches, consultants, freelancers. They have never written code. They do not know what a component is. Design accordingly. | If a user has to think about what to do next, the screen has failed. Every action must be obvious. Every state must be communicated. Zero confusion. | Next.js 14 App Router, TypeScript strict, Tailwind CSS, shadcn/ui, Framer Motion, Drizzle ORM, NextAuth v5. Every component in this doc uses this stack. |

---

## 01 Design System

> Colours, typography, spacing, and component rules used throughout

### Colour Palette

| Token | Value | Used For |
|---|---|---|
| Background (dark) | `#0F172A` — ink | Page backgrounds in dark mode |
| Surface | `#1E293B` — slate-800 | Cards, sidebars, modals in dark mode |
| Surface elevated | `#334155` — slate-700 | Hover states, tooltips, dropdowns |
| Primary | `#4F46E5` — indigo-600 | CTAs, active nav items, links, brand colour |
| Primary hover | `#4338CA` — indigo-700 | Button hover state |
| Violet accent | `#7C3AED` — violet-600 | Secondary highlights, badges, tags |
| Success | `#059669` — emerald-600 | Success states, live badges, confirmed |
| Warning | `#D97706` — amber-600 | Pending states, warnings, retries |
| Error | `#DC2626` — red-600 | Errors, failures, destructive actions |
| Text primary | `#F8FAFC` — slate-50 | Main readable text on dark backgrounds |
| Text secondary | `#94A3B8` — slate-400 | Labels, hints, metadata, timestamps |
| Border | `#1E293B` — slate-800 | Dividers, card borders, input borders |

### Typography

**Typeface:** **Outfit** is the default sans for body copy and UI labels (marketing site, auth, onboarding, dashboard, settings). **Bricolage Grotesque** is used for headings and display (`font-heading` / `font-display`). **DM Mono** is the monospace face for code snippets, URLs, IDs, DNS records, and any fixed-width technical content.

| Element | Specification |
|---|---|
| Page heading (H1) | `text-2xl font-bold tracking-tight` — `font-heading` (Bricolage Grotesque) |
| Section heading (H2) | `text-lg font-semibold` (18px, semibold) — `font-heading` |
| Card title | `text-base font-semibold` (16px, semibold) — `font-heading` where specified in components |
| Body text | `text-sm` (14px, regular) — `font-sans` (Outfit) |
| Caption / label | `text-xs` (12px, regular) — Outfit |
| Input label | `text-sm font-medium` (14px, medium) — Outfit |
| Button text | `text-sm font-semibold` (14px, semibold) — Outfit |
| Code / mono | `font-mono text-sm` (14px) — DM Mono |

**Font loading (Next.js + Tailwind):**

- Import `Outfit`, `Bricolage_Grotesque`, and `DM_Mono` from `next/font/google` (see `shared/lib/fonts.ts`).
- Map Outfit to `--font-outfit` and Tailwind `fontFamily` / `font-sans` so inherited UI text uses Outfit.
- Map Bricolage Grotesque to `--font-bricolage` and `font-heading` / `font-display` for headings.
- Map DM Mono to `--font-mono` so `font-mono` resolves to DM Mono.
- Subsets: `latin` (add others if you ship additional locales). Weights: Outfit 400–700; Bricolage 400–800; DM Mono 400–500 for UI.

**Generated sites (customer-facing):** Onboarding Step 3 and Settings brand picker offer three *site* styles — Modern (Outfit), Classic (Playfair Display), Playful (Nunito). Those apply to the user’s published site preview and output, not to the dashboard chrome (which stays Outfit + Bricolage Grotesque + DM Mono).

### Global Rules — Every Component Must Follow

```
01  Theme — OneNexium supports light and dark themes (`next-themes`). Dashboard tokens use `--nx-*` on `:root` / `html.dark`.

02  Rounded corners — all cards and inputs use rounded-xl. Buttons use rounded-lg.

03  No raw HTML inputs — always use shadcn/ui Input, Textarea, Select, Button components.

04  Every interactive element has a hover state and focus ring.

05  Every data-fetching area has three states: loading skeleton, loaded data, empty state.

06  Every error is caught and shown as a friendly message — never a raw JS error.

07  Mobile first — build for 375px width first, then scale up with sm: md: lg: prefixes.

08  Transitions — use Framer Motion for page transitions and state changes. duration 200ms.

09  Accessibility — all interactive elements are keyboard accessible. Modals trap focus.

10  Icons — Lucide React only. Consistent size: w-4 h-4 for inline, w-5 h-5 for nav.

11  Typography — Outfit for body/UI copy; Bricolage Grotesque for headings; DM Mono for code, URLs, and technical strings. No extra sans families in app chrome.
```

### File Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx              — Login screen
│   │   └── layout.tsx                  — Auth layout (centered, no sidebar)
│   ├── onboarding/
│   │   ├── page.tsx                    — 4-step onboarding wizard
│   │   └── layout.tsx                  — Onboarding layout (no sidebar)
│   ├── (app)/
│   │   ├── layout.tsx                  — App shell: sidebar + topbar wrapper
│   │   ├── page.tsx                    — /app redirect to /app/projects
│   │   ├── projects/
│   │   │   ├── page.tsx                — Projects list dashboard
│   │   │   └── [id]/
│   │   │       ├── page.tsx            — Chat + preview (main builder screen)
│   │   │       └── domain/page.tsx     — Custom domain management
│   │   ├── domains/page.tsx            — All domains across all projects
│   │   ├── settings/
│   │   │   ├── page.tsx                — Workspace settings
│   │   │   └── team/page.tsx           — Team management + invites
│   │   └── notifications/page.tsx      — Notification inbox
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts — NextAuth handler
│   │   ├── ai/chat/route.ts            — Claude API streaming endpoint
│   │   ├── projects/route.ts           — CRUD projects
│   │   ├── workspaces/route.ts         — Workspace management
│   │   ├── domains/route.ts            — Domain CRUD
│   │   ├── domains/verify/route.ts     — DNS polling trigger
│   │   ├── invites/route.ts            — Create invites
│   │   ├── invites/accept/route.ts     — Accept invite token
│   │   ├── notifications/route.ts      — Fetch + mark read
│   │   └── health/route.ts             — Health check
│   ├── layout.tsx                      — Root layout (fonts, providers)
│   └── not-found.tsx                   — 404 page
├── components/
│   ├── ui/                             — shadcn/ui components (auto-generated)
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── MobileSidebar.tsx
│   ├── chat/
│   │   ├── ChatInterface.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── ToolStatusChip.tsx
│   │   ├── ChatInput.tsx
│   │   └── LiveUrlCard.tsx
│   ├── preview/
│   │   ├── PreviewPane.tsx
│   │   └── PreviewToolbar.tsx
│   ├── onboarding/
│   │   ├── StepIndicator.tsx
│   │   ├── BusinessTypeStep.tsx
│   │   ├── BusinessDetailsStep.tsx
│   │   ├── BrandingStep.tsx
│   │   └── FirstProjectStep.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   └── NewProjectModal.tsx
│   └── shared/
│       ├── EmptyState.tsx
│       ├── LoadingSkeleton.tsx
│       ├── RoleBadge.tsx
│       └── StatusBadge.tsx
├── lib/
│   ├── db/schema/                      — Drizzle schemas
│   ├── auth/rbac.ts                    — Role guard utilities
│   ├── email/index.ts                  — AWS SES utility
│   └── ai/context.ts                   — Claude context assembly
└── middleware.ts                       — Route protection
```

---

## 02 Login Screen

> Route: `/login` — the entry point for all users

The first thing any user sees. Clean, focused, no distractions. Two ways to sign in: Google OAuth and email magic link. Error states handled gracefully. Redirect to `/onboarding` for new users, `/app` for returning users.

### Layout

Full screen centered layout. Dark background (`bg-slate-950`). No sidebar. No topbar. Single card centered vertically and horizontally. Max width 400px.

```
Page layout:
  min-h-screen bg-slate-950 flex items-center justify-center p-4

Card:
  w-full max-w-md bg-slate-900 rounded-2xl p-8 border border-slate-800
  shadow-2xl shadow-black/50

Logo area (top of card):
  OneNexium wordmark — text-2xl font-bold text-white
  Tagline below — text-sm text-slate-400 "Build your business online"
  Margin bottom: mb-8

Divider between logo and form:
  border-t border-slate-800 mb-8
```

### Components

#### `GoogleSignInButton` `<Button>`

Full-width button with Google logo. Signs in via NextAuth Google provider.

- **Props / Data:** `onClick` → `signIn("google", { callbackUrl: "/app" })`
- **Behaviour:** Hover: `bg-slate-700`. Loading: shows spinner, text changes to "Signing in...". Disabled during loading.

#### `EmailMagicLinkForm` `<Form>`

Email input + Send Link button. Sends magic link via NextAuth email provider.

- **Props / Data:** `email: string` (validated — must be valid email format)
- **Behaviour:** On submit: POST to `/api/auth/signin/email`. Success: show confirmation message with the email address. Error: show inline error. Loading: disable form, show spinner on button.

#### `OrDivider` `<div>`

Visual separator between Google button and email form.

- **Props / Data:** none
- **Behaviour:** Static — "or continue with email" text with horizontal lines each side.

### All States — Login Screen

| State | Description | UI Treatment |
|---|---|---|
| **Default** | Page loads, no action taken | Google button + email form both visible and enabled |
| **Google loading** | User clicked Google button, OAuth in progress | Google button shows spinner, text: "Connecting to Google...", button disabled |
| **Email submitted** | User submitted magic link form | Form hidden. Green tick icon. "We sent a link to you@email.com — check your inbox." Back button appears. |
| **Email error** | Invalid email format or send failure | Red inline error below email input. Form stays visible. Specific message for format vs send failure. |
| **Auth error** | OAuth failed or token expired | Red banner at top of card. "Sign in failed. Please try again." with a Retry button. |
| **Already signed in** | User navigates to /login while authed | Immediate redirect to /app — no flash of login screen. |

### Cursor Code Prompt — Login Screen

```
Build a login page at app/(auth)/login/page.tsx using Next.js 14 App Router with:

Layout: full screen dark (bg-slate-950), single centered card (max-w-md, bg-slate-900,
rounded-2xl, p-8, border border-slate-800)

Content:
1. OneNexium wordmark (text-2xl font-bold text-white) + tagline (text-slate-400)
2. Google sign-in button (full width, bg-slate-800, hover:bg-slate-700, Google logo from
   Lucide or SVG, calls signIn("google", { callbackUrl: "/app" }) from next-auth/react)
3. Divider: "or continue with email" with horizontal lines
4. Email input (shadcn Input) + "Send Magic Link" button (shadcn Button)
5. On email submit: POST to /api/auth/signin/email, show confirmation state

All loading states, error states, and the confirmation state as described in the spec.

TypeScript strict. No inline styles. Tailwind only.
```

---

## 03 Onboarding Wizard

> Route: `/onboarding` — runs once after first login

> *"The onboarding wizard has one job: make the user feel excited and confident before they see the builder. By the end, they should be thinking about their business — not about software."*

### Overall Wizard Layout

Full screen. Dark background. No sidebar. No topbar. A single centered container (`max-w-2xl`). At the top: progress indicator showing current step. Below: the step content with smooth animated transitions between steps (Framer Motion slide + fade). At the bottom: Back and Continue buttons. The wizard is not skippable.

```
Wizard container:
  min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6

Inner container:
  w-full max-w-2xl

Progress indicator (top):
  Horizontal row of 4 circles connected by lines
  Completed steps: filled indigo circle with white checkmark
  Current step: filled indigo circle with step number
  Upcoming steps: empty circle (border only) with step number
  Line between steps: gray when not completed, indigo when completed

Step content area:
  bg-slate-900 rounded-2xl p-8 mt-8 border border-slate-800
  min-height: 380px (consistent height prevents layout jumps)
  Framer Motion: AnimatePresence + motion.div with x slide + opacity fade
  Direction: slide left when going forward, slide right when going back

Button row (bottom of card):
  flex justify-between items-center mt-8
  Back button (ghost variant) — hidden on step 1
  Continue button (default variant, indigo) — "Get Started" on step 4
```

### Step Indicator Component — `StepIndicator.tsx`

```
Props: currentStep (1–4), completedSteps (number[])

Step circle states:
  Completed: bg-indigo-600 text-white with CheckIcon inside (w-4 h-4)
  Current: bg-indigo-600 text-white with step number
  Upcoming: border-2 border-slate-600 text-slate-500 with step number

Connector line between circles:
  h-0.5 flex-1 mx-2
  Completed section: bg-indigo-600
  Not yet reached: bg-slate-700

Step labels below each circle:
  text-xs text-slate-400
  Step 1: "Business Type"
  Step 2: "Your Business"
  Step 3: "Brand"
  Step 4: "Get Started"
```

### Step 1 — Business Type

*Who is this for?*

The user selects the type of business they run. This determines the AI system prompt context for their entire platform experience. Choosing one card highlights it and enables the Continue button.

**Fields / Elements:**

- 5 business type cards arranged in a 3+2 grid (desktop) or 1-column stack (mobile)
- Card: **Coaching** — icon of person, "Life, business, or executive coaching"
- Card: **Consulting** — icon of chart, "Strategy, marketing, or specialist consulting"
- Card: **Agency** — icon of building, "Creative, digital, or marketing agency"
- Card: **Freelance** — icon of laptop, "Independent professional or creator"
- Card: **Other** — icon of sparkle, "Something else — describe it yourself"
- Each card: `bg-slate-800 rounded-xl p-4 border-2 border-transparent`
- Selected card: `border-indigo-500 bg-indigo-950/50 ring-1 ring-indigo-500`
- Hover: `border-slate-600 bg-slate-750`
- Continue button disabled until one card is selected
- Selecting a card saves choice to local state — persists if user goes back

### Step 2 — Your Business

*Tell us about it*

The user enters their business name and a short description. These become part of the AI context and are used to pre-fill the first generation prompt at the end of onboarding.

**Fields / Elements:**

- Heading: "What's your business called?" — `text-xl font-semibold text-slate-100`
- Business name input: shadcn Input, placeholder "Rise With Sarah", `maxLength 60`
- Character counter below input: "32/60" in `text-xs text-slate-500`
- Heading: "Describe what you do in 2–3 sentences"
- Description textarea: shadcn Textarea, `rows=4`, placeholder "I help ambitious professionals..."
- Character counter: "0/300"
- Helper text below textarea: "This helps the AI build your website with the right words and tone"
- Both fields are required — Continue button disabled if either is empty
- Real-time validation — no error shown until user blurs the field
- Error state: red border on input, "Business name is required" below

### Step 3 — Your Brand

*Make it yours*

The user sets their brand colour, uploads a logo, and picks a font style. These are applied to every generated page. The preview shows in real time as they select.

**Fields / Elements:**

- Heading: "Pick your brand colour" — shows a live preview swatch
- Colour picker: 8 preset colour swatches (indigo, violet, sky, green, orange, pink, red, slate) in a horizontal row
- Custom hex input: text input next to swatches, "#4F46E5", updates swatch live
- Selected colour: `ring-2 ring-white ring-offset-2 ring-offset-slate-900`
- Logo upload section: "Upload your logo (optional)"
- Upload area: dashed border, `rounded-xl`, "Click to upload or drag and drop" text
- Accepted: PNG, JPG, SVG — max 2MB
- After upload: shows thumbnail preview with a remove button (X icon)
- Upload action: PUT to S3 presigned URL, progress bar shown during upload
- Font style selection: 3 option cards — Modern (Outfit), Classic (Playfair Display), Playful (Nunito)
- Each font card shows sample text "Rise With Sarah" in that font
- Selected font: `border-indigo-500` same as business type cards
- All fields optional — Continue always enabled on this step
- Helper text: "Don't worry — you can change all of this later in settings"

### Step 4 — Get Started

*You're ready*

The final step shows a summary of what was entered and pre-fills the first generation prompt. Clicking Get Started creates the workspace and redirects to the chat interface.

**Fields / Elements:**

- Heading: "You're all set, {firstName}!" in `text-2xl font-bold`
- Summary card showing: business type (with icon), business name, brand colour swatch, logo thumbnail if uploaded
- Section heading: "Here's what we'll build first"
- Pre-filled prompt box: read-only textarea showing the auto-generated first prompt
- Example: "Build a complete website for Rise With Sarah, a life coaching business. Include a homepage with a hero section, about page, services page, and contact form."
- User can edit this prompt before clicking Get Started
- Get Started button: large, full width, `bg-indigo-600 hover:bg-indigo-500`
- Button click: POST to `/api/workspaces` (creates workspace), then POST to `/api/projects` (creates first project), then redirect to `/app/projects/{id}` with pre-filled message
- Loading state: button shows spinner, text "Setting up your workspace..."
- The workspace creation marks `user.onboarded = true` — user never sees `/onboarding` again

### Onboarding State Persistence

```
The wizard state must survive a page refresh on the same step.

Use sessionStorage to persist:
  { currentStep, businessType, businessName, description, brandColor, logoUrl, fontStyle }

On page load: read from sessionStorage, restore to last completed step.

On workspace creation success: clear sessionStorage.

If user navigates away mid-onboarding and returns later:
  Check user.onboarded in session. If false → redirect to /onboarding.
  Restore from sessionStorage if available.
  If no sessionStorage: start from step 1.
```

### Cursor Code Prompt — Onboarding Wizard

```
Build a 4-step onboarding wizard at app/onboarding/page.tsx:

Container: full screen dark (bg-slate-950), centered content (max-w-2xl)

StepIndicator component: 4 circles with connecting lines, completed/current/upcoming states

Step content wrapped in AnimatePresence with Framer Motion slide transitions
(slide left on next, slide right on back, opacity fade, duration 0.2s)

Step 1: 5 business type selection cards (3+2 grid desktop, 1-col mobile)
Step 2: business name Input + description Textarea with character counters
Step 3: colour swatches + custom hex + logo upload (S3 presigned URL) + font cards
Step 4: summary card + editable prompt textarea + Get Started button

State persisted to sessionStorage across steps.

On Get Started: POST /api/workspaces then POST /api/projects, redirect to /app/projects/{id}
Mark user.onboarded=true via PATCH /api/workspaces.

TypeScript strict. All shadcn/ui components. Tailwind only. No inline styles.
```

---

## 04 App Shell Layout

> Route: `/app/*` — the persistent wrapper for all dashboard screens

### Shell Structure

```
Root layout (app/(app)/layout.tsx):

Desktop (lg+):
┌──────────────────────────────────────────────────┐
│  SIDEBAR (240px fixed left)                      │
│  ┌─────────────────────────────────────────────┐ │
│  │  Logo + workspace name (top)                │ │
│  │  Nav items (middle)                         │ │
│  │  User avatar + role badge (bottom)          │ │
│  └─────────────────────────────────────────────┘ │
│  MAIN CONTENT AREA                               │
│  (fills remaining width)                         │
│  Top bar (48px)                                  │
│  Page content                                    │
└──────────────────────────────────────────────────┘

Mobile (< lg):
  Sidebar hidden. Hamburger icon in top bar.
  Tap hamburger → Sheet (shadcn) slides in from left.
  Same nav items as desktop sidebar.
  Sheet closes on nav item click.

Sidebar collapse (md–lg):
  Sidebar narrows to 60px (icon only mode).
  Toggle button at bottom of sidebar.
  State stored in localStorage (persists across sessions).
  Icons show with tooltip on hover (radix Tooltip) showing full label.
```

### Sidebar — Component Detail

```
Sidebar container:
  w-60 shrink-0 bg-slate-900 border-r border-slate-800
  flex flex-col h-full fixed left-0 top-0
  transition-width duration-200 (for collapse animation)
  Collapsed state: w-15 (60px)
  Expanded state: w-60 (240px)

Top section (logo area):
  h-16 flex items-center px-4 border-b border-slate-800
  OneNexium logo mark (icon only when collapsed)
  "OneNexium" text (hidden when collapsed)
  Workspace name below in text-xs text-slate-400 (hidden when collapsed)

Nav items (middle, scrollable):
  flex-1 overflow-y-auto py-4 px-2 space-y-1
  Each item: flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
  Active: bg-indigo-950 text-indigo-400 font-medium
  Inactive: text-slate-400 hover:bg-slate-800 hover:text-slate-200
  Collapsed: justify-center, hide label text, show only icon

Bottom section (user):
  p-3 border-t border-slate-800
  Avatar (w-8 h-8 rounded-full) + name + role badge
  Dropdown menu on click: Profile, Settings, Sign out
  Collapsed: only avatar shown
```

### Sidebar Navigation Items

| Icon | Label | Notes |
|---|---|---|
| LayoutDashboard | Dashboard | |
| FolderOpen | **Projects** | |
| Globe | Domains | |
| Bell | Notifications | Shows unread count badge |
| Settings | Settings | |

> All roles see all items. Role restricts actions, not visibility.

### Top Bar — Component Detail

```
TopBar container:
  h-14 bg-slate-900/80 backdrop-blur border-b border-slate-800
  flex items-center justify-between px-6
  sticky top-0 z-10

Left side:
  Hamburger menu icon (only on mobile — hidden on lg+)
  Breadcrumb: "Projects / Rise With Sarah" in text-sm text-slate-400
  Chevron separator between breadcrumb items
  Current page highlighted in text-slate-100

Right side (flex gap-3):
  Notification bell icon (Bell from Lucide)
  Unread count badge: absolute positioned, bg-red-500, text-white text-xs
  Click: opens notification dropdown (last 5 notifications)

  User avatar (w-8 h-8 rounded-full)
  Click: opens dropdown — Profile, Settings, Sign out
```

---

## 05 Projects List

> Route: `/app/projects` — all projects in the workspace

**/app/projects** — All roles. Viewer sees projects but cannot create.

The main landing page after onboarding is complete. Shows all projects in the workspace as a grid of cards. Each card shows the project name, status, live URL, and last updated time. A prominent Create button in the top right. Empty state for new workspaces.

### Page Layout

```
Page header:
  flex items-center justify-between mb-8
  Left: "Projects" h1 + "X projects" count in text-slate-400
  Right: "New Project" button (Button variant=default, PlusIcon)
    Admin + Member: button visible and enabled
    Viewer: button hidden

Project grid:
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4

Loading state:
  Show 6 skeleton cards (same dimensions as real cards)
  Skeleton: bg-slate-800 rounded-xl animate-pulse

Empty state (no projects yet):
  Centered in the grid area
  Illustration: simple SVG of a blank page with a sparkle
  Heading: "Build your first project"
  Subtext: "Describe your business and let the AI build your website"
  Button: "Start Building" (same as New Project button)
```

### Project Card Component

```
ProjectCard container:
  bg-slate-900 rounded-xl border border-slate-800 p-5
  hover:border-slate-600 hover:shadow-lg hover:shadow-black/20
  transition-all duration-200 cursor-pointer
  Click anywhere on card: navigate to /app/projects/{id}

Card top row:
  Project name: text-base font-semibold text-slate-100 truncate
  Status badge (right): StatusBadge component

Status badge variants:
  active:     bg-slate-700 text-slate-300 "Active"
  building:   bg-amber-950 text-amber-400 "Building..." with pulse dot
  deploying:  bg-sky-950 text-sky-400 "Deploying..." with pulse dot
  live:       bg-emerald-950 text-emerald-400 "Live" with solid green dot
  paused:     bg-slate-800 text-slate-500 "Paused"

Card middle:
  Live URL (if deployed): Globe icon + "sitename.sites.onenexium.ai"
  text-sm text-indigo-400 hover:text-indigo-300 truncate
  Click opens URL in new tab (stopPropagation to prevent card navigation)

Card bottom (flex justify-between items-center mt-4 pt-4 border-t border-slate-800):
  Last updated: "Updated 2 hours ago" in text-xs text-slate-500
  Actions dropdown (three-dot icon):
    Admin + Member: Open, Rename, Delete
    Viewer: Open (only)
    Delete: shows confirmation dialog before deleting
```

### New Project Modal

```
shadcn Dialog component.

Modal content:
  Title: "Create New Project"
  Project name input: placeholder "My Coaching Website"
  Helper text: "You can rename this anytime"
  Cancel button (ghost variant)
  Create button (default variant)

On Create click:
  POST /api/projects { workspaceId, name }
  Creates project record in RDS with unique tenantId
  Loading: button shows spinner, "Creating..."
  Success: close modal, navigate to /app/projects/{newId}
  Error: show inline error "Failed to create project. Please try again."

Validation:
  Name required — min 2 characters, max 60 characters
  Create button disabled if validation fails
```

---

## 06 Chat Builder Screen

> Route: `/app/projects/[id]` — the core product experience

> *"This is the product. Everything else in the platform exists to support this screen. The user types. The AI builds. The preview shows the result. That is the entire interaction."*

### Split Layout

```
Root container:
  h-[calc(100vh-56px)] flex (fills viewport minus topbar height)
  No padding — the two panels fill the space completely

Desktop (lg+):
  Left panel (chat):    w-[420px] shrink-0 flex flex-col
  Divider:              w-px bg-slate-800
  Right panel (preview): flex-1 flex flex-col

Mobile (< lg):
  Stacked vertically
  Chat panel:    h-[50vh]
  Preview panel: h-[50vh]
  Tab switcher at top: "Chat" | "Preview" (switches which panel is visible)
```

### Left Panel — Chat Interface

```
Chat panel layout: flex flex-col h-full bg-slate-900

Panel header (shrink-0):
  h-14 px-4 flex items-center justify-between border-b border-slate-800
  Project name: text-sm font-medium text-slate-200
  Actions row: Edit Mode toggle + more menu (three dots)
  Edit Mode toggle: Switch component (shadcn) with "Edit Mode" label

Message list (flex-1 overflow-y-auto):
  p-4 space-y-4
  Scroll to bottom on new message (useEffect + ref)
  Auto-scrolls during streaming as content grows

Chat input bar (shrink-0):
  p-3 border-t border-slate-800 bg-slate-900
  Textarea: auto-resize (min 1 row, max 6 rows)
  placeholder: "Describe what you want to change..."
  Below textarea: file attachment icon (left) + send button (right)
  Send on Enter key (Shift+Enter = new line)
  Send button: disabled when empty or when AI is generating

  Viewer role: entire input bar replaced with:
    "You have view-only access to this project"
    text-sm text-slate-500 italic, centered
```

### Message Bubble Component

```
User message (right-aligned):
  flex justify-end mb-4
  Bubble: bg-indigo-600 text-white rounded-2xl rounded-br-sm px-4 py-2.5
  max-w-[80%]
  Text: text-sm leading-relaxed whitespace-pre-wrap
  Timestamp: text-xs text-indigo-300 mt-1 text-right

AI message (left-aligned):
  flex gap-3 mb-4
  Avatar: w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center
  Sparkles icon (w-3.5 h-3.5 text-white)
  Content area (flex-col gap-2):
    Tool status chips (shown during generation)
    Message bubble: bg-slate-800 text-slate-100 rounded-2xl rounded-bl-sm px-4 py-2.5
    max-w-[80%]
    Text streams in character by character
    Live URL card (shown after successful deployment)

Typing indicator (shown while waiting for first token):
  Same left-aligned layout as AI message
  Bubble contains three animated dots (bg-slate-400, animate-bounce, staggered delay)
```

### Tool Status Chips

```
Container: flex flex-wrap gap-1.5 mb-2

Chip component:
  inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium

Active chip (tool currently running):
  bg-amber-950 text-amber-300 border border-amber-800/50
  Animated spinner: w-3 h-3 animate-spin border-amber-400

Completed chip (tool finished):
  bg-slate-800 text-slate-400
  CheckIcon w-3 h-3

Tool → label mapping:
  write_file               → "✍ Writing {filename}"
  apply_diff               → "✏ Updating {component}"
  trigger_build            → "🔨 Building..."
  get_build_errors         → "🔍 Checking errors..."
  build_docker_image       → "📦 Creating image..."
  start_container          → "🚀 Starting app..."
  register_traefik_route   → "🌐 Going live..."
  provision_tenant_schema  → "⚙ Setting up database..."
```

### Live URL Card

```
Shown in AI message after register_traefik_route tool completes.

Card:
  bg-emerald-950 border border-emerald-800 rounded-xl p-4 mt-2
  max-w-sm

Content:
  Row 1: green pulsing dot + "Your site is live" (text-sm font-medium text-emerald-300)
  Row 2: URL text in text-sm text-emerald-400 font-mono truncate
  Row 3: two buttons side by side:
    "Open Site" button: ExternalLink icon, opens URL in new tab
    "Copy URL" button: Copy icon, copies to clipboard, shows "Copied!" for 2 seconds
```

### Right Panel — Preview

```
Preview panel layout: flex flex-col h-full bg-slate-950

Preview toolbar (shrink-0):
  h-10 px-4 flex items-center justify-between bg-slate-900 border-b border-slate-800
  Left:   device size toggles (Desktop | Tablet | Mobile icons)
  Center: URL bar showing current preview URL (read-only, truncated)
  Right:  Refresh button (RotateCcw icon) + Open in new tab (ExternalLink icon)

Preview iframe (flex-1):
  width: 100% by default
  Tablet mode: max-w-[768px] mx-auto
  Mobile mode: max-w-[375px] mx-auto
  sandbox="allow-scripts allow-same-origin allow-forms"
  src: updated when register_traefik_route returns URL

No preview state (before first deployment):
  Centered placeholder in the iframe area
  Illustration: monitor with sparkle
  Text: "Your site preview will appear here"
  Subtext: "Start chatting to build your site"

Building state (after trigger_build, before deploy completes):
  Semi-transparent overlay on iframe
  Centered spinner + "Building your site..." text

Edit Mode overlay:
  When Edit Mode is toggled on:
    Thin indigo border appears around iframe
    "EDIT MODE" badge top-right corner of iframe
    Hover over sections in iframe shows edit bubbles (postMessage)
```

### Edit Mode — Visual Overlay Editor

```
How it works:
  1. User toggles Edit Mode switch in chat panel header
  2. Platform injects a script into the iframe via postMessage
  3. Script adds mouseover listeners to all section elements
  4. On hover: script sends postMessage to parent with component info
  5. Parent (platform) shows floating edit bubble near the hovered element

Edit bubble:
  Floating card (position: absolute, overlaid on iframe)
  bg-slate-900 border border-indigo-500 rounded-xl shadow-xl p-4
  Width: 280px

Bubble content:
  Top row: component name (e.g. "Hero Section") + X close button
  Textarea: "Describe your change..." placeholder, 3 rows
  Image upload icon (attach reference image)
  Apply button (indigo) + Undo button (ghost, only if prior version exists)

On Apply:
  Message sent to Claude with targeted context:
    "Update only the {component} component. User instruction: {textarea content}"
  Uses apply_diff — does NOT rewrite other files
  Build triggers — preview refreshes when complete

Undo:
  Restores the previous version of that component file
  Triggers rebuild
  Shows "Restored previous version" confirmation in bubble
```

---

## 07 Domain Management

> Routes: `/app/projects/[id]/domain` and `/app/domains`

**/app/domains** — All roles. Viewer can view only. Member+ can add.

Shows all custom domains across all projects in the workspace. Status indicators show whether each domain is pending verification, verified, or fully live with SSL.

### Domains List Layout

```
Page header:
  "Domains" h1 + total count
  "Connect Domain" button (right) — hidden for Viewer role

Table layout (hidden on mobile — card layout instead):
  Columns: Domain, Project, Status, SSL, Verified Date, Actions

Mobile layout: stack as cards (one per domain)

Domain status badges:
  pending:    bg-slate-800 text-slate-400 "Waiting for DNS"
  verifying:  bg-amber-950 text-amber-400 "Checking DNS..." + spinner
  verified:   bg-sky-950 text-sky-400 "DNS Verified"
  live:       bg-emerald-950 text-emerald-400 "Live" + SSL icon
  failed:     bg-red-950 text-red-400 "Verification Failed"

SSL column:
  Active:   ShieldCheck icon text-emerald-400
  Not yet:  Shield icon text-slate-600

Actions dropdown per domain (Admin/Member only):
  "View DNS Instructions" — opens instructions modal
  "Remove Domain" — confirmation dialog, then DELETE /api/domains/{id}
```

### Custom Domain Flow — Step by Step UI

```
STEP A: User clicks "Connect Domain"
  Modal opens: "Connect a Custom Domain"
  Input: domain name (e.g. app.mysarahcoaching.com)
  Project selector dropdown: which project to connect this domain to
  "Connect" button

STEP B: DNS Instructions shown
  Modal changes to show DNS instructions:
  Heading: "Add this DNS record at your domain registrar"

  Instruction card:
    Type:  CNAME
    Name:  app (or @ for root)
    Value: {sitename}.sites.onenexium.ai
    TTL:   300 (or "Automatic")
  Copy button next to the Value field

  Registrar-specific note: "If using GoDaddy: go to DNS Management → Add Record"
  "I've added the record" button (starts polling)
  "Remind me later" link (closes modal, domain stays in Pending)

STEP C: Verification Polling UI
  Domain card on the list shows "Checking DNS..." with spinner
  Polling every 60 seconds (server-side job updates RDS)
  Client polls GET /api/domains/{id}/status every 30 seconds
  Toast notification when verified: "app.mysarahcoaching.com is verified!"

STEP D: SSL Active
  Card status changes to "Live" with green SSL badge
  Email sent to workspace owner: "Your domain is live!"
  Clicking the domain opens it in a new tab
```

---

## 08 Settings Screens

> Routes: `/app/settings` and `/app/settings/team`

### Workspace Settings

> `/app/settings` — Admin only. Member and Viewer see a "no access" state.

Workspace configuration: name, description, brand colour, logo, and the danger zone for workspace deletion.

```
Access control: requireRole("admin") at server component level.
Member/Viewer: show a "You need admin access to view settings" card.

Sections (vertically stacked, each in a bg-slate-900 rounded-xl card):

Section 1: Workspace Details
  Workspace name: Input (max 60 chars)
  Description: Textarea (max 300 chars)
  Save button (right-aligned)
  Changes saved on blur OR explicit save
  Success: green toast "Saved"

Section 2: Brand Settings
  Colour picker (same as onboarding step 3)
  Logo upload (current logo shown with replace/remove buttons)
  Font style picker (same as onboarding)
  Save button

Section 3: Danger Zone (red-bordered card)
  Heading: "Danger Zone" in text-red-400
  "Delete Workspace" button (red outlined)
  Click: opens confirmation dialog
  Dialog: "Type your workspace name to confirm deletion"
  Text input: must match workspace name exactly
  Delete button disabled until name matches
  On delete: DELETE /api/workspaces/{id}, sign out, redirect to /login
```

### Team Management

> `/app/settings/team` — Admin: full access. Member/Viewer: read-only view of team.

Shows all workspace members with their roles. Admin can invite new members, change roles, and remove members.

```
Page header:
  "Team" h1 + member count
  "Invite Member" button (right) — Admin only

Members table:
  Columns: Member (avatar + name + email), Role, Joined, Actions
  Row hover: bg-slate-800/50

Role badge per member:
  admin:   bg-violet-950 text-violet-400 "Admin"
  member:  bg-sky-950 text-sky-400 "Member"
  viewer:  bg-slate-800 text-slate-400 "Viewer"

Current user row:
  Shows "(You)" after name in text-slate-500
  No actions available on own row

Actions dropdown (Admin only, not on own row):
  "Change Role" → opens role picker popover
  "Remove from Workspace" → confirmation dialog

Pending invites section (below active members):
  Heading: "Pending Invitations"
  Shows: email, invited role, invited date, "Revoke" button
  If no pending invites: section not shown
```

### Invite Member Flow

```
Modal opens on "Invite Member" button click.

Modal content:
  Title: "Invite a Team Member"
  Email input: placeholder "colleague@company.com"
  Role selector (segmented control or radio group):
    Member — "Can create and edit projects"
    Viewer — "Can view projects only"
    Admin  — "Full access including settings" (shown only for workspace admin)
  Send Invite button

On Send Invite:
  POST /api/invites { email, role, workspaceId }
  Creates invite record in RDS
  Sends magic link email via AWS SES
  Email subject: "{inviterName} invited you to join {workspaceName} on OneNexium"
  Email body: your role, workspace name, Accept Invite button

  Success: close modal, show toast "Invite sent to {email}"
  Error: inline error if email already a member or already invited

Accept invite flow (invitee clicks link):
  GET /api/invites/accept?token={token}
  Validates token not expired (7 days)
  If user exists: add to workspace, redirect to /app
  If new user: redirect to /login with callbackUrl=/api/invites/accept?token={token}
  After login: complete invite acceptance, redirect to /app
  Expired token: show "This invite has expired" page with "Request a new invite" link
```

---

## 09 Notifications

> Bell icon dropdown and `/app/notifications` page

### Notification Bell — Top Bar Dropdown

```
Bell icon in TopBar:
  BellIcon (Lucide), w-5 h-5 text-slate-400
  Unread count badge: absolute -top-1 -right-1
  bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px]
  Shows count up to 9, then "9+"
  Hidden when count is 0

Click: opens Popover (shadcn) below the bell
Popover content (w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl):
  Header: "Notifications" + "Mark all read" link (right)
  Notification list: last 5 notifications, newest first
  Footer: "View all notifications →" link to /app/notifications

Each notification item:
  Unread: bg-slate-800 (slightly highlighted)
  Read: bg-transparent
  Icon left (w-8 h-8 rounded-full based on type)
  Message text: text-sm text-slate-200
  Time: text-xs text-slate-500 "2 minutes ago"
  Click: marks as read, navigates to relevant page

Empty state: "No notifications yet" centered in popover
```

### Notification Types — Icons and Messages

| Type | Icon + Color | Message Template |
|---|---|---|
| `deployment_success` | RocketIcon — emerald | "{projectName}" is now live at {url} |
| `build_failed` | XCircleIcon — red | Build failed for "{projectName}" after 3 attempts |
| `domain_verified` | ShieldCheckIcon — sky | Your domain {domain} is now live with SSL |
| `team_invite_accepted` | UserCheckIcon — violet | {memberName} joined your workspace |
| `team_invite_sent` | MailIcon — slate | Invite sent to {email} |

---

## 10 Role-Based Access Control

> What each role can and cannot do — enforced at API and UI level

> *"RBAC is enforced at TWO levels: the UI (hide/show elements) and the API (return 403). UI-only RBAC is not real RBAC. Every restriction must be enforced in the API route."*

### Permission Matrix

| Action | Admin | Member | Viewer |
|---|---|---|---|
| View projects and preview sites | ✅ | ✅ | ✅ |
| Send messages in chat interface | ✅ | ✅ | ❌ |
| Create new projects | ✅ | ✅ | ❌ |
| Edit project via visual overlay | ✅ | ✅ | ❌ |
| Delete projects | ✅ | ✅ | ❌ |
| Connect and manage domains | ✅ | ✅ | ❌ |
| View team members | ✅ | ✅ | ✅ |
| Invite team members | ✅ | ❌ | ❌ |
| Change member roles | ✅ | ❌ | ❌ |
| Remove team members | ✅ | ❌ | ❌ |
| View and edit workspace settings | ✅ | ❌ | ❌ |
| Change brand colour and logo | ✅ | ❌ | ❌ |
| Delete workspace | ✅ | ❌ | ❌ |
| View notifications | ✅ | ✅ | ✅ |

### How to Implement RBAC in Code

```typescript
// lib/auth/rbac.ts

export type Role = "admin" | "member" | "viewer"

const ROLE_HIERARCHY: Record<Role, number> = {
  admin: 3, member: 2, viewer: 1
}

// Server component guard
export async function requireRole(minimumRole: Role) {
  const session = await auth()
  if (!session) redirect("/login")
  const userRole = session.user.role as Role
  if (ROLE_HIERARCHY[userRole] < ROLE_HIERARCHY[minimumRole]) {
    return null // Render null — do not show the protected content
  }
  return session
}

// API route guard
export async function enforceRole(request: Request, minimumRole: Role) {
  const session = await auth()
  if (!session) return new Response("Unauthorized", { status: 401 })
  const userRole = session.user.role as Role
  if (ROLE_HIERARCHY[userRole] < ROLE_HIERARCHY[minimumRole]) {
    return new Response("Forbidden", { status: 403 })
  }
  return null // null means access granted
}

// Usage in API route:
export async function POST(request: Request) {
  const denied = await enforceRole(request, "member")
  if (denied) return denied // Returns 401 or 403
  // ... rest of route logic
}
```

---

## 11 Empty, Loading, and Error States

> Every screen must handle all three — never show a blank screen

### Loading Skeletons — Used on Every Data-Fetching Screen

```typescript
// All skeletons use: bg-slate-800 rounded animate-pulse

// ProjectCard skeleton (same dimensions as real card):
//   Title:  h-5 w-3/4 bg-slate-800 rounded
//   URL:    h-3 w-1/2 bg-slate-800 rounded mt-3
//   Bottom: h-3 w-1/4 bg-slate-800 rounded mt-4

// MessageBubble skeleton (while loading conversation history):
//   3 alternating left/right bubbles
//   Variable widths (w-3/4, w-1/2, w-2/3)

// Table row skeleton:
//   Each cell: h-4 bg-slate-800 rounded w-[80%]
//   Show 5 skeleton rows

// Form field skeleton:
//   Label: h-3 w-20 bg-slate-800 rounded
//   Input: h-10 w-full bg-slate-800 rounded-lg mt-1
```

### Empty States — Every List Screen

| Screen | Empty State Content |
|---|---|
| Projects list | Rocket icon · "Build your first project" · "Describe your business and the AI builds your website" · "Start Building" button |
| Domains list | Globe icon · "No domains connected" · "Connect your own domain to make your site truly yours" · "Connect Domain" button |
| Team settings | UserPlus icon · "Just you so far" · "Invite team members to collaborate on your projects" · "Invite Member" button |
| Notifications | Bell icon · "All caught up" · "We'll notify you when your sites deploy, domains verify, and team members join" |
| Chat (no messages) | Sparkles icon · "What would you like to build?" · 3 suggestion chips: "Website for my coaching business" / "Add a contact form" / "Change my colour scheme" |

### Error States — API Failures

```
Every API call that fails must show a friendly error — never a raw error message.

401 Unauthorized:  redirect to /login (handled by middleware)
403 Forbidden:     show "You don't have permission to do this" inline
404 Not Found:     show "This project was not found" with a Back button
500 Server Error:  show "Something went wrong. Please try again." with Retry button

Error toast pattern (shadcn Toaster):
  Position: bottom-right
  Duration: 5 seconds
  Error toast:   red background, X icon, friendly message
  Success toast: emerald background, check icon, brief message

Inline error pattern (below input fields):
  text-xs text-red-400 mt-1
  Icon: AlertCircle w-3 h-3 inline mr-1
  Never show technical error messages — map error codes to user-friendly text
```

---

## 12 Implementation Checklist

> Every component and screen to build — in priority order

### Sprint 1 — Must Ship (Auth + Onboarding + Shell)

| # | Component / Screen | File |
|---|---|---|
| 1 | Login page — Google OAuth + magic link form + all states | `app/(auth)/login/page.tsx` |
| 2 | NextAuth configuration — Google + email providers + Drizzle adapter | `auth.ts` + `lib/db/schema/auth.ts` |
| 3 | Route protection middleware — `/app/*` requires auth, `/onboarding` requires auth | `middleware.ts` |
| 4 | Onboarding wizard — all 4 steps with Framer Motion transitions | `app/onboarding/page.tsx` |
| 5 | StepIndicator component — 4-circle progress bar | `components/onboarding/StepIndicator.tsx` |
| 6 | BusinessTypeStep — 5 selection cards | `components/onboarding/BusinessTypeStep.tsx` |
| 7 | BusinessDetailsStep — name + description inputs | `components/onboarding/BusinessDetailsStep.tsx` |
| 8 | BrandingStep — colour, logo upload, font picker | `components/onboarding/BrandingStep.tsx` |
| 9 | FirstProjectStep — summary + editable prompt | `components/onboarding/FirstProjectStep.tsx` |
| 10 | Workspace creation API — POST /api/workspaces | `app/api/workspaces/route.ts` |
| 11 | App shell layout — sidebar + topbar wrapper | `app/(app)/layout.tsx` |
| 12 | Sidebar component — navigation, collapse, mobile drawer | `components/layout/Sidebar.tsx` |
| 13 | TopBar component — breadcrumb, notifications bell, user menu | `components/layout/TopBar.tsx` |
| 14 | RBAC utilities — requireRole, enforceRole | `lib/auth/rbac.ts` |

### Sprint 2 — Chat Interface + Projects List

| # | Component / Screen | File |
|---|---|---|
| 15 | Projects list page — grid + skeleton + empty state | `app/(app)/projects/page.tsx` |
| 16 | ProjectCard component — all status variants | `components/projects/ProjectCard.tsx` |
| 17 | NewProjectModal — name input + POST /api/projects | `components/projects/NewProjectModal.tsx` |
| 18 | Projects API — GET + POST /api/projects | `app/api/projects/route.ts` |
| 19 | Chat builder page — split layout shell | `app/(app)/projects/[id]/page.tsx` |
| 20 | ChatInterface component — message list + input bar | `components/chat/ChatInterface.tsx` |
| 21 | MessageBubble — user (right) + AI (left) variants | `components/chat/MessageBubble.tsx` |
| 22 | ToolStatusChip — active spinner + completed check | `components/chat/ToolStatusChip.tsx` |
| 23 | ChatInput — auto-resize textarea + send + file attach | `components/chat/ChatInput.tsx` |
| 24 | LiveUrlCard — success card with open + copy buttons | `components/chat/LiveUrlCard.tsx` |
| 25 | Claude API streaming route — SSE pipeline | `app/api/ai/chat/route.ts` |
| 26 | PreviewPane — iframe + device toggles + toolbar | `components/preview/PreviewPane.tsx` |
| 27 | EmptyState shared component — configurable icon/text/CTA | `components/shared/EmptyState.tsx` |
| 28 | LoadingSkeleton shared component — configurable shape | `components/shared/LoadingSkeleton.tsx` |

### Sprint 5–6 — Domains + Team + Settings + Notifications

| # | Component / Screen | File |
|---|---|---|
| 29 | Domains list page — table + status badges + empty state | `app/(app)/domains/page.tsx` |
| 30 | Domain detail page — flow + DNS instructions + polling UI | `app/(app)/projects/[id]/domain/page.tsx` |
| 31 | Domains API — GET + POST + DELETE | `app/api/domains/route.ts` |
| 32 | Domain verify API — DNS polling trigger | `app/api/domains/verify/route.ts` |
| 33 | Settings page — workspace details + brand + danger zone | `app/(app)/settings/page.tsx` |
| 34 | Team page — member table + invite modal + role change | `app/(app)/settings/team/page.tsx` |
| 35 | Invite API — POST /api/invites + accept route | `app/api/invites/route.ts` |
| 36 | Notifications dropdown + full page | `app/(app)/notifications/page.tsx` |
| 37 | Notifications API — GET + PATCH mark-read | `app/api/notifications/route.ts` |
| 38 | Edit Mode — visual overlay editor + edit bubble | `components/preview/EditBubble.tsx` |
| 39 | RoleBadge shared component | `components/shared/RoleBadge.tsx` |
| 40 | StatusBadge shared component — all status variants | `components/shared/StatusBadge.tsx` |

---

> *"Build it for the coach who has never opened a terminal. If they cannot figure it out in 30 seconds, the design has failed."*

---

*OneNexium · Onboarding + Platform Dashboard Specification · Version 1.0*

*This document is the complete UI specification. Every component listed in Section 12 must be built.*
