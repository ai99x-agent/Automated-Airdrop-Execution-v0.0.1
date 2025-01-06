Instructions to Use the Script
Twitter API Keys:

Replace your_twitter_api_key, your_twitter_api_secret_key, your_twitter_access_token, and your_twitter_access_token_secret with your actual Twitter API credentials.
Node.js API:

Replace http://localhost:3000/ai99x with the actual URL of your Node.js API.
Tweet ID:

Replace tweet_id_here with the ID of the tweet whose comments you want to fetch.
Run the Script:

Install the required Python libraries:
bash
Copy code
pip install tweepy requests
Execute the script:
bash
Copy code
python fetch_twitter_comments.py
Node.js Endpoint:

Ensure your Node.js server is running and ready to receive POST requests at the specified endpoint.
>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<
Dependencies: Install the required packages using:

bash
Copy code
npm install @solana/web3.js @solana/spl-token fs
Payer Keypair: Create a keypair file (payer-keypair.json) containing the private key of the wallet sending the tokens.

Token Mint Address: Replace YOUR_TOKEN_MINT_ADDRESS with the mint address of the token you wish to transfer.

Filtered Comments: Save the filtered comments from the previous script to a file named filtered-comments.json, formatted as:

json
Copy code
["recipientAddress1,amount1", "recipientAddress2,amount2"]
Run: Execute the script using:

bash
Copy code
node solana_token_transfer.js
Transaction Confirmation: Check the console for transaction signatures and verify the transfers on Solana explorers like Solscan.