// src/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// Use the same keys from your old server.js, but access them via Vite's env
const supabaseUrl = 'https://wioipjehjipybmwdzfvt.supabase.co'; // VITE_SUPABASE_URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpb2lwamVoamlweWJtd2R6ZnZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzODA5MzAsImV4cCI6MjA3NDk1NjkzMH0.hwGXmF2KMAIHU6n6fQV8XaghKZD6kU_uA4smRFvRhhg'; // VITE_SUPABASE_ANON_KEY

// Note: In a real app deployed via a tool like Netlify/Vercel, you would use:
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_FALLBACK_URL';
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_FALLBACK_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);