import {
  get_all_assets,
  get_assets_collection,
  get_collections,
} from '@/_aqua/api_testnet_opensea';

export default {
  async getAllAssets({ offset = 0, limit = 20, order = 'asc' }) {
    try {
      const response_string = await get_all_assets(
        String(offset),
        String(limit),
        order
      );
      const response = JSON.parse(response_string);
      return response.assets;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getAssetsCollection({ collection_address, offset = 0, limit = 20 }) {
    try {
      const response_string = await get_assets_collection(
        collection_address,
        String(offset),
        String(limit)
      );

      const response = JSON.parse(response_string);
      return response.assets;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getCollections({ owner_address, offset = 0, limit = 20 }) {
    try {
      const response = await get_collections(
        owner_address,
        String(offset),
        String(limit)
      );
      return JSON.parse(response);
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
