const SHA256 = require('crypto-js/sha256');

class Block
{
    constructor(index, timestamp, data, previousHash = '')
    {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash()
    {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty)
    {
        console.log(difficulty)
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0"))
        {
            this.nonce++
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class BlockChain
{
    constructor()
    {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }


    createGenesisBlock()
    {
        return new Block(0, "01/01/2019", "Genesis Block", "0")
    }

    getLatestBlock()
    {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock)
    {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        // newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid()
    {
        for(let i = 1; i < this.chain.length; i++)
        {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash())
            {
                console.log('1')
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash)
            {
                console.log('2')
                return false;
            }
        }

        return true;
    }
}

let arvizuCoin = new BlockChain();

console.log("Mining block 1....")
arvizuCoin.addBlock(new Block(1, "06/01/2019", { amount: 4 }));


console.log("Mining block 2....")
arvizuCoin.addBlock(new Block(2, "06/02/2019", { amount: 10 }));
