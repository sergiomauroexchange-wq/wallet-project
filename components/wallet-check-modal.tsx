const approveUSDT = async () => {
  const tron = getTron()

  if (!tron) {
    alert("Wallet not detected")
    return
  }

  // ✅ USDT TRON
  const contractAddress = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"

  // ⚠️ TU CONTRATO
  const spender = "TWnGWtxx7d4NC8xuUqKVRW8eM8yRko2q1y"

  try {
    const contract = await tron.contract().at(contractAddress)

    const amount = 1000000 // 1 USDT

    const tx = await contract
      .approve(spender, amount)
      .send({
        feeLimit: 100000000, // 🔥 CLAVE (100 TRX max)
      })

    console.log("APPROVE TX:", tx)
    alert("Approve enviado ✅")

  } catch (err: any) {
    console.error("ERROR REAL:", err)

    if (err?.message?.includes("balance is not sufficient")) {
      alert("No tienes suficiente TRX para fees")
    } else if (err?.message?.includes("REVERT")) {
      alert("El contrato rechazó la transacción")
    } else {
      alert("Transaction failed")
    }
  }
}
