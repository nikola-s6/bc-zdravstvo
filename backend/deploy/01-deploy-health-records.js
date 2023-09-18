const hre = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
  // const { deploy, log } = deployments
  // const { deployer } = await getNamedAccounts()
  // const [deployer] = await hre.ethers.getSigners()

  // const healthRecords = await deploy("HealthRecords", {
  //   from: deployer,
  //   args: [],
  //   log: true,
  //   waitConfirmations: network.config.blockConfirmations || 1,
  // })
  const healthRecordsFactory = await hre.ethers.getContractFactory("HealthRecords", deployer)
  const healthRecords = await hre.upgrades.deployProxy(healthRecordsFactory, [])
  await healthRecords.waitForDeployment()
  console.log("HealthRecords address: ", await healthRecords.getAddress())

  if (!developmentChains.includes(hre.network.name) && process.env.ETHERSCAN_API_KEY) {
    log("------------------------------------------------------------")
    log("Verifying HealthRecords contract...")
    await verify(await healthRecords.getAddress(), []) //contract address and arguments
  }
  log("------------------------------------------------------------")
}

module.exports.tags = ["all", "healthrecords"]
