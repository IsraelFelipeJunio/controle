import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { DashboardDTO } from '../model/dashboard-dto';

@Injectable({providedIn: 'root'})
export class DashboardService {

  constructor(private http: HttpClient) { }

  listarDashboard(): Observable<DashboardDTO> {
    return this.http.get<any>(`${environment.apiUrl}/dashboard`);
  }

}
