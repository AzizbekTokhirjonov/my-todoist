import jwt from "jsonwebtoken";

export const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errorsp[properties.path] = properties.message;
    });
    return errors;
  }
  if (err.code === 11000) {
    errors.email =
      "The email is already registered. Please register with a new email or login to your email";
    return errors;
  }
  if (err.message === "incorrect email") {
    errors.email = "The email is not registered";
  }
  if (err.message === "incorrect password") {
    errors.password = "The Password is incorrect";
  }
};

export const maxAge = 3 * 24 * 60 * 60;

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.ENCRYPTION_MESSAGE, {
    expiresIn: maxAge * 1000,
  });
};
