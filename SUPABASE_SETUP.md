# Backend setup — Supabase + Google Drive

The site runs fine with **no setup** (it shows built-in demo content). To make it
**editable by your team**, connect a free Supabase project. ~15 minutes, one-time.

## 1. Create the Supabase project
1. Go to <https://supabase.com>, sign in, **New project**.
2. Name it (e.g. `ypha`), pick a region near you, set a database password.
3. Wait for it to finish provisioning.

## 2. Create the database
1. In the project, open **SQL Editor → New query**.
2. Paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql) and **Run**.
3. This creates the tables, security rules, and the starter content.

## 3. Get your keys
1. **Project Settings → API**.
2. Copy the **Project URL** and the **anon / public** API key.
3. In the project root, copy `.env.local.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key...
   ```
4. Restart the dev server (`npm run dev`). The site now reads from Supabase, and
   `/admin` becomes a real, login-protected editor.

## 4. Add your team (who can log in)
Every signed-in user is a team editor, so keep sign-ups closed and invite people.
1. **Authentication → Providers → Email**: turn **OFF** "Allow new users to sign up".
2. **Authentication → Users → Add user** (or **Invite**) for each teammate.
   They can now sign in at `/admin/login` with email + password.

### Optional: "Sign in with Google"
1. **Authentication → Providers → Google**: enable it, and paste a Google OAuth
   client ID + secret (create one in Google Cloud Console → Credentials).
2. In Google Cloud, add these **Authorized redirect URIs**:
   - `https://YOUR-PROJECT.supabase.co/auth/v1/callback`
3. In Supabase **Authentication → URL Configuration**, add your site URLs to
   **Redirect URLs**:
   - `http://localhost:3200/auth/callback`
   - `https://YOUR-DOMAIN/auth/callback`
> Note: with Google enabled, anyone with a Google account could sign in. If you
> only want specific people, keep to email invites, or ask us to add an
> email allow-list.

## 5. Workshops & Google Drive
Workshop **files** live in your shared Google Drive; the site stores each
workshop's title, topic, and a **link**.
1. Make a shared Drive folder for workshops (set link sharing to "anyone with
   the link can view").
2. Upload a file there, **Share → Copy link**.
3. In `/admin → Workshops → New`, paste that link and fill in the details.
   Students see a card with an **Open in Drive** button.

## 6. Deploy (Vercel)
1. Push this repo to GitHub and import it at <https://vercel.com>.
2. In the Vercel project **Settings → Environment Variables**, add the same
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Deploy. Add your production domain to Supabase **Redirect URLs** (step 4).

---
**Security note:** the anon key is safe to expose in the browser — it only ever
gets the permissions your Row Level Security policies allow (public read;
writes require a signed-in user). Never commit `.env.local`.
