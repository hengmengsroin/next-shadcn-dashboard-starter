import { type IQuestion } from '../models/question.model';
import { CrudBaseService } from './crudBaseServices';

class QuestionApi extends CrudBaseService<IQuestion> {
  constructor() {
    super();
    this.basePath = 'questions';
  }
}

export const questionAPI = new QuestionApi();
