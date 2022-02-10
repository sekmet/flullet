#!/bin/sh

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

rm -f artifacts/* || true
mkdir -p artifacts

cp target/wasm32-wasi/release/api_testnet_opensea.wasm artifacts/
cp target/wasm32-wasi/release/api_testnet_rarible.wasm artifacts/
cp target/wasm32-wasi/release/api_superrare.wasm artifacts/