import { task } from 'hardhat/config'
import '@nomiclabs/hardhat-ethers'
import { Logger } from 'tslog'
import { ethers } from 'ethers'
import { UniswapV2Pair } from '../dist/types'

const logger: Logger = new Logger()

task('debug-pair', 'Debug calls')
    .addParam("address", "token address to call")
    .setAction(async (args, hre) => {
        const instance = await hre.ethers.getContractAt("UniswapV2Pair", args.address) as UniswapV2Pair;

        logger.info(await instance.balanceOf(ethers.constants.AddressZero));
    })

