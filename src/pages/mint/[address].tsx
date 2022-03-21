import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import NewMintForm from '@/components/forms/NewMintErc721Form';
import Header from '@/components/layout/Header';
import { getContractByChainId } from '@/components/utils/network';

type IContractInfo = {
  owner_wallet: string | undefined;
  owner_address: string | undefined;
  chain_id: string | undefined;
  contract_address: string | undefined;
};

const MintPage = ({ contractinfo }) => {
  const router = useRouter();
  const { owner_address, chain_id, contract_address } = contractinfo;
  return (
    <>
      <div className="min-h-full">
        <Header section={'Create NFT'} network={''} hasSubmenu={true} />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <NewMintForm
              ownerAddress={owner_address}
              chainId={chain_id}
              contractAddress={contract_address}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps | any = (context) => {
  const { address } = context.params;
  // const { nftaddress } = getContractByChainId(String(chain_id));
  const { nftaddress } = getContractByChainId(
    String(`${`${address}`.toLowerCase()}`.split(':')[1])
  );
  // console.log('getServerSideProps ---> ', context.params);
  const contractInfo: IContractInfo = {
    owner_wallet: `${address}`.toLowerCase(),
    owner_address: `${`${address}`.toLowerCase()}`.split(':')[0],
    chain_id: `${`${address}`.toLowerCase()}`.split(':')[1],
    contract_address: nftaddress,
  };
  // console.log('getContractByChainId ---> ', getContractByChainId(String(chain_id)));
  // return connectFluence(owner_address, chain_id).then((result) => {

  return {
    props: { contractinfo: contractInfo }, // will be passed to the page component as props
  };
};

export default MintPage;
