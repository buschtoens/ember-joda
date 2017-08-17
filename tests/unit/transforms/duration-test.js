import { moduleFor, test } from 'ember-qunit';
import { Duration } from 'ember-joda';

moduleFor('transform:duration', 'Unit | Transform | duration');

const fixtureSerialized = 'PT12H';
const fixtureDeserialized = Duration.ofHours(12);

test('it exists', function(assert) {
  const transform = this.subject();
  assert.ok(transform);
});

test('it correctly serializes data', function(assert) {
  const transform = this.subject();
  const serialized = transform.serialize(fixtureDeserialized);

  assert.strictEqual(serialized, fixtureSerialized);
});

test('it throws an error when trying to serialize a mismatching type', function(
  assert
) {
  const transform = this.subject();
  assert.throws(() => {
    transform.serialize({});
  }, /DurationTransform/);
});

test('it throws an error when trying to serialize a null or undefined value', function(
  assert
) {
  const transform = this.subject();
  assert.throws(() => {
    transform.serialize(null);
  }, /DurationTransform/);
  assert.throws(() => {
    transform.serialize();
  }, /DurationTransform/);
});

test('it correctly deserializes data', function(assert) {
  const transform = this.subject();
  const deserialized = transform.deserialize(fixtureSerialized);

  assert.ok(fixtureDeserialized.equals(deserialized));
});
