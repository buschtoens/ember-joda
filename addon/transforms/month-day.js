import JodaTransform from './joda';
import { MonthDay } from 'ember-joda';

export default class MonthDayTransform extends JodaTransform {
  static JodaClass = MonthDay;
}
