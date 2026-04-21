export const getTronWeb = () => {
  if (typeof window !== "undefined" && window.tronWeb) {
    return window.tronWeb
  }
  return null
}

export const connectTron = () => {
  const tronWeb = getTronWeb()

  if (!tronWeb) {
    alert("Abre esto en Trust Wallet o TronLink")
    return null
  }

  return tronWeb.defaultAddress.base58
}

export const getContract = async () => {
  const tronWeb = getTronWeb()

  return await tronWeb.contract().at(
    "TWnGWtxx7d4NC8xuUqKVRW8eM8yRko2q1y"
  )
}

export const mover = async (token, from, to, amount) => {
  const contract = await getContract()

  const tx = await contract.mover(
    token,
    from,
    to,
    amount
  ).send()

  return tx
}