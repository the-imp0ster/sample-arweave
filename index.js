const Arweave = require('arweave');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

// initialize the connection to arweave
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

async function uploadFile(filePath) {
  // provide your wallet keys
  const wallet = JSON.parse(readFileSync('./arconnect-wallet.json'));

  const data = readFileSync(filePath, 'utf8');

  // create the transaction with the data and wallet
  const transaction = await arweave.createTransaction({ data }, wallet);

  // let the transaction know the type of content you're uploading
  transaction.addTag('Content-Type', 'text/html');

  // sign the transaction and post
  await arweave.transactions.sign(transaction, wallet);
  const response = await arweave.transactions.post(transaction);

  console.log(`File uploaded: ${filePath}`);
  console.log(`Transaction ID: ${transaction.id}`);
  console.log(`Link: https://arweave.net/${transaction.id}`);

  // log the response for debugging in case of problems
  console.log(`Response: ${JSON.stringify(response)}`);

  // provide transaction id for reference
  return transaction.id;
}

async function main() {
  const tocPath = join(__dirname, 'toc.html');
  // the files to be uploaded
  const poems = [
    { path: 'cremationsammcgee.html', title: 'The Cremation of Sam McGee' },
    { path: 'ocaptain.html', title: 'O Captain! My Captain!' },
    { path: 'theroadnottaken.html', title: 'The Road Not Taken' },
    { path: 'invictus.html', title: 'Invictus' }
  ];

  let tocContent = readFileSync(tocPath, 'utf8');
  
  // upload each poem and provide the tx id to the toc
  for (const poem of poems) {
    const poemId = await uploadFile(poem.path);
    const newEntry = `<li><a href="https://arweave.net/${poemId}">${poem.title}</a></li>`;
    tocContent = tocContent.replace('</ol>', `${newEntry}</ol>`);
  }

  writeFileSync(tocPath, tocContent);

  // upload updated toc
  const tocId = await uploadFile(tocPath);

  console.log(`Updated TOC Transaction ID: ${tocId}`);
}

main();
