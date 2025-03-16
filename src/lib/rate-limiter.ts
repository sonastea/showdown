import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

export const rateLimiter: RateLimitRequestHandler = rateLimit({
  keyGenerator: (req) =>
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.connection.remoteAddress,
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50, // Limit each IP to 50 requests per `window` (here, per 5 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default rateLimiter;
