import { utils } from 'ethers';
import CollectionConfig from './CollectionConfig';

// Update the following array if you change the constructor arguments...
const ContractArguments = [
  CollectionConfig.maxBatchSize,
  CollectionConfig.collectionSize,
  CollectionConfig.AmountForPublic,
  CollectionConfig.AmountforTeam,
  CollectionConfig.hiddenMetadataUri
] as const;

export default ContractArguments;
