import jwt from "jsonwebtoken";

export const createToken = (email) => {
    console.log(process.env.JWT_SECRET)
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const setAuthCookie = (res, email) => {
  const token = createToken(email);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // set true in production with HTTPS
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};