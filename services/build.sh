#!/usr/bin/env bash
set -o errexit -o nounset -o pipefail

# This script builds all subprojects and puts all created Wasm modules in one dir
(
  cd api_testnet_opensea || exit;
  cargo update --aggressive;
  marine build --release;
)

(
  cd api_testnet_rarible || exit;
  cargo update --aggressive;
  marine build --release;
)

(
  cd api_superrare || exit;
  cargo update --aggressive;
  marine build --release;
)

(
  cd api_nftkeys || exit;
  cargo update --aggressive;
  marine build --release;
)

(
  cd api_testnet_db || exit;
  cargo update --aggressive;
  marine build --release;
)


rm -f artifacts/* || true
mkdir -p artifacts

cp api_testnet_opensea/target/wasm32-wasi/release/api_testnet_opensea.wasm artifacts/
cp api_testnet_rarible/target/wasm32-wasi/release/api_testnet_rarible.wasm artifacts/
cp api_nftkeys/target/wasm32-wasi/release/api_nftkeys.wasm artifacts/
cp api_superrare/target/wasm32-wasi/release/api_superrare.wasm artifacts/
cp api_testnet_db/target/wasm32-wasi/release/api_testnet_db.wasm artifacts/

cd artifacts 
wget https://github.com/fluencelabs/sqlite/releases/download/v0.15.0_w/sqlite3.wasm
cd ..