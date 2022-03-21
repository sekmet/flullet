import {
  // am_i_owner,
  get_all_sales,
  get_sales_byowner,
  get_sales_byowner_and_chainid,
  get_sales_byseller,
  get_sales_byseller_and_chainid,
  get_all_mints,
  get_mints_byowner,
  get_mints_byowner_and_chainid,
  get_wallets,
  get_wallet_byaddress,
  init_service,
  owner_nuclear_drop,
  // owner_nuclear_reset,
  update_mints,
  update_wallets,
  update_sales,
} from '@/_aqua/api_testnet_db';

export default {
  async initService() {
    try {
      const response = await init_service();
      console.log('initService', response);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async ownerNuclearDrop() {
    try {
      const response = await owner_nuclear_drop();
      console.log('ownerNuclearDrop', response);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async getAllWallets() {
    try {
      const response_string = await get_wallets();
      // console.log('get_wallets', response_string);
      const response = response_string; // JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async getWalletByAddress({ address }) {
    try {
      const response_string = await get_wallet_byaddress(String(address));
      // console.log('get_wallet_byaddress', response_string);
      const response = response_string; // JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async getAllMints() {
    try {
      const response_string = await get_all_mints();
      console.log('get_mints', response_string);
      const response = response_string; // JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  /* async getMintsByTokenId({id}) {
    try {
      let response_string = await get_mints_bytokenid(String(id));
      //console.log('get_mints_bytokenid', response_string);
      let response = response_string; //JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }, */
  async getMintsByOwner({ owner_address }) {
    try {
      const response_string = await get_mints_byowner(String(owner_address));
      // console.log('get_mints_byowner', response_string);
      const response = response_string; // JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async getMintsByOwnerAndChainId({ owner_address, chain_id }) {
    try {
      const response_string = await get_mints_byowner_and_chainid(
        String(owner_address),
        String(chain_id)
      );
      console.log('get_mints_byowner_and_chainid', response_string);
      const response = response_string; // JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async getAllSales() {
    try {
      const response_string = await get_all_sales();
      console.log('get_sales', response_string);
      const response = response_string; // JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  /* async getSalesByTokenId({id}) {
    try {
      let response_string = await get_sales_bytokenid(String(id));
      //console.log('get_sales_bytokenid', response_string);
      let response = response_string; //JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }, */
  async getSalesBySeller({ seller_address }) {
    try {
      const response_string = await get_sales_byseller(String(seller_address));
      // console.log('get_mints_byowner', response_string);
      const response = response_string; // JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async getSalesBySellerAndChainId({ seller_address, chain_id }) {
    try {
      const response_string = await get_sales_byseller_and_chainid(
        String(seller_address),
        String(chain_id)
      );
      console.log('get_sales_byseller_and_chainid', response_string);
      const response = response_string; // JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async getSalesByOwner({ owner_address }) {
    try {
      const response_string = await get_sales_byowner(String(owner_address));
      // console.log('get_mints_byowner', response_string);
      const response = response_string; // JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async getSalesByOwnerAndChainId({ owner_address, chain_id }) {
    try {
      const response_string = await get_sales_byowner_and_chainid(
        String(owner_address),
        String(chain_id)
      );
      console.log('get_sales_byowner_and_chainid', response_string);
      const response = response_string; // JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async updateWallets({ data_string }) {
    try {
      const response_string = await update_wallets(String(data_string));
      // console.log('update_wallets', response_string);
      const response = response_string; // JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async updateMints({ data_string }) {
    // console.log('updateMints', String(data_string));
    try {
      const response_string = await update_mints(String(data_string));
      // console.log('update_mints', response_string);
      const response = response_string; // JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async updateSales({ data_string }) {
    // console.log('updateSales', String(data_string));
    try {
      const response_string = await update_sales(String(data_string));
      // console.log('update_sales', response_string);
      const response = response_string; // JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
