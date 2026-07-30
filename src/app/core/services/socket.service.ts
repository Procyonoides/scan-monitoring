import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, fromEvent, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket | null = null;

  private connectionStatus$ = new BehaviorSubject<boolean>(false);
  public status$: Observable<boolean> = this.connectionStatus$.asObservable();

  connect(): void {
    if (this.socket?.connected) return;

    this.socket = io(environment.socketUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 10000,
      reconnectionAttempts: Infinity
    });

    this.socket.on('connect', () => this.connectionStatus$.next(true));
    this.socket.on('disconnect', () => this.connectionStatus$.next(false));
    this.socket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err);
      this.connectionStatus$.next(false);
    });
    this.socket.on('reconnect', () => this.connectionStatus$.next(true));
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
    this.connectionStatus$.next(false);
  }

  on<T = any>(eventName: string): Observable<T> {
    if (!this.socket) {
      console.warn('Socket not connected. Call connect() first.');
      return new Observable(observer => observer.error('Socket not connected'));
    }
    return fromEvent<T>(this.socket, eventName);
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}