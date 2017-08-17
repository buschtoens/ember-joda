import JodaTransform from './joda';
import { Period } from 'ember-joda';

export default class PeriodTransform extends JodaTransform {
  static JodaClass = Period;
}
