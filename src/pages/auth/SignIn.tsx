import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import img1 from "../../assetss/imgs/logo.png"

export default function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // const handleGoogleSignUp = async () => {
  //   setLoading(true);
  //   setError(null);
  //   console.log("Starting Google Sign-In");

  //   try {
  //     const {
  //       data: { user: currentUser },
  //     } = await supabase.auth.getUser();
  //     if (currentUser) {
  //       throw new Error("You're already signed in");
  //     }

  //     // Initiate Google OAuth for sign-in
  //     const { error: googleError } = await supabase.auth.signInWithOAuth({
  //       provider: "google",
  //       options: {
  //         redirectTo: isDevelopment
  //           ? "http://localhost:8080/auth/callback"
  //           : "https://alignify.net/auth/callback",
  //         queryParams: {
  //           access_type: "offline",
  //           prompt: "select_account",
  //         },
  //       },
  //     });

  //     if (googleError) {
  //       throw googleError;
  //     }

  //     const {
  //       data: { subscription },
  //     } = supabase.auth.onAuthStateChange(async (event, session) => {
  //       if (event === "SIGNED_IN" && session) {
  //         console.log("Google Sign-In completed, verifying user...");

  //         // Check if user exists in your database
  //         const { data: existingUser, error: userError } = await supabase
  //           .from("users")
  //           .select("*")
  //           .eq("id", session.user.id)
  //           .single();

  //         if (userError) {
  //           throw userError;
  //         }

  //         if (!existingUser) {
  //           // User not found in database - sign them out and show error
  //           await supabase.auth.signOut();
  //           throw new Error("User not registered. Please sign up first.");
  //         }

  //         // Update user session info
  //         await supabase
  //           .from("users")
  //           .update({
  //             last_login_at: new Date().toISOString(),
  //             session_start: new Date().toISOString(),
  //             session_token: session.access_token,
  //             session_expiry: new Date(session.expires_at * 1000).toISOString(),
  //           })
  //           .eq("id", session.user.id);

  //         toast.success("Sign-in successful!");
  //         navigate("/dashboard");
  //         subscription.unsubscribe();
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error during Google Sign-In:", error);
  //     toast.error(error.message);
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError(null);
    console.log("Starting Google Sign-In");

    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        throw new Error("You're already signed in");
      }

      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        },
      });

      if (googleError) throw googleError;

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === "SIGNED_IN" && session) {
            console.log("Google Sign-In completed, checking/creating user...");

            const { data: existingUser, error: userError } = await supabase
              .from("users")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (userError && !existingUser) {
              console.log("User not found, creating new account...");

              const { user } = session;
              const { email, user_metadata, identities } = user;
              const name = user_metadata?.full_name ||
                identities?.[0]?.identity_data?.name ||
                email.split('@')[0];

              // Create new user in database
              const { error: createError } = await supabase
                .from("users")
                .insert([{
                  id: user.id,
                  email: email,
                  name: name,
                  created_at: new Date().toISOString(),
                  last_login_at: new Date().toISOString(),
                  provider: 'google',
                  avatar_url: user_metadata?.avatar_url || null,
                  session_token: session.access_token,
                  session_start: new Date().toISOString(),
                  session_expiry: new Date(session.expires_at * 1000).toISOString()
                }]);

              if (createError) throw createError;

              toast.success("Account created and sign-in successful!");
            } else if (existingUser) {
              // Update existing user's session info
              await supabase
                .from("users")
                .update({
                  last_login_at: new Date().toISOString(),
                  session_start: new Date().toISOString(),
                  session_token: session.access_token,
                  session_expiry: new Date(session.expires_at * 1000).toISOString(),
                })
                .eq("id", session.user.id);

              toast.success("Sign-in successful!");
            }

            navigate("/dashboard");
            subscription.unsubscribe();
          }
        }
      );
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      toast.error(error.message);
      setError(error.message);

      // Ensure user is signed out if registration failed
      if (error.message.includes("create") || error.message.includes("insert")) {
        await supabase.auth.signOut();
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleLoginLinkedin = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const { error } = await supabase.auth.signInWithOAuth({
  //       provider: "linkedin_oidc",
  //       options: { redirectTo: `${window.location.origin}/auth/callback` },
  //     });

  //     if (error) throw error;
  //   } catch (error) {
  //     setError(error.message);
  //     toast.error("LinkedIn login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLoginLinkedin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "linkedin_oidc",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });

      if (error) throw error;

      // Listen for auth state change to store user data
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const user = session.user;

          // Store only necessary details
          const userData = {
            id: user.id,
            email: user.email,
            name: user.user_metadata.full_name,
            avatar: user.user_metadata.avatar_url,
          };

          localStorage.setItem("user", JSON.stringify(userData));

          console.log("User stored in localStorage:", userData);
        }
      });
    } catch (error) {
      console.error("LinkedIn login error:", error);
      setError(error.message);
      toast.error("LinkedIn login failed");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        await updateSessionStart(session.user.id);
        navigate("/dashboard");
        return;
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change in SignIn:", event, session);

      if (event === "SIGNED_IN" && session) {
        try {
          await updateSessionStart(session.user.id);

          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .maybeSingle();

          if (userError) {
            console.error("Error fetching user:", userError);
            setError("Error during sign in");
            toast.error("Error during sign in");
            return;
          }

          if (!userData) {
            const { error: insertError } = await supabase.from("users").insert([
              {
                id: session.user.id,
                email: session.user.email,
                session_start: new Date().toISOString(),
              },
            ]);

            if (insertError) {
              console.error("Error creating user:", insertError);
              setError("Error during sign in");
              toast.error("Error during sign in");
              return;
            }
          }

          toast.success("Sign-in successful!");
          navigate("/dashboard");
        } catch (error) {
          console.error("Error in sign in:", error);
          setError("An error occurred during sign in");
          toast.error("An error occurred during sign in");
        }
      } else if (event === "SIGNED_OUT") {
        navigate("/auth/signin");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const updateSessionStart = async (userId: string) => {
    const { error } = await supabase
      .from("users")
      .update({ session_start: new Date().toISOString() })
      .eq("id", userId);

    if (error) {
      console.error("Error updating session_start:", error);
      toast.error("Failed to update session start time.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4" style={{ position: "relative" }}>
      <div style={{ position: "fixed", top: "20px", left: "40px" }}>
        <Link to="/">
          <img src={img1} alt="Img for Home" />
        </Link>
      </div>
      <div className="w-full max-w-md">
        {/* <div className="bg-white/[0.08] backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10"> */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">SIGN IN</h2>
            <p className="text-gray-400 mt-2">Sign in with email address</p>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "rgb(147 51 234)",
                    brandAccent: "rgb(126 34 206)",
                    inputBackground: "rgba(255, 255, 255, 0.05)",
                    inputText: "white",
                    inputPlaceholder: "rgb(156 163 175)",
                    inputBorder: "rgba(255, 255, 255, 0.1)",
                  },
                },
              },
              className: {
                container: "space-y-4",
                button:
                  "w-full bg-purple-600 text-white rounded-lg py-3 font-medium hover:bg-purple-700 transition-colors",
                label: "block text-sm font-medium text-gray-300 mb-1.5",
                input:
                  "w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                divider: "my-6",
                anchor:
                  "text-sm text-gray-400 hover:text-white transition-colors",
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/dashboard`}
            view="sign_in"
            theme="dark"
            showLinks={false}
          />
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-500"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-[#1e222c] text-gray-400 text-sm">
                or continue with
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-[250px] p-[2px] rounded-lg"
              style={{ background: "linear-gradient(to right, #7A73F0, #35A29F, #FF8C42)" }}>
              <button
                onClick={handleGoogleSignUp}
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                Google
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <div className="relative w-[250px] p-[2px] rounded-lg"
              style={{ background: "linear-gradient(to right, #7A73F0, #35A29F, #FF8C42)" }}>
              <button
                onClick={handleLoginLinkedin}
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
              >
                <img
                  src="data:image/png;base64,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"
                  alt="Google"
                  className="w-5 h-5"
                />
                Linkedin
              </button>
            </div>
          </div>
          <div className="text-center text-sm">
            <Link to="/auth/forgot-password" className="text-purple-400 hover:text-purple-300 font-medium">Forget Password?</Link>{" "}
          </div>
          <div className="text-center text-sm mt-2">
            <span className="text-gray-400">Don't have an account?</span>{" "}
            <Link
              to="/auth/signup"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Sign up
            </Link>
          </div>

          {error && (
            <div className="p-3 rounded bg-red-500/10 text-red-400 text-sm border border-red-500/20">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
