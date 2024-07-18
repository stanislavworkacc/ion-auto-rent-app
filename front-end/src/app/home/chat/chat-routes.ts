import {Routes} from "@angular/router";
import {ChatComponent} from "./chat.component";
import {ConversationsListComponent} from "./conversations-list/conversations-list.component";
import {ConversationDetailComponent} from "./conversations-list/conversation-detail/conversation-detail.component";
import {ConversationResolver} from "./conversations-list/conversation-resolver";

export const CHAT_ROUTES: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      {
        path: '',
        component: ConversationsListComponent,
      }
    ]
  },
  {
    path: ':id',
    component: ConversationDetailComponent,
    resolve: { conversation: ConversationResolver }
  }
]
