import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FireStorageService {

    constructor(private storage: AngularFireStorage) { }

    uploadImage(folder: string, fileName: string, file: File): Observable<string> {
        const filePath = `${folder}/${fileName}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, file);

        return new Observable<string>(observer => {
        uploadTask.snapshotChanges().pipe(
            finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
                observer.next(url);
                observer.complete();
            }, error => {
                observer.error(error);
            });
            })
        ).subscribe();
        });
    }
}
