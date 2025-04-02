import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return new Response(
        JSON.stringify({ error: 'Email service configuration error' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const { recipientEmail, projectId, projectName, senderEmail } = await req.json()

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', recipientEmail)
      .single()

    // Generate URLs - now using the correct domains
    const signUpUrl = `https://alignify.net/auth/signup?redirect=/projects/${projectId}`
    const projectUrl = `https://beta.alignify.net/projects/${projectId}`
    
    // Create project_users entry if user exists
    if (existingUser) {
      const { error: sharingError } = await supabase
        .from('project_users')
        .insert([
          {
            project_id: projectId,
            user_id: existingUser.id,
            role: 'viewer'
          }
        ])

      if (sharingError) {
        console.error('Error sharing project:', sharingError)
        return new Response(
          JSON.stringify({ error: 'Failed to share project' }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
    }

    // Different email templates for existing and new users
    const emailHtml = existingUser 
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>A Project Has Been Shared With You</h2>
          <p>You've been invited to view the project "${projectName}" on Alignify.</p>
          <p>Click the button below to view the project:</p>
          <a href="${projectUrl}" style="display: inline-block; background-color: #7C3AED; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">View Project</a>
        </div>
        `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Alignify!</h2>
          <p>You've been invited to view the project "${projectName}".</p>
          <p>Since you don't have an account yet, you'll need to sign up first:</p>
          <a href="${signUpUrl}" style="display: inline-block; background-color: #7C3AED; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">Sign Up to View Project</a>
          <p>After signing up, you'll be automatically redirected to the project.</p>
        </div>
        `

    // Send email using Resend with your verified domain
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Alignify <sharing@sharing.alignify.net>',
        to: [recipientEmail],
        subject: existingUser ? 'Project Shared With You' : 'Welcome to Alignify - View Shared Project',
        html: emailHtml
      })
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      console.error('Error sending email:', errorText)
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: errorText }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({ message: 'Project shared successfully' }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error in share-project function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})