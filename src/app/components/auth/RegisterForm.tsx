import { saveStep1 } from "../../../app/register/actions";
export default function RegisterPersonalInfoPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#050B18] via-[#07162A] to-[#050B18] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 sm:p-8">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 flex items-center justify-center text-white font-bold">P</div>
            <span className="text-white font-semibold tracking-wide">PRIME MAX <span className="text-white/70">CAPITAL</span></span>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-center text-2xl font-semibold text-white mb-1">
          Join <span className="text-cyan-400">Prime Max Capital</span>
        </h1>
        <p className="text-center text-sm text-white/60 mb-5">
          Start your professional trading journey
        </p>

        {/* Community badge */}
        <div className="flex justify-center mb-6">
          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-cyan-300">
            👥 1M+ Traders<br /><span className="text-white/50">Community</span>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between mb-6">
          <Step number={1} label="Personal Info" active sub="Basic details" />
          <Step number={2} label="Location" sub="Regional settings" />
          <Step number={3} label="Security" sub="Account protection" />
        </div>

        {/* Section header */}
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 mb-5 flex gap-3 items-center">
          <div className="h-9 w-9 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">👤</div>
          <div>
            <p className="text-sm font-medium text-white">Personal Information</p>
            <p className="text-xs text-white/60">Create your trading profile</p>
          </div>
        </div>

        {/* Form */}
        <form action={saveStep1} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input name="username" label="Trading Username" placeholder="Choose username" />
            <Input name="fullName" label="Full Name" placeholder="Enter full name" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input name="email" label="Email Address" placeholder="your.email@example.com" type="email" />
            <Input name="phone" label="Phone Number" placeholder="+1 (555) 123-4567" />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4">
            <span className="text-xs text-white/50">Step 1 of 3</span>
            <button type="submit" className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
              Continue →
            </button>
          </div>
        </form>

        {/* Sign in */}
        <p className="text-center text-xs text-white/50 mt-5">
          Already have an account? <span className="text-indigo-400">Sign in here</span>
        </p>

        {/* Security footer */}
        <div className="flex justify-center gap-4 text-[10px] text-white/40 mt-6">
          <span>🔒 SSL Secured</span>
          <span>🛡 256-bit Encryption</span>
          <span>🏛 Regulated Platform</span>
        </div>

        <p className="text-center text-[10px] text-white/30 mt-4">
          © 2026 Prime Max Capital. All rights reserved. Licensed and regulated trading platform.
        </p>
      </div>
    </div>
  );
}

function Step({ number, label, sub, active }: { number: number; label: string; sub: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${active ? "bg-blue-500 text-white" : "bg-white/10 text-white/50"}`}>
        {number}
      </div>
      <span className="text-[11px] text-white">{label}</span>
      <span className="text-[10px] text-white/40">{sub}</span>
    </div>
  );
}

// function Input({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
//   return (
//     <div className="space-y-1">
//       <label className="text-xs text-white">{label} <span className="text-red-400">*</span></label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//     </div>
//   );
// }

function Input({
  label,
  placeholder,
  name,
  type = "text",
}: {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-white">
        {label} <span className="text-red-400">*</span>
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}


// "use client";

// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   Grid,
//   Step,
//   StepLabel,
//   Stepper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase/firebaseClient";
// import { useState } from "react";

// export default function RegisterForm() {
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const data = new FormData(e.currentTarget);

//     setLoading(true);
//     try {
//       await createUserWithEmailAndPassword(
//         auth,
//         data.get("email") as string,
//         data.get("password") as string
//       );
//       // redirect later if needed
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       minHeight="100vh"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       bgcolor="linear-gradient(180deg, #0b1220, #070c16)"
//     >
//       <Container maxWidth="sm">
//         <Card
//           sx={{
//             bgcolor: "#0f172a",
//             borderRadius: 4,
//             border: "1px solid #1e293b",
//           }}
//         >
//           <CardContent sx={{ p: { xs: 3, md: 5 } }}>
//             {/* Logo */}
//             <Typography
//               textAlign="center"
//               fontWeight={700}
//               fontSize={22}
//               color="primary"
//               mb={1}
//             >
//               ROLFSQ CAPITAL
//             </Typography>

//             <Typography
//               textAlign="center"
//               fontSize={20}
//               fontWeight={600}
//               color="white"
//             >
//               Join Rolfsq Investment
//             </Typography>

//             <Typography
//               textAlign="center"
//               color="gray"
//               fontSize={14}
//               mb={3}
//             >
//               Start your professional trading journey
//             </Typography>

//             {/* Stepper */}
//             <Stepper activeStep={0} alternativeLabel sx={{ mb: 4 }}>
//               {["Personal Info", "Location", "Security"].map((label) => (
//                 <Step key={label}>
//                   <StepLabel>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>

//             {/* Form */}
//             <Box component="form" onSubmit={handleSubmit}>
//               <Typography color="white" fontWeight={600} mb={2}>
//                 Personal Information
//               </Typography>

//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     name="username"
//                     label="Trading Username"
//                     required
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth name="name" label="Full Name" required />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     name="email"
//                     label="Email Address"
//                     type="email"
//                     required
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     required
//                   />
//                 </Grid>
//               </Grid>

//               <Button
//                 type="submit"
//                 fullWidth
//                 size="large"
//                 disabled={loading}
//                 sx={{
//                   mt: 4,
//                   py: 1.4,
//                   fontWeight: 600,
//                   background:
//                     "linear-gradient(90deg, #4f46e5, #6366f1)",
//                 }}
//               >
//                 {loading ? "Creating Account..." : "Continue"}
//               </Button>

//               <Typography
//                 textAlign="center"
//                 fontSize={13}
//                 color="gray"
//                 mt={3}
//               >
//                 Already have an account?{" "}
//                 <Box component="span" color="primary.main">
//                   Sign in here
//                 </Box>
//               </Typography>
//             </Box>
//           </CardContent>
//         </Card>
//       </Container>
//     </Box>
//   );
// }
