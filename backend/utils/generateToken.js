import jwt from "jsonwebtoken";

export function generatetoken(res, user) {
  const token = jwt.sign(
    {
      userid: user._id,
      username: user.username,
      phonenumber: user.phonenumber,
      email: user.email,
    },
    "lipun"
  );

  console.log("genertaed sucessfully");

  res.cookie("token", token, {
    httpOnly: true, // Prevents JavaScript access (security)
    secure: false, // Set to `true` in production with HTTPS
    sameSite: "lax", // Ensures cross-site security
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  return token;
}

export function getuser(token) {
  try {
    const data = jwt.verify(token, "lipun");
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
