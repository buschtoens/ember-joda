import JodaTransform from './joda';
import { isNone } from '@ember/utils';
import { Month } from 'ember-joda';

export default class MonthTransform extends JodaTransform {
  static JodaClass = Month;

  /**
   * Deserializes a serialized month.
   * @param  {Number} serialized
   * @return {Object}
   */
  deserialize(serialized) {
    if (isNone(serialized)) return null;
    return this.constructor.JodaClass.of(serialized);
  }

  /**
   * Serializes a month
   * @param  {Object} deserialized
   * @return {number}
   */
  serialize(deserialized) {
    if (isNone(deserialized)) return null;
    this._assertJodaType(deserialized);

    return deserialized.value;
  }
}
