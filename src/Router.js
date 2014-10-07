/****
 * Based on Grapnel.js
 * https://github.com/EngineeringMode/Grapnel.js
 *
 * @author Greg Sabia Tucker
 * @link http://artificer.io
 * @version 0.4.2
 *
 * Released under MIT License. See LICENSE.txt or http://opensource.org/licenses/MIT
*/


/**
 * @class Router
 * @namespace Shine
 * @chainable
 */
define(function () {
    function Router(){
        "use strict";

        var self = this; // Scope reference
        this.events = {}; // Event Listeners
        this.params = []; // Named parameters
        this.state = null; // Event state
        this.version = '0.4.2'; // Version
        // Anchor
        this.anchor = {
            defaultHash : window.location.hash,
            get : function(){
                return (window.location.hash) ? window.location.hash.split('#')[1] : '';
            },
            set : function(anchor){
                window.location.hash = (!anchor) ? '' : anchor;
                return self;
            },
            clear : function(){
                return this.set(false);
            },
            reset : function(){
                return this.set(this.defaultHash);
            }
        }
        /**
         * ForEach workaround
         *
         * @param {Array} to iterate
         * @param {Function} callback
        */
        this._forEach = function(a, callback){
            if(typeof Array.prototype.forEach === 'function') return Array.prototype.forEach.call(a, callback);
            // Replicate forEach()
            return function(c, next){
                for(var i=0, n = this.length; i<n; ++i){
                    c.call(next, this[i], i, this);
                }
            }.call(a, callback);
        }
        /**
         * Fire an event listener
         *
         * @param {String} event
         * @param {Mixed} [attributes] Parameters that will be applied to event listener
         * @return self
        */
        this.trigger = function(event){
            var params = Array.prototype.slice.call(arguments, 1);
            // Call matching events
            if(this.events[event]){
                this._forEach(this.events[event], function(fn){
                    fn.apply(self, params);
                });
            }

            return this;
        }
        // Check current hash change event -- if one exists already, add it to the queue
        if(typeof window.onhashchange === 'function') this.on('hashchange', window.onhashchange);
        /**
         * Hash change event
         * TODO: increase browser compatibility. "window.onhashchange" can be supplemented in older browsers with setInterval()
        */
        window.onhashchange = function(){
            self.trigger('hashchange');
        }

        return this;
    }
    /**
     * Create a RegExp Route from a string
     * This is the heart of the router and I've made it as small as possible!
     *
     * @param {String} Path of route
     * @param {Array} Array of keys to fill
     * @param {Bool} Case sensitive comparison
     * @param {Bool} Strict mode
    */
    Router.regexRoute = function(path, keys, sensitive, strict){
        if(path instanceof RegExp) return path;
        if(path instanceof Array) path = '(' + path.join('|') + ')';
        // Build route RegExp
        path = path.concat(strict ? '' : '/?')
            .replace(/\/\(/g, '(?:/')
            .replace(/\+/g, '__plus__')
            .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional){
                keys.push({ name : key, optional : !!optional });
                slash = slash || '';

                return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
            })
            .replace(/([\/.])/g, '\\$1')
            .replace(/__plus__/g, '(.+)')
            .replace(/\*/g, '(.*)');

        return new RegExp('^' + path + '$', sensitive ? '' : 'i');
    }
    /**
     * Add an action and handler
     *
     * @param {String|RegExp} action name
     * @param {Function} callback
     * @return self
    */
    Router.prototype.get = Router.prototype.add = function(route, handler){
        var self = this,
            keys = [],
            regex = Router.regexRoute(route, keys);

        var invoke = function RouteHandler(){
            // If action is instance of RegEx, match the action
            var match = self.anchor.get().match(regex);
            // Test matches against current action
            if(match){
                // Match found
                var req = { params : {}, keys : keys, matches : match.slice(1) };
                // Build parameters
                self._forEach(req.matches, function(value, i){
                    var key = (keys[i] && keys[i].name) ? keys[i].name : i;
                    // Parameter key will be its key or the iteration index. This is useful if a wildcard (*) is matched
                    req.params[key] = (value) ? decodeURIComponent(value) : undefined;
                });
                // Event object
                var event = {
                    route : route,
                    value : self.anchor.get(),
                    params : req.params,
                    regex : match,
                    propagateEvent : true,
                    previousState : self.state,
                    preventDefault : function(){
                        this.propagateEvent = false;
                    },
                    callback : function(){
                        handler.call(self, req, event);
                    }
                }
                // Trigger main event
                self.trigger('match', event);
                // Continue?
                if(!event.propagateEvent) return self;
                // Save new state
                self.state = event;
                // Call handler
                event.callback();
            }
            // Returns self
            return self;
        }
        // Invoke and add listeners -- this uses less code
        return invoke().on('hashchange', invoke);
    }
    /**
     * Add an event listener
     *
     * @param {String|Array} event
     * @param {Function} callback
     * @return self
    */
    Router.prototype.on = Router.prototype.bind = function(event, handler){
        var self = this,
            events = event.split(' ');

        this._forEach(events, function(event){
            if(self.events[event]){
                self.events[event].push(handler);
            }else{
                self.events[event] = [handler];
            }
        });

        return this;
    }
    /**
     * Call Router().router constructor for backwards compatibility
     *
     * @return {self} Router
    */
    Router.Router = Router.prototype.router = Router;
    /**
     * Allow context
     *
     * @param {String} Route context
     * @return {Function} Adds route to context
    */
    Router.prototype.context = function(context){
        var self = this;

        return function(value, callback){
            var prefix = (context.slice(-1) !== '/') ? context + '/' : context,
                pattern = prefix + value;

            return self.get.call(self, pattern, callback);
        }
    }
    /**
     * Create routes based on an object
     *
     * @param {Object} Routes
     * @return {self} Router
    */
    Router.listen = function(routes){
        // Return a new Router instance
        return (function(){
            // TODO: Accept multi-level routes
            for(var key in routes){
                this.get.call(this, key, routes[key]);
            }

            return this;
        }).call(new Router());
    }
    

    return Router;
});