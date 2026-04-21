"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { BrowserProvider, formatEther } from "ethers"

const networks = [
  { id: "ethereum", name: "Ethereum" },
  { id: "bsc", name: "BNB Chain" },
  { id: "tron", name: "TRON" },
]

export function WalletCheckModal({ open, onOpenChange }: any) {
  const [view, setView] = useState("network")
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null)
  const [walletData, setWalletData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleNetwork = (net: any) => {
    setSelectedNetwork(net)
    setView("wallet")
  }

  // ✅ WalletConnect (FUNCIONA EN TODAS LAS WALLETS)
  const connectWallet = async () => {
    try {
      const { EthereumProvider } = await import("@walletconnect/ethereum-provider")

      const provider = await EthereumProvider.init({
        projectId: "4031374b764bd6a586794c70e24198fb",
        chains: [1],
        showQrModal: true,
      })

      await provider.connect()

      const ethersProvider = new BrowserProvider(provider)
      const signer = await ethersProvider.getSigner()
      const address = await signer.getAddress()
      const balance = await ethersProvider.getBalance(address)

      return {
        address,
        balance: formatEther(balance),
      }
    } catch (err: any) {
      throw new Error("Connection failed")
    }
  }

  const handleConnect = async () => {
    setView("connecting")
    setError(null)

    try {
      const result = await connectWallet()
      setWalletData(result)
      setView("connected")
    } catch (err: any) {
      setError(err.message)
      setView("error")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>

        {/* NETWORK */}
        {view === "network" && (
          <div>
            <h2>Select Network</h2>

            {networks.map((n) => (
              <button key={n.id} onClick={() => handleNetwork(n)}>
                {n.name}
              </button>
            ))}
          </div>
        )}

        {/* WALLET LIST (FAKE STYLE COMO LA OTRA WEB) */}
        {view === "wallet" && (
          <div>
            <h2>Connect Wallet</h2>

            {[
              "Ledger",
              "TronLink",
              "Trust Wallet",
              "SafePal",
              "Bybit Wallet",
              "TokenPocket",
              "imToken",
            ].map((w) => (
              <button key={w} onClick={handleConnect}>
                {w}
              </button>
            ))}
          </div>
        )}

        {/* CONNECTING */}
        {view === "connecting" && (
          <div>
            <Loader2 className="animate-spin" />
            Connecting...
          </div>
        )}

        {/* SUCCESS */}
        {view === "connected" && walletData && (
          <div>
            <CheckCircle />
            <p>{walletData.address}</p>
            <p>{walletData.balance}</p>
          </div>
        )}

        {/* ERROR */}
        {view === "error" && (
          <div>
            <AlertCircle />
            <p>{error}</p>
            <button onClick={() => setView("wallet")}>Back</button>
          </div>
        )}

      </DialogContent>
    </Dialog>
  )
}