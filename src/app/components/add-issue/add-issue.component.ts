import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/Issue';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { IssueService } from '../../services/issue.service'; 

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css']
})
export class AddIssueComponent implements OnInit {
  issue: Issue = {
    title: '',
    description: '',
    assignee: '',
    kind: '',
    priority: 3
  }

  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private issueService: IssueService
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Issue, valid: boolean}){
    if(!valid){
      this.flashMessagesService.show('Please fill in all fields', {
        cssClass:'alert-danger', timeout: 4000
      });
      this.router.navigate(['add-issue']);
    } else {
      // Add New Issue
      this.issueService.newIssue(value);
      this.flashMessagesService.show('New issue added', {
        cssClass:'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }
}
