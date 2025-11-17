# Portfolio Website Design Guidelines for Karthik Attooru

## Design Approach
**Reference-Inspired System Approach**: Drawing from Linear's clean typography and modern developer portfolio aesthetics (GitHub, Vercel careers pages), combined with systematic spacing principles. Focus on showcasing technical expertise with clarity and professionalism.

## Typography System
- **Primary Font**: Inter or Space Grotesk via Google Fonts (modern, technical aesthetic)
- **Secondary Font**: JetBrains Mono for code snippets/technical callouts
- **Hierarchy**:
  - Hero Name: text-5xl to text-7xl, font-bold
  - Section Headings: text-3xl to text-4xl, font-semibold
  - Subsection/Role Titles: text-xl to text-2xl, font-medium
  - Body Text: text-base to text-lg, font-normal, leading-relaxed
  - Technical Tags/Labels: text-sm, font-medium

## Layout & Spacing System
**Spacing Units**: Consistent use of Tailwind units: 4, 8, 12, 16, 20, 24 (e.g., p-4, gap-8, my-12)
- **Container**: max-w-6xl mx-auto px-6
- **Section Spacing**: py-20 (desktop), py-12 (mobile)
- **Component Gaps**: gap-8 for grids, gap-4 within cards
- **Vertical Rhythm**: mb-12 between major sections, mb-6 between subsections

## Core Components

### Navigation
Sticky header with subtle backdrop blur
- Logo/Name (left), Navigation links (right: About, Experience, Projects, Skills, Contact)
- Mobile: Hamburger menu
- Height: h-16, px-6

### Hero Section (80vh)
**Image**: Professional headshot or tech workspace environment (right side on desktop, 40% width)
- Left side (60%): Name, title tagline, brief value proposition, CTA buttons (LinkedIn, Download Resume, Contact)
- Buttons with blurred background when over images
- Layout: flex lg:flex-row flex-col items-center

### About/Summary Section
Single column, max-w-4xl, centered
- Brief professional summary (2-3 paragraphs)
- Key metrics in 3-column grid (Years Experience, Projects Delivered, Technologies Mastered)

### Professional Experience
Timeline-style layout with company logo/icon on left
- Company name, duration (right-aligned)
- Role title prominently displayed
- Achievement bullets with hover highlight effect
- Use list styling with custom markers

### Project Highlights Showcase
2-column grid on desktop (grid-cols-1 lg:grid-cols-2), gap-8
- Each project card: p-6, rounded-lg, border
- Project title (text-xl font-semibold)
- 2-3 line description
- Tech stack tags (flex-wrap gap-2, px-3 py-1 rounded-full text-sm)
- "View Details" link
- Featured project (first) spans full width with side-by-side layout

### Skills Section
Multi-category grid system
- Category headings (text-lg font-semibold mb-4)
- Skills as flowing tags: flex-wrap gap-2
- Each tag: px-4 py-2, rounded-md, text-sm
- 7 categories: Languages, Frameworks, Databases, Architectures, DevOps, Specialized Domains, Soft Skills

### Education
Simple card layout, centered
- Institution, degree, field, year
- Single element, not overly prominent

### Contact Section
2-column layout (form + contact info split)
- Left: Contact form (Name, Email, Message fields)
- Right: Direct contact methods (Email with icon, Phone, LinkedIn, Location)
- Social icons: Heroicons or Font Awesome
- Form spacing: gap-4 between fields

### Footer
3-column layout on desktop, stacked on mobile
- Left: Brief tagline or copyright
- Center: Quick navigation links
- Right: Social media icons
- py-8, subtle top border

## Images
- **Hero Image**: Professional headshot or developer workspace photo (right-aligned, 40% width on desktop)
- **Project Cards**: Small preview/icon images (optional, top of card if included)
- **About Section**: Optional secondary professional photo or tech setup visualization

## Component Enrichment
- Navigation includes social icons (LinkedIn, GitHub if available)
- Hero includes animated typing effect for role titles (Software Engineer | Full-Stack | Backend | Computer Vision)
- Skills section includes visual category icons
- Project cards include hover elevation effect
- Contact section includes estimated response time indicator
- Footer includes "Built with React + Node.js" tech credit

## Animations
Minimal, purposeful animations only:
- Smooth scroll navigation
- Subtle fade-in on scroll for sections
- Hover state transitions (200ms ease)
- No parallax, no heavy scroll-triggered animations

## Accessibility & Responsiveness
- Focus states on all interactive elements
- Semantic HTML throughout
- Mobile-first breakpoints: base (mobile), md (tablet), lg (desktop)
- Touch-friendly tap targets (min 44px height)