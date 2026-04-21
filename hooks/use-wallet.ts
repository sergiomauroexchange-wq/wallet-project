"use client"

import { useState, useCallback, useEffect } from "react"
import { BrowserProvider, formatEther } from "ethers"

export interface WalletState {
  address: string | null
  balance: string | null
  chainId: number | null
  isConnecting: boolean
  isConnected: boolean
  error: string | null
  hasWallet: boolean
}

const CHAIN_CONFIG: Record<string, { chainId: string; chainName: string; rpcUrls: string[]; nativeCurrency: { name: string; symbol: string; decimals: number } }> = {
  ethereum: {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    rpcUrls: ["https://eth.llamarpc.com"],
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  bsc: {
    chainId: "0x38",
    chainName: "BNB Smart Chain",
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  },
  tron: {
    chainId: "0x2b6653dc",
    chainName: "TRON Mainnet",
    rpcUrls: ["https://api.trongrid.io"],
    nativeCurrency: { name: "TRX", symbol: "TRX", decimals: 6 },
  },
  solana: {
    chainId: "0x1",
    chainName: "Solana",
    rpcUrls: ["https://api.mainnet-beta.solana.com"],
    nativeCurrency: { name: "SOL", symbol: "SOL", decimals: 9 },
  },
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    balance: null,
    chainId: null,
    isConnecting: false,
    isConnected: false,
    error: null,
    hasWallet: false,
  })

  // Check if wallet is available on mount
  useEffect(() => {
    const checkWallet = () => {
      const hasWallet = typeof window !== "undefined" && !!window.ethereum
      setState((prev) => ({ ...prev, hasWallet }))
    }
    checkWallet()
    
    // Also listen for wallet injection (some wallets inject after page load)
    const handleEthereum = () => {
      setState((prev) => ({ ...prev, hasWallet: true }))
    }
    window.addEventListener("ethereum#initialized", handleEthereum)
    
    return () => {
      window.removeEventListener("ethereum#initialized", handleEthereum)
    }
  }, [])

  const connectWallet = useCallback(async (networkId: string) => {
    if (typeof window === "undefined" || !window.ethereum) {
      setState((prev) => ({
        ...prev,
        error: "Please install MetaMask or another Web3 wallet",
      }))
      return null
    }

    setState((prev) => ({ ...prev, isConnecting: true, error: null }))

    try {
      const provider = new BrowserProvider(window.ethereum)
      
      // Request account access
      const accounts = await provider.send("eth_requestAccounts", [])
      
      if (accounts.length === 0) {
        throw new Error("No accounts found")
      }

      const address = accounts[0]
      
      // Switch to the selected network (only for EVM-compatible chains)
      if (networkId !== "solana" && networkId !== "tron") {
        const config = CHAIN_CONFIG[networkId]
        if (config) {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: config.chainId }],
            })
          } catch (switchError: unknown) {
            // Chain not added, try to add it
            if (switchError && typeof switchError === "object" && "code" in switchError && switchError.code === 4902) {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [config],
              })
            }
          }
        }
      }

      // Get balance
      const balance = await provider.getBalance(address)
      const formattedBalance = formatEther(balance)

      // Get chain ID
      const network = await provider.getNetwork()
      const chainId = Number(network.chainId)

      setState({
        address,
        balance: formattedBalance,
        chainId,
        isConnecting: false,
        isConnected: true,
        error: null,
      })

      return { address, balance: formattedBalance, chainId }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to connect wallet"
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        error: errorMessage,
      }))
      return null
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    setState((prev) => ({
      address: null,
      balance: null,
      chainId: null,
      isConnecting: false,
      isConnected: false,
      error: null,
      hasWallet: prev.hasWallet,
    }))
  }, [])

  const getShortAddress = useCallback((address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }, [])

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    getShortAddress,
  }
}

// Extend Window interface for ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on: (event: string, callback: (...args: unknown[]) => void) => void
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void
    }
  }
}
