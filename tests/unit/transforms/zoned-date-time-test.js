import { moduleFor, test } from 'ember-qunit';
import { ZonedDateTime, ZoneId } from 'ember-joda';

moduleFor('transform:zoned-date-time', 'Unit | Transform | zoned date time');

const fixtureSerialized = '1996-01-03T13:37:42+02:00';
const fixtureDeserialized = ZonedDateTime.of(
  1996,
  1,
  3,
  13,
  37,
  42,
  0,
  ZoneId.of('+02:00')
);

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
  }, /ZonedDateTimeTransform/);
});

test('it throws an error when trying to serialize a null or undefined value', function(assert) {
  const transform = this.subject();
  assert.throws(() => {
    transform.serialize(null);
  }, /ZonedDateTimeTransform/);
  assert.throws(() => {
    transform.serialize();
  }, /ZonedDateTimeTransform/);
});

test('it correctly deserializes data', function(assert) {
  const transform = this.subject();
  const deserialized = transform.deserialize(fixtureSerialized);

  assert.ok(fixtureDeserialized.equals(deserialized));
});
