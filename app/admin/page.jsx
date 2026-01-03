"use client";

import { useState } from "react";
import { ENDPOINTS } from "@/lib/api";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ Import our separated components
import { AdminLogin } from "@/components/admin/AdminLogin";
import { MenuTable } from "@/components/admin/MenuTable";
import { ItemDialog } from "@/components/admin/ItemDialog";

export default function AdminPage() {
  // --- STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null); // If null, we are adding

  // --- LOGIC HANDLERS ---

  const handleLogin = (pin) => {
    if (pin === "1234") {
      setIsAuthenticated(true);
      fetchItems();
      toast.success("Welcome back!");
    } else {
      toast.error("Incorrect PIN");
    }
  };

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(ENDPOINTS.MENU);
      if (!res.ok) throw new Error("Failed");
      setMenuItems(await res.json());
    } catch (err) {
      toast.error("Could not load menu");
    }
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    // Optimistic Update
    const original = [...menuItems];
    setMenuItems(prev => prev.filter(item => item.id !== id));
    
    try {
      await fetch(ENDPOINTS.SINGLE_ITEM(id), { method: "DELETE" });
      toast.success("Item deleted");
    } catch (err) {
      setMenuItems(original); // Revert on error
      toast.error("Failed to delete");
    }
  };

  const handleSave = async (formData) => {
    setIsDialogOpen(false);
    const payload = { ...formData, price: Number(formData.price) };
    
    try {
      if (itemToEdit) {
        // UPDATE
        setMenuItems(prev => prev.map(item => item.id === itemToEdit.id ? { ...item, ...payload } : item));
        await fetch(ENDPOINTS.SINGLE_ITEM(itemToEdit.id), {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        toast.success("Updated successfully");
      } else {
        // CREATE
        const tempId = Date.now();
        setMenuItems(prev => [...prev, { ...payload, id: tempId }]);
        await fetch(ENDPOINTS.MENU, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        toast.success("Created successfully");
        fetchItems(); // Sync real ID
      }
    } catch (err) {
      toast.error("Operation failed");
      fetchItems();
    }
  };

  const openAdd = () => {
    setItemToEdit(null);
    setIsDialogOpen(true);
  };

  const openEdit = (item) => {
    setItemToEdit(item);
    setIsDialogOpen(true);
  };

  // --- RENDER ---

  if (!isAuthenticated) return <AdminLogin onLogin={handleLogin} />;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold">Menu Manager</h1>
          <p className="text-muted-foreground">{menuItems.length} items active.</p>
        </div>
        <Button onClick={openAdd} className="bg-primary text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </div>

      {/* Table Component */}
      <MenuTable 
        items={menuItems} 
        isLoading={isLoading} 
        onDelete={handleDelete} 
        onEdit={openEdit} 
      />

      {/* Dialog Component */}
      <ItemDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSubmit={handleSave} 
        initialData={itemToEdit}
      />
    </div>
  );
}
