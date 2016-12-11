obj-properties
=========

A small library allowing a user to specify which properties of an
object he's interested to retrieve by using arbitrary boolean expressions
based on the following predicates:

* **own**: whether the property lives on the object or up the prototype chain
* **symbol**: whether the property is a symbol or not
* **enumerable**: whether the property is enumerable or not
* **depth**: the "depth" of the object on which the property is located along the prototype chain.
        0 corresponds to the object itself, 1 to its prototype, 2 to the prototype's prototype
         and so on.
* **height**: the "height" of the object on which the property is located measured from the 'base'
      of the prototype chain. I.e. 0 corresponds to the Object prototype.

A single function is exported (*properties*) which returns, when called with an object argument
an array of objects corresponding to the argument's properties. Objects are of the following kind:

```javascript
    {
          prop     :   // the name of the property
      , value      :   // the value of that property
      , object     :   // the object on which the property lives
                       // (can be the object itself or some prototype)
      , depth      :   // the "depth" of the object on which the property is declared
                       // (0 for the object itself, 1 for its prototype)
      , height     :   // the "height" of the object on which the property is declared
                       // (0 for the Object.prototype, 1 for its child, etc.)
      , own        :   // whether the property is declared directly on the object passed as argument
                       // (this is equivalent to testing for depth===0)
      , enumerable :   // whether the property is enumerable
      , symbol     :   // whether the propery is a symbol
    }
```

Note: all of the above properties are exposed and can be used in the boolean predicate expressions except for *prop*,
*value* and *object*.


The function *properties* can be called with 1, 2 or 3 arguments:

```javascript
  properties(o); // all properties of the object and its ancestors
                 // along the prototype chain are returned
  properties(o, 'own && symbol && (depth == 3)'); // only properties satisfying the arbitrary
                                                  // boolean expression are returned
  properties(o, 'some boolean expression', x=>x.prop) ; // as above, but only return the properties
                                                        // themselves in the returned array

```

Effectively only the 1<sup>st</sup> argument is mandatory:

* the 2<sup>nd</sup> argument defaults to the string *'true'*
* the 3<sup>rd</sup> argument defaults to: *x=>x*

## Installation


    npm install obj-properties --save


## Usage

```javascript

  import {properties} from 'obj-properties';
  // or:
  //   var properties = require('obj-properties').properties;

  var o = {};

  // evaluates to *all* properties along the prototype chain
  properties(o);
  
  // evaluates to an array of only non-symbol own properties of object o
  properties(o, 'own && !symbol');

  // evaluates to an array of all non-symbol properties of the object and
  //  its *immediate* ancestor only
  properties(o, '(depth<=1) && !symbol');

  // evaluates to an array of all non-symbol properties of an object o
  // excepting only those that are defined in the Object.prototype
  properties(o, '!symbol && (height>0)');

  // like above, but only return the properties themselves, not the
  // extra information
  properties(o, '!symbol && (height>0)', x=>x.prop);

  // return the non-enumerable properties of the object at the root
  // of the prototype chain (the Object.prototype)
  properties(o, '!enumerable && (height===0)', x=>x.prop);

  // return the non-enumerable properties of the object (or any of
  // its prototypes, except the Object.prototype)
  properties(o, '(height>0) && (!enumerable)', x=>x.prop);

  // helper function that only returns count:
  import {propertiesCount} from 'obj-properties';
  propertiesCount({});          // 12
  propertiesCount({}, 'own'); //  0
  
```


## Tests

    npm test

## Contributing



## Release History

* 0.1.0 &nbsp;&nbsp;&nbsp; Initial release
* 0.1.1 &nbsp;&nbsp;&nbsp; fixes
* 0.1.2 &nbsp;&nbsp;&nbsp; renamed 'enum' predicate to 'enumerable'
* 0.1.3 &nbsp;&nbsp;&nbsp; forgot to transpile
* 0.1.4 &nbsp;&nbsp;&nbsp; more examples in documentation
* 0.1.5-7 &nbsp;&nbsp;&nbsp; cosmetics and typos
* 0.1.8 &nbsp;&nbsp;&nbsp; babel-polyfill pattern with two files
* 0.1.9 &nbsp;&nbsp;&nbsp; cosmetic
* 0.1.10 &nbsp;&nbsp;&nbsp; cosmetic
* 0.1.11 &nbsp;&nbsp;&nbsp; added propertiesCount
* 0.1.12 &nbsp;&nbsp;&nbsp; dropped dead code
* 0.1.13 &nbsp;&nbsp;&nbsp; added testing
* 0.1.14 &nbsp;&nbsp;&nbsp; only conditionally requiring the Babel polyfill
* 0.1.15 &nbsp;&nbsp;&nbsp; fixed problem with running tests
* 0.1.16 &nbsp;&nbsp;&nbsp; fixed the "Reflect.ownKeys called on non-object" bug
* 0.1.17 &nbsp;&nbsp;&nbsp; returning property values as well
* 0.2.0  &nbsp;&nbsp;&nbsp; bumped version
* 0.2.1  &nbsp;&nbsp;&nbsp; test for arrays