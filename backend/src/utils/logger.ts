// Utility logger for application-level logging

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
};

const getTimestamp = (): string => {
  return new Date().toISOString();
};

export const logger = {
  info: (message: string, ...args: any[]): void => {
    console.log(
      `${colors.dim}[${getTimestamp()}]${colors.reset} ` +
      `${colors.blue}[INFO]${colors.reset} ` +
      message,
      ...args
    );
  },

  success: (message: string, ...args: any[]): void => {
    console.log(
      `${colors.dim}[${getTimestamp()}]${colors.reset} ` +
      `${colors.green}[SUCCESS]${colors.reset} ` +
      message,
      ...args
    );
  },

  warn: (message: string, ...args: any[]): void => {
    console.warn(
      `${colors.dim}[${getTimestamp()}]${colors.reset} ` +
      `${colors.yellow}[WARN]${colors.reset} ` +
      message,
      ...args
    );
  },

  error: (message: string, error?: any): void => {
    console.error(
      `${colors.dim}[${getTimestamp()}]${colors.reset} ` +
      `${colors.red}[ERROR]${colors.reset} ` +
      message
    );
    if (error) {
      if (error instanceof Error) {
        console.error(`${colors.red}  ↳ ${error.message}${colors.reset}`);
        if (error.stack) {
          console.error(`${colors.dim}${error.stack}${colors.reset}`);
        }
      } else {
        console.error(error);
      }
    }
  },

  debug: (message: string, ...args: any[]): void => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `${colors.dim}[${getTimestamp()}]${colors.reset} ` +
        `${colors.magenta}[DEBUG]${colors.reset} ` +
        message,
        ...args
      );
    }
  },

  database: (message: string, ...args: any[]): void => {
    console.log(
      `${colors.dim}[${getTimestamp()}]${colors.reset} ` +
      `${colors.cyan}[DATABASE]${colors.reset} ` +
      message,
      ...args
    );
  },
};
