import { Component, OnInit } from '@angular/core';
import { mailGlobalVariable } from './mail.service';

@Component({
    selector: 'app-mailbox',
    templateUrl: './mailbox.component.html',
    styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {


    constructor(public ms: mailGlobalVariable) { }

    ngOnInit(): void { }
}
