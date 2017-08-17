import JodaTransform from './joda';
import { Duration } from 'ember-joda';

export default class DurationTransform extends JodaTransform {
  static JodaClass = Duration;
}
