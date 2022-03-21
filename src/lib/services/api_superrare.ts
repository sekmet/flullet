import { featured_artworks } from '@/_aqua/api_superrare';

export default {
  async featuredArtworks({ contract1, contract2 }) {
    try {
      const response_string = await featured_artworks(
        String(contract1),
        String(contract2)
      );
      const response = JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
