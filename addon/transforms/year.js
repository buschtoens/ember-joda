import JodaTransform from './joda';
import { Year } from 'ember-joda';

export default class YearTransform extends JodaTransform {
  static JodaClass = Year;
}
