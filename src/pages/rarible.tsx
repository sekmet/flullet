import { Meta } from '@/components/layout/Meta';
import Header from '@/components/layout/Header';
import { Rarible } from '@/components/templates/Rarible';
import Explorer from '@/components/explorer/rarible';

const RariblePage = () => {

return (
    <div className="min-h-full">
    <Header section="Rarible" network="ethereum" />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Rarible meta={<Meta title="Rarible" description="Rarible NFT Marketplace" />}>
            <Explorer />
          </Rarible>
          </div>
        </main>
    </div>  

);

}

export default RariblePage;
