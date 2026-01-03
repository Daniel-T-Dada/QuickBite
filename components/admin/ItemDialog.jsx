"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Image as ImageIcon } from "lucide-react";

const INITIAL_STATE = { title: "", price: "", category: "Breakfast", img: "", desc: "" };

export function ItemDialog({ open, onOpenChange, onSubmit, initialData }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const isEditing = !!initialData;

  // Reset or Populate form when the dialog opens
  useEffect(() => {
    if (open) {
      setFormData(initialData || INITIAL_STATE);
    }
  }, [open, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Send clean data back to parent
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Item" : "Add New Item"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Item Name</Label>
              <Input 
                id="title" 
                required
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                placeholder="e.g. Jollof Rice" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input 
                id="price" 
                type="number"
                step="0.01"
                required
                value={formData.price} 
                onChange={(e) => setFormData({...formData, price: e.target.value})} 
                placeholder="12.50" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Beverages">Beverages</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="img">Image URL</Label>
            <div className="flex gap-4">
              <Input 
                id="img" 
                value={formData.img} 
                onChange={(e) => setFormData({...formData, img: e.target.value})} 
                placeholder="Paste URL..." 
              />
              <div className="h-10 w-10 relative overflow-hidden rounded border bg-muted flex items-center justify-center shrink-0">
                {formData.img ? <img src={formData.img} alt="Preview" className="h-full w-full object-cover" /> : <ImageIcon className="h-4 w-4 text-muted-foreground" />}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea 
              id="desc" 
              value={formData.desc} 
              onChange={(e) => setFormData({...formData, desc: e.target.value})} 
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">{isEditing ? "Save Changes" : "Create Item"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
