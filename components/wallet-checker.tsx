"use client"

import { useState } from "react"
import EthereumProvider from "@walletconnect/ethereum-provider"

export function WalletChecker() {
  const [account, setAccount] = useState<string | null>(null)
  const [step, setStep] = useState<"closed" | "network" | "wallet">("closed")
  const [network, setNetwork] = useState<string | null>(null)

  // 🔴 TRON
  const connectTron = async () => {
    const tronWeb = (window as any).tronWeb
    if (tronWeb && tronWeb.defaultAddress?.base58) {
      return tronWeb.defaultAddress.base58
    }
    return null
  }

  // 🔵 ETH
  const connectEVM = async () => {
    if ((window as any).ethereum) {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      })
      return accounts[0]
    }
    return null
  }

  // 🟣 WalletConnect
  const connectWC = async () => {
    const provider = await EthereumProvider.init({
      projectId: "4031374b764bd6a586794c70e24198fb",
      chains: [1],
      showQrModal: true,
    })

    await provider.connect()
    return provider.accounts[0]
  }

  const handleConnect = async () => {
    try {
      if (network === "TRON") {
        const acc = await connectTron()
        if (acc) setAccount(acc)
        else alert("Abre en Trust Wallet o TronLink")
        return
      }

      const evm = await connectEVM()
      if (evm) {
        setAccount(evm)
        return
      }

      const wc = await connectWC()
      setAccount(wc)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section className="py-20 text-center">
      {/* BOTÓN PRINCIPAL */}
      {!account && (
        <button
          onClick={() => setStep("network")}
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Check your wallet
        </button>
      )}

      {/* RESULTADO */}
      {account && (
        <p className="text-green-500 break-all mt-6">
          Conectado: {account}
        </p>
      )}

      {/* MODAL */}
      {step !== "closed" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[350px] text-left">

            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">Wallet Check</h2>
              <button onClick={() => setStep("closed")}>✕</button>
            </div>

            {/* STEP 1: NETWORK */}
            {step === "network" && (
              <div className="space-y-3">
                <p>Select network</p>

                <button
                  onClick={() => {
                    setNetwork("ETH")
                    setStep("wallet")
                  }}
                  className="w-full border p-3 rounded"
                >
                  Ethereum
                </button>

                <button
                  onClick={() => {
                    setNetwork("BNB")
                    setStep("wallet")
                  }}
                  className="w-full border p-3 rounded"
                >
                  BNB Chain
                </button>

                <button
                  onClick={() => {
                    setNetwork("TRON")
                    setStep("wallet")
                  }}
                  className="w-full border p-3 rounded"
                >
                  TRON
                </button>
              </div>
            )}

            {/* STEP 2: WALLET */}
            {step === "wallet" && (
              <div className="space-y-3">
                <p>{network} wallets</p>

                <button
                  onClick={handleConnect}
                  className="w-full border p-3 rounded"
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
