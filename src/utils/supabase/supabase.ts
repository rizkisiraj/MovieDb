import { SupabaseClient } from "@supabase/auth-helpers-nextjs"

type SupabaseObject = {
  supabaseAnonKey:string,
  supabaseUrl:string
}

export const supabaseKeyObject:SupabaseObject = {
  supabaseUrl: "https://hpitjwwoovfqklfzkagl.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwaXRqd3dvb3ZmcWtsZnprYWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5ODAyMjQsImV4cCI6MTk5MjU1NjIyNH0.6TmFrYzlRtOmfN1ZXMvQ3q4REDG9VxFcN62cyImk0r8"
}

export const signOutUser = async (supabaseClient:SupabaseClient) => {
  await supabaseClient.auth.signOut();
}