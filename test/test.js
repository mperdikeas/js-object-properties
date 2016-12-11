require('source-map-support').install();
import 'babel-polyfill';
import {properties, propertiesCount} from '../lib/app.js';
const assert     = require('assert');

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
               const expected = [{prop: 'a', object: test, depth: 0, height: 1, own: true, enumerable: true, symbol: false}
                               , {prop: 'b', object: test, depth: 0, height: 1, own: true, enumerable: true, symbol: false}];
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
    });
});
         
