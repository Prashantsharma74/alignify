// import { useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// export const SetupProfile = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     company_name: "",
//     user_role: "user", // Default role
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Get current user
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError || !user) throw new Error("User not found");

//       // Update profile in users table
//       const { error: updateError } = await supabase
//         .from("users")
//         .update({
//           first_name: formData.first_name,
//           last_name: formData.last_name,
//           company_name: formData.company_name,
//           user_role: formData.user_role,
//           updated_at: new Date().toISOString(),
//         })
//         .eq("id", user.id);

//       if (updateError) throw updateError;

//       toast.success("Profile updated successfully!");
//       navigate("/dashboard"); // Redirect after successful update
//     } catch (error) {
//       console.error("Profile update error:", error);
//       toast.error(error.message || "Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0B0F1A] text-white flex items-center justify-center">
//       <div className="max-w-md w-full px-6 py-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold mb-2">Setup Profile</h1>
//           <p className="text-gray-400">Complete your profile to continue</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <input
//               type="text"
//               name="first_name"
//               value={formData.first_name}
//               onChange={handleChange}
//               placeholder="First Name"
//               className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="last_name"
//               value={formData.last_name}
//               onChange={handleChange}
//               placeholder="Last Name"
//               className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="text"
//               name="company_name"
//               value={formData.company_name}
//               onChange={handleChange}
//               placeholder="Company Name"
//               className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>

//           <div>
//             <select
//               name="user_role"
//               value={formData.user_role}
//               onChange={handleChange}
//               className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             >
//               <option value="user">User</option>
//               <option value="finance">Finance</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 disabled:opacity-50"
//           >
//             {loading ? "Saving..." : "Complete Profile"}
//           </button>
//         </form>

//         <div className="relative py-5">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-700"></div>
//           </div>
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="px-2 text-gray-500">
//             By registering you agree to our Terms and Conditions
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const SetupProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    user_role: "", 
    other_role: "",
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        navigate("/auth/signin");
        return;
      }

      setUser(user);

      const { data: profile } = await supabase
        .from("users")
        .select("first_name, last_name, company_name, user_role")
        .eq("id", user.id)
        .single();

      if (profile) {
        setFormData((prev) => ({
          ...prev,
          first_name: profile.first_name || "",
          last_name: profile.last_name || "",
          company_name: profile.company_name || "",
          user_role: profile.user_role || "",
        }));
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate role selection
    if (!formData.user_role) {
      toast.error("Please select your role");
      return;
    }

    // If 'Other' is selected but no description provided
    if (formData.user_role === "Other" && !formData.other_role.trim()) {
      toast.error("Please specify your role");
      return;
    }

    setLoading(true);

    try {
      const finalRole =
        formData.user_role === "Other"
          ? formData.other_role
          : formData.user_role;

      const { error } = await supabase
        .from("users")
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          company_name: formData.company_name,
          role: finalRole,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profile setup complete!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
            <p className="text-gray-400">Help us personalize your experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                What best describes your role?
              </label>
              <select
                name="user_role"
                value={formData.user_role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select your role</option>
                <option value="Analyst">Analyst</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Business">Business</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {formData.user_role === "Other" && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Please specify your role
                </label>
                <input
                  type="text"
                  name="other_role"
                  value={formData.other_role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required={formData.user_role === "Other"}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
        </div>
        <div className="relative flex justify-center text-sm py-4">
          <span className="px-2 text-gray-500">
            By registering you agree to our Terms and Conditions
          </span>
        </div>
      </div>
    </div>
  );
};
