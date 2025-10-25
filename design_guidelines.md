# Design Guidelines: Civic Engagement Platform

## Design Approach

**Hybrid Reference-Based Strategy**  
Drawing from successful civic tech platforms (GovTrack, Ballotpedia, OpenGov) combined with Material Design principles for data-rich interfaces. The platform emphasizes clarity, trust, and actionability over visual flair—users need to quickly understand complex civic information and take meaningful action.

**Core Design Principles:**
- Trust through transparency: Clear data sourcing and real-time government activity
- Action-oriented: Every insight leads to a concrete next step
- Data clarity: Complex information presented accessibly
- Progressive disclosure: Layer information depth without overwhelming

---

## Typography System

**Font Families:**
- Primary: Inter (via Google Fonts) - Clean, highly legible for data and UI
- Headings: Inter Bold/Semibold - Strong hierarchy for sections
- Data/Numbers: Inter Tabular - Consistent width for tables/stats

**Type Scale:**
- Hero/Page Titles: text-4xl to text-5xl, font-bold
- Section Headers: text-2xl to text-3xl, font-semibold  
- Card Titles: text-xl, font-semibold
- Body Text: text-base (16px), font-normal
- Data Labels: text-sm, font-medium
- Metadata/Timestamps: text-xs, text-gray-600

---

## Layout System

**Spacing Primitives:**  
Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistent spacing throughout (p-4, m-8, gap-6, etc.)

**Grid Structure:**
- Dashboard: 12-column grid with 3-4 column widgets
- Data Tables: Full-width with responsive collapse to cards on mobile
- Comparison Views: Side-by-side 2-column layout (desktop), stacked (mobile)
- Action Cards: 2-column grid (desktop), single column (mobile)

**Container Widths:**
- Main content: max-w-7xl mx-auto
- Data tables: Full width with internal padding
- Modal dialogs: max-w-2xl for forms, max-w-4xl for data views

---

## Component Library

### Navigation & Header
**Top Navigation Bar:**
- Fixed header with logo (left), primary nav links (center), user profile/notifications (right)
- Search bar prominently featured in header for querying issues, bills, officials
- Breadcrumb navigation below header for deep navigation contexts
- Mobile: Hamburger menu with slide-out drawer

**Sidebar Dashboard Navigation (Desktop):**
- Fixed left sidebar (w-64) with icon + label navigation
- Sections: Dashboard, Government Activity, My Issues, Action Plans, Data Explorer, Settings
- Active state with subtle background and border indicator
- Collapse to icon-only on tablet

### Dashboard Cards & Widgets

**Government Activity Feed:**
- Card-based timeline layout with alternating left/right alignment
- Each card shows: Icon badge (vote/bill/meeting), title, date, key details, "Learn More" link
- Filters at top: All Activity / Bills / Votes / Meetings / Budget
- Infinite scroll or "Load More" pagination

**Citizen Issues Board:**
- Masonry grid of issue cards (Pinterest-style to accommodate varying content lengths)
- Each card: User avatar, issue title, category tag, vote count, location badge, timestamp
- "Submit Issue" prominent CTA button at top
- Filter by: Trending / Recent / My Area / Category

**Match Connection Visualizer:**
- Split-pane view: Left = Citizen Issue, Right = Related Government Activity
- Visual connection line between matched items
- Strength indicator (percentage match score)
- Expandable details on click

### Data Visualization Components

**Comparison Dashboard:**
- Header with location selector (dropdown: "Your Zipcode vs. State / Surrounding Cities")
- Metric cards in 3-4 column grid showing: Crime Rate, Education, Income, Housing
- Each card: Large number (primary metric), trend arrow, comparison text ("15% lower than state average")
- Interactive map visualization showing selected area with color-coded surrounding regions
- Bar charts and line graphs using Chart.js or D3 for temporal data

**Tables:**
- Striped rows for readability
- Sortable column headers with arrow indicators
- Fixed header on scroll for long tables
- Pagination footer (showing "1-20 of 453 results")
- Responsive: Convert to stacked cards on mobile

### Action Plan Components

**Action Card Layout:**
- Primary card with official's photo, name, role, contact info
- Vote record summary with visual timeline
- Primary CTA buttons: "Call Now" (with phone number), "Send Email", "Learn More"
- Secondary info: Recent votes on related topics, committee memberships
- Upcoming meeting cards with: Date/time, location, agenda items (with highlight on relevant item #), "Add to Calendar" CTA

**Form Components:**
- Issue Submission Form: Multi-step wizard (Category → Details → Location → Review)
- Text inputs with floating labels
- Textarea with character counter for issue description
- Location autocomplete with map picker
- Category selection with icon buttons (Transport, Safety, Health, Education, Environment)
- Image upload for supporting evidence
- Submit button with loading state

### Modal & Overlay Patterns

**Detail Modals:**
- Slide-in panel from right (mobile: full screen)
- Close button (X) top right
- Scrollable content area
- Sticky footer with action buttons

**Notifications:**
- Toast notifications top-right for actions (success/error states)
- Notification bell with badge count in header
- Dropdown panel showing recent updates

---

## Content Sections & Page Layouts

### Landing Page (Public-Facing)

**Hero Section (80vh):**
- Large hero image: Capitol building or diverse community meeting (blurred background)
- Overlay with gradient for text readability
- Centered content: Bold headline ("Connect Your Voice to Local Government"), subheadline, two CTAs ("Get Started" primary, "Learn How It Works" secondary) with blurred button backgrounds
- Scroll indicator arrow

**How It Works (3-column grid):**
- Icon + Title + Description cards
- Column 1: "Track Government" (icon: document with magnifying glass)
- Column 2: "Voice Concerns" (icon: megaphone)
- Column 3: "Take Action" (icon: hand raised)

**Data Showcase:**
- Full-width background section with statistics
- 4-column metric cards: "1,200+ Bills Tracked", "5,000+ Issues Submitted", "89% Match Rate", "10,000+ Actions Taken"

**Testimonial Section:**
- 2-column layout with citizen quotes and photos
- Authentic community member photos with issue resolutions

**CTA Footer Section:**
- Bold headline: "Ready to Make Your Voice Heard?"
- Email signup + "Create Account" primary button
- Trust indicators: "Free • Non-partisan • Community-driven"

### Dashboard (Authenticated Users)

**Layout:**
- Left sidebar navigation
- Main content area: Top stats row (4 metric cards), then 2-column grid (Government Feed left, Matched Issues right)
- Right sidebar: Quick Actions panel with upcoming meetings, suggested contacts

### Government Activity Page

- Filter bar at top with tabs and search
- Infinite scroll feed with detailed cards
- Each card expandable for full bill text, vote breakdown, related documents

### My Issues Page

- Submitted issues in card grid
- Status badges (Pending, Matched, In Progress, Resolved)
- Action buttons to edit, share, or view matches

### Data Explorer Page

- Location selector and metric toggles at top
- Interactive map (primary focus, large)
- Comparison charts below map
- Export data button

---

## Images

**Hero Image:**  
Large, high-quality photograph of a diverse community town hall meeting or local government building with people. Image should be bright, welcoming, and authentic—not stock-photo generic. Apply subtle blur/overlay to ensure text readability.

**Icon Set:**  
Use Heroicons (via CDN) throughout for consistency—outline style for navigation, solid style for accent/important actions.

**Official/Citizen Photos:**  
Circular avatars (8, 10, or 12 Tailwind units) for all user-generated content and official profiles. Placeholder: Generate initials in colored background if no photo available.

**Data Visualization:**  
Use Chart.js library for charts and graphs. Leaflet.js for interactive maps.

---

## Accessibility & Interaction

- All interactive elements have focus states with visible outline
- Form inputs maintain consistent height (h-12) and padding (px-4)
- Buttons have min-height (h-10 or h-12) for tap targets
- Skip-to-content link for keyboard navigation
- ARIA labels on all icon-only buttons
- High contrast text on all backgrounds (WCAG AA minimum)

---

## Animation & Motion

**Minimal, purposeful animations only:**
- Smooth transitions on hover states (150ms ease)
- Loading spinners for async data
- Smooth scroll to anchor links
- Card hover: subtle lift (shadow increase)
- No decorative animations—platform prioritizes information clarity