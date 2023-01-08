import cookie from "cookie";

export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const { username, password } = req.body;

    if (username === "admin" && password === "123") {
      res.setHeader(
        "set-cookie",
        cookie.serialize("token", process.env.TOKEN, {
          maxAge: 60 * 60 * 12,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json("successfull");
    } else {
      res.status(400).json("wrong credentials");
    }
    try {
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
