import {Routes} from "@angular/router";
import {ChatComponent} from "./chat.component";
import {ConversationsListComponent} from "./conversations-list/conversations-list.component";

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
]
