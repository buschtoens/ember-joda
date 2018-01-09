import { moduleFor, test } from 'ember-qunit';
import { Month } from 'ember-joda';

moduleFor('transform:month', 'Unit | Transform | month');

const fixtureSerialized = 5;
const fixtureDeserialized = Month.of(5);

test('it exists', function(assert) {
  const transform = this.subject();
  assert.ok(transform);
});

test('it correctly serializes data', function(assert) {
  const transform = this.subject();
  const serialized = transform.serialize(fixtureDeserialized);

  assert.strictEqual(serialized, fixtureSerialized);
});

test('it throws an error when trying to serialize a mismatching type', function(assert) {
  const transform = this.subject();
  assert.throws(() => {
    transform.serialize({});
  }, /MonthTransform/);
});

test('it throws an error when trying to serialize a null or undefined value', function(assert) {
  const transform = this.subject();
  assert.throws(() => {
    transform.serialize(null);
  }, /MonthTransform/);
  assert.throws(() => {
    transform.serialize();
  }, /MonthTransform/);
});

test('it correctly deserializes data', function(assert) {
  const transform = this.subject();
  const deserialized = transform.deserialize(fixtureSerialized);

  assert.strictEqual(deserialized.toString(), fixtureDeserialized.toString());
});
