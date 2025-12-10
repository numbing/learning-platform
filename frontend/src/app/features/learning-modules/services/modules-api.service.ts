import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../../core/services/http-client.service';
import { LearningModule } from '../models/learning-module.model';
import { Category } from '../models/category.enum';

@Injectable({
  providedIn: 'root',
})
export class ModulesApiService {
  private readonly endpoint = '/api/modules';

  constructor(private readonly httpClient: HttpClientService) {}

  getAllModules(): Observable<LearningModule[]> {
    return this.httpClient.get<LearningModule[]>(this.endpoint);
  }

  getModulesByCategory(category: Category): Observable<LearningModule[]> {
    return this.httpClient.get<LearningModule[]>(
      `${this.endpoint}?category=${encodeURIComponent(category)}`,
    );
  }

  updateModuleCompletion(moduleId: string, completed: boolean): Observable<LearningModule> {
    return this.httpClient.patch<LearningModule>(
      `${this.endpoint}/${moduleId}`,
      { completed },
    );
  }
}
