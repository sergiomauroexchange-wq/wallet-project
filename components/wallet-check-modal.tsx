"use client"

import { useState } from "react"
import { X } from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
}

export function WalletCheckModal({ open, onClose }: Props) {
  const [step, setStep] = useState<"network" | "wallet">("network")
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null)

  if (!open) return null

  const networks = [
  {
    name: "Ethereum",
    logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    name: "BNB Chain",
    logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
  },
  {
    name: "TRON",
    logo: "https://assets.coingecko.com/coins/images/1094/small/tron-logo.png",
  },
]

const wallets = [
  {
    name: "MetaMask",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  },
  {
    name: "WalletConnect",
    logo: "https://avatars.githubusercontent.com/u/37784886",
  },
  {
    name: "Trust Wallet",
    logo: "https://trustwallet.com/assets/images/media/assets/TWT.png",
  },
  {
    name: "TronLink",
    logo: "https://seeklogo.com/images/T/tronlink-logo-4E6C60E3F6-seeklogo.com.png",
  },
  {
    name: "SafePal",
    logo: "https://seeklogo.com/images/S/safepal-logo-3A7D8D3A44-seeklogo.com.png",
  },
]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl relative">

        {/* CLOSE */}
        <button
          onClick={() => {
            onClose()
            setStep("network")
          }}
          className="absolute right-4 top-4"
        >
          <X className="w-5 h-5" />
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-bold text-center mb-6">
          {step === "network" ? "Select Network" : "Select Wallet"}
        </h2>

        {/* NETWORK STEP */}
        {step === "network" && (
          <div className="space-y-3">
            {networks.map((net) => (
              <button
                key={net.name}
                onClick={() => {
                  setSelectedNetwork(net.name)
                  setStep("wallet")
                }}
                className="w-full flex items-center gap-3 p-4 rounded-xl border hover:bg-gray-50"
              >
                <img src={net.logo} className="w-7 h-7" />
                <span className="font-medium">{net.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* WALLET STEP */}
        {step === "wallet" && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-2">
              Network: <b>{selectedNetwork}</b>
            </p>

            {wallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => {
                  console.log("Connect:", wallet.name, selectedNetwork)
                  onClose()
                  setStep("network")
                }}
                className="w-full flex items-center gap-3 p-4 rounded-xl border hover:bg-gray-50"
              >
                <img src={wallet.logo} className="w-7 h-7" />
                <span className="font-medium">{wallet.name}</span>
              </button>
            ))}

            {/* BACK */}
            <button
              onClick={() => setStep("network")}
              className="w-full mt-3 text-sm text-gray-500 hover:text-black"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
