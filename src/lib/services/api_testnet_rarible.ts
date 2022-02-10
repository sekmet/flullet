import {
  get_all_assets,
  get_assets_collection,
  get_collections,
} from '@/_aqua/api_testnet_rarible';

export default {
  async getAllAssets({ size = 32, continuation_token = '' }) {
    try {
      let response_string = await get_all_assets(String(size), continuation_token);
      let response = JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getAssetsCollection({ collection_address, size = 32 }) {
    try {
      let response_string = await get_assets_collection(
        collection_address,
        String(size)
      );
      let response = JSON.parse(response_string);
      return response.items;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getCollections({ owner_address, size = 32 }) {
    try {
      let response_string = await get_collections(
        owner_address,
        String(size)
      );
      let response = JSON.parse(response_string);
      return response.collections;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};