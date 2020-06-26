import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Member } from './member';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private api = 'http://localhost:8000/api';
  username: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, private messageService: MessageService) {}

  // Returns all members
  getMembers() {
    return this.http
      .get<Member[]>(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  addMember(member): Observable<Member> {
    return this.http
      .post(`${this.api}/members`, member, this.httpOptions)
      .pipe(
        tap((newMember: Member) => this.messageService.add(`added member with idd=${newMember.id}`)),
        catchError(this.handleError)
      );
  }

  getTeams() {
    return this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
