import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Issue } from '../models/Issue';

@Injectable()
export class IssueService {
  issuesRef: AngularFireList<any>;
  issues: Observable<any[]>;
  issue: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.issuesRef = this.db.list('issues');
    this.issues = this.issuesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getIssues(){
    return this.issues;
  }

  newIssue(issue: Issue){
    this.issuesRef.push(issue);
  }

  getIssue(id: string){
    this.issue = this.db.object('/issues/'+id).valueChanges();
    return this.issue;
  }

  updateIssue(id: string, issue:Issue){
    return this.issuesRef.update(id, issue);
  }

  deleteIssue(id: string){
    return this.issuesRef.remove(id);
  }
}
