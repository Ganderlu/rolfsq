"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function UsersClient({ initialUsers }: any) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((u: any) =>
    `${u.fullName} ${u.email}`.toLowerCase().includes(search.toLowerCase()),
  );

  const totalUsers = users.length;

  const activeUsers = users.filter((u: any) => u.status === "active").length;

  const inactiveUsers = users.filter(
    (u: any) => u.status === "inactive",
  ).length;

  const pendingKyc = users.filter((u: any) => u.kyc === "pending").length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-xl font-semibold">User Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Users",
            value: totalUsers,
            color: "text-blue-500",
          },
          {
            label: "Active Users",
            value: activeUsers,
            color: "text-green-500",
          },
          {
            label: "Pending KYC",
            value: pendingKyc,
            color: "text-yellow-500",
          },
          {
            label: "Inactive Users",
            value: inactiveUsers,
            color: "text-red-500",
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search name, email, UUID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All KYC" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All KYC</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>

          <Button>Filter</Button>
        </CardContent>
      </Card>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Wallet</th>
              <th className="p-3">KYC</th>
              <th className="p-3">Status</th>
              <th className="p-3">Joined</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u: any) => (
              <tr key={u.id} className="border-t">
                <td className="p-3 font-medium">{u.fullName}</td>

                <td className="p-3">
                  {u.email}
                  {u.verified && (
                    <Badge variant="secondary" className="ml-2">
                      Verified
                    </Badge>
                  )}
                </td>

                <td className="p-3">
                  <Button size="sm" variant="outline">
                    View Wallet
                  </Button>
                </td>

                <td className="p-3">
                  <Badge className="bg-yellow-500">{u.kyc}</Badge>
                </td>

                <td className="p-3">
                  <Badge
                    className={
                      u.status === "active" ? "bg-green-500" : "bg-red-500"
                    }
                  >
                    {u.status}
                  </Badge>
                </td>

                <td className="p-3">{u.joined}</td>

                <td className="p-3 flex gap-2">
                  <Button size="sm" className="bg-yellow-500">
                    Add/Subtract
                  </Button>
                  <Button size="sm">Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
