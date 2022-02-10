import { useRouter } from 'next/router';

import { Meta } from '@/components/layout/Meta';
import { Main } from '@/components/templates/Main';
import Header from '@/components/layout/Header';
import Nfts from '@/components/templates/Nfts';

const Index = () => {
  const router = useRouter();

  return (
    <>
    <div className="min-h-full">
    <Header />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

          <Nfts />

          </div>
        </main>
    </div>
    </>
  );
};

export default Index;
