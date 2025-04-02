import React, { useState } from "react";

export const Verify = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Verifying OTP:", otp);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex items-center justify-center">
      <div className="max-w-md w-full px-3 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Enter OTP</h1>
          <p className="text-gray-400">
            We've sent a verification code to your email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex justify-center">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit code"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            // className="w-full max-w-xs mx-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 block"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200"
          >
            {loading ? "Verifying..." : "Confirm"}
          </button>
        </form>
        <div className="relative py-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-grey-300"></div>
          </div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500">
            By registering you with our Terms and Conditions
          </span>
        </div>
      </div>
    </div>
  );
};
