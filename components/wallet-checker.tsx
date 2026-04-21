"use client"

import { useState } from "react"
import EthereumProvider from "@walletconnect/ethereum-provider"

export function WalletChecker() {
  const [account, setAccount] = useState<string | null>(null)
  const [network, setNetwork] = useState<string | null>(null)

  // 🔴 TRON DETECTION
  const connectTron = async () => {
    const tronWeb = (window as any).tronWeb

    if (tronWeb && tronWeb.defaultAddress?.base58) {
      return tronWeb.defaultAddress.base58
    }

    return null
  }

  // 🔵 ETH / BNB
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

  // 🔥 MAIN CONNECT
  const connectWallet = async () => {
    try {
      if (network === "TRON") {
        const acc = await connectTron()

        if (acc) {
          setAccount(acc)
        } else {
          alert("Abre esto dentro de Trust Wallet o TronLink")
        }
        return
      }

      // ETH / BNB
      const evm = await connectEVM()
      if (evm) {
        setAccount(evm)
        return
      }

      // fallback QR
      const wc = await connectWC()
      setAccount(wc)
    } catch (e) {
      console.error(e)
      alert("Error conectando")
    }
  }

  return (
    <section className="py-20 text-center">
      <h2 className="text-2xl font-bold mb-6">
        Connect Wallet
      </h2>

      {!network && (
        <div className="space-y-3">
          <p>Select Network</p>

          <button onClick={() => setNetwork("ETH")} className="border p-3 w-full">
            Ethereum
          </button>

          <button onClick={() => setNetwork("BNB")} className="border p-3 w-full">
            BNB Chain
          </button>

          <button onClick={() => setNetwork("TRON")} className="border p-3 w-full">
            TRON
          </button>
        </div>
      )}

      {network && !account && (
        <div className="space-y-3">
          <p>{network} seleccionado</p>

          <button
            onClick={connectWallet}
            className="px-6 py-3 bg-blue-600 text-white rounded"
          >
            Conectar
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
