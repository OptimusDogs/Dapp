import CollectionConfigInterface from '../lib/CollectionConfigInterface';
import * as Networks from '../lib/Networks';
import * as Marketplaces from '../lib/Marketplaces';
import whitelistAddresses from './whitelist.json';
import ogAddresses from './og.json';

const CollectionConfig: CollectionConfigInterface = {
  testnet: Networks.ethereumLegacyTestnet,
  mainnet: Networks.ethereumMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: 'OptimusDogs',
  tokenName: 'Optimus Dogs',
  tokenSymbol: 'OPDOGS',
  hiddenMetadataUri: 'ipfs://QmXJ7SXkpDHkFqv3W6p8L9fq4BPv5ydnnptsjTjHmT8cQS/hidden.json',
  maxBatchSize: 6,
  collectionSize: 10000,
  AmountForPublic: 9400,
  AmountforTeam: 600,
  
  contractAddress:"0x5e771D03D3f606f2a5F9488833C4499fd2D227c9",
  marketplaceIdentifier: 'my-nft-token',
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses,
  ogAddresses,
};

export default CollectionConfig;
