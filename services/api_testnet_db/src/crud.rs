/*
 * Copyright 2021 Fluence Labs Limited
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
use marine_rs_sdk::marine;
use marine_sqlite_connector;
use marine_sqlite_connector::{Connection, Value};
use serde_json;
use serde::Deserialize;
//use crate::auth::is_owner;
use crate::get_connection;


pub fn create_table(conn: &Connection) -> std::result::Result<(), marine_sqlite_connector::Error> {
    let res = conn.execute(
      "CREATE TABLE IF NOT EXISTS wallets ('address' VARCHAR(49) PRIMARY KEY, 'network' VARCHAR(30), 'chain_id' VARCHAR(16), 'created_at' TEXT DEFAULT CURRENT_TIMESTAMP);
       CREATE TABLE IF NOT EXISTS mints ('collection_id' VARCHAR(10) PRIMARY KEY, 'owner_address' VARCHAR(49), 'contract_address' VARCHAR(49), 'network' VARCHAR(30), 'chain_id' VARCHAR(32), 'token_id' VARCHAR(255), 'created_at' TEXT DEFAULT CURRENT_TIMESTAMP);
       CREATE TABLE IF NOT EXISTS sales ('sale_id' VARCHAR(10) PRIMARY KEY, 'item_id' VARCHAR(21), 'owner_address' VARCHAR(49), 'seller_address' VARCHAR(49), 'contract_address' VARCHAR(49), 'market_address' VARCHAR(49), 'network' VARCHAR(30), 'chain_id' VARCHAR(32), 'token_id' VARCHAR(255), 'price' VARCHAR(30), 'price_currency' VARCHAR(6), 'sold' VARCHAR(6), 'created_at' TEXT DEFAULT CURRENT_TIMESTAMP);",
    );
    res
}

/*pub fn initialize_db(db_name: String) -> bool {
    // Open DB in tmp storage
    let path = format!("/tmp/{}.sqlite", db_name);
    let conn = Connection::open(path).expect("Error opening database");
    conn.execute(
        "CREATE TABLE IF NOT EXISTS wallets ('id' INTEGER PRIMARY KEY AUTOINCREMENT, 'address' VARCHAR(255));",
    ).expect("Error creating table");
    true
}*/

#[marine]
#[derive(Debug, Deserialize)]
pub struct UpdateResult {
    pub success: bool,
    pub err_str: String,
}

#[marine]
pub fn update_wallets(data_string: String) -> UpdateResult {
    /*if !is_owner() {
        return UpdateResult {
            success: false,
            err_str: "You are not the owner".into(),
        };
    }*/

    let obj: serde_json::Value = serde_json::from_str(&data_string).unwrap();
    let obj = obj["result"].clone();
    println!("get_obj_json: {:?}", obj);

    let conn = get_connection();

    let insert = "INSERT INTO wallets (address, network, chain_id) VALUES (?,?,?)";
    let mut ins_cur = conn.prepare(insert).unwrap().cursor();

    let insert = ins_cur.bind(&[
      Value::String(obj["address"].to_string()),
      Value::String(obj["network"].to_string()),
      Value::String(obj["chain_id"].to_string())
    ]);

    if insert.is_ok() {
        ins_cur.next().unwrap();
        let mut select = conn
            .prepare("SELECT * FROM wallets")
            .unwrap()
            .cursor();
        while let Some(row) = select.next().unwrap() {
            println!("select wallet {:?}", row);
            println!(
                "{}, {}, {}, {}",
                row[0].as_string().unwrap(),
                row[1].as_string().unwrap(),
                row[2].as_string().unwrap(),
                row[3].as_string().unwrap(),
            );
        }
        return UpdateResult {
            success: true,
            err_str: "".into(),
        };
    }

    UpdateResult {
        success: false,
        err_str: "Insert failed".into(),
    }

}

#[marine]
#[derive(Debug, Deserialize)]
pub struct Wallets {
    pub address: String,
    pub network: String,
    pub chain_id: String,
    pub created_at: String,
}

impl Wallets {
    fn from_row(row: &[Value]) -> Self {
        Wallets {
            address: row[0].as_string().unwrap().into(),
            network: row[1].as_string().unwrap().into(),
            chain_id: row[2].as_string().unwrap().into(),
            created_at: row[3].as_string().unwrap().into(),
        }
    }

    fn from_err() -> Self {
        Wallets {
            address: String::from("x".to_string()),
            network: String::from("x".to_string()),
            chain_id: String::from("x".to_string()),
            created_at: String::from("x".to_string()),
        }
    }
}

#[marine]
pub fn get_wallets() -> Vec<Wallets> {
    // let db_path = "/tmp/db.sqlite";
    let conn = get_connection();
    let mut mt_wallets = Vec::new(); //Wallet::from_err();

    let select = conn.prepare("SELECT * FROM wallets");
    let result = match select {
        Ok(s) => {
            let mut select = s.cursor();
            while let Some(row) = select.next().unwrap() {
                println!("get wallets: {:?}", row);
                mt_wallets.push(Wallets::from_row(row));
            }
            return mt_wallets;
        }
        Err(_e) => mt_wallets,
    };
    result
}


#[marine]
pub fn get_wallet_byaddress(address: String) -> Wallets {
  let conn = get_connection();
  let mut mt_wallets = Wallets::from_err();
  let stmt = "SELECT * FROM wallets WHERE address = ?";
  let select = conn.prepare(stmt);

  let result = match select {
    Ok(s) => {
        let mut select = s.cursor();
        select.bind(&[Value::String(address)]).unwrap();
        while let Some(row) = select.next().unwrap() {
            println!("get my wallet: {:?}", row);
            mt_wallets = Wallets::from_row(row);
        }
        return mt_wallets;
    }
    Err(_e) => mt_wallets,
  };
  result

}


#[marine]
pub fn update_mints(data_string: String) -> UpdateResult {
    /*if !is_owner() {
        return UpdateResult {
            success: false,
            err_str: "You are not the owner".into(),
        };
    }*/

    let obj: serde_json::Value = serde_json::from_str(&data_string).unwrap();
    let obj = obj["result"].clone();
    println!("get_obj_json: {:?}", obj);

    let conn = get_connection();

    let insert = "INSERT INTO mints (collection_id, owner_address, contract_address, network, chain_id, token_id) VALUES (?,?,?,?,?,?)";
    let mut ins_cur = conn.prepare(insert).unwrap().cursor();
    let walled_id = Value::String(obj["owner_address"].to_string());

    let insert = ins_cur.bind(&[
      Value::String(obj["collection_id"].to_string()),      
      Value::String(obj["owner_address"].to_string()),
      Value::String(obj["contract_address"].to_string()),
      Value::String(obj["network"].to_string()),
      Value::String(obj["chain_id"].to_string()),
      Value::String(obj["token_id"].to_string()),
    ]);

    if insert.is_ok() {
        ins_cur.next().unwrap();
        let mut select = conn
            .prepare("SELECT * FROM mints WHERE owner_address = ?")
            .unwrap()
            .cursor();
            let minted = select.bind(&[
              walled_id,
            ]);
            //obj["wallet_id"].to_string()
          
        if minted.is_ok() {

          while let Some(row) = select.next().unwrap() {
              println!("select mints {:?}", row);
              println!(
                  "{}, {}, {}, {}, {}, {}, {}",
                  row[0].as_string().unwrap(),
                  row[1].as_string().unwrap(),
                  row[2].as_string().unwrap(),
                  row[3].as_string().unwrap(),
                  row[4].as_string().unwrap(),
                  row[5].as_string().unwrap(),
                  row[6].as_string().unwrap(),
              );
          }
          
          return UpdateResult {
            success: true,
            err_str: "".into(),
          };

        }
    }

    UpdateResult {
        success: false,
        err_str: "Insert failed".into(),
    }
}

#[marine]
#[derive(Debug, Deserialize)]
pub struct Mints {
  pub collection_id: String,  
  pub owner_address: String,
  pub contract_address: String,
  pub network: String,
  pub chain_id: String,
  pub token_id: String,
  pub created_at: String,
}

impl Mints {
    fn from_mint(row: &[Value]) -> Self {
      Mints {
            collection_id: row[0].as_string().unwrap().into(),        
            owner_address: row[1].as_string().unwrap().into(),
            contract_address: row[2].as_string().unwrap().into(),
            network: row[3].as_string().unwrap().into(),
            chain_id: row[4].as_string().unwrap().into(),
            token_id: row[5].as_string().unwrap().into(),
            created_at: row[6].as_string().unwrap().into(),
        }
    }

    fn from_mint_err() -> Self {
      Mints {
        collection_id: String::from(""),        
        owner_address: String::from(""),
        contract_address: String::from(""),
        network: String::from(""),
        chain_id: String::from(""),
        token_id: String::from(""),        
        created_at: String::from(""),
        }
    }
}

#[marine]
pub fn get_all_mints() -> Vec<Mints> {
    // let db_path = "/tmp/db.sqlite";
    let conn = get_connection();
    let mut mt_mints = Vec::new();//Mints::from_mint_err();

    let select = conn.prepare("SELECT * FROM mints");
    let result = match select {
        Ok(s) => {
            let mut select = s.cursor();
            while let Some(row) = select.next().unwrap() {
                println!("get_mints: {:?}", row);
                mt_mints.push(Mints::from_mint(row));
            }        
            return mt_mints;
        }
        Err(_e) => mt_mints,
    };
    result
}


#[marine]
pub fn get_mints_bytokenid(token_id: String) -> Vec<Mints> {
  let conn = get_connection();
  let mut mt_mints = Vec::new();//Mints::from_mint_err();
  let stmt = "SELECT * FROM mints WHERE token_id = ?";
  let select = conn.prepare(stmt);

  match select {
    Ok(s) => {
        let mut select = s.cursor();
        select.bind(&[Value::String(token_id)]).unwrap();
        while let Some(row) = select.next().unwrap() {
            println!("get token ids: {:?}", row);
            mt_mints.push(Mints::from_mint(row));
        }
        return mt_mints;
    }
    Err(_e) => mt_mints,
  }

}


#[marine]
pub fn get_mints_byowner(owner_address: String) -> Vec<Mints> {
  let conn = get_connection();
  let mut mt_mints = Vec::new();//Mints::from_mint_err();
  let stmt = "SELECT * FROM mints WHERE owner_address = ?";
  let select = conn.prepare(stmt);

  match select {
    Ok(s) => {
        let mut select = s.cursor();
        select.bind(&[Value::String(owner_address)]).unwrap();
        while let Some(row) = select.next().unwrap() {
            println!("get minted: {:?}", row);
            mt_mints.push(Mints::from_mint(row));
        }
        return mt_mints;
    }
    Err(_e) => mt_mints,
  }

}


#[marine]
pub fn get_mints_byowner_and_chainid(owner_address: String, chain_id: String) -> Vec<Mints> {
  let conn = get_connection();
  let mut mt_mints = Vec::new();//Mints::from_mint_err();
  let stmt = "SELECT * FROM mints WHERE owner_address = ? AND chain_id = ?";
  let select = conn.prepare(stmt);

  match select {
    Ok(s) => {
        let mut select = s.cursor();
        select.bind(&[Value::String(owner_address), Value::String(chain_id)]).unwrap();
        while let Some(row) = select.next().unwrap() {
            println!("get minted: {:?}", row);
            mt_mints.push(Mints::from_mint(row));
        }
        return mt_mints;
    }
    Err(_e) => mt_mints,
  }

}


#[marine]
pub fn update_sales(data_string: String) -> UpdateResult {
    /*if !is_owner() {
        return UpdateResult {
            success: false,
            err_str: "You are not the owner".into(),
        };
    }*/

    let obj: serde_json::Value = serde_json::from_str(&data_string).unwrap();
    let obj = obj["result"].clone();
    println!("get_obj_json: {:?}", obj);

    let conn = get_connection();

    let insert = "INSERT INTO sales (sale_id, item_id, owner_address, seller_address, contract_address, market_address, network, chain_id, token_id, price, price_currency, sold) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    let mut ins_cur = conn.prepare(insert).unwrap().cursor();
    let walled_id = Value::String(obj["seller_address"].to_string());

    let insert = ins_cur.bind(&[
      Value::String(obj["sale_id"].to_string()),      
      Value::String(obj["item_id"].to_string()),      
      Value::String(obj["owner_address"].to_string()),
      Value::String(obj["seller_address"].to_string()),
      Value::String(obj["contract_address"].to_string()),
      Value::String(obj["market_address"].to_string()),
      Value::String(obj["network"].to_string()),
      Value::String(obj["chain_id"].to_string()),
      Value::String(obj["token_id"].to_string()),
      Value::String(obj["price"].to_string()),
      Value::String(obj["price_currency"].to_string()),
      Value::String(obj["sold"].to_string()),
    ]);

    if insert.is_ok() {
        ins_cur.next().unwrap();
        let mut select = conn
            .prepare("SELECT * FROM sales WHERE seller_address = ?")
            .unwrap()
            .cursor();
            let minted = select.bind(&[
              walled_id,
            ]);
            //obj["wallet_id"].to_string()
          
        if minted.is_ok() {

          while let Some(row) = select.next().unwrap() {
              println!("select sales {:?}", row);
              println!(
                  "{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}",
                  row[0].as_string().unwrap(),
                  row[1].as_string().unwrap(),
                  row[2].as_string().unwrap(),
                  row[3].as_string().unwrap(),
                  row[4].as_string().unwrap(),
                  row[5].as_string().unwrap(),
                  row[6].as_string().unwrap(),
                  row[7].as_string().unwrap(),
                  row[8].as_string().unwrap(),
                  row[9].as_string().unwrap(),
                  row[10].as_string().unwrap(),
                  row[11].as_string().unwrap(),
                  row[12].as_string().unwrap(),
              );
          }
          
          return UpdateResult {
            success: true,
            err_str: "".into(),
          };

        }
    }

    UpdateResult {
        success: false,
        err_str: "Insert failed".into(),
    }
}

#[marine]
#[derive(Debug, Deserialize)]
pub struct Sales {
  pub sale_id: String,
  pub item_id: String,
  pub owner_address: String,
  pub seller_address: String,
  pub contract_address: String,
  pub market_address: String,
  pub network: String,
  pub chain_id: String,
  pub token_id: String,
  pub price: String,
  pub price_currency: String,
  pub sold: String,
  pub created_at: String,
}

impl Sales {
    fn from_sale(row: &[Value]) -> Self {
      Sales {
            sale_id: row[0].as_string().unwrap().into(),     
            item_id: row[1].as_string().unwrap().into(),     
            owner_address: row[2].as_string().unwrap().into(),
            seller_address: row[3].as_string().unwrap().into(),
            contract_address: row[4].as_string().unwrap().into(),
            market_address: row[5].as_string().unwrap().into(),
            network: row[6].as_string().unwrap().into(),
            chain_id: row[7].as_string().unwrap().into(),
            token_id: row[8].as_string().unwrap().into(),
            price: row[9].as_string().unwrap().into(),
            price_currency: row[10].as_string().unwrap().into(),
            sold: row[11].as_string().unwrap().into(),
            created_at: row[12].as_string().unwrap().into(),
        }
    }

    fn from_sale_err() -> Self {
      Sales {
        sale_id: String::from(""), 
        item_id: String::from(""),     
        owner_address: String::from(""),
        seller_address: String::from(""),
        contract_address: String::from(""),
        market_address: String::from(""),
        network: String::from(""),
        chain_id: String::from(""),
        token_id: String::from(""),   
        price: String::from(""),   
        price_currency: String::from(""),   
        sold: String::from("false"),   
        created_at: String::from(""),
        }
    }
}

#[marine]
pub fn get_all_sales() -> Vec<Sales> {
    // let db_path = "/tmp/db.sqlite";
    let conn = get_connection();
    let mut mt_sales = Vec::new();//Sales::from_sale_err();

    let select = conn.prepare("SELECT * FROM sales");
    let result = match select {
        Ok(s) => {
            let mut select = s.cursor();
            while let Some(row) = select.next().unwrap() {
                println!("get sales: {:?}", row);
                mt_sales.push(Sales::from_sale(row));
            }        
            return mt_sales;
        }
        Err(_e) => mt_sales,
    };
    result
}


#[marine]
pub fn get_sales_bytokenid(token_id: String) -> Vec<Sales> {
  let conn = get_connection();
  let mut mt_sales = Vec::new();//Sales::from_sale_err();
  let stmt = "SELECT * FROM sales WHERE token_id = ?";
  let select = conn.prepare(stmt);

  match select {
    Ok(s) => {
        let mut select = s.cursor();
        select.bind(&[Value::String(token_id)]).unwrap();
        while let Some(row) = select.next().unwrap() {
            println!("get sales by token id: {:?}", row);
            mt_sales.push(Sales::from_sale(row));
        }
        return mt_sales;
    }
    Err(_e) => mt_sales,
  }

}


#[marine]
pub fn get_sales_byseller(seller_address: String) -> Vec<Sales> {
  let conn = get_connection();
  let mut mt_sales = Vec::new();//Sales::from_sale_err();
  let stmt = "SELECT * FROM sales WHERE seller_address = ?";
  let select = conn.prepare(stmt);

  match select {
    Ok(s) => {
        let mut select = s.cursor();
        select.bind(&[Value::String(seller_address)]).unwrap();
        while let Some(row) = select.next().unwrap() {
            println!("get minted: {:?}", row);
            mt_sales.push(Sales::from_sale(row));
        }
        return mt_sales;
    }
    Err(_e) => mt_sales,
  }

}


#[marine]
pub fn get_sales_byseller_and_chainid(seller_address: String, chain_id: String) -> Vec<Sales> {
  let conn = get_connection();
  let mut mt_sales = Vec::new();//Sales::from_sale_err();
  let stmt = "SELECT * FROM sales WHERE seller_address = ? AND chain_id = ?";
  let select = conn.prepare(stmt);

  match select {
    Ok(s) => {
        let mut select = s.cursor();
        select.bind(&[Value::String(seller_address), Value::String(chain_id)]).unwrap();
        while let Some(row) = select.next().unwrap() {
            println!("get my sales: {:?}", row);
            mt_sales.push(Sales::from_sale(row));
        }
        return mt_sales;
    }
    Err(_e) => mt_sales,
  }

}


#[marine]
pub fn get_sales_byowner(owner_address: String) -> Vec<Sales> {
  let conn = get_connection();
  let mut mt_sales = Vec::new();//Sales::from_sale_err();
  let stmt = "SELECT * FROM sales WHERE owner_address = ?";
  let select = conn.prepare(stmt);

  match select {
    Ok(s) => {
        let mut select = s.cursor();
        select.bind(&[Value::String(owner_address)]).unwrap();
        while let Some(row) = select.next().unwrap() {
            println!("get minted: {:?}", row);
            mt_sales.push(Sales::from_sale(row));
        }
        return mt_sales;
    }
    Err(_e) => mt_sales,
  }

}


#[marine]
pub fn get_sales_byowner_and_chainid(owner_address: String, chain_id: String) -> Vec<Sales> {
  let conn = get_connection();
  let mut mt_sales = Vec::new();//Sales::from_sale_err();
  let stmt = "SELECT * FROM sales WHERE owner_address = ? AND chain_id = ?";
  let select = conn.prepare(stmt);

  match select {
    Ok(s) => {
        let mut select = s.cursor();
        select.bind(&[Value::String(owner_address), Value::String(chain_id)]).unwrap();
        while let Some(row) = select.next().unwrap() {
            println!("get my sales: {:?}", row);
            mt_sales.push(Sales::from_sale(row));
        }
        return mt_sales;
    }
    Err(_e) => mt_sales,
  }

}