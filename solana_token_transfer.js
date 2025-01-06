
// Node.js script to send tokens on Solana blockchain
const { Connection, PublicKey, Keypair, Transaction, SystemProgram } = require('@solana/web3.js');
const { createTransferInstruction, getAssociatedTokenAddress, getOrCreateAssociatedTokenAccount } = require('@solana/spl-token');
const fs = require('fs');

// Solana connection
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// Load payer keypair (replace with your private key file)
const payerKeyPair = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(fs.readFileSync('./payer-keypair.json', 'utf8')))
);

// Token mint address (replace with your token mint address)
const tokenMintAddress = new PublicKey('YOUR_TOKEN_MINT_ADDRESS');

// Function to send tokens
async function sendTokens(recipientAddress, amount) {
    try {
        const recipientPublicKey = new PublicKey(recipientAddress);

        // Get or create associated token account for recipient
        const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payerKeyPair,
            tokenMintAddress,
            recipientPublicKey
        );

        // Create transfer instruction
        const transferInstruction = createTransferInstruction(
            recipientTokenAccount.address,
            await getAssociatedTokenAddress(tokenMintAddress, payerKeyPair.publicKey),
            payerKeyPair.publicKey,
            amount
        );

        // Create and send transaction
        const transaction = new Transaction().add(transferInstruction);
        const signature = await connection.sendTransaction(transaction, [payerKeyPair]);

        console.log(`Transaction successful with signature: ${signature}`);
    } catch (error) {
        console.error('Error sending tokens:', error);
    }
}

// Function to read filtered comments and process addresses
async function distributeTokensFromComments() {
    try {
        // Load filtered comments (modify the path to match your setup)
        const comments = JSON.parse(fs.readFileSync('./filtered-comments.json', 'utf8'));

        for (const comment of comments) {
            const [address, amount] = comment.split(','); // Expect format: "address,amount"
            if (PublicKey.isOnCurve(address) && !isNaN(amount)) {
                console.log(`Sending ${amount} tokens to ${address}`);
                await sendTokens(address, parseFloat(amount));
            } else {
                console.error(`Invalid address or amount in comment: ${comment}`);
            }
        }
    } catch (error) {
        console.error('Error processing comments:', error);
    }
}

// Run the distribution process
distributeTokensFromComments();
