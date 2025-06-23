import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function AdminApprovalPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ((session?.user as any)?.role === 'admin') {
      fetchUnapprovedUsers();
    }
  }, [session]);

  const fetchUnapprovedUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, approved')
      .eq('approved', false);
    if (!error) setUsers(data || []);
    setLoading(false);
  };

  const approveUser = async (id: string) => {
    await supabase.from('users').update({ approved: true }).eq('id', id);
    setUsers(users.filter(u => u.id !== id));
  };

  if (!session || (session.user as any)?.role !== 'admin') {
    return <div className="p-8 text-center">Access denied. Admins only.</div>;
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Approval</h1>
      {loading ? (
        <div>Loading...</div>
      ) : users.length === 0 ? (
        <div>No users pending approval.</div>
      ) : (
        <ul className="space-y-4">
          {users.map(user => (
            <li key={user.id} className="flex items-center justify-between border p-4 rounded">
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-gray-600">{user.email}</div>
              </div>
              <Button onClick={() => approveUser(user.id)}>Approve</Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 