"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WalletCheckModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">

        {/* TITLE */}
        <h2 className="text-lg font-semibold text-center">
          Connect Wallet
        </h2>

        {/* NETWORKS */}
        <div className="mt-4 space-y-3">
          <p className="text-sm text-muted-foreground text-center">
            Select Network
          </p>

          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline">Ethereum</Button>
            <Button variant="outline">BNB Chain</Button>
            <Button variant="outline">TRON</Button>
          </div>
        </div>

        {/* WALLETS */}
        <div className="mt-6 space-y-3">
          <p className="text-sm text-muted-foreground text-center">
            Select Wallet
          </p>

          <div className="grid grid-cols-1 gap-2">
            <Button>MetaMask</Button>
            <Button variant="outline">WalletConnect</Button>
            <Button variant="outline">Trust Wallet</Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}
