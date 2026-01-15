# Admin Setup Guide

## Security Changes

The database has been secured with proper Row Level Security (RLS) policies. All content management operations now require admin privileges.

## Creating an Admin User

When you implement authentication, you'll need to grant admin access to users who should manage content.

### Option 1: Using SQL (Recommended for first admin)

After a user signs up, run this SQL query in your Supabase SQL Editor:

```sql
-- Replace 'admin@example.com' with the actual admin email
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@example.com';
```

### Option 2: Using Supabase Dashboard

1. Go to Authentication > Users in your Supabase dashboard
2. Find the user you want to make an admin
3. Click on the user to view details
4. Scroll to "User Metadata"
5. Edit the "App Metadata" section
6. Add: `{"role": "admin"}`
7. Save changes

### Option 3: Using a Supabase Edge Function

Create an edge function that allows existing admins to grant admin access to others:

```typescript
import { createClient } from 'npm:@supabase/supabase-js@2';

Deno.serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { userId } = await req.json();

  // Check if requester is admin
  const { data: { user } } = await supabaseClient.auth.getUser(
    req.headers.get('Authorization')?.replace('Bearer ', '') ?? ''
  );

  if (user?.app_metadata?.role !== 'admin') {
    return new Response('Unauthorized', { status: 403 });
  }

  // Grant admin role
  const { data, error } = await supabaseClient.auth.admin.updateUserById(
    userId,
    { app_metadata: { role: 'admin' } }
  );

  if (error) throw error;
  return new Response(JSON.stringify(data));
});
```

## Access Control Summary

### Public Access (No Authentication Required)
- View active content (tabs, sections, disciplines, values, metrics, case studies)
- Submit contact forms

### Admin Access (Requires Authentication + Admin Role)
- Create, update, and delete all content
- View and manage contact form submissions
- Access admin panel

## Verifying Admin Status

You can check if a user is an admin by querying their JWT token:

```typescript
const { data: { user } } = await supabase.auth.getUser();
const isAdmin = user?.app_metadata?.role === 'admin';
```

## Important Security Notes

1. **App Metadata vs User Metadata**
   - `app_metadata`: Can only be set server-side (secure for roles)
   - `user_metadata`: Can be modified by users (not secure for roles)

2. **Always use app_metadata for authorization**

3. **Service Role Key**: Never expose this in client-side code. Only use it in:
   - Supabase Edge Functions
   - Backend services
   - Database functions

4. **First Admin**: You must manually create the first admin user using SQL or the Supabase Dashboard

## Testing Admin Functions

After setting up an admin user:

1. Sign in with the admin account
2. Navigate to `/admin` (if implemented)
3. Verify you can create, edit, and delete content
4. Test with a non-admin account to ensure restrictions work
