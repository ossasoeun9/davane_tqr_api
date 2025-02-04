import crypto from "crypto";

const hashPassword = (password) => {
  const salt = process.env.HASH_SECRET || "default_salt";
  // console.log(salt)
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash;
}
const password = "zza1234567";
console.log(hashPassword(password))