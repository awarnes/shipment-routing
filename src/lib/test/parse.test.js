'use strict';

const { streetName } = require('../parse');
const { TYPE_ERROR, STREET_NAME_NOT_FOUND_ERROR } = require('../errors/error-codes');
const ShipRouteError = require('../errors/ship-route-error');

describe('parse/', () => {
  describe('streetName/', () => {
    it('returns the street name from a simple address string', () => {
      expect(streetName('123 Fake St')).toEqual('Fake');
    });

    it('returns the street name from a complex address string', () => {
      expect(streetName('123 Lucifer Lane, Portland, OR 92123')).toEqual('Lucifer');
    });

    it('returns the street name from an address with apartment string', () => {
      expect(streetName('123 False Portal Avenue Apt C, Luna, NM 87120'))
        .toEqual('False Portal');
    });

    it('returns just the street name from an address with direction signifier', () => {
      expect(streetName('123 East Paddington Highway Apt C, Luna, NM 87120'))
        .toEqual('Paddington');
    });

    describe('errors/', () => {
      it('throws an error when a number is passed', () => {
        try {
          streetName(12);
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [12] not of type string');
        }
      });

      it('throws an error when an array is passed', () => {
        try {
          streetName(['apple', 'sauce']);
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [["apple","sauce"]] not of type string');
        }
      });

      it('throws an error when an object is passed', () => {
        try {
          streetName({ gary: 'Indiana', length: 12 });
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(TYPE_ERROR);
          expect(err.message).toBe('Error: [{"gary":"Indiana","length":12}] not of type string');
        }
      });

      it('throws an error when a street name cannot be found', () => {
        try {
          streetName('');
        } catch (err) {
          expect(err).toBeInstanceOf(ShipRouteError);
          expect(err.code).toBe(STREET_NAME_NOT_FOUND_ERROR);
          expect(err.message).toBe('Street name not found!');
        }
      });
    });
  });
});
