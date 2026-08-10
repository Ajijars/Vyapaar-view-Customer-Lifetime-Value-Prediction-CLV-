import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatIndianCurrency } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

export default function CustomersPage() {
  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/customers");
        return data.customers || [];
      } catch (e) {
        return [];
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">Customers</h1>
      </div>
      
      <div className="bg-card-gradient rounded-2xl border border-border card-shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading customers...</div>
        ) : (
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[120px] font-semibold">Customer ID</TableHead>
                  <TableHead className="font-semibold">Name / Details</TableHead>
                  <TableHead className="text-right font-semibold">Total Orders</TableHead>
                  <TableHead className="text-right font-semibold">Total Spent</TableHead>
                  <TableHead className="text-right font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                      No customer data found.
                    </TableCell>
                  </TableRow>
                ) : (
                  customers.map((c: any, i: number) => (
                    <TableRow key={c.customer_id || i} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {c.customer_id}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {c.name || `Customer #${i+1}`}
                      </TableCell>
                      <TableCell className="text-right font-mono-data">
                        {c.total_orders || 0}
                      </TableCell>
                      <TableCell className="text-right font-mono-data font-medium">
                        {c.total_spent ? formatIndianCurrency(c.total_spent) : formatIndianCurrency(0)}
                      </TableCell>
                      <TableCell className="text-right">
                        {c.status === "Active" ? (
                           <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/20">Active</Badge>
                        ) : c.status === "At Risk" ? (
                           <Badge className="bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border-amber-500/20">At Risk</Badge>
                        ) : (
                           <Badge className="bg-slate-500/15 text-slate-600 hover:bg-slate-500/25 border-slate-500/20">{c.status || "Unknown"}</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
