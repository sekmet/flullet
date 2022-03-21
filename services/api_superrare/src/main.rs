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

module_manifest!();

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
pub fn featured_artworks(contract1: String, contract2: String) -> String {
  let data: String = format!(
      "-d {{\"contractAddresses\":[\"{}\",\"{}\"]}}",
      contract1, contract2
  );
  let url = "https://superrare.com/api/v2/nft/featured-artworks".to_string();

  let curl_params = vec![
      "-X".to_string(),
      "POST".to_string(),
      url,
      data,
      "-H".to_string(),
      "Content-Type: application/json".to_string(),
  ];

  let request_params: Vec<String> = curl_params;
  let result = curl(request_params);

  String::from_utf8(result.stdout).unwrap()
}


/// Permissions in `Config.toml` should exist to use host functions.
#[marine]
#[link(wasm_import_module = "host")]
extern "C" {
    fn curl(cmd: Vec<String>) -> MountedBinaryResult;
}