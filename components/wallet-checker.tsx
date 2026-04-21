"use client"

import { useState } from "react"
import EthereumProvider from "@walletconnect/ethereum-provider"

export function WalletChecker() {
  const [account, setAccount] = useState<string | null>(null)
  const [network, setNetwork] = useState<string | null>(null)

  // 🔴 TRON
  const connectTron = async () => {
    const tronWeb = (window as any).tronWeb

    if (tronWeb && tronWeb.defaultAddress?.base58) {
      return tronWeb.defaultAddress.base58
    }

    return null
  }

  // 🔥 CONNECT
  const connectWallet = async () => {
    try {
      // TRON
      if (network === "TRON") {
        const tronAddress = await connectTron()

        if (tronAddress) {
          setAccount(tronAddress)
          return
        } else {
          alert("Abre esto dentro de Trust Wallet o TronLink")
          return
        }
      }

      // ETH / BNB
      if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        })

        setAccount(accounts[0])
        return
      }

      // WalletConnect
      const provider = await EthereumProvider.init({
        projectId: "4031374b764bd6a586794c70e24198fb",
        chains: [1],
        showQrModal: true,
      })

      await provider.connect()
      setAccount(provider.accounts[0])
    } catch (err) {
      console.error(err)
      alert("Error conectando wallet")
    }
  }

  return (
    <section className="py-20 text-center">
      <h2 className="text-2xl font-bold mb-6">
        TEST NUEVO WALLET
      </h2>

      {!network && (
        <div className="space-y-3">
          <p>Select Network</p>

          <button onClick={() => setNetwork("ETH")} className="block w-full border p-3 rounded">
            Ethereum
          </button>

          <button onClick={() => setNetwork("BNB")} className="block w-full border p-3 rounded">
            BNB Chain
          </button>

          <button onClick={() => setNetwork("TRON")} className="block w-full border p-3 rounded">
            TRON
          </button>
        </div>
      )}

      {network && !account && (
        <div className="space-y-3">
          <p>{network} seleccionado</p>

          <button
            onClick={connectWallet}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Conectar Wallet
          </button>
        </div>
      )}

      {account && (
        <p className="text-green-500 break-all mt-6">
          Conectado: {account}
        </p>
      )}
    </section>
  )
}
