const { network, ethers, deployments } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const healthRecords = await deploy("HealthRecords", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  const authorization = await deploy("Authorization", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  // no need to deploy DataStructure contract because it's only structure, no data is stored

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("------------------------------------------------------------")
    log("Verifying HealthRecords contract...")
    await verify(healthRecords.address, []) //contract address and arguments
    log("Verifying Authorization contract...")
    await verify(authorization.address, [])
    log("All contracts have been verified!")
  }
  log("------------------------------------------------------------")
}

module.exports.tags = ["all", "healthrecords"]
