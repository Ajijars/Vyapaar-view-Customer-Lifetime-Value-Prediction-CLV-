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
import { KPICard } from "@/components/KPICard";
import { formatIndianCurrency } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

export default function InventoryPage() {
  const { data: inventoryData, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/inventory");
        return data;
      } catch (e) {
        return { summary: {}, items: [] };
      }
    }
  });

  const { summary = {}, items = [] } = inventoryData || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">Inventory Analysis</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard 
          label="Total Items Types" 
          value={summary.total_items || 0} 
          borderColor="#6366F1" 
          prefix="" 
          delay={0} 
        />
        <KPICard 
          label="Low Stock Alerts" 
          value={summary.low_stock || 0} 
          borderColor="#F59E0B" 
          prefix="" 
          warning={summary.low_stock > 0 ? `${summary.low_stock} items need reorder` : undefined}
          delay={80} 
        />
        <KPICard 
          label="Total Inventory Value" 
          value={summary.total_value || 0} 
          borderColor="#10B981" 
          delay={160} 
        />
      </div>

      <div className="bg-card-gradient rounded-2xl border border-border card-shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading inventory data...</div>
        ) : (
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[120px] font-semibold">Item ID</TableHead>
                  <TableHead className="font-semibold">Product Name</TableHead>
                  <TableHead className="text-right font-semibold">Current Stock</TableHead>
                  <TableHead className="text-right font-semibold">Unit Price</TableHead>
                  <TableHead className="text-right font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                      No inventory data found.
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item: any, i: number) => {
                    const stock = parseInt(item.current_stock || item.stock || 0);
                    const price = parseFloat(item.price || item.value || 0);
                    const isLow = stock < (item.reorder_level || 20);
                    
                    return (
                      <TableRow key={item.product_id || item.item_id || i} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {item.product_id || item.item_id || `ITM${String(i+1).padStart(3, '0')}`}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                          {item.name || item.product_name || `Product #${i+1}`}
                        </TableCell>
                        <TableCell className="text-right font-mono-data">
                          {stock}
                        </TableCell>
                        <TableCell className="text-right font-mono-data font-medium">
                          {formatIndianCurrency(price)}
                        </TableCell>
                        <TableCell className="text-right">
                          {isLow || item.status === "Out of Stock" || item.status === "Low Stock" ? (
                             <Badge className="bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border-amber-500/20">
                               {stock === 0 ? 'Out of Stock' : 'Low Stock'}
                             </Badge>
                          ) : (
                             <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/20">
                               In Stock
                             </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
