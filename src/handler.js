const ethers = require('ethers')
const { Relayer } = require('defender-relay-client');
const { getContracts } = require('./getContracts')

async function handler(event) {
  const rinkebyRelayer = new Relayer(event);
  const {
    mumbaiRelayerApiKey,
    mumbaiRelayerSecret,
    infuraApiKey
  } = event.secrets;
  const mumbaiRelayer = new Relayer({apiKey: mumbaiRelayerApiKey, apiSecret: mumbaiRelayerSecret})

const {
  prizeFlushRinkeby,
  prizeFlushMumbai,
} = getContracts(infuraApiKey)



  {
    console.log(`Flush on rinkeby...`)
    const txData = await prizeFlushRinkeby.populateTransaction.flush()
    const tx = await rinkebyRelayer.sendTransaction({
      data: txData.data,
      to: txData.to,
      speed: 'fast',
      gasLimit: 500000,
    });
    console.log(`flushed rinkeby: ${tx.hash}`)
  }

  {
    console.log(`Flush on mumbai...`)
    const txData = await prizeFlushMumbai.populateTransaction.flush()
    const tx = await mumbaiRelayer.sendTransaction({
      data: txData.data,
      to: txData.to,
      speed: 'fast',
      gasLimit: 500000,
    });
    console.log(`flushed mumbai: ${tx.hash}`)
  }  
  
  

  console.log("Handler Complete!")
}

exports.handler = handler
