import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { mailGlobalVariable, mailService } from './mail.service';

import { MailboxComponent } from './mailbox.component';
import { ListingComponent } from './listing/listing.component';
import { DetailComponent } from './detail/detail.component';
import { ComposeComponent } from './compose/compose.component';

export const routes = [
    {
        path: '',
        component: MailboxComponent,
        children: [
            { path: '', redirectTo: 'apps/mail/inbox', pathMatch: 'full' },
            { path: ':type', component: ListingComponent },
            { path: 'compose', component: ComposeComponent },
            { path: ':type/:id', component: DetailComponent }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        MailboxComponent,
        ListingComponent,
        DetailComponent,
        ComposeComponent
    ],
    providers: [mailGlobalVariable, mailService]
})
export class MailModule { }
