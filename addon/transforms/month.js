import JodaTransform from './joda';
import { Month } from 'ember-joda';

export default class MonthTransform extends JodaTransform {
  static JodaClass = Month;

  /**
   * Deserializes a serialized month.
   * @param  {Number} serialized
   * @return {Object}
   */
  deserialize(serialized) {
    return this.constructor.JodaClass.of(serialized);
  }

  /**
   * Serializes a month
   * @param  {Object} deserialized
   * @return {number}
   */
  serialize(deserialized) {
    this._assertJodaType(deserialized);

    return deserialized.value();
  }
}
