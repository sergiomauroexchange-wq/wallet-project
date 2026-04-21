"use client"

import { useState } from "react"
import EthereumProvider from "@walletconnect/ethereum-provider"

export function WalletChecker() {
  const [account, setAccount] = useState<string | null>(null)

  // 🔴 TRON
  const connectTron = async () => {
    const tronWeb = (window as any).tronWeb

    if (tronWeb && tronWeb.defaultAddress?.base58) {
      return tronWeb.defaultAddress.base58
    }

    return null
  }

  // 🔥 CONNECT UNIVERSAL
  const connectWallet = async () => {
    try {
      // 🔴 1. TRON (Trust / TronLink)
      const tronAddress = await connectTron()

      if (tronAddress) {
        setAccount(tronAddress)
        return
      }

      // 🔵 2. ETH / BNB (MetaMask, Trust, SafePal)
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        })

        setAccount(accounts[0])
        return
      }

      // 🟣 3. WalletConnect (fallback)
      const provider = await EthereumProvider.init({
        projectId: "4031374b764bd6a586794c70e24198fb",
        chains: [1],
        showQrModal: true,
      })

      await provider.connect()

      const accounts = provider.accounts
      setAccount(accounts[0])
    } catch (err) {
      console.error(err)
      alert("Error conectando wallet")
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-card/30 text-center">
      <h2 className="text-2xl font-bold mb-4">
        Conectar Wallet
      </h2>

      {!account ? (
        <button
          onClick={connectWallet}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Conectar Wallet
        </button>
      ) : (
        <p className="text-green-500 break-all px-4">
          Conectado: {account}
        </p>
      )}
    </section>
  )
}
