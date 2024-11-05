// src/app/services/firestore.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  // Create a new document
  addDocument(collection: string, data: any, id?: string): Promise<void> {
    const docId = id || this.firestore.createId();
    return this.firestore.collection(collection).doc(docId).set({ id: docId, ...data });
  }

  addDocumentReturnID(collection: string, data: any, id?: string): Promise<string> {
    const docId = id || this.firestore.createId();
    return this.firestore.collection(collection).doc(docId).set({ id: docId, ...data })
        .then(() => docId);  // Retorna el docId después de agregar el documento
}

  // Read a document by ID
  getDocument(collection: string, id: string): Observable<any> {
    return this.firestore.collection(collection).doc(id).valueChanges();
  }

  // Read all documents in a collection
  getDocuments(collection: string): Observable<any[]> {
    return this.firestore.collection(collection).valueChanges();
  }

  // Update a document by ID
  updateDocument(collection: string, id: string, data: any): Promise<void> {
    return this.firestore.collection(collection).doc(id).update(data);
  }

  // Delete a document by ID
  deleteDocument(collection: string, id: string): Promise<void> {
    return this.firestore.collection(collection).doc(id).delete();
  }

  // Search document by restriction
  getDocumentsWhere(collection: string, field: string, value: any): Observable<any[]> {
    let collectionRef: AngularFirestoreCollection<any> = this.firestore.collection(collection);
    if (field && value) {
      collectionRef = this.firestore.collection(collection, ref => ref.where(field, '==', value));
    }
    return collectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getDocumentsWhereArrayContains(collection: string, field: string, value: any): Observable<any[]> {
    let collectionRef: AngularFirestoreCollection<any> = this.firestore.collection(collection);
    
    if (field && value) {
      collectionRef = this.firestore.collection(collection, ref => ref.where(field, 'array-contains', value));
    }

    return collectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getDocumentsWhereArrayElementMatches(collection: string, field: string, subfield: string, value: any): Observable<any[]> {
    let collectionRef: AngularFirestoreCollection<any> = this.firestore.collection(collection);
    
    return collectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }).filter(doc => {
          if (Array.isArray(doc[field])) {
            return doc[field].some((element:any) => element[subfield] === value);
          }
          return false;
        });
      })
    );
  }



}
