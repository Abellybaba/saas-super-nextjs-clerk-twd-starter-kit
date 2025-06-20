
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

- **AI Bio Generator**
- **Theme Designer from Image/Tags**
- **Layout Assistant (link ordering)**
- **AI Analytics Summary Reports**
- **AI Template Suggestions (based on profile type)**

---

## 4. 👥 Roles

### 🧑‍💻 User
- Sign up/login
- Manage public profile: `/@username`
- Add/edit links
- Choose from multiple templates
- Configure contact forms, social links, and widgets

### 🛡️ Admin
- View platform stats
- Manage users & content
- Manage templates & enforce moderation
- AI usage limits & billing

---

## 5. 🧱 Database Schema (Supabase)

### users
```sql
id UUID PRIMARY KEY,
clerk_id TEXT,
email TEXT,
username TEXT UNIQUE,
bio TEXT,
profile_photo_url TEXT,
theme JSONB,
template_id UUID,
created_at TIMESTAMP DEFAULT now()
```

### links
```sql
id UUID PRIMARY KEY,
user_id UUID REFERENCES users(id),
title TEXT,
url TEXT,
icon TEXT,
order_index INT,
is_active BOOLEAN DEFAULT true,
clicks INT DEFAULT 0,
created_at TIMESTAMP DEFAULT now()
```

### templates
```sql
id UUID PRIMARY KEY,
name TEXT,
preview_url TEXT,
html_structure TEXT,
category TEXT,
created_at TIMESTAMP DEFAULT now()
```

### analytics
```sql
id UUID PRIMARY KEY,
user_id UUID,
profile_slug TEXT,
link_id UUID,
source TEXT,
country TEXT,
browser TEXT,
device TEXT,
ip TEXT,
meta JSONB,
created_at TIMESTAMP DEFAULT now()
```

---

## 6. 🧩 Pages & Routes

| Path | Audience | Features |
|------|----------|----------|
| `/` | Public | Landing page |
| `/signup` / `/login` | Users | Auth via Clerk |
| `/dashboard` | Users | Manage links, theme, preview |
| `/dashboard/analytics` | Users | Clicks, visits, summary |
| `/dashboard/templates` | Users | Select + preview templates |
| `/dashboard/settings` | Users | Bio, username, social links |
| `/admin` | Admin | Overview, user mgmt, content |
| `/admin/templates` | Admin | CRUD for templates |
| `/@username` | Public | Public profile rendered in selected template |

---

## 7. 🧠 AI Prompt Samples

### Bio Generator
```
"Generate 3 creative bios (max 150 chars) for a friendly fitness coach who wants to inspire others."
```

### Theme Generator
```
"Create a color palette and font pair for a retro, bold profile site. Return as JSON."
```

### Layout Assistant
```
"Sort user links by likely importance based on titles and bios. Return ordered list of link IDs."
```

---

## 8. 🔌 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/user` | Get user profile |
| PUT | `/api/user` | Update profile |
| GET | `/api/links` | Get user links |
| POST | `/api/links` | Create new link |
| PUT | `/api/links/:id` | Update link |
| DELETE | `/api/links/:id` | Delete link |
| POST | `/api/analytics` | Log view/click |
| POST | `/api/ai/bio` | Generate bios |
| POST | `/api/ai/theme` | Generate themes |
| POST | `/api/ai/summary` | Summarize analytics |
| GET | `/api/templates` | Get template options |
| POST | `/api/templates` | Admin create template |

---

## 9. 🛠️ Development Steps

### Phase 1 – Auth + User Profiles
- Clerk login + Supabase sync
- Public profile route `/@username`

### Phase 2 – Dashboard Core
- Add/edit/reorder links
- Live phone preview
- Choose + apply templates

### Phase 3 – AI Features
- Bio & theme generation
- Analytics summarization

### Phase 4 – Admin Panel
- Manage users, templates
- Abuse flagging & control

### Phase 5 – Final Polish
- SEO metadata
- Mobile PWA compatibility
- Web share cards

---

## 10. 🔒 Security (RLS)

```sql
-- Users only access own data
CREATE POLICY "Self access" ON users
USING (auth.uid() = id);

CREATE POLICY "Link owner" ON links
USING (auth.uid() = user_id);
```

---

## 11. 🧪 Testing Checklist

- [ ] Auth & routing
- [ ] Public page rendering per template
- [ ] AI generation accuracy & retry logic
- [ ] Link tracking and analytics consistency
- [ ] Admin moderation controls

---

## 12. 📈 Future Enhancements

- Paid upgrades: Custom domains, remove branding
- Embedded payment buttons per link
- Smart scheduling of links (based on traffic time)
- Team/agency plans (multi-profile management)
