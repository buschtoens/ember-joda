import { moduleFor, test } from 'ember-qunit';
import { Instant } from 'ember-joda';

moduleFor('transform:instant', 'Unit | Transform | instant');

const fixtureSerialized = '2007-12-03T10:15:30Z';
const fixtureDeserialized = Instant.ofEpochMilli(1196676930000);

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
  }, /InstantTransform/);
});

test('it throws an error when trying to serialize a null or undefined value', function(assert) {
  const transform = this.subject();
  assert.throws(() => {
    transform.serialize(null);
  }, /InstantTransform/);
  assert.throws(() => {
    transform.serialize();
  }, /InstantTransform/);
});

test('it correctly deserializes data', function(assert) {
  const transform = this.subject();
  const deserialized = transform.deserialize(fixtureSerialized);

  assert.ok(fixtureDeserialized.equals(deserialized));
});
