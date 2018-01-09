import { moduleFor, test } from 'ember-qunit';
import { Period } from 'ember-joda';

moduleFor('transform:period', 'Unit | Transform | period');

const fixtureSerialized = 'P4M';
const fixtureDeserialized = Period.ofMonths(4);

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
  }, /PeriodTransform/);
});

test('it throws an error when trying to serialize a null or undefined value', function(assert) {
  const transform = this.subject();
  assert.throws(() => {
    transform.serialize(null);
  }, /PeriodTransform/);
  assert.throws(() => {
    transform.serialize();
  }, /PeriodTransform/);
});

test('it correctly deserializes data', function(assert) {
  const transform = this.subject();
  const deserialized = transform.deserialize(fixtureSerialized);

  assert.ok(fixtureDeserialized.equals(deserialized));
});
