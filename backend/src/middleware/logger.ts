import { Request, Response, NextFunction } from 'express';

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

// Get color based on status code
const getStatusColor = (statusCode: number): string => {
  if (statusCode >= 500) return colors.red;
  if (statusCode >= 400) return colors.yellow;
  if (statusCode >= 300) return colors.cyan;
  if (statusCode >= 200) return colors.green;
  return colors.white;
};

// Get HTTP method color
const getMethodColor = (method: string): string => {
  switch (method) {
    case 'GET':
      return colors.green;
    case 'POST':
      return colors.blue;
    case 'PUT':
      return colors.yellow;
    case 'PATCH':
      return colors.magenta;
    case 'DELETE':
      return colors.red;
    default:
      return colors.white;
  }
};

// Format timestamp
const getTimestamp = (): string => {
  const now = new Date();
  return now.toISOString();
};

// API request logger middleware
export const apiLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  const timestamp = getTimestamp();

  // Log incoming request
  console.log(
    `${colors.dim}[${timestamp}]${colors.reset} ` +
    `${getMethodColor(req.method)}${req.method}${colors.reset} ` +
    `${colors.cyan}${req.path}${colors.reset} ` +
    `${colors.dim}from ${req.ip}${colors.reset}`
  );

  // Log request body for POST, PUT, PATCH
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && Object.keys(req.body).length > 0) {
    console.log(
      `${colors.dim}  ↳ Body:${colors.reset}`,
      JSON.stringify(req.body, null, 2)
    );
  }

  // Log query parameters if present
  if (Object.keys(req.query).length > 0) {
    console.log(
      `${colors.dim}  ↳ Query:${colors.reset}`,
      JSON.stringify(req.query, null, 2)
    );
  }

  // Capture the original res.json to log response
  const originalJson = res.json.bind(res);
  res.json = function (body: any) {
    const duration = Date.now() - startTime;
    const statusColor = getStatusColor(res.statusCode);

    // Log response
    console.log(
      `${colors.dim}[${getTimestamp()}]${colors.reset} ` +
      `${statusColor}${res.statusCode}${colors.reset} ` +
      `${getMethodColor(req.method)}${req.method}${colors.reset} ` +
      `${colors.cyan}${req.path}${colors.reset} ` +
      `${colors.dim}${duration}ms${colors.reset}`
    );

    // Log response body for errors or if verbose
    if (res.statusCode >= 400) {
      console.log(
        `${colors.red}  ↳ Error:${colors.reset}`,
        JSON.stringify(body, null, 2)
      );
    } else if (process.env.VERBOSE_LOGGING === 'true') {
      console.log(
        `${colors.dim}  ↳ Response:${colors.reset}`,
        JSON.stringify(body, null, 2)
      );
    }

    console.log(''); // Empty line for readability

    return originalJson(body);
  };

  next();
};

// Error logger middleware (should be used after error handler)
export const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const timestamp = getTimestamp();

  console.error(
    `${colors.red}${colors.bright}[ERROR]${colors.reset} ` +
    `${colors.dim}[${timestamp}]${colors.reset} ` +
    `${getMethodColor(req.method)}${req.method}${colors.reset} ` +
    `${colors.cyan}${req.path}${colors.reset}`
  );

  console.error(
    `${colors.red}  ↳ Message:${colors.reset}`,
    err.message
  );

  if (err.stack) {
    console.error(
      `${colors.red}  ↳ Stack:${colors.reset}\n`,
      err.stack
    );
  }

  console.log(''); // Empty line for readability

  next(err);
};

// Request summary logger (logs at the end of each request)
export const requestSummaryLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();

  // Listen for response finish event
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusColor = getStatusColor(res.statusCode);
    const timestamp = getTimestamp();

    // Create a summary log entry
    const logEntry = {
      timestamp,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent') || 'unknown',
    };

    // Log summary in a compact format
    console.log(
      `${colors.dim}[SUMMARY]${colors.reset} ` +
      `${statusColor}${res.statusCode}${colors.reset} ` +
      `${getMethodColor(req.method)}${req.method.padEnd(6)}${colors.reset} ` +
      `${colors.cyan}${req.path.padEnd(30)}${colors.reset} ` +
      `${colors.dim}${duration}ms${colors.reset}`
    );
  });

  next();
};
