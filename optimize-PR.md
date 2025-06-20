```shell
cat > optimized_PRD.md << 'EOL'
# 📄 Product Requirements Document (PRD)

## **Project Name:** SmartLink — AI-Powered Link-in-Bio Builder

---

## 1. 🎯 Overview

SmartLink is an AI-enhanced Linktree-style platform. Each user can create a public profile at `vlink.com/username`, with AI-generated bios, themes, and dynamic templates to render unique landing pages. Profiles can include links, social widgets, contact forms, and more.

The system supports both **User Dashboard** (for managing their content and appearance) and a **separate Admin Dashboard** (for platform-wide oversight, analytics, abuse reporting, and template management).

---

## 2. ⚙️ Tech Stack

- **Frontend**: Next.js (App Router, TypeScript, Tailwind CSS)
- **Auth**: Clerk (OAuth: Google, Twitter, Email)
- **Backend/DB**: Supabase (Postgres, RLS, edge functions)
- **AI**: OpenAI API, Replicate
- **Deployment**: Vercel + Supabase

---

## 3. 🧠 AI Features

- **AI Bio Generator**: Uses GPT-4 to generate 3 creative bios (max 150 chars) based on user input about their personality, interests, and goals. Input: personality traits, interests, goals.
```

Command Output

````shell
3 bio options.
- **Theme Designer from Image/Tags**: Leverages DALL-E 3 to generate a color palette and font pair based on user-provided images or tags describing the desired aesthetic (e.g. "retro", "bold", "minimalist"). Input: image URL or style tags. Output: JSON with color palette and font pair.
- **Layout Assistant (link ordering)**: Employs a custom ML model trained on user engagement data to automatically sort and prioritize link order on the profile page based on link titles and bio content. Input: link titles, bio text. Output: ordered list of link IDs.
- **AI Analytics Summary Reports**: Utilizes Replicate's summarization models to generate concise, actionable insights from the user's profile analytics, including top traffic sources, popular links, and conversion metrics. Input: raw analytics data. Output: structured summary with key insights.
- **AI Template Suggestions (based on profile type)**: Analyzes the user's bio, links, and other profile data to recommend the most suitable pre-built templates for their needs (e.g. creator, business, personal). Input: user profile data. Output: ranked list of template IDs with confidence scores.

---

## 4. 👥 Roles

### 🧑‍💻 User
- Sign up/login
- Manage public profile: `/@username`
- Add/edit links
- Choose from multiple templates
- Configure contact forms, social links, and widgets
- Access analytics dashboard
- Generate AI-powered content and themes

### 🛡️ Admin
- View platform stats and usage metrics
- Manage users & content moderation
- Create and manage templates
- Set AI usage limits & billing
- Monitor system health and performance
- Handle abuse reports and content flags

---

## 5. 🧱 Database Schema (Supabase)

### users
```sql
id UUID PRIMARY KEY,
clerk_id TEXT UNIQUE NOT NULL,
email TEXT UNIQUE NOT NULL,
username TEXT UNIQUE NOT NULL,
bio TEXT,
profile_photo_url TEXT,
theme JSONB,
template_id UUID REFERENCES templates(id),
subscription_tier TEXT DEFAULT 'free',
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()
````

### links

```sql
id UUID PRIMARY KEY,
user_id UUID REFERENCES users(id) NOT NULL,
title TEXT NOT NULL,
url TEXT NOT NULL,
icon TEXT,
order_index INT NOT NULL,
is_active BOOLEAN DEFAULT true,
clicks INT DEFAULT 0,
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()
```

### templates

```sql
id UUID PRIMARY KEY,
name TEXT UNIQUE NOT NULL,
preview_url TEXT NOT NULL,
html_structure TEXT NOT NULL,
css_styles TEXT NOT NULL,
category TEXT NOT NULL,
is_premium BOOLEAN DEFAULT false,
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()
```

### analytics

```sql
id UUID PRIMARY KEY,
user_id UUID REFERENCES users(id) NOT NULL,
profile_slug TEXT NOT NULL,
link_id UUID REFERENCES links(id),
source TEXT,
referrer TEXT,
country TEXT,
city TEXT,
browser TEXT,
device TEXT,
os TEXT,
ip TEXT,
meta JSONB,
created_at TIMESTAMP DEFAULT now()
```

### subscriptions

```sql
id UUID PRIMARY KEY,
user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
tier TEXT NOT NULL,
price_id TEXT,
status TEXT NOT NULL,
current_period_start TIMESTAMP,
current_period_end TIMESTAMP,
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()
```

---

## 6. 🧩 Pages & Routes

| Path | Audience | Features | |------|----------|----------| | `/` | Public | Landing page with features, pricing, testimonials | | `/signup` / `/login` | Users | Auth via Clerk with social providers | | `/dashboard` | Users | Manage links, theme, preview profile | | `/dashboard/analytics` | Users | View clicks, visits, traffic sources with AI summary | | `/dashboard/templates` | Users | Browse, select, and preview templates | | `/dashboard/settings` | Users | Edit bio, username, social links, subscription | | `/admin` | Admin | Overview dashboard with key metrics | | `/admin/users` | Admin | User management and moderation | | `/admin/templates` | Admin | CRUD operations for templates | | `/admin/analytics` | Admin | Platform-wide analytics | | `/@username` | Public | Public profile rendered in selected template |

---

## 7. 🧠 AI Prompt Samples

### Bio Generator

```javascript
"Generate 3 creative bios (max 150 chars) for a friendly fitness coach who wants to inspire others. The coach specializes in {specialization} and has {years} years of experience. Their personality is {personality_traits}.";
```

### Theme Generator

```javascript
"Create a color palette and font pair for a {style} profile site. The user's brand colors are {colors} and their aesthetic preferences include {preferences}. Return as JSON with the following structure: { 'palette': { 'primary': '#hex', 'secondary': '#hex', 'accent': '#hex', 'background': '#hex', 'text': '#hex' }, 'fonts': { 'heading': 'font-name', 'body': 'font-name' } }";
```

### Layout Assistant

```javascript
"Sort the following user links by likely importance based on the user's bio and link titles. The user's bio is: '{bio}'. The links are: {links_json}. Return an ordered array of link IDs representing the optimal order for maximum engagement.";
```

---

## 8. 🔌 API Endpoints

| Method | Path | Description | Request Payload | Response Payload | |--------|------|-------------|-----------------|------------------| | GET | `/api/user` | Get user profile | N/A | `{ id, email, username, bio, profile_photo_url, theme, template_id }` | | PUT | `/api/user` | Update user profile | `{ bio, profile_photo_url, theme, template_id }` | `{ id, email, username, bio, profile_photo_url, theme, template_id }` | | GET | `/api/links` | Get user links | N/A | `[{ id, title, url, icon, order_index, is_active, clicks }]` | | POST | `/api/links` | Create new link | `{ title, url, icon, order_index }` | `{ id, title, url, icon, order_index, is_active, clicks }` | | PUT | `/api/links/:id` | Update link | `{ title, url, icon, order_index, is_active }` | `{ id, title, url, icon, order_index, is_active, clicks }` | | DELETE | `/api/links/:id` | Delete link | N/A | `{ success: true }` | | POST | `/api/analytics` | Log view/click | `{ profile_slug, link_id, source, country, browser, device, ip, meta }` | `{ success: true }` | | GET | `/api/analytics` | Get user analytics | `{ start_date, end_date }` | `{ views, clicks, top_sources, top_links }` | | POST | `/api/ai/bio` | Generate bios | `{ personality_traits, interests, goals }` | `{ bios: [ bio1, bio2, bio3 ] }` | | POST | `/api/ai/theme` | Generate themes | `{ image_url, style_tags }` | `{ palette, font_pair }` | | POST | `/api/ai/summary` | Summarize analytics | `{ user_id, start_date, end_date }` | `{ summary, top_sources, top_links, conversion_rate }` | | GET | `/api/templates` | Get template options | `{ category }` | `[{ id, name, preview_url, category, is_premium }]` | | POST | `/api/templates` | Admin create template | `{ name, preview_url, html_structure, css_styles, category, is_premium }` | `{ id, name, preview_url, html_structure, css_styles, category, is_premium }` | | PUT | `/api/templates/:id` | Admin update template | `{ name, preview_url, html_structure, css_styles, category, is_premium }` | `{ id, name, preview_url, html_structure, css_styles, category, is_premium }` | | DELETE | `/api/templates/:id` | Admin delete template | N/A | `{ success: true }` |

---

## 9. 🛠️ Development Phases

### Phase 1 - Auth & User Profiles (2 weeks)

- Set up Next.js project with TypeScript and Tailwind CSS
- Implement Clerk authentication with social providers
- Create Supabase database with initial schema
- Develop user registration flow with username selection
- Build basic public profile route `/@username`
- Implement RLS policies for data security

**Deliverables:**

- Working authentication system
- Basic public profile page
- Database with user tables

### Phase 2 - Dashboard Core (3 weeks)

- Develop user dashboard UI with sidebar navigation
- Implement link management (CRUD operations)
- Create link reordering functionality with drag-and-drop
- Build live mobile preview of the profile page
- Develop template selection and application system
- Implement basic analytics tracking

**Deliverables:**

- Functional user dashboard
- Link management system
- Template selection interface
- Basic analytics collection

### Phase 3 - AI Features (2 weeks)

- Integrate OpenAI API for bio generation
- Implement DALL-E integration for theme generation
- Develop layout assistant for link ordering
- Create analytics summarization with Replicate
- Build template suggestion system

**Deliverables:**

- Working AI bio generator
- Theme generation from images/tags
- Intelligent link ordering
- AI-powered analytics insights

### Phase 4 - Admin Panel (2 weeks)

- Develop admin dashboard with user management
- Implement template CRUD operations
- Create content moderation tools
- Build platform-wide analytics dashboard
- Implement user subscription management

**Deliverables:**

- Admin dashboard
- Template management system
- Content moderation tools
- Platform analytics

### Phase 5 - Final Polish (1 week)

- Add SEO metadata for profile pages
- Ensure mobile PWA compatibility
- Implement web share card functionality
- Optimize performance and loading times
- Conduct comprehensive testing

**Deliverables:**

- SEO-optimized profiles
- Mobile-friendly PWA
- Social sharing cards
- Performance optimizations

---

## 10. 🔒 Security (RLS)

```sql
-- Users can only access their own data
CREATE POLICY "Self access" ON users
USING (auth.uid() = id);

-- Users can only access links they own
CREATE POLICY "Link owner" ON links
USING (auth.uid() = user_id);

-- Users can only access their own analytics
CREATE POLICY "Analytics owner" ON analytics
USING (auth.uid() = user_id);

-- Public profiles are readable by anyone
CREATE POLICY "Public profiles" ON users
FOR SELECT
USING (true);

-- Admins can access all data
CREATE POLICY "Admin access" ON users
USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admin access" ON links
USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admin access" ON analytics
USING (auth.uid() IN (SELECT id FROM admin_users));
```

---

## 11. 🧪 Testing Checklist

- [ ] Verify Clerk authentication flow (sign-up, sign-in, password reset)
- [ ] Test public profile rendering with different templates
- [ ] Validate link management (add, edit, delete, reorder)
- [ ] Ensure AI bio, theme, and analytics generation work as expected
- [ ] Test template selection and application
- [ ] Validate link tracking and analytics data consistency
- [ ] Verify admin user management and moderation controls
- [ ] Test subscription management and premium features
- [ ] Check mobile PWA compatibility and web share functionality
- [ ] Review SEO metadata on public profile pages
- [ ] Validate performance on various devices and browsers

---

## 12. 📈 Future Enhancements

- Paid upgrades:

  - Custom domains
  - Remove platform branding
  - Advanced analytics
  - Priority support

- Embedded payment buttons per link

- Smart scheduling of links based on traffic patterns

- Team/agency plans for multi-profile management

- Integration with popular social platforms (e.g., Instagram, TikTok)

- Advanced analytics and reporting

- Automated content suggestions based on user behavior

- Email newsletter subscription widget

- Product showcase with e-commerce capabilities

---

## 13. 🚀 Deployment & Infrastructure

### Hosting

- Frontend: Vercel (Production, Preview, Development environments)
- Backend: Supabase (Database, Edge Functions, Storage)

### Scaling Strategy

- Vercel Serverless Functions for API endpoints
- Supabase connection pooling for database scaling
- CDN caching for public profiles
- Rate limiting for AI feature usage

### Monitoring

- Vercel Analytics for frontend performance
- Supabase monitoring for database performance
- Custom logging for error tracking
- Uptime monitoring with alerts

### CI/CD Pipeline

- GitHub Actions for automated testing
- Vercel Preview Deployments for PR reviews
- Automated database migrations
- Staging environment for pre-production testing

### Backup & Recovery

- Daily automated Supabase backups
- Point-in-time recovery capability
- Disaster recovery plan with documented procedures

---

## 14. 📊 Analytics & Metrics

### Key Performance Indicators (KPIs)

- User acquisition and retention rates
- Profile visit-to-click conversion rate
- AI feature usage and effectiveness
- Template popularity and engagement
- Revenue per user (for premium features)

### Tracking Implementation

- Client-side tracking for user interactions
- Server-side tracking for API usage and performance
- Custom events for AI feature effectiveness
- Funnel analysis for conversion optimization

### Reporting

- User-facing analytics dashboard
- Admin-facing platform metrics
- Weekly automated summary emails
- Monthly business performance reports EOL

```

```
