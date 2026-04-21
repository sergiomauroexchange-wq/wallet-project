const connectWallet = async () => {
  try {
    // 🔥 1. Detectar wallet inyectada (Trust, MetaMask, SafePal)
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      })

      setAccount(accounts[0])
      return
    }

    // 🔥 2. Si no hay → WalletConnect
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
