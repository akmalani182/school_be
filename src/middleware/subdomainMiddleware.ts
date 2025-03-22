import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  subdomain?: string;
}

const subdomainMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const host = req.headers.host;
  
  if (!host) {
    return res.status(400).json({ error: "Host header missing" });
  }
  
  const subdomain = host.split(".")[0];
  
  if (!subdomain || subdomain === "www" || subdomain === "example") {
    return res.status(400).json({ error: "Invalid subdomain" });
  }
  
  req.subdomain = subdomain;
  next();
};

export default subdomainMiddleware;