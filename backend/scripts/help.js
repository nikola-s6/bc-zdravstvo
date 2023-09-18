const hre = require("hardhat")

async function main() {
  const [deployer] = await hre.ethers.getSigners()
  const contract = await hre.ethers.getContractAt(
    "HealthRecords",
    "0x1525C8bEd1Bb94242a153d9A5ED2E96C07739adA",
    deployer
  )

  const result = await contract.getCredentials(deployer)
  console.log(result)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
