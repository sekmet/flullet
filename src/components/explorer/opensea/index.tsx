import Item from './item';

export default function Explorer({ assets }) {
  return (
    <div className="bg-white">
      <section className="text-gray-700">
        <div className="container mx-auto">
          <div className="flex flex-wrap -m-4">
            {assets.map((asset) => (
              <Item key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
        {/*! loading && assets.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={() => loadAssets()}
            className="bg-white w-full hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-2 px-4 border border-blue-500 rounded"
          >
            Load More
          </button>
        </div>
      ) */}
      </section>
    </div>
  );
}
