const sql = require("mssql");

// Connection Object
const config = {
  user: "sa",
  password: "root",
  server: "localhost",
  database: "PetCare",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Functions

async function spLogin(email, password) {
  try {
    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .input("email", sql.VarChar(60), email)
      .input("password", sql.VarChar(30), password)
      .execute("spPetCare_Login");

    if (result.recordset.length > 0) {
      const Info = {
        success: true,
        userInfo: result.recordset[0]
      }
      return Info;
    }
    return false;
  } catch (error) {
    console.error(`Error executing spPetCare_Login: ${error}.`);
    return false;
  }
}

async function spCreateUser(name, surnames, email, password) {
  try {
    const pool = await sql.connect(config);

    await pool
      .request()
      .input("nombre", name)
      .input("apellidos", surnames)
      .input("email", email)
      .input("contrasena", password)
      .execute("spPetCare_CreateUser");

    console.log("User created succesfully");
    return true;
  } catch (error) {
    console.error(`Error executing spPetCare_CreateUser: ${error}.`);
    return false;
  }
}

async function spCreatePet(name, surnames, email, password) {
  try {
    const pool = await sql.connect(config);

    await pool
      .request()
      .input("nombre", name)
      .input("apellidos", surnames)
      .input("email", email)
      .input("contrasena", password)
      .execute("spPetCare_CreateUser");

    console.log("User created succesfully");
    return true;
  } catch (error) {
    console.error(`Error executing spPetCare_CreateUser: ${error}.`);
    return false;
  }
}

async function spGetPetsByUserId(id) {
  try {
    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .input("UserId", sql.Int, id)
      .execute("spPetCare_GetPetsByUserId");

    // Print the result to make sure we're getting the data...
    return result.recordset;
    // return true;
  } catch (error) {
    console.error(`Error executing spPetCare_CreateUser: ${error}.`);
    return false;
  }
}


// Export functions...
module.exports = {
    spCreateUser,
    spCreatePet,
    spGetPetsByUserId,
    spLogin,
};
