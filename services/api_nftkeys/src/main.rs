/*
 * Copyright 2020 Fluence Labs Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#![allow(improper_ctypes)]

use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;

use marine_rs_sdk::WasmLoggerBuilder;
use marine_rs_sdk::MountedBinaryResult;

use graphql_client::{ GraphQLQuery };
//, Response 
//use serde_json::json;

module_manifest!();

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "./src/graphql/nftErc721.schema.graphql",
    query_path = "./src/graphql/nftErc721Collections.query.graphql",
    response_derives = "Debug,Serialize,PartialEq"
)]
struct GetErc721Collections;

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "./src/graphql/nftErc721.schema.graphql",
    query_path = "./src/graphql/nftErc721Collection.query.graphql",
    response_derives = "Debug,Serialize,PartialEq"
)]
struct GetERC721Collection;

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "./src/graphql/nftErc721.schema.graphql",
    query_path = "./src/graphql/nftErc721CollectionTokens.query.graphql",
    response_derives = "Debug,Serialize,PartialEq"
)]
struct GetERC721CollectionTokens;

/// Log level can be changed by `RUST_LOG` env as well.
pub fn main() {
    WasmLoggerBuilder::new().build().unwrap();
}

#[marine]
pub fn download(url: String) -> String {
   log::info!("download called with url {}\n", url);

   let result = curl(vec![url]);

   String::from_utf8(result.stdout).unwrap()
}


#[marine]
pub fn get_all_collections() -> String {

    let url = String::from("https://nftkey.app/graphql");
    /*let variables = referendum_view::Variables {
        id: id
    };*/
    let variables = get_erc721_collections::Variables {};

    let request_body = GetErc721Collections::build_query(variables);
    let request_string = serde_json::to_string(&request_body).unwrap();
   
    let curl_args = vec![
            String::from("-s"),
            String::from("-X"),
            String::from("POST"),
            String::from("-H"),
            String::from("Content-Type: application/json"),
            String::from("--data"),
            request_string,
            url,
        ];

    // println!("{:?}", curl_args);
    let response = curl(curl_args);
     
    let response = String::from_utf8(response.stdout).unwrap();
    let response_object: serde_json::Value = serde_json::from_str(&response).unwrap();
    let item_object = &response_object["data"]["erc721Collections"];

    serde_json::to_string(&item_object).unwrap()

}

#[marine]
pub fn get_collection_alias(alias: String) -> String {

    let url = String::from("https://nftkey.app/graphql");
    let variables = get_erc721_collection::Variables {
        alias: alias
    };
    let request_body = GetERC721Collection::build_query(variables);
    let request_string = serde_json::to_string(&request_body).unwrap();
   
    let curl_args = vec![
            String::from("-s"),
            String::from("-X"),
            String::from("POST"),
            String::from("-H"),
            String::from("Content-Type: application/json"),
            String::from("--data"),
            request_string,
            url,
        ];

    // println!("{:?}", curl_args);
    let response = curl(curl_args);
     
    let response = String::from_utf8(response.stdout).unwrap();
    let response_object: serde_json::Value = serde_json::from_str(&response).unwrap();
    let item_object = &response_object["data"]["erc721CollectionByAlias"];

    serde_json::to_string(&item_object).unwrap()
}


#[marine]
pub fn get_collection_tokens(alias: String) -> String {
    let url = String::from("https://nftkey.app/graphql");
    let variables = get_erc721_collection_tokens::Variables {
      alias: alias,
      tokenids: std::option::Option::from(["0".to_string(), "1".to_string(), "2".to_string(), "3".to_string(), "4".to_string(), "5".to_string(), "6".to_string(), "7".to_string(), "8".to_string(), "9".to_string(), "10".to_string(), "11".to_string(), "12".to_string(), "13".to_string(), "14".to_string(), "15".to_string(), "16".to_string(), "17".to_string(), "18".to_string(), "19".to_string(), "20".to_string(), "21".to_string(), "22".to_string(), "23".to_string(), "24".to_string(), "25".to_string(), "26".to_string(), "27".to_string(), "28".to_string(), "29".to_string(), "30".to_string(), "31".to_string(), "32".to_string(), "33".to_string(), "34".to_string(), "35".to_string(), "36".to_string(), "37".to_string(), "38".to_string(), "39".to_string(), "40".to_string(), "41".to_string(), "42".to_string(), "43".to_string(), "44".to_string(), "45".to_string(), "46".to_string(), "47".to_string(), "48".to_string(), "49".to_string(), "50".to_string(), "51".to_string(), "52".to_string(), "53".to_string(), "54".to_string(), "55".to_string(), "56".to_string(), "57".to_string(), "58".to_string(), "59".to_string()].to_vec()),
    };
    let request_body = GetERC721CollectionTokens::build_query(variables);
    let request_string = serde_json::to_string(&request_body).unwrap();
   
    let curl_args = vec![
            String::from("-s"),
            String::from("-X"),
            String::from("POST"),
            String::from("-H"),
            String::from("Content-Type: application/json"),
            String::from("--data"),
            request_string,
            url,
        ];

    // println!("{:?}", curl_args);
    let response = curl(curl_args);
     
    let response = String::from_utf8(response.stdout).unwrap();
    let response_object: serde_json::Value = serde_json::from_str(&response).unwrap();
    let item_object = &response_object["data"]["getERC721Tokens"]["tokens"];

    serde_json::to_string(&item_object).unwrap()
}


/// Permissions in `Config.toml` should exist to use host functions.
#[marine]
#[link(wasm_import_module = "host")]
extern "C" {
    fn curl(cmd: Vec<String>) -> MountedBinaryResult;
}