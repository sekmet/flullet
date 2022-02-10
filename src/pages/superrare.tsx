import { Meta } from '@/components/layout/Meta';
import Header from '@/components/layout/Header';
import { Superrare } from '@/components/templates/Superrare';
import Explorer from '@/components/explorer/superrare';

const SuperrarePage = () => {

return (
    <div className="min-h-full">
    <Header section="Superrare" network="ethereum" />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Superrare meta={<Meta title="Superrare" description="Superrare NFT Marketplace" />}>
            <Explorer />
          </Superrare>
          </div>
        </main>
    </div>  

);

}

export default SuperrarePage;
