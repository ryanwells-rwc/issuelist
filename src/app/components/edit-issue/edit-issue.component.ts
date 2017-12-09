import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Issue } from '../../models/Issue';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css']
})
export class EditIssueComponent implements OnInit {
  id: string;
  issue: Issue = {
    title:'',
    description:'',
    assignee:'',
    kind:'',
    priority:0
  }
  
  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // Get issue
    this.issueService.getIssue(this.id).subscribe(issue => {
      this.issue = issue;
    });
  }

  onSubmit({value, valid}: {value: Issue, valid: boolean}){
    if(!valid){
      this.flashMessagesService.show('Please fill in all fields', {
        cssClass:'alert-danger', timeout: 4000
      });
      this.router.navigate(['edit-issue/'+this.id]);
    } else {
      // Update issue
      this.issueService.updateIssue(this.id, value);
      this.flashMessagesService.show('Issue updated', {
        cssClass:'alert-success', timeout: 4000
      });
      this.router.navigate(['/issue/'+this.id]);
    }
  }

}
