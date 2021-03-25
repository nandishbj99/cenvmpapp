import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private fileList: string[] = new Array<string>();
  private fileList$: Subject<string[]> = new Subject<string[]>();

  constructor(private http: HttpClient) { }

  public upload(fileName: string, fileContent: string): void {

    this.http.put('http://localhost:4100/files', {name: fileName, content: fileContent})
    .pipe()
    .subscribe((res) => {
      console.log(res)
    }, error => {
      console.log(error)
    });
  }
}
