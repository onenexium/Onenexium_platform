# OneNexium — PWA Platform Layout Concept

> Premium dark-first SaaS platform. Extreme professional aesthetic.  
> Design language: **Outfit** (body/UI) + **Bricolage Grotesque** (headings) + **DM Mono** (technical) · Deep navy palette · Blue-electric accents · Glassmorphic surfaces

---

## Design System Foundation

### Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#080C14` | App shell background |
| `--surface` | `#0E1420` | Cards, sidebar, panels |
| `--surface2` | `#141C2E` | Input fields, hover states |
| `--surface3` | `#1A2338` | Nested elements, chips |
| `--border` | `#1E2D47` | Default borders |
| `--border2` | `#253450` | Hover/focus borders |
| `--blue` | `#2563EB` | Primary CTA, active nav |
| `--blue2` | `#3B82F6` | Active icon tint |
| `--blue3` | `#60A5FA` | Active label, links |
| `--glow` | `rgba(37,99,235,0.15)` | Card glow, badge bg |
| `--text` | `#F0F4FF` | Primary text |
| `--text2` | `#8899BB` | Secondary text |
| `--text3` | `#4A5E82` | Muted labels, mono |
| `--green` | `#10B981` | Live / success state |
| `--amber` | `#F59E0B` | Building / warning state |
| `--red` | `#EF4444` | Error / notification dot |
| `--sky` | `#38BDF8` | Member role badge |
| `--violet` | `#8B5CF6` | Admin role badge |

### Typography

- **Display / Headings:** `Bricolage Grotesque` (`font-heading`) — weight 600–700, letter-spacing `-0.035em`
- **Body / UI Labels:** `Outfit` (`font-sans`) — weight 400–500, letter-spacing `-0.01em`
- **Mono / Badges / Timestamps:** `DM Mono` — uppercase where used as labels, 10–12px
- **Page titles:** 22px, weight 600, `-0.035em`
- **Card titles:** 14px, weight 600, `-0.02em`
- **Stat values:** 24px, weight 600, `-0.04em`

### Elevation & Radius

- `4px` — micro chips, inline badges
- `8px` — icon buttons, small form controls
- `9px` — nav items, primary buttons
- `12px` — stat cards, domain rows, input boxes
- `14px` — project cards
- `16px` — app shell border
- `18px` — onboarding modal card
- `50%` — avatars, pulse dots

---

## App Shell Structure

```
┌──────────────────────────────────────────────────────────────────┐
│  TOPBAR — backdrop-blur, 52px, sticky                            │
│  [Breadcrumb mono trail]          [Search] [Bell 🔴3] [Avatar]   │
├────────────────┬─────────────────────────────────────────────────┤
│                │  MAIN CONTENT AREA                              │
│   SIDEBAR      │                                                 │
│   220px        │  ┌─────────────────────────────────────────┐   │
│   ─────────    │  │  PAGE HEADER                            │   │
│   Logo + Mark  │  │  Title (22px)    [Primary CTA Btn]      │   │
│   Workspace    │  │  Subtitle muted                         │   │
│   pill (green  │  └─────────────────────────────────────────┘   │
│   dot active)  │                                                 │
│                │  ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│   ─── Menu ──  │  │ STAT     │ │ STAT     │ │ STAT     │       │
│   Projects     │  │ CARD     │ │ CARD     │ │ CARD     │       │
│   Chat Builder │  └──────────┘ └──────────┘ └──────────┘       │
│   Domains      │                                                 │
│   Notifs 🔴3   │  ┌──────────────────────────────────────────┐  │
│                │  │  GRID / TABLE / SPLIT PANEL              │  │
│   ─ Workspace  │  │  (context-dependent)                     │  │
│   Team         │  │                                          │  │
│   Settings     │  └──────────────────────────────────────────┘  │
│                │                                                 │
│   ─────────    │                                                 │
│   [AV] Name    │                                                 │
│   violet role  │                                                 │
└────────────────┴─────────────────────────────────────────────────┘
```

---

## PWA-Specific Architecture

### Manifest & Install Behavior

- `display: standalone` — full-screen, no browser chrome
- `theme_color: #080C14` — status bar blends into app background
- `background_color: #080C14` — splash screen matches shell
- `orientation: any` — responsive across mobile / tablet / desktop
- App icon: the `N`-mark logo (gradient `#1A3BDB → #3CA3F5`) on dark square, rounded corners

### Offline Strategy (Service Worker)

| Asset Type | Strategy |
|---|---|
| App Shell (HTML/CSS/JS) | Cache First |
| API Responses (projects, team) | Network First, fallback to cache |
| Static Assets (fonts, icons) | Stale While Revalidate |
| User-uploaded media | Cache on fetch |

### Push Notifications

- Triggered by: build completions, team invites, domain DNS changes
- Visual style: matches `--red` notification dot in topbar
- On-device badge count syncs with `nav-badge` in sidebar

---

## Screens & Layout Patterns

---

### 1. Projects Dashboard

**Layout:** Scrollable page with stats row + card grid

```
[ Page Header: "Projects"  |  "5 projects · 3 live"  ||  + New Project ]

┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ TOTAL    │ │ LIVE NOW │ │ BUILDS   │ │ DOMAINS  │
│   5      │ │   3      │ │  47      │ │   2      │
│ +2 month │ │ healthy  │ │ 96% ✓   │ │ 1 pend.  │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 🧘 Project   │ │ 🏢 Project   │ │ 🎨 Project   │
│ Name         │ │ Name         │ │ Name         │
│ ● Live       │ │ ⟳ Building  │ │ ● Live       │
│ mono url     │ │ mono url     │ │ mono url     │
│ ────────     │ │ ────────     │ │ ────────     │
│ 12 min ago   │ │ 2 hrs ago    │ │ yesterday    │
│ 4 pages      │ │ 6 pages      │ │ 8 pages      │
└──────────────┘ └──────────────┘ └──────────────┘
```

**Card Anatomy:**
- `--surface` background, `--border` border, `border-radius: 14px`
- `::before` pseudo-element: blue gradient overlay on hover (`opacity: 0 → 1`)
- Hover: `translateY(-3px)` + `box-shadow: 0 8px 32px rgba(0,0,0,0.4)`
- Staggered entrance animation: `cardIn` with `animation-delay` per child
- Status badge: pill with animated `pulse-dot` (green = live, amber = building)
- Footer divider: `border-top: 1px solid var(--border)` separating meta from body

---

### 2. Chat Builder (Split Panel)

**Layout:** Fixed-height split — 380px chat rail + flexible preview pane

```
┌─────────────────────────┬──────────────────────────────────┐
│  CHAT PANEL  380px      │  PREVIEW PANEL  flex             │
│                         │                                  │
│  "Chat Builder"  [Edit] │  [□ □ □] [url bar mono] [↺ ↗]  │
│  ─────────────          │  ──────────────────────────────  │
│                         │                                  │
│  [User bubble →]        │  ┌────────────────────────────┐  │
│  blue gradient          │  │  LIVE SITE PREVIEW         │  │
│  msg 14px               │  │  white bg, dark nav        │  │
│                         │  │  hero section              │  │
│  [AI bubble ←]          │  │  3-col feature cards       │  │
│  surface2, border       │  └────────────────────────────┘  │
│  tool chips (amber)     │                                  │
│                         │                                  │
│  [● Live Card]          │                                  │
│  green tinted           │                                  │
│  view / edit btns       │                                  │
│  ─────────────          │                                  │
│  [Input box]            │                                  │
│  surface2, focus:blue   │                                  │
│  [Send ▶ btn]           │                                  │
└─────────────────────────┴──────────────────────────────────┘
```

**Chat Panel Card Details:**

- User bubble: `linear-gradient(135deg, #1A3BDB, #2563EB)` · `border-radius: 14px 14px 4px 14px`
- AI bubble: `--surface2` background · `border-radius: 4px 14px 14px 14px`
- Tool chips: `chip-active` (amber) for in-progress, `chip-done` (muted) for complete
- Live result card: green-tinted surface, `rgba(16,185,129,0.07)` bg with matching border
- Input: `focus-within` border switches to `rgba(37,99,235,0.5)`

---

### 3. Onboarding Flow

**Layout:** Centered modal card on full `--bg` backdrop

```
      ┌──────────────────────────────────────────┐
      │  [●]──────[●]──────[○]──────[○]         │
      │   1         2         3         4        │
      │                                          │
      │  Onboard title  (20px, -0.03em)         │
      │  Subtitle muted  (13px, 1.5 lh)         │
      │                                          │
      │  ┌───────┐  ┌───────┐  ┌───────┐       │
      │  │  🏪   │  │  🎨   │  │  💻   │       │
      │  │ Retail│  │ Agency│  │ Freelance│    │
      │  │ desc  │  │ desc  │  │ desc  │       │
      │  └───────┘  └───────┘  └───────┘       │
      │  ┌───────┐  ┌───────┐  ┌───────┐       │
      │  │  ✨   │  │  🎯   │  │  ···  │       │
      │  └───────┘  └───────┘  └───────┘       │
      │                                          │
      │  Step 3 of 4        [← Back] [Next →]  │
      └──────────────────────────────────────────┘
```

**Card Details:**
- Step indicator: filled blue `●` = done, blue ring `○` = current, border only = upcoming
- Step connector lines transition from `--border` to `--blue` as steps complete
- Biz cards: `1.5px border`, hover `translateY(-2px)`, selected = blue border + blue tinted bg
- Dashed border variant for "Other / Custom" category
- Footer: `space-between` — step hint left (mono), actions right

---

### 4. Team Management

**Layout:** Full-width table card + pending invites section

```
[ Page Header: "Team"  |  "4 members · 1 pending"  ||  + Invite Member ]

┌───────────────────────────────────────────────────┐
│  MEMBER       ROLE           JOINED     ACTIONS   │
│  ────────────────────────────────────────────────  │
│  [AV] Sarah   violet:Admin   Mar 2024              │
│       (You)                                        │
│  [AV] James   sky:Member     Apr 2024      ···    │
│  [AV] Aisha   sky:Member     Jun 2024      ···    │
│  [AV] Tom     grey:Viewer    Aug 2024      ···    │
└───────────────────────────────────────────────────┘

PENDING INVITATIONS
┌───────────────────────────────────────────────────┐
│  new@email.com                      [Revoke]      │
│  Invited as Member · 2 days ago                   │
└───────────────────────────────────────────────────┘
```

**Table Details:**
- Container: `--surface` bg, `14px` radius, internal `4px 20px` padding
- `th` labels: `DM Mono`, uppercase, `--text3`, `0.06em` letter-spacing
- Row hover: barely-there `rgba(255,255,255,0.01)` tint
- Role pills: violet Admin / sky Member / grey Viewer — each with matching `0.1` opacity background
- Avatar: gradient-filled circle (unique gradient per member for visual distinction)
- Action `···`: hover reveals `--surface3` background

---

### 5. Domains

**Layout:** Stacked row cards, each as a single entity

```
[ Page Header: "Domains"  |  "3 domains · 2 live"  ||  + Connect Domain ]

┌────┬──────────────────────────────────┬──────────┬──────────┐
│ 🌐 │ studionova.com                   │ ● Live   │ 🔒 SSL   │
│    │ Studio Nova Agency               │          │ Active   │
└────┴──────────────────────────────────┴──────────┴──────────┘

┌────┬──────────────────────────────────┬──────────┬──────────┐
│ 🌐 │ peakperformance.io               │ ● Live   │ 🔒 SSL   │
│    │ Peak Performance                 │          │ Active   │
└────┴──────────────────────────────────┴──────────┴──────────┘

┌────┬──────────────────────────────────┬──────────┬──────────┐
│ 🌐 │ risewithsarah.com                │ ⟳ DNS   │ 🔒 SSL   │
│    │ Rise With Sarah                  │ Verify   │ Pending  │
└────┴──────────────────────────────────┴──────────┴──────────┘
```

**Row Card Details:**
- Hover: `translateX(2px)` — subtle rightward nudge for interactivity feel
- Domain icon container: `34px × 34px`, `--surface2` fill, `9px` radius
- Status: green pulse dot (live) or amber spinner chip (verifying)
- SSL badge: `DM Mono` text + shield icon — green when active, muted when pending
- Bottom margin `10px` between rows (not inside a wrapping table)

---

## Component Library

### Buttons

```
.btn-primary
  background: linear-gradient(135deg, #1A3BDB, #2563EB)
  hover: translateY(-1px) + box-shadow: 0 4px 20px rgba(37,99,235,0.35)
  border-radius: 9px · padding: 9px 18px · font-size: 13px

.btn-ghost
  background: transparent
  border: 1px solid --border2
  hover: --surface2 fill + --text color
```

### Status Badges

```
● Live       →  green-bg + --green text + animated pulse-dot
⟳ Building  →  amber-bg + --amber text + spinning border circle
◈ Active     →  blue-10 + --blue3 text
```

### Nav Item States

```
Default:  bg transparent · icon --text3 · label --text2
Hover:    bg --surface2 · icon --text2 · label --text
Active:   bg rgba(blue,0.12) · border rgba(blue,0.2) · icon --blue2 · label --blue3
```

### Input / Textarea

```
Container:  --surface2 bg · --border border · 12px radius
Focus:      border → rgba(37,99,235,0.5)
Placeholder: --text3
Font: Outfit 13px · color --text
```

### Avatar

```
Gradient fill (unique per user)  ·  initials in white 11px Bricolage Grotesque 600
Sizes: 26px (AI), 28px (topbar), 30px (sidebar / table), 34px (standalone)
```

---

## PWA Mobile Adaptation

### Bottom Navigation Bar (mobile ≤ 640px)

Replace sidebar with a fixed bottom tab bar:

```
┌──────────────────────────────────────────────────────┐
│                CONTENT AREA                          │
│                                                      │
│                                                      │
└──────────────────────────────────────────────────────┘
┌──────┬──────┬──────┬──────┬──────┐
│  ⊞   │  💬  │  🌐  │  🔔  │  ⚙️  │
│Proj  │ Chat │Domain│Notifs│ More │
└──────┴──────┴──────┴──────┴──────┘
```

- Tab bar: `--surface` bg · `border-top: 1px solid --border` · `padding-bottom: env(safe-area-inset-bottom)`
- Active tab: icon tints to `--blue2`, label to `--blue3`, no filled bg
- Badge: `--red` circle, `9px` number in `DM Mono`, absolute top-right of icon

### Mobile Card Grid

Projects: single-column stack at `< 480px`, 2-column grid at `480–768px`, 3-column at `> 768px`

### Stat Row

Horizontal scroll snap at `< 640px` — each stat card `min-width: 140px`

---

## Interaction & Motion Spec

| Element | Trigger | Animation |
|---|---|---|
| Page entry | Route change | `opacity 0→1` + `translateY(10px→0)` · 350ms `cubic-bezier(0.16,1,0.3,1)` |
| Stat cards | Mount | Staggered `statIn` · delays 50ms, 100ms, 150ms, 200ms |
| Project cards | Mount | Staggered `cardIn` · delays from 80ms–280ms |
| Card hover | Pointer enter | `translateY(-3px)` + shadow · 220ms ease |
| Biz cards | Pointer enter | `translateY(-2px)` · 180ms |
| Domain rows | Pointer enter | `translateX(2px)` · 180ms |
| Nav items | Pointer enter | bg + icon + label color · 180ms |
| Buttons (primary) | Pointer enter | `translateY(-1px)` + blue glow shadow · 180ms |
| Send button | Pointer enter | `scale(1.08)` + blue glow · 180ms |
| Pulse dot | Continuous | `opacity 1→0.4` + `scale 1→0.7` · 1400ms ease-in-out infinite |
| Spinner chip | Continuous | `rotate 360deg` · 800ms linear infinite |
| Onboarding card | Mount | `pageIn` — same as page entry |
| Preview panel | Site load | `scale(0.96→1)` + `opacity 0→1` · 500ms ease |

---

## PWA Install Prompt Card

Custom in-app install prompt, replacing native browser UI:

```
┌──────────────────────────────────────────────────────────┐
│  [N icon]                                                │
│  Install OneNexium                                       │
│  Get the full experience — offline access, push          │
│  notifications, and instant load.                        │
│                                                          │
│                          [Not now]  [Install App →]     │
└──────────────────────────────────────────────────────────┘
```

- Card: `--surface` bg · `--border` border · `18px` radius · max-width `400px` centered
- Positioned: bottom-right corner on desktop · bottom sheet on mobile
- Dismiss: fades out with `opacity 0` + `translateY(12px)` · stores flag in localStorage

---

## File & Folder Structure (PWA)

```
onenexium/
├── index.html              # App shell entry
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon-maskable-512.png
├── src/
│   ├── css/
│   │   ├── tokens.css      # CSS custom properties (design tokens)
│   │   ├── shell.css       # Sidebar, topbar, layout
│   │   ├── components.css  # Cards, badges, buttons, inputs
│   │   └── animations.css  # Keyframes, transitions
│   ├── js/
│   │   ├── router.js       # Screen switching + breadcrumb logic
│   │   ├── pwa.js          # Install prompt + SW registration
│   │   └── notifications.js
│   └── screens/
│       ├── projects.html
│       ├── chat.html
│       ├── onboarding.html
│       ├── team.html
│       └── domains.html
```

---

## Accessibility Notes

- All interactive elements: minimum `44×44px` touch target on mobile
- Focus rings: `2px solid --blue3` with `2px offset` — never removed, only styled
- Semantic landmarks: `<nav>`, `<main>`, `<aside>` map to sidebar / main / preview respectively
- ARIA roles: `role="status"` on pulse dots, `aria-label` on icon-only buttons
- Color contrast: all text on surface passes WCAG AA (`--text` on `--surface` = ~12:1)
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables all keyframe animations, keeps color transitions

---

*OneNexium Platform · Layout Concept v1 · Light + dark themes · Outfit + Bricolage Grotesque + DM Mono*
