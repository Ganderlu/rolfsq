import UsersClient from "./UsersClient";
import { adminDb } from "../../lib/firebaseAdmin";

export default async function ManageUsersPage() {
  const snapshot = await adminDb
    .collection("users")
    .orderBy("createdAt", "desc")
    .limit(10)
    .get();

  const users = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      fullName: data.fullName,
      email: data.email,
      verified: data.verified,
      kyc: data.kycStatus,
      status: data.status,
      joined: data.createdAt?.toDate().toDateString(),
      walletBalance: data.walletBalance ?? 0,
    };
  });

  return <UsersClient initialUsers={users} />;
}

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const stats = [
//   { label: "Total Users", value: 9 },
//   { label: "Active Users", value: 8, color: "text-green-500" },
//   { label: "Verified Users", value: 8, color: "text-blue-500" },
//   { label: "KYC Approved", value: 9, color: "text-yellow-500" },
// ];

// const users = [
//   {
//     name: "Jay Alex",
//     email: "czddfghyyre@gmail.com",
//     verified: true,
//     kyc: "Pending",
//     status: "Active",
//     joined: "Jan 15, 2026",
//   },
//   {
//     name: "Anthony Okoye",
//     email: "aokoye99@gmail.com",
//     verified: true,
//     kyc: "Pending",
//     status: "Active",
//     joined: "Jan 15, 2026",
//   },
// ];

// export default function ManageUsersPage() {
//   return (
//     <div className="p-4 md:p-6 space-y-6">
//       <h1 className="text-xl font-semibold">User Management</h1>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((s) => (
//           <Card key={s.label}>
//             <CardContent className="p-4">
//               <p className="text-sm text-muted-foreground">{s.label}</p>
//               <p className={`text-2xl font-bold ${s.color ?? ""}`}>{s.value}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
//           <Input placeholder="Search name, email, UUID" />
//           <Select>
//             <SelectTrigger><SelectValue placeholder="All Status" /></SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Status</SelectItem>
//               <SelectItem value="active">Active</SelectItem>
//               <SelectItem value="inactive">Inactive</SelectItem>
//             </SelectContent>
//           </Select>
//           <Select>
//             <SelectTrigger><SelectValue placeholder="All KYC" /></SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All KYC</SelectItem>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="approved">Approved</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button className="w-full md:w-auto">Filter</Button>
//         </CardContent>
//       </Card>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg border">
//         <table className="w-full text-sm">
//           <thead className="bg-muted">
//             <tr className="text-left">
//               <th className="p-3">User</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Wallet</th>
//               <th className="p-3">KYC Status</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Joined</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u, i) => (
//               <tr key={i} className="border-t">
//                 <td className="p-3 font-medium">{u.name}</td>
//                 <td className="p-3">
//                   {u.email}
//                   <div>
//                     <Badge variant="secondary" className="mt-1">Verified</Badge>
//                   </div>
//                 </td>
//                 <td className="p-3"><Button size="sm" variant="outline">View Wallet</Button></td>
//                 <td className="p-3"><Badge className="bg-yellow-500">{u.kyc}</Badge></td>
//                 <td className="p-3"><Badge className="bg-green-500">{u.status}</Badge></td>
//                 <td className="p-3">{u.joined}</td>
//                 <td className="p-3 flex gap-2">
//                   <Button size="sm" className="bg-yellow-500">Add/Subtract</Button>
//                   <Button size="sm">Details</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
