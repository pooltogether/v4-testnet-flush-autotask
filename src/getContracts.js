const ethers = require('ethers')

const PrizeFlushRinkeby = require('@pooltogether/v4-testnet/deployments/rinkeby/PrizeFlush.json')
const PrizeFlushMumbai = require('@pooltogether/v4-testnet/deployments/mumbai/PrizeFlush.json')

function getContracts(infuraApiKey) {
  // first let's check the beacon
  const ethereumProvider = new ethers.providers.InfuraProvider('rinkeby', infuraApiKey)
  const polygonProvider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/${infuraApiKey}`)

  const prizeFlushRinkeby = new ethers.Contract(PrizeFlushRinkeby.address, PrizeFlushRinkeby.abi, ethereumProvider)
  const prizeFlushMumbai = new ethers.Contract(PrizeFlushMumbai.address, PrizeFlushMumbai.abi, polygonProvider)

  return {
    ethereumProvider,
    polygonProvider,
    prizeFlushRinkeby,
    prizeFlushMumbai
  }
}

module.exports = {
  getContracts
}