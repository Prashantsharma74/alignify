// // src/components/auth/PrivateRoute.tsx
// import { Navigate, Outlet } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { useEffect, useState } from "react";
// import { Loader2 } from "lucide-react";

// export const PrivateRoute = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setIsAuthenticated(!!session);
//     };
//     checkAuth();
//   }, []);

//   if (isAuthenticated === null) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="animate-spin h-8 w-8" />
//       </div>
//     );
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" replace />;
// };

// src/components/auth/PrivateRoute.tsx
// import { Navigate, Outlet } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { useEffect, useState } from "react";
// import { Loader2 } from "lucide-react";

// export const PrivateRoute = () => {
//   const [authState, setAuthState] = useState<{
//     isAuthenticated: boolean | null;
//     hasCompleteProfile: boolean | null;
//   }>({ isAuthenticated: null, hasCompleteProfile: null });

//   useEffect(() => {
//     const checkAuthAndProfile = async () => {
//       // Check authentication
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       const authenticated = !!session;

//       if (!authenticated) {
//         setAuthState({ isAuthenticated: false, hasCompleteProfile: false });
//         return;
//       }

//       // Check profile completeness - CORRECTED FIELD NAMES
//       const { data: userData, error } = await supabase
//         .from("users")
//         .select("first_name, last_name, company_name, user_role")
//         .eq("id", session?.user.id)
//         .single();

//       if (error || !userData) {
//         console.error("Error fetching user data:", error);
//         setAuthState({ isAuthenticated: true, hasCompleteProfile: false });
//         return;
//       }

//       const isProfileComplete =
//         userData.first_name

//       setAuthState({
//         isAuthenticated: true,
//         hasCompleteProfile: !!isProfileComplete,
//       });
//     };

//     checkAuthAndProfile();
//   }, []);

//   if (authState.isAuthenticated === null) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="animate-spin h-8 w-8" />
//       </div>
//     );
//   }

//   if (!authState.isAuthenticated) {
//     return <Navigate to="/auth/signin" replace />;
//   }

//   if (!authState.hasCompleteProfile) {
//     return <Navigate to="/profile-setup" replace />;
//   }

//   return <Outlet />;
// };

import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export const PrivateRoute = () => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean | null;
    hasFirstName: boolean | null;
  }>({ isAuthenticated: null, hasFirstName: null });

  useEffect(() => {
    const checkAuthAndProfile = async () => {
      // Check authentication
      const { data: { session } } = await supabase.auth.getSession();
      const authenticated = !!session;

      if (!authenticated) {
        setAuthState({ isAuthenticated: false, hasFirstName: false });
        return;
      }

      // Check if first_name exists
      const { data: userData } = await supabase
        .from('users')
        .select('first_name')
        .eq('id', session.user.id)
        .single();

      const hasName = !!userData?.first_name; // Check if first_name exists and is not null/empty

      setAuthState({
        isAuthenticated: true,
        hasFirstName: hasName
      });
    };

    checkAuthAndProfile();
  }, []);

  if (authState.isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Only check first_name now
  return authState.hasFirstName ? <Outlet /> : <Navigate to="/profile-setup" replace />;
};