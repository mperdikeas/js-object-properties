'use strict';

require('babel-polyfill');

(function() {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
})();

import assert from 'assert';
import _eval from 'eval';



function scope(propDescr) {
    return {
         prop : propDescr.prop,
        depth : propDescr.depth,
        height: propDescr.height,
          own : propDescr.own,
         enum : propDescr.enumerable,
       symbol : propDescr.symbol
     };
}

function evaluate(script, propDescr) {
    const TEMPLATE = `module.exports = function() {return ${script};}`;
    const rv =  _eval(TEMPLATE, scope(propDescr))();
    return rv;
}

(function() {
    function calculateMaxDepth(o) {
        let i = 0;
        for (let p = o; p!=null; p = Object.getPrototypeOf(p))
            i++;
        return i;
    }
    function *allPropertyDescriptors(o) {
        let depth = 0;
        const MAX_DEPTH = calculateMaxDepth(o);
        for (let p = o; p != null ; p = Object.getPrototypeOf(p), depth++ ) {
            const ownKeys = Reflect.ownKeys(p);
            for (let i = 0 ; i < ownKeys.length ; i++) {
                const propDescr = Object.getOwnPropertyDescriptor(p, ownKeys[i]);
                const own = (p===o);
                const enumerable = propDescr.enumerable;
                const symbol = (typeof (ownKeys[i]) === (typeof Symbol()));
                yield {
                    prop: ownKeys[i]
                    , object: p
                    , depth
                    , height: MAX_DEPTH - depth -1
                    , own
                    , enumerable
                    , symbol};
            }
        }
    }

    function *propertiesGenerator(o, script, f) {
        script = script ? script: 'true';
        f = f ? f : x=>x;
        for (let propDescr of allPropertyDescriptors(o))
            if (evaluate(script, propDescr))
                yield f(propDescr);
    }

    function properties(o, script, f) {
        return [...propertiesGenerator(o, script, f)];
    }


    module.exports = {
            properties: properties
    };

})();


