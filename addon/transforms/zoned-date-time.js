import JodaTransform from './joda';
import { ZonedDateTime } from 'ember-joda';

export default class ZonedDateTimeTransform extends JodaTransform {
  static JodaClass = ZonedDateTime;
}
