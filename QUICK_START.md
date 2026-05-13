# 🚀 QUICK START - Your Supabase is Almost Ready!

## ✅ Step 1: Credentials Configured!

Your Supabase credentials have been added to `.env`:
- **Project URL**: `https://dkmlrlqkjwhzynqdpfmf.supabase.co`
- **Anon Key**: Configured ✓

---

## 📋 Step 2: Run SQL Schema (5 minutes)

You need to create the database tables in your Supabase project:

### Instructions:

1. **Open your Supabase Dashboard**
   - Go to: https://app.supabase.com/project/dkmlrlqkjwhzynqdpfmf

2. **Navigate to SQL Editor**
   - Click on **SQL Editor** in the left sidebar
   - Or use this direct link: https://app.supabase.com/project/dkmlrlqkjwhzynqdpfmf/sql

3. **Create New Query**
   - Click "New query" button

4. **Copy the SQL Schema**
   - Open the file: `supabase-schema.sql` in this project
   - Select ALL the content (Ctrl+A or Cmd+A)
   - Copy it (Ctrl+C or Cmd+C)

5. **Paste and Run**
   - Paste the SQL into the Supabase SQL Editor
   - Click **RUN** button (or press Ctrl+Enter)
   - Wait for: ✅ "Success. No rows returned"

6. **Verify Tables Created**
   - Click on **Table Editor** in the left sidebar
   - You should see 4 new tables:
     - ✅ `applications`
     - ✅ `sms_log`
     - ✅ `programs`
     - ✅ `users`

---

## 🎯 Step 3: Start the App

Once the SQL schema is run, restart your dev server:

```bash
# Stop the current server (Ctrl+C if running)
# Then restart:
pnpm run dev
```

---

## ✅ Step 4: Verify Connection

After the app starts:

1. **Open the app** in your browser
2. **Press F12** to open Developer Console
3. **Look for this message:**
   ```
   📊 Application Store Mode: SUPABASE
   ```

If you see **SUPABASE** mode, you're connected! 🎉

If you see **LOCALSTORAGE** mode:
- Check that SQL schema was run successfully
- Restart the dev server
- Clear browser cache and reload

---

## 🧪 Step 5: Test Real-Time Sync

**Test the complete workflow:**

1. **Open TWO browser tabs** with your app
2. **Tab 1**: Go to Sector → Senior Citizen → Evaluation Queue
3. **Tab 2**: Go to MSWDO Head → Awaiting Approval
4. **Tab 1**: Create and recommend an application
5. **Tab 2**: Watch it appear INSTANTLY! 🚀

---

## 📊 Check Your Database

Visit your Supabase dashboard to see the data:
- **Table Editor**: https://app.supabase.com/project/dkmlrlqkjwhzynqdpfmf/editor
- **SQL Editor**: https://app.supabase.com/project/dkmlrlqkjwhzynqdpfmf/sql

---

## 🆘 Troubleshooting

### "Still shows LOCALSTORAGE mode"
- ✅ Verify SQL schema was executed (check Table Editor for tables)
- ✅ Restart dev server
- ✅ Clear browser cache

### "Error fetching applications"
- ✅ Check browser console (F12) for error details
- ✅ Verify tables exist in Supabase Table Editor
- ✅ Check SQL schema ran without errors

### "Can't insert data"
- ✅ Verify RLS (Row Level Security) policies in SQL schema
- ✅ Check anon key is correct in `.env`

---

## 📚 Next Steps After Setup

Once Supabase is working:

1. **Test the full workflow** from Barangay → Sector → MSWDO → Treasurer → Disbursement
2. **Check real-time sync** across multiple browser tabs
3. **View data** in Supabase Table Editor
4. **(Optional)** Add Semaphore API key for SMS notifications

---

## 🎉 You're Almost There!

**Current Status:**
- ✅ Supabase credentials configured
- ⏳ Waiting for SQL schema to be run
- ⏳ Tables need to be created

**Next Action:**
👉 **Run the SQL schema** in Supabase (see Step 2 above)

---

**Questions?** Check `SUPABASE_INTEGRATION_COMPLETE.md` for full documentation!
