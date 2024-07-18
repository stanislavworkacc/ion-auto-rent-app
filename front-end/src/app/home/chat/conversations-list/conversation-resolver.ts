import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {of} from "rxjs/internal/observable/of";

@Injectable({
  providedIn: 'root'
})
export class ConversationResolver implements Resolve<any> {
  private conversations = [
    { id: 1, person: 'John Doe', date: '2024-07-18', message: 'Hey, how are you?' },
    { id: 2, person: 'Jane Smith', date: '2024-07-17', message: 'Let’s catch up!' },
    { id: 3, person: 'Bob Johnson', date: '2024-07-16', message: 'Meeting at 3 PM?' },
    { id: 4, person: 'Alice Brown', date: '2024-07-15', message: 'Can you send the files?' },
    { id: 5, person: 'Tom Clark', date: '2024-07-14', message: 'Happy Birthday!' }
  ];

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = +route.paramMap.get('id');
    const conversation = this.conversations.find(c => c.id === id);
    return of(conversation);
  }
}
