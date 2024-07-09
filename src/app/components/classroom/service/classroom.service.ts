import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from '../model/classroom.model';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http: HttpClient) { }
  private baseUrl = "http://localhost:8080/classroom";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  getAllClassrooms() {
    const classroomUrl = `${this.baseUrl}`;
    return this.http.get<Classroom[]>(classroomUrl, this.httpOptions);
  }

  createClassroom(classroom: Classroom) {
    const classroomUrl = `${this.baseUrl}`;
    return this.http.post<Classroom>(classroomUrl, JSON.stringify(classroom), this.httpOptions);
  }

  findClassroom(id: number): Observable<any> {
    const classroomUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<Classroom>(classroomUrl, this.httpOptions);
  }

  deleteClassroom(id: number) {
    const classroomUrl: string = `${this.baseUrl}/${id}`;
    return this.http.delete(classroomUrl, this.httpOptions);
  }

  updateClassroom(classroom: Classroom) {
    const id = classroom.id;
    const classroomUrl = `${this.baseUrl}/${id}`;
    return this.http.put(classroomUrl, classroom, this.httpOptions)
  }
}
