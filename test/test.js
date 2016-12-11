require('source-map-support').install();
import 'babel-polyfill';
import {properties, propertiesCount} from '../lib/app.js';
const assert     = require('assert'); // TODO: I should use Chai
import _         from 'lodash';
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

describe('obj-properties', function () {
    describe('properties', function () {
        it('should return an empty array on "own" properties of the empty literal'
           , function () {
               assert.deepEqual(properties({}, 'own'), []);
           });
        it('should correctly return the names of the own properties of a test object'
           , function () {
               const test = {a:1, b: 2};
               assert.deepEqual(properties     (test, 'own', x=>x.prop), ['a', 'b']);
               assert.equal    (propertiesCount(test, 'own')           , 2);
           });
        it('should correctly return the full structure of properties of a test object'
           , function () {
               const test = {a: 1, b: 2};
               const props = properties(test, 'own');
               const expected = [{prop: 'a', value: 1, object: test, depth: 0, height: 1, own: true, enumerable: true, symbol: false}
                               , {prop: 'b', value: 2, object: test, depth: 0, height: 1, own: true, enumerable: true, symbol: false}];
               assert.deepEqual(props, expected);
           });
        it('should correctly travel up the object chain'
           , function () {
               assert.equal(true, (()=>{return propertiesCount({}, '!own')>0;})());
           });
        it('can handle a string without throwing Reflect.ownKeys called on non-object'
           , function () {
               properties('foo');
           });
        it('it doesn\'t break with arrays'
           , function () {
               const a = properties([], 'true', x=>x.prop);
               const b = properties([{elements:1}, {dont: 3}, {matter: 0}], 'true', x=>x.prop);
               assert.equal(false, _.isEqual(a, b));
           });                
    });
});
         
