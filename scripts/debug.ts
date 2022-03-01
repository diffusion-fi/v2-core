import { task } from 'hardhat/config'
import '@nomiclabs/hardhat-ethers'
import { Logger } from 'tslog'
import { ethers, BigNumber } from 'ethers'
import { IUniswapV2Factory, UniswapV2Pair } from '../dist/types'

const logger: Logger = new Logger()

task('factory-pair', 'Debug calls')
  //npx hardhat debug
  .setAction(async (args, hre) => {
    const instance = (await hre.ethers.getContractAt(
      'UniswapV2Factory',
      '0x21461DaFBec3EcBeaff138c0Ce665d67228d139e'
    )) as IUniswapV2Factory

    const allPairCount = await instance.allPairsLength()

    logger.info(allPairCount)

    const firstPair = await instance.allPairs(BigNumber.from('0'))
    logger.info(firstPair)
  })

task('debug-pair', 'Debug calls')
  .addParam('address', 'token address to call')
  .setAction(async (args, hre) => {
    const instance = (await hre.ethers.getContractAt('UniswapV2Pair', args.address)) as UniswapV2Pair

    logger.info(await instance.balanceOf(ethers.constants.AddressZero))
  })
