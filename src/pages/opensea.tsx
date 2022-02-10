import { Meta } from '@/components/layout/Meta';
import Header from '@/components/layout/Header';
import { OpenSea } from '@/components/templates/Opensea';
import Explorer from '@/components/explorer/opensea';

const OpenseaPage = () => {

return (
    <div className="min-h-full">
    <Header section="OpenSea" network="ethereum" />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <OpenSea meta={<Meta title="OpenSea" description="OpenSea NFT Marketplace" />}>
            <Explorer />
          </OpenSea>
          </div>
        </main>
    </div>  

);

}

export default OpenseaPage;
