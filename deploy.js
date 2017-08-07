/* eslint-disable no-console */

const fs = require('fs')
const chalk = require('chalk')
const ipfsAPI = require('ipfs-api')
const IPFS = require('ipfs')

const ipfs = ipfsAPI()

const folder = './dist'


const writeHistory = hash => {
    // add to versions/history
    fs.appendFile('versions/history', `\n${hash}`, 'utf8', (err) => {
        if (err) throw err
    })

    // overwrite versions/current
    fs.writeFile('versions/current', hash, 'utf8', (err) => {
        if (err) throw err
    })
}


const updateIPNS = hash => {
    console.log(chalk.gray('\nUpdate references on IPNS...'))
    ipfs.name.publish(hash).then(result => {
        const peerId = result.Name

        console.log(chalk.green(`🎉 Referencing ${hash}`))
        console.log(chalk.gray.bold(`   http://localhost:8080/ipns/${peerId}\n   https://ipfs.io/ipns/${peerId}`))
    }).catch(err => {
        console.log(chalk.red('Could not update IPNS →', err))
    })
}


const updateDNS = () => {
    console.log(chalk.gray('\nUpdating DNS...'))
}


const uploadIPFS = () => {
    console.log(chalk.gray('\nAdding to IPFS...'))

    // https://github.com/ipfs/js-ipfs-api#utility-functions
    ipfs.util.addFromFs(folder, { recursive: true }).then(result => {
        const hash = result.slice(-1)[0].hash // get hash from last item in result array

        console.log(chalk.green(`🎉 Published ${folder} → ${hash}`))
        console.log(chalk.gray.bold(`   http://localhost:8080/ipfs/${hash}\n   https://ipfs.io/ipfs/${hash}`))

        writeHistory(hash)

        // updateIPNS(hash)
        // updateDNS(hash)
    }).catch(err => {
        console.log(chalk.red('Could not add to IPFS →', err))
        process.exit()
    })
}


const node = new IPFS({
    start: true,
    config: {
        Addresses: {
            Swarm: [
                '/ip4/127.0.0.1/tcp/5001'
            ]
        }
    }
})

node.on('ready', () => {
    console.log('IPFS node is ready')

    uploadIPFS()
})
