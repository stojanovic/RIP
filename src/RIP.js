/*! RIP 0.3.1 (https://github.com/pyrsmk/RIP) */

;(function(context, name, definition) {
  if (typeof module !== 'undefined' &&  module.exports) {
    module.exports = definition;
  }
  else if (typeof define === 'function' && define.amd) {
    define(definition);
  }
  else{
    context[name] = definition;
  }
}(this, 'RIP', function() {

  var request_attribute_name = '_METHOD';

  return {

    /*
      Set the REST request attribute name

      Parameters
        String name
    */
    setRequestAttributeName: function(name) {
      request_attribute_name = name;
    },

    /*
      Map a custom request

      Parameters
        String method
        String url
        Object data
    */
    map: function(method, url, data) {
      // Verify
      if (typeof data !== 'object') {
        throw "An object is expected as data argument";
      }
      // Prepare
      var form,
          build = function(value, name) {
            var inputs='',
                i,
                j,
                n;
            
            if (value.pop) {
              for (i = 0, j = value.length; i < j; ++i) {
                
                if (name) {
                  n = name + '[' + i + ']';
                }
                else {
                  n = i;
                }
                inputs += build(value[i], n);
              }
            }
            else if (typeof value === 'object') {
              for (i in value) {
                if (name) {
                  n = name + '[' + i + ']';
                }
                else {
                  n = i;
                }
                inputs += build(value[i] ,n);
              }
            }
            else{
              inputs += '<input type="hidden" name="' + name + '" value="' + value + '">';
            }
            return inputs;
          };
      data = data || {};

      // Define method
      data[request_attribute_name] = method;

      // Create form
      form = document.createElement('form');
      document.getElementsByTagName('body')[0].appendChild(form);
      form.setAttribute('action', url);
      form.setAttribute('method', 'post');
      
      // Create inputs
      form.innerHTML = build(data);
      
      // Submit!
      form.submit();
    },

    /*
      GET request

      Parameters
        String url
        Object data
    */
    GET: function(url, data) {
      this.map('GET', url, data);
    },

    /*
      POST request

      Parameters
        String url
        Object data
    */
    POST: function(url, data) {
      this.map('POST', url, data);
    },

    /*
      PUT request

      Parameters
        String url
        Object data
    */
    PUT: function(url, data) {
      this.map('PUT', url, data);
    },

    /*
      DELETE request

      Parameters
        String url
        Object data
    */
    DELETE: function(url, data){
      this.map('DELETE', url, data);
    }

  };
  
}()));
