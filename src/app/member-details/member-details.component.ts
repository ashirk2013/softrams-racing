import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Member } from '../member';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];

  constructor(private fb: FormBuilder, private appService: AppService,
    private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.getMember();
    this.appService.getTeams().subscribe(teams => this.teams = teams);
  }

  ngOnChanges() {}

  onSubmit() {
    this.memberModel = Object.assign({}, this.memberModel, this.memberForm.value);
    if (this.memberModel.id) {
      this.appService.updateMember(this.memberModel)
        .subscribe(() => this.router.navigate(['/members']));
    } else {
      this.appService.addMember(this.memberModel)
        .subscribe(() => this.router.navigate(['/members']));
    }
  }

  getMember(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    if (id != null && id != 0) {
      this.appService.getMember(id)
        .subscribe(member => {
          this.memberModel = member;
          this.initMemberForm(member);
        });
    } else {
      this.initMemberForm();
    }
  }

  initMemberForm(member?: Member): void {
    if (member) {
      this.memberForm = new FormGroup({
        firstName: new FormControl(member.firstName, Validators.required),
        lastName: new FormControl(member.lastName, Validators.required),
        jobTitle: new FormControl(member.jobTitle, Validators.required),
        team: new FormControl(member.team, Validators.required),
        status: new FormControl(member.status, Validators.required)
      });
    } else {
      this.memberForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        jobTitle: new FormControl('', Validators.required),
        team: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required)
      });
    }
  }
}
