"use client"

import { X } from "lucide-react"

interface Props {
  open: boolean
  onClose: () => void
}

const networks = [
  {
    name: "TRON",
    wallets: [
      { name: "TronLink", icon: "🟠" },
      { name: "TokenPocket", icon: "👛" },
      { name: "OKX Wallet", icon: "🧿" },
    ],
  },
  {
    name: "Ethereum",
    wallets: [
      { name: "MetaMask", icon: "🦊" },
      { name: "WalletConnect", icon: "🔗" },
      { name: "Coinbase Wallet", icon: "🔵" },
    ],
  },
  {
    name: "Bitcoin",
    wallets: [
      { name: "Xverse", icon: "🟡" },
      { name: "Unisat", icon: "💼" },
    ],
  },
]

export function WalletCheckModal({ open, onClose }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-6">
          Connect Your Wallet
        </h2>

        {/* Networks */}
        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
          {networks.map((network) => (
            <div key={network.name}>
              
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                {network.name}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {network.wallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    className="flex items-center gap-3 rounded-xl border p-3 hover:bg-gray-100 transition"
                    onClick={() => {
                      alert(`${wallet.name} selected`)
                      onClose()
                    }}
                  >
                    <span className="text-xl">{wallet.icon}</span>
                    <span className="text-sm font-medium">
                      {wallet.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
