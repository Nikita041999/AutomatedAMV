import * as mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Function to create the stored procedure
function createProcedure(connection) {
  const dropProcedureSql = `DROP PROCEDURE IF EXISTS CreateMyTable;`;
  const createProcedureSql = `
      CREATE PROCEDURE CreateMyTable()
      BEGIN
        CREATE TABLE IF NOT EXISTS mytable (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255)
        );
      END;
    `;

  connection.query(dropProcedureSql, (err) => {
    if (err) {
      console.error("Error dropping existing procedure:", err);
    } else {
      console.log("Dropped existing procedure (if it existed)");

      connection.query(createProcedureSql, (err) => {
        if (err) {
          console.error("Error creating stored procedure:", err);
        } else {
          console.log("Stored procedure created or updated");
          // Call the stored procedure
          callProcedure(connection);
        }
      });
    }
  });
}

// Function to call the stored procedure
function callProcedure(connection) {
  connection.query("CALL CreateMyTable", (err, results) => {
    if (err) {
      console.error("Error calling stored procedure:", err);
    } else {
      console.log("Stored procedure called successfully");
    }

    // End the connection
    connection.end();
  });
}

// Fetch table names from the database
// export const getTableNames = (callback) => {
//   const query = "SELECT table_name FROM information_schema.tables WHERE table_schema = ?";
//   console.log("connection.config.database***",process.env.DB_NAME);
//   connection.query(query, [process.env.DB_NAME], (err, results) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       const tableNames = results.map((result) => result.TABLE_NAME);
//       console.log("tablenamesssss",tableNames);
//       callback(null, tableNames);
//     }
//   });
// }

// export const getTableNames = async () => {
//   const query =
//     "SELECT table_name FROM information_schema.tables WHERE table_schema = ?";
//   const results = connection.query(query, [process.env.DB_NAME]);
//   console.log("resssss",results);
//   const tableNames = results.map((result) => result.TABLE_NAME);
//   console.log("tablenamesssss", tableNames);
//   return tableNames;
  // })
  // .catch((err) => {
  //   return err;
  // });

  // , (err, results) => {
  //   if (err) {
  //     // callback(err, null);
  //   } else {
  //     console.log("res",results);
  //     const tableNames = results.map((result) => result.TABLE_NAME);
  //     console.log("tablenamesssss",tableNames);
  //     return tableNames
  //   }
  // });
// };

// Create a MySQL connection
export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
});

export async function getConnection() {
  dotenv.config();
  try {
    const connect = connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
      }
      console.log("Connected to MySQL");

      // Create a database
      connection.query("CREATE DATABASE IF NOT EXISTS mydatabase", (err) => {
        if (err) {
          console.error("Error creating database:", err);
        } else {
          console.log("Database created or already exists");

          // Select the database
          connection.query("USE mydatabase", (err) => {
            if (err) {
              console.error("Error selecting database:", err);
            } else {
              // console.log("Using mydatabase");

              // Create the stored procedure
              createProcedure(connection);

              // End the connection
              //   connection.end();
            }
          });
        }
      });
    });
    // return Promise.resolve(connect.promise());
  } catch (e) {
    throw e;
  }
}
