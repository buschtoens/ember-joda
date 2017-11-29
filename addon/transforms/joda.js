import Transform from 'ember-data/transform';
import { isNone } from '@ember/utils';
import { assert } from '@ember/debug';

/**
 * The base class for all joda transforms.
 * @protected
 */
export default class JodaTransform extends Transform {
  /**
   * Override this property in derived classes.
   * @type {Function}
   * @private
   */
  static JodaClass = null;

  constructor() {
    super(...arguments);

    assert(
      'You have to define a JodaClass for a JodaTransform.',
      typeof this.constructor.JodaClass === 'function'
    );
  }

  /**
   * Deserializes a serialized joda type.
   * @param  {String} serialized
   * @return {Object}
   */
  deserialize(serialized) {
    if (isNone(serialized)) return null;
    return this.constructor.JodaClass.parse(serialized);
  }

  /**
   * Serializes a joda type.
   * @param  {Object} deserialized
   * @return {String}
   */
  serialize(deserialized) {
    if (isNone(deserialized)) return null;
    this._assertJodaType(deserialized);
    return deserialized.toString();
  }

  /**
   * Asserts that the provided input is of the correct joda type.
   * @param  {Object} obj
   * @throws
   * @protected
   */
  _assertJodaType(obj) {
    const { constructor, constructor: { JodaClass } } = this;
    assert(
      `${constructor.name} can only serialize ${JodaClass.name} instances.`,
      obj instanceof JodaClass
    );
  }
}
