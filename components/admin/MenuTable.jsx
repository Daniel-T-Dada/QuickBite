"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Pencil, Loader2 } from "lucide-react";
import { formatNaira, cn } from "@/lib/utils";

export function MenuTable({ items, isLoading, onDelete, onEdit }) {
  const getCategoryBadgeColor = (category) => {
    switch (category?.toLowerCase()) {
      case "breakfast": return "bg-chart-1 text-white hover:bg-chart-1/90";
      case "lunch": return "bg-chart-2 text-white hover:bg-chart-2/90";
      case "beverages": return "bg-chart-3 text-black hover:bg-chart-3/90";
      case "desserts": return "bg-chart-4 text-white hover:bg-chart-4/90";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                <TableCell>
                  <img src={item.img} alt={item.title} className="h-12 w-12 rounded-lg object-cover bg-muted" />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground hidden md:block truncate max-w-[200px]">{item.desc}</div>
                </TableCell>
                <TableCell>
                  <Badge className={cn("border-0", getCategoryBadgeColor(item.category))}>{item.category}</Badge>
                </TableCell>
                <TableCell className="text-right font-bold">{formatNaira(item.price)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                    <Pencil className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
