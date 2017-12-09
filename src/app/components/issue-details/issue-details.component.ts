import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Issue } from '../../models/Issue';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {
  id: string;
  issue: Issue;

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get issue
    this.issueService.getIssue(this.id).subscribe(issue => {
      this.issue = issue;
      console.log(this.issue);
    });
  }

  onDeleteClick(){
    if(confirm("Are you sure to delete?")){
      this.issueService.deleteIssue(this.id);
      this.flashMessagesService.show('Issue removed', {
        cssClass:'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

}
