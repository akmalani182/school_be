import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  subdomain?: string;
}

const subdomainMiddleware = (req, res: Response, next: NextFunction) => {
  const host = req.headers.host;

  if (!host) {
    return res.status(400).json({ error: "Host header missing" });
  }

  const subdomain = host.split(".")[0];

  if (!subdomain || subdomain === "www") {
    return res.status(400).json({ error: "Invalid subdomain" });
  }

  if (req.user.subdomain !== subdomain) {
    return res.status(403).json({ error: "you are not authorized to access this resource" });
  }

  req.subdomain = subdomain;
  next();
};

export default subdomainMiddleware;