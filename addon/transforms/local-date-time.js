import JodaTransform from './joda';
import { LocalDateTime } from 'ember-joda';

export default class LocalDateTimeTransform extends JodaTransform {
  static JodaClass = LocalDateTime;
}
