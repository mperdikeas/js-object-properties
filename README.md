obj-properties
=========

A small library allowing a user to specify which properties of an
object she's interested to retrieve by using arbitrary boolean expressions
based on the following predicates:

* own (whether the property lives on the object or up the prototype chain)
* symbol (whether the property is a symbol or not)
* enum (whether the property is enumerable or not)
* depth (the "depth" of the object on which the property is located along the prototype chain
        0 corresponds to the object itself, 1 to its prototype, 2 to the prototype's prototype
         and so on)
* height (the "height" of the object on which the property is located along the prototype chain
     - 0 corresponds to the Object prototype)

## Installation

  npm install obj-properties --save

## Usage

  import {properties} from 'obj-properties';

  // return an array of only non-symbol own properties of object o
  properties(o, 'own && !symbol')

  // return an array of all non-symbol properties of an object o
  // excepting only those that are defined in the Object.prototype
  properties(o, '!symbol && (height>0)')

  // like above, but only return the properties themselves, not the
  // extra information
  properties(o, '!symbol && (height>0)', x=>x.prop)

  // return the non-enumerable properties of the object at the root
  // of the prototype chain (the Object.prototype)
  properties(o, '!enumerable && (height===0)', x=>x.prop)

## Tests

    // not yet implemented

## Contributing



## Release History

* 0.1.0 Initial release
* 0.1.1 fixes
* 0.1.2 renamed 'enum' predicate to 'enumerable'
* 0.1.3 forgot to transpile