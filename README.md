# Poetry Compilation on Arweave

This script uploads a small collection of public domain poems to Arweave, a permanent decentralized storage network. The project includes a Table of Contents (TOC) and individual poem HTML files. The `index.js` script uploads the poem and updates the TOC to contain links to each poem on Arweave.

## Files

- `toc.html`: Table of Contents
- `cremationsammcgee.html`: "The Cremation of Sam McGee" by Robert W. Service (public domain)
-  `invictus.html` : "Invictus" by William Ernest Henley (public domain)
-  `ocaptain.html` : "O Captain, My Captain!" by Walt Whitman (public domain)
- `index.js`: Script to upload HTML files to Arweave
- `arconnect-wallet.json`: Your Arweave wallet (ensure this is in your`.gitignore`)

## How to Run

1. **Install dependencies:**

    ```
    npm install
    ```

2. **Run the script:**

    ```
    node index.js
    ```

3. **Check the terminal for transaction IDs and Arweave links.**

## Project Structure
```
sample-arweave/
├── node_modules/
├── .gitignore
├── arconnect-wallet.json
├── index.js
├── package-lock.json
├── package.json
├── cremationsammcgee.html
├── invictus.html
├── ocaptain.html
└── toc.html
```


## Notes

- Be absolutely sure that your `arconnect-wallet.json` file is secure and added to `.gitignore` if you plan on storing the repo remotely - it contains your private key.