# Supabase Setup Guide - E-Ayuda System

## Quick Setup (5 minutes)

### Step 1: Create Supabase Project (2 minutes)

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - Name: `e-ayuda-system` (or your preferred name)
   - Database Password: (create a strong password)
   - Region: Choose closest to your location
4. Click "Create new project"
5. Wait for project to finish setting up (~1-2 minutes)

### Step 2: Get Your Credentials (1 minute)

1. In your Supabase project, click "Settings" (gear icon) in the sidebar
2. Click "API" under Project Settings
3. You'll see two important values:

   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGc...very-long-string...
   ```

4. Keep this tab open - you'll need these in the next step

### Step 3: Add Credentials to .env File (30 seconds)

1. Open `/workspaces/default/code/.env` in your editor
2. Replace the placeholder values:

   ```env
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...your-actual-key...
   ```

3. Save the file

### Step 4: Create Database Tables (1 minute)

1. In your Supabase project, click "SQL Editor" in the sidebar
2. Click "New query"
3. Open `/workspaces/default/code/supabase-schema.sql` from your project
4. Copy ALL the SQL code from that file
5. Paste it into the Supabase SQL Editor
6. Click "Run" (or press Cmd/Ctrl + Enter)
7. You should see "Success. No rows returned" - that's good!

### Step 5: Verify Tables Created (30 seconds)

1. Click "Table Editor" in the Supabase sidebar
2. You should see three tables:
   - ✅ applications
   - ✅ sms_log
   - ✅ programs

### Step 6: Switch to Supabase Store (1 minute)

You need to update the import in **one file** to use the Supabase version:

**File:** `/workspaces/default/code/src/app/utils/applicationStore.ts`

Replace the entire file content with just these two lines:

```typescript
// Using Supabase version
export * from './applicationStore.supabase';
```

This way, all existing imports throughout your app will automatically use the Supabase version without needing to change imports in 30+ files.

### Step 7: Restart Dev Server

```bash
# Stop the current dev server (Ctrl+C if running)
# Then restart:
pnpm run dev
```

## Verification Test

After completing all steps, test that Supabase is connected:

1. Open your app in the browser
2. Go to Barangay Dashboard
3. Create a new application
4. Check Supabase:
   - Go to Supabase Dashboard → Table Editor → applications
   - You should see your new application appear in real-time!

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env` file has the correct `VITE_SUPABASE_ANON_KEY`
- Make sure there are no extra spaces or quotes
- Restart the dev server after changing `.env`

### Tables not created
- Make sure you ran the entire `supabase-schema.sql` file
- Check the SQL Editor output for any error messages
- Verify you're looking at the correct project in Supabase

### Data not appearing
- Open browser console (F12)
- Look for any Supabase error messages
- Verify the tables exist in Table Editor
- Check that real-time is enabled (should be automatic from schema)

### "Row Level Security" blocking inserts
The schema includes permissive RLS policies that allow all operations. If you see RLS errors:
1. Go to Supabase → Authentication → Policies
2. Verify policies exist for the `applications` table
3. The schema should have created these automatically

## What Just Happened?

✅ **Before:** Data stored in browser localStorage (lost on clear cache)  
✅ **After:** Data stored in Supabase PostgreSQL (persistent, cloud-based)

✅ **Before:** No real-time sync between users  
✅ **After:** Real-time updates across all connected users

✅ **Before:** Single-user only  
✅ **After:** Multi-user ready with proper database

## Next Steps (Optional)

1. **Migrate existing localStorage data to Supabase:**
   - Open browser console
   - Run: `localStorage.getItem('applications')`
   - Copy the data
   - Insert into Supabase using Table Editor

2. **Add sample data for testing:**
   - Uncomment the INSERT statements at the bottom of `supabase-schema.sql`
   - Run that section in SQL Editor

3. **Production deployment:**
   - See `BACKEND_MIGRATION_GUIDE.md` for Vercel deployment instructions

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Check the Supabase Dashboard → Logs for database errors
3. Verify all environment variables are set correctly
