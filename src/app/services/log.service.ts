export class Logger {

  info(msg: string): void {
    console.info('%c' + msg, 'color: #6495ED');
  }
  warn(msg: string): void {
    console.warn('%c' + msg, 'color: #FF8C00');
  }
  error(msg: string): void {
    console.error('%c' + msg, 'color: #DC143C');
  }
}
