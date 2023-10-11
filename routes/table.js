import express from "express";
import { connection } from "../database/database.js";
const router = express.Router();

const getTableNames = () => {
  const query =
    "SELECT table_name FROM information_schema.tables WHERE table_schema = ?";
  connection.query(query, [process.env.DB_NAME]),
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        const tableNames = results.map((result) => result.table_name);
        callback(null, tableNames);
      }
    };
};
// .then((results) => {
//   console.log("resssss", results);
//   const tableNames = results.map((result) => result.TABLE_NAME);
//   console.log("tablenamesssss", tableNames);

//   //   // Define routes based on the retrieved table names
//   tableNames.forEach((tableName) => {
//     console.log("tableName", tableName);
//     router.get(`/${tableName}`, (req, res) => {
//       res.send({ message: `${tableName} called for get` });
//       //       // Fetch data from the specified table and return it in the response
//       //     });

//       //     router.post(`/${tableName}`, (req, res) => {
//       //       res.send({ message: `${tableName} called for post` });
//       //       // Insert data into the specified table and return the result in the response
//       //     });

//       //     // Similar routes for other HTTP methods (PUT, DELETE)
//     });
//   });

//   return tableNames;
// })
// .catch((err) => {
//   console.log("errrrr", err);
// });
// };

// Promise.resolve(getTableNames());
// Create API routes dynamically for each table
getTableNames((err, tableNames) => {
    console.log(1);
    if (err) {
      console.error("Error fetching table names:", err);
      return;
    }
  
    router.get('/',(req,res) => {
        res.send({message:" get called!!!!!"})
    })

    // Define routes based on the retrieved table names
    tableNames.forEach((tableName) => {
      router.get(`/${tableName}`, (req, res) => {
        // Fetch data from the specified table and return it in the response
      });
  
      router.post(`/${tableName}`, (req, res) => {
        // Insert data into the specified table and return the result in the response
      });
  
      // Similar routes for other HTTP methods (PUT, DELETE)
    });
  });
  

// Create API routes dynamically for each table
// getTableNames((err, tableNames) => {
//   if (err) {
//     console.error("Error fetching table names:", err);
//     return;
//   }

//   // Define routes based on the retrieved table names
//   tableNames.forEach((tableName) => {
//     console.log("tableName",tableName);
//     router.get(`/${tableName}`, (req, res) => {
//       res.send({ message: `${tableName} called for get` });
//       // Fetch data from the specified table and return it in the response
//     });

//     router.post(`/${tableName}`, (req, res) => {
//       res.send({ message: `${tableName} called for post` });
//       // Insert data into the specified table and return the result in the response
//     });

//     // Similar routes for other HTTP methods (PUT, DELETE)
//   });
// });

// (async() => {
//     getTableNames().then(data => {
//         console.log("Dataaa",data);
//      })
// })()
// const a = await getTableNames()
// console.log("a*****",a);

// // Define a dynamic route for a table
// router.get("/api/:table", (req, res) => {
//   const tableName = req.params.table;
//   // Execute a stored procedure based on the table name
//   // Fetch data from the table using the stored procedure
//   // Return the data in the response
// });

// router.post("/api/:table", (req, res) => {
//   const tableName = req.params.table;
//   // Execute a stored procedure based on the table name
//   // Insert data into the table using the stored procedure
//   // Return the result in the response
// });

router.get('/',(req,res) => {
    res.send({message:" get called!!!!!"})
})

export default router;
