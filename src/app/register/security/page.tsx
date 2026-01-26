import RegisterSecurityStep from "../../components/auth/RegisterSecurityStep";

export default function SecurityPage() {
  return <RegisterSecurityStep />;
}

// src/app/register/security/page.tsx
// import {
//   ShieldCheck,
//     // Lock,
//     // KeyRound,
//     // CheckCircle2,
//     MapPin,
//     User,
// } from "lucide-react";
// import { createTradingAccount } from "./actions";

// /* ✅ Step component MUST exist */
// function Step({ label, active }: { label: string; active?: boolean }) {
//   return (
//     <div className="flex flex-col items-center gap-1">
//       <div
//         className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold
//         ${active ? "bg-emerald-500 text-black" : "bg-white/10 text-white/60"}`}
//       >
//         ✓
//       </div>
//       <span className="text-[10px] text-white/60">{label}</span>
//     </div>
//   );
// }

// export default function SecurityPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#050B18] px-4">
//       <form
//         action={createTradingAccount}
//         className="w-full max-w-[420px] rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4"
//       >
//         {/* Header */}
//         <div className="text-center mb-6">
//           <div className="flex justify-center mb-3">
//             <div className="h-12 w-12 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 flex items-center justify-center">
//               <span className="text-white font-bold text-lg">P</span>
//             </div>
//           </div>
//           <h1 className="text-xl font-semibold text-white">
//             Join Prime Max Capital
//           </h1>
//           <p className="text-sm text-white/60">
//             Start your professional trading journey
//           </p>
//         </div>

//         {/* <h1 className="text-white text-xl font-semibold text-center">
//           Account Security
//         </h1> */}

//          {/* Steps */}
//         <div className="flex items-center justify-between mb-6">
//           <Lead icon={<User size={16} />} label="Personal Info" active />
//           <Lead icon={<MapPin size={16} />} label="Location" active />
//           <Lead icon={<ShieldCheck size={16} />} label="Security" active />
//         </div>

//         {/* Section */}
//         <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 mb-5 flex items-center gap-2">
//           <ShieldCheck className="text-emerald-400" size={18} />
//           <div>
//             <p className="text-sm font-medium text-white">Account Security</p>
//             <p className="text-xs text-white/60">Secure your trading account</p>
//           </div>
//         </div>

//         {/* Password */}
//         <input
//           type="password"
//           name="password"
//           placeholder="Create strong password"
//           className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
//           required
//         />

//         {/* Confirm Password */}
//         <input
//           type="password"
        
//           name="confirmPassword"
//           placeholder="Confirm your password"
//           className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
//           required
//         />

       
//         {/* Verification */}
//         <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-4">
//           <p className="text-xs text-white/60 mb-2">Security Verification</p>
//           <div className="flex items-center justify-center mb-3">
//             <div className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-yellow-300 font-mono tracking-widest text-lg">
//               4258AB
//             </div>
//           </div>
//           <input
//             type="text"
//             name="captcha"
//             placeholder="ENTER THE CODE ABOVE"
//             className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <p className="text-[11px] text-white/40 mt-2">
//             This helps us verify that you're a real person and protects against
//             automated registrations.
//           </p>
//         </div>

//         {/* Requirements */}
//         <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-4">
//           <p className="text-xs font-medium text-white mb-2">
//             Password Requirements
//           </p>
//           <ul className="space-y-1 text-xs text-white/70">
//             <li className="flex gap-2 ">
//               <span className="text-emerald-400">✔</span> At least 8 characters
//               long
//             </li>
//             <li className="flex gap-2">
//               <span className="text-emerald-400">✔</span> Contains uppercase and
//               lowercase letters
//             </li>
//             <li className="flex gap-2">
//               <span className="text-emerald-400">✔</span> Includes a number or
//               special character
//             </li>
//           </ul>
//         </div>

//         {/* <input
//           type="text"
//           name="captcha"
//           placeholder="Enter the code above"
//           className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
//           required
//         /> */}

//         {/* Terms */}
//         <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 mb-6">
//           <label className="flex items-start gap-2 text-xs text-white/80">
//             <input type="checkbox" name="terms" className="mt-1" />
//             <span>
//               I agree to Prime Max Capital’s{" "}
//               <span className="text-indigo-400">Terms and Conditions</span> and
//               acknowledge that I have read and understood the{" "}
//               <span className="text-indigo-400">Privacy Policy</span>.
//             </span>
//           </label>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center justify-between">
//           <button className="text-xs text-white/60 hover:text-white">
//             ← Previous Step
//           </button>
//           <button className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold px-4 py-2">
//             Create Trading Account
//           </button>
//         </div>

//         <p className="text-center text-xs text-white/50 mt-4">
//           Already have an account?{" "}
//           <span className="text-indigo-400">Sign in here</span>
//         </p>
//       </form>
//     </div>
//   );
// }

// function Lead({ icon, label, active }) {
//   return (
//     <div className="flex flex-col items-center text-center gap-1">
//       <div
//         className={`h-8 w-8 rounded-full flex items-center justify-center ${
//           active ? "bg-emerald-500 text-black" : "bg-white/10 text-white/60"
//         }`}
//       >
//         {icon}
//       </div>
//       <span className="text-[10px] text-white/60">{label}</span>
//     </div>
//   );
// }

// // function Input({ icon, placeholder }) {
// //   return (
// //     <div className="relative">
// //       {icon && (
// //         <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
// //           {icon}
// //         </div>
// //       )}
// //       <input
// //         type="password"
// //         placeholder={placeholder}
// //         className={`w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
// //           icon ? "pl-9" : ""
// //         }`}
// //       />
// //     </div>
// //   );
// // }
