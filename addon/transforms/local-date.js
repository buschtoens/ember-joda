import JodaTransform from './joda';
import { LocalDate } from 'ember-joda';

export default class LocalDateTransform extends JodaTransform {
  static JodaClass = LocalDate;
}
