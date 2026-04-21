export const getWallet = () => {
  if (typeof window === "undefined") return null

  const w: any = window

  // TRON
  if (w.tronWeb && w.tronWeb.defaultAddress?.base58) {
    return {
      type: "TRON",
      provider: w.tronWeb,
      address: w.tronWeb.defaultAddress.base58,
    }
  }

  // EVM (MetaMask, Trust, SafePal)
  if (w.ethereum) {
    return {
      type: "EVM",
      provider: w.ethereum,
    }
  }

  return null
}
export const connectWallet = async () => {
  const w: any = window

  // TRON
  if (w.tronWeb) {
    if (!w.tronWeb.defaultAddress.base58) {
      alert("Conecta tu wallet TRON")
      return null
    }

    return {
      type: "TRON",
      address: w.tronWeb.defaultAddress.base58,
      provider: w.tronWeb,
    }
  }

  // EVM
  if (w.ethereum) {
    const accounts = await w.ethereum.request({
      method: "eth_requestAccounts",
    })

    return {
      type: "EVM",
      address: accounts[0],
      provider: w.ethereum,
    }
  }

  alert("No se detectó ninguna wallet")
  return null
}