"use client";

import { useState } from "react";
import { processMockPayment } from "@/lib/mock-payment";
import { formatNaira } from "@/lib/utils";
import { toast } from "sonner";
import { Loader2, CreditCard, CheckCircle } from "lucide-react";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function CheckoutModal({ isOpen, onClose, totalAmount, onClearCart }) {
  const [status, setStatus] = useState("idle"); // idle | processing | success

  const handlePayment = async (e) => {
    e.preventDefault();
    setStatus("processing");

    try {
      // Call our fake API
      const result = await processMockPayment(totalAmount);
      
      // Handle Success
      setStatus("success");
      toast.success(result.message);
      
      // Wait a moment so user sees the "Success" checkmark before closing
      setTimeout(() => {
        onClearCart(); // Clear the cart context
        onClose();     // Close modal
        setStatus("idle"); // Reset for next time
      }, 2000);

    } catch (error) {
      // Handle Error
      setStatus("idle");
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Secure Checkout</DialogTitle>
          <DialogDescription>
            Enter your details to complete the purchase of <strong>{formatNaira(totalAmount)}</strong>.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          // ✅ SUCCESS STATE UI
          <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-in fade-in zoom-in">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-center">Order Confirmed!</h3>
            <p className="text-center text-muted-foreground">Kitchen is preparing your meal.</p>
          </div>
        ) : (
          // ✅ FORM STATE UI
          <form onSubmit={handlePayment} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" required disabled={status === "processing"} />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="card">Card Number (Fake)</Label>
              <div className="relative">
                <Input 
                  id="card" 
                  placeholder="0000 0000 0000 0000" 
                  required 
                  disabled={status === "processing"} 
                />
                <CreditCard className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input id="expiry" placeholder="MM/YY" required disabled={status === "processing"} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" required disabled={status === "processing"} />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button type="submit" className="w-full" disabled={status === "processing"}>
                {status === "processing" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  `Pay ${formatNaira(totalAmount)}`
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
