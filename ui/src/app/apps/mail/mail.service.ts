import { Injectable } from '@angular/core';
import { Mailbox } from './mailbox';
import { mailboxList } from './mailbox-data';
import { User } from './user-data';


@Injectable()
export class mailGlobalVariable {
    public page = 1;
    public pageSize = 6;
    public collectionSize = 0;

    public topLable = '';
    public mailList: Mailbox[] = [];
    public selectedMail: Mailbox |null= null;
    public selectedUser: User |null= null;

    public users: User[] = [];
    public inboxList: Mailbox[] = [];
    public sentList: Mailbox[] = [];
    public draftList: Mailbox[] = [];
    public spamList: Mailbox[] = [];
    public trashList: Mailbox[] = [];

    public isShow = false;
    inboxCount = 0;
    spamCount = 0;
    draftCount: number = 0;
    replyShow: boolean = false;
    addClass: boolean = true;
    type: string='';

}


@Injectable()
export class mailService {

    public getInbox() {
        return mailboxList.filter(mail => mail.mailbox === 'Inbox');
    }
    public getSent() {
        return mailboxList.filter(mail => mail.mailbox === 'Sent');
    }
    public getDraft() {
        return mailboxList.filter(mail => mail.mailbox === 'Draft');
    }
    public getSpam() {
        return mailboxList.filter(mail => mail.mailbox === 'Spam');
    }
    public getTrash() {
        return mailboxList.filter(mail => mail.mailbox === 'Trash');
    }

}