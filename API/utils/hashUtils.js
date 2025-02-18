import crypto from "node:crypto";

const hashPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "RSA-SHA1")
    .toString("hex");

  return { salt, hash };
};

const checkPassword = (password, salt, hash) => {
  const validatedHashed = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "RSA-SHA1")
    .toString("hex");

  return hash === validatedHashed;
};

const applyPasswordValidatingAndHashing = (schema) => {
  schema.pre("save", function (next) {
    if (!this.isModified("hash")) return next();

    const { hash, salt } = hashPassword(this.hash);
    this.hash = hash;
    this.salt = salt;
    next();
  });
};

export { hashPassword, checkPassword, applyPasswordValidatingAndHashing };
