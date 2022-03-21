import {
  get_all_collections,
  get_collection_tokens,
} from '@/_aqua/api_nftkeys';

export default {
  async getAllCollections() {
    try {
      const response_string = await get_all_collections();
      const response = JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async getCollectionTokens({ alias }) {
    try {
      const response_string = await get_collection_tokens(String(alias));
      const response = JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
