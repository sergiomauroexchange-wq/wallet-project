"use client"

import { useState } from "react"
import EthereumProvider from "@walletconnect/ethereum-provider"

export function WalletChecker() {
  const [account, setAccount] = useState<string | null>(null)

  const connectWallet = async () => {
    try {
      const provider = await EthereumProvider.init({
        projectId: "4031374b764bd6a586794c70e24198fb",
        chains: [1], // Ethereum
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
        Wallet Connection
      </h2>

      {!account ? (
        <button
          onClick={connectWallet}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Conectar Wallet
        </button>
      ) : (
        <p className="text-green-500">
          Conectado: {account}
        </p>
      )}
    </section>
  )
}
