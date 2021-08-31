import mysql from "mysql";

export default async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const mysqlConfig = {
      connectionLimit: 1,
      host: "44.196.200.146",
      user: "admin",
      password: "adminpassword",
      database: "commercetools",
      port: 3315,
    };
    let mysqlPool;

    if (!mysqlPool) {
      mysqlPool = mysql.createPool(mysqlConfig);
    }

    mysqlPool.getConnection((err, connection) => {
      if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
          console.error("Database connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
          console.error("Database has too many connections.");
        }
        if (err.code === "ECONNREFUSED") {
          console.error("Database connection was refused.");
        }
        if (err.code === "ETIMEDOUT") {
          console.error("Database connection was timed out.");
        } else {
          console.error("Database connection was timed out.");
        }
      }

      if (connection) {
        connection.release();
      }
    });
    mysqlPool.query(
      `INSERT INTO Orders (orderId, customerId, customerEmail) VALUES('${data.orderid}','${data.customername}', '${data.customeremail}')`,
      function (err, result, fields) {
        if (err) {
          throw new Error(err);
          return false;
        }
        res.status(200).send(result);
        return true;
      }
    );
  }
};
