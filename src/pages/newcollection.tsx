import NewCollectionForm from '@/components/forms/NewCollectionForm';
import Header from '@/components/layout/Header';
import { Meta } from '@/components/layout/Meta';
import { FormsTpl } from '@/components/templates/Forms';

const NewCollectionPage = () => {
  return (
    <div className="min-h-full">
      <Header section="New Collection" network="ethereum" hasSubmenu={false} />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <FormsTpl
            meta={
              <Meta
                title="New Collection"
                description="Your own NFT Marketplace"
              />
            }
          >
            <NewCollectionForm />
          </FormsTpl>
        </div>
      </main>
    </div>
  );
};

export default NewCollectionPage;
