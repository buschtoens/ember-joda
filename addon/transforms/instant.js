import JodaTransform from './joda';
import { Instant } from 'ember-joda';

export default class InstantTransform extends JodaTransform {
  static JodaClass = Instant;
}
