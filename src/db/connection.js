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


// Export functions...
module.exports = {
    spCreateUser,
};
