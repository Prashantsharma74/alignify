import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import img1 from "../../assetss/imgs/logo.png";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const redirectUrl = `https://alignify-techno.netlify.app/auth/reset-password`;

            console.log("Attempting to send reset email to:", email);
            console.log("Using redirect URL:", redirectUrl);

            const { data, error: supabaseError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: redirectUrl
            });

            console.log("Supabase response data:", data);
            console.log("Supabase error:", supabaseError);

            if (supabaseError) {
                console.error("Supabase error details:", supabaseError);
                throw new Error(supabaseError.message || "Failed to send reset email");
            }

            setMessage("Password reset link sent! Check your email.");
        } catch (err) {
            console.error("Full error:", err);
            setError(err.message || "Error sending recovery email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4 relative">
            <div className="fixed top-5 left-10">
                <Link to="/">
                    <img src={img1} alt="Home" />
                </Link>
            </div>
            <div className="w-full max-w-md">
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white">Forgot Password</h2>
                        <p className="text-gray-400 mt-2">Enter your email to reset your password</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                        <div className="relative p-[2px] rounded-[20px]" style={{ background: "linear-gradient(to right, #7A73F0, #35A29F, #FF8C42)" }}>
                            <div className="relative bg-[#1A1133] rounded-[18px]">
                                <i className="bi bi-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7A73F0]" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Please enter your email address"
                                    className="w-full pl-10 pr-4 py-3 bg-[#1A1133] text-white placeholder-gray-400 rounded-[18px] border-none focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{ border: "1px solid #a855f7", color: "#a855f7", fontSize: "18px" }}
                            className={`w-full py-3 px-3 rounded-lg font-medium transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-500/10'}`}
                        >
                            {loading ? "Sending..." : "Send"}
                        </button>
                    </form>

                    {message && (
                        <div className="p-3 rounded bg-green-500/10 text-green-400 text-sm border border-green-500/20">
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="p-3 rounded bg-red-500/10 text-red-400 text-sm border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-purple-500"></div>
                        </div>
                    </div>
                    <div className="text-center text-sm mt-5">
                        <span className="text-gray-400">By registering you agree to our </span>{" "}
                        <a
                            href="#"
                            className="text-purple-400 hover:text-purple-300 font-medium"
                        >
                            Terms and Conditions
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;