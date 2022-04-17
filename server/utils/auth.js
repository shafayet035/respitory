import bcrypt, { hash } from "bcrypt";

const saltCount = 12;

const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    // Generate Salt
    bcrypt.genSalt(saltCount, (err, salt) => {
      if (err) reject(err);

      // Generate Hashed Password
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);

        resolve(hash);
      });
    });
  });
};

const verifyPassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export { hashPassword, verifyPassword };
