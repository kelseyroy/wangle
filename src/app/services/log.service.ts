import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

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
