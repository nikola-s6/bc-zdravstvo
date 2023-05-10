const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
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

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("------------------------------------------------------------")
    log("Verifying HealthRecords contract...")
    await verify(healthRecords.address, []) //contract address and arguments
  }
  log("------------------------------------------------------------")
}

module.exports.tags = ["all", "healthrecords"]
