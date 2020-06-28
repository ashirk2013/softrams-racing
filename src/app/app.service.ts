import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Member } from './member';
import { Team } from './team';
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

  setUsername(name: string): void {
    this.username = name;
  }

  /** GET member by id. Will 404 if id not found */
  getMember(id: number): Observable<Member> {
    const url = `${this.api}/members/${id}`;
    return this.http.get<Member>(url).pipe(
      tap(_ => this.log(`fetched member id=${id}`)),
      catchError(this.handleError)
    );
  }

  // Returns all members
  getMembers(): Observable<Member[]> {
    return this.http
      .get<Member[]>(`${this.api}/members`, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched members')),
        catchError(this.handleError)
      );
  }

  getTeams(): Observable<Team[]> {
    return this.http
      .get<Team[]>(`${this.api}/teams`, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched teams')), 
        catchError(this.handleError)
      );
  }

  addMember(member: Member): Observable<Member> {
    return this.http
      .post<Member>(`${this.api}/members`, member, this.httpOptions)
      .pipe(
        tap((newMember: Member) => this.log(`added member w/ id=${newMember.id}`)),
        catchError(this.handleError)
      );
  }

  /** DELETE: delete the member from the server */
  deleteMember(member: Member | number): Observable<Member> {
    const id = typeof member === 'number' ? member : member.id;
    const url = `${this.api}/members/${id}`;

    return this.http.delete<Member>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted member id=${id}`)),
      catchError(this.handleError)
    );
  }

  /** PUT: update the member on the server */
  updateMember(member: Member | number): Observable<any> {
    const id = typeof member === 'number' ? member : member.id;
    const url = `${this.api}/members/${id}`;
    return this.http.put<Member>(url, member, this.httpOptions).pipe(
      tap(_ => this.log(`updated member id=${member.id}`)),
      catchError(this.handleError)
    );
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

  private log(message: string): void {
    this.messageService.add(`AppService: ${message}`);
  }
}
