// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SignIn from "./pages/auth/SignIn";
// import SignUp from "./pages/auth/SignUp";
// import RoleSelection from "./pages/auth/RoleSelection";
// import Index from "./pages/Index";
// import AuthGuard from "./components/auth/AuthGuard";
// import { Toaster } from "@/components/ui/sonner";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<SignUp />} />
//         <Route path="/auth/signin" element={<SignIn />} />
//         <Route path="/auth/signup" element={<SignUp />} />
//         <Route path="/auth/role-selection" element={<RoleSelection />} />
//         <Route
//           path="/dashboard"
//           element={
//             <AuthGuard>
//               <Index />
//             </AuthGuard>
//           }
//         />
//         <Route
//           path="/projects/:projectId"
//           element={
//             <AuthGuard>
//               <Index />
//             </AuthGuard>
//           }
//         />
//       </Routes>
//       <Toaster />
//     </Router>
//   );
// }

// export default App;

// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import RoleSelection from "./pages/auth/RoleSelection";
import Index from "./pages/Index";
import { PrivateRoute } from "../src/components/auth/PrivateRoute";
import { PublicRoute } from "../src/components/auth/PublicRoute";
import { Toaster } from "@/components/ui/sonner";
import { Verify } from "./pages/auth/Verify";
import { SetupProfile } from "./pages/auth/SetupProfile";
import { Transform } from "./components/dashboard/components/signup/Transform";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Transform />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signup/verify-otp" element={<Verify />} />
          <Route path="/profile-setup" element={<SetupProfile />} />
          <Route path="/auth/role-selection" element={<RoleSelection />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword/>} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Index />} />
          <Route path="/projects/:projectId" element={<Index />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
