import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesResolver implements Resolve<Course> {

  constructor(private service: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    if (route.params && route.params['id']) {
      // Faça o que você precisa fazer com o serviço aqui
      return this.service.loadById(route.params['id']);
    }
    // Se não houver parâmetros, retorne true ou false, dependendo da lógica do seu resolver
    return of({_id: '', name:'', category: ''});
  }
}
