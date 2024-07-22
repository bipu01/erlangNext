import bcrypt from "bcryptjs";

export default async function encryptPassword(pass: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hash(pass, salt);
  return hashedPassword;
}
