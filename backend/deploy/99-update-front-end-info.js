const { ethers } = require("hardhat")
const fs = require("fs")

const FRONT_END_ADDRESSES_FILE = "../frontend/constants/address.json"
const FRONT_ABI_FILE = "../frontend/constants/abi.json"

module.exports = async function () {
  if (process.env.UPDATE_FRONT_END) {
    console.log("updating front end...")
    updateContractAddresses()
    updateAbi()
    console.log("fron end updated!")
  }
}

async function updateContractAddresses() {
  const healthRecords = await ethers.getContract("HealthRecords")
  const chainId = network.config.chainId.toString()
  const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"))

  currentAddresses[chainId] = healthRecords.address

  fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses))
}

async function updateAbi() {
  const healthRecords = await ethers.getContract("HealthRecords")
  fs.writeFileSync(FRONT_ABI_FILE, healthRecords.interface.format(ethers.utils.FormatTypes.json))
}

module.exports.tags = ["all", "frontend"]
