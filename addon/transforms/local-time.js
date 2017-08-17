import JodaTransform from './joda';
import { LocalTime } from 'ember-joda';

export default class LocalTimeTransform extends JodaTransform {
  static JodaClass = LocalTime;
}
