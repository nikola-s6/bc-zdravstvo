const hre = require("hardhat")

async function main() {
  const [deployer] = await hre.ethers.getSigners()
  //   const deployer = hre.ethers.getSigner()
  const healthRecordsFactory = await hre.ethers.getContractFactory("HealthRecords", deployer)

  console.log("Deploying Storage contract with proxy...")
  const healthRecords = await hre.upgrades.deployProxy(healthRecordsFactory, [])

  await healthRecords.waitForDeployment()
  console.log(`Storage proxy address: `, await healthRecords.getAddress())
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
