/**
 * Service for handling debug logging
 * @remarks Uses console methods for output
 */
class DebugService {
  private static debugMode = false;

  /**
   * Enables debug mode
   */
  public static enableDebug(): void {
    DebugService.debugMode = true;
  }

  /**
   * Disables debug mode
   */
  public static disableDebug(): void {
    DebugService.debugMode = false;
  }

  /**
   * Logs messages if debug mode is enabled
   * @param message - The message to log
   * @param optionalParams - Additional parameters to log
   */
  public static log(message: string, ...optionalParams: unknown[]): void {
    if (DebugService.debugMode) {
      console.log(message, ...optionalParams);
    }
  }

  /**
   * Logs errors if debug mode is enabled
   * @param message - The error message to log
   * @param optionalParams - Additional parameters to log
   */
  public static error(message: string, ...optionalParams: unknown[]): void {
    if (DebugService.debugMode) {
      console.error(message, ...optionalParams);
    }
  }
}

export default DebugService;
