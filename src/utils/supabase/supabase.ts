import { SupabaseClient } from "@supabase/auth-helpers-nextjs"

type SupabaseObject = {
  supabaseAnonKey:string,
  supabaseUrl:string
}

export const supabaseKeyObject:SupabaseObject = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
}

export const signOutUser = async (supabaseClient:SupabaseClient) => {
  await supabaseClient.auth.signOut();
}

export const githubSignIn = async (supabaseClient: SupabaseClient) => {
  try {
    const credObject = await supabaseClient.auth.signInWithOAuth({
      provider: "github"
    })
  
    if(credObject.error) {
      throw credObject.error
    }
  } catch(err) {
    console.log(err)
  }
}