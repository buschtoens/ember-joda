import { moduleFor, test } from 'ember-qunit';
import { MonthDay } from 'ember-joda';

moduleFor('transform:month-day', 'Unit | Transform | month day');

const fixtureSerialized = '--01-03';
const fixtureDeserialized = MonthDay.of(1, 3);

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
  }, /MonthDayTransform/);
});

test('it serializes as null, when trying to serialize a null or undefined value', function(assert) {
  const transform = this.subject();
  assert.equal(transform.serialize(null), null);
  assert.equal(transform.serialize(), null);
});

test('it correctly deserializes data', function(assert) {
  const transform = this.subject();
  const deserialized = transform.deserialize(fixtureSerialized);

  assert.ok(fixtureDeserialized.equals(deserialized));
});
