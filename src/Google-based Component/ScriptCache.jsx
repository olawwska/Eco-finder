let counter = 0;
let scriptMap = new Map(); //method that creates a new map inside the given HTML container

//Script Cache is a function that is globally assigned to the Browser Object Model (Window) that means it is now a method that can be used from any place on a page.

export const ScriptCache = (function(global) {
  return function ScriptCache (scripts) {
    const Cache = {}; //object type


    //if ScriptCache is already loaded on a page it calls the callback from onLoad
    // function immediatelly
    Cache._onLoad = function (key) { //przekazuję w metodzie jako argument klucz api i wywołuje zwraca callback funkcji
      return (cb) => {
        let stored = scriptMap.get(key); //przypisuje do zmiennej stored nową mapę utworzoną przez metodę get na podstawie podanego klucza do API
        if (stored) {
          stored.promise.then(() => {  //gdy promise się zakończy i zawiera daną zwrtotną zostanie wykonana funkcja ktrej argumentem będzie dana zwrotna
            stored.error ? cb(stored.error) : cb(null, stored) //jeżeli warunek jest true czyli nie mamy dostępu do API zwracany jest callback error jeżeli jest false zwracany jest callback z mapą
          })
        }
      }
    };

    //w przypadku gdy ScriptCache nie był załadowany wywołuje się callback funkcji scriptTag ktry tworzy tag <script>

    Cache._scriptTag = (key, src) => {
      if (!scriptMap.has(key)) {
        let tag = document.createElement('script');

        //tworzymy obiekt promise, ktry jako parametr przyjmuje funkcję ktora uruchomiona jest od razu. jej argumentami sa resolve i reject (ktore takze sa funkcjami)
        let promise = new Promise((resolve, reject) => {
          // let resolved = false,
          //     errored = false,
            let body = document.getElementsByTagName('body')[0];

          tag.type = 'text/javascript';
          tag.async = false; // Load in order

          const cbName = `loaderCB${counter++}${Date.now()}`;
          let cb; //it is declared here and used in line 76

          let handleResult = (state) => {
            return (evt) => {
              let stored = scriptMap.get(key);
              if (state === 'loaded') {
                stored.resolved = true; //jeżeli mamy wynik z promise wyświetl go
                resolve(src);
                // stored.handlers.forEach(h => h.call(null, stored))
                // stored.handlers = []
              } else if (state === 'error') {
                stored.errored = true;
                // stored.handlers.forEach(h => h.call(null, stored))
                // stored.handlers = [];
                reject(evt) //jeżeli mamy problem z promise oznaczamy promise jako
                // odrzucony i jako argument funkcji przekazujemy powod bledu
              }
              cleanup();
            }
          };

          const cleanup = () => {
            if (global[cbName] && typeof global[cbName] === 'function') {
              global[cbName] = null;
            }
          };

          tag.onload = handleResult('loaded');
          tag.onerror = handleResult('error');
          tag.onreadystatechange = () => {
            handleResult(tag.readyState)
          };

          // Pick off callback, if there is one
          if (src.match(/callback=CALLBACK_NAME/)) {
            src = src.replace(/(callback=)[^\&]+/, `$1${cbName}`)
            cb = window[cbName] = tag.onload;
          } else {
            tag.addEventListener('load', tag.onload)
          }
          tag.addEventListener('error', tag.onerror);

          tag.src = src;
          body.appendChild(tag);
          return tag;
        });
        let initialState = {
          loaded: false,
          error: false,
          promise: promise,
          tag
        }
        scriptMap.set(key, initialState);
      }
      return scriptMap.get(key);
    }

    Object.keys(scripts).forEach(function(key) {
      const script = scripts[key];
      Cache[key] = {
        tag:    Cache._scriptTag(key, script),
        onLoad: Cache._onLoad(key)
      }
    })

    return Cache;
  }
})(window);

export default ScriptCache;
