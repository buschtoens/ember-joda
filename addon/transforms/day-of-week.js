import JodaTransform from './joda';
import { DayOfWeek } from 'ember-joda';

export default class DayOfWeekTransform extends JodaTransform {
  static JodaClass = DayOfWeek;
}
