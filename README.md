## Load-Standalone

Loading standalone web applications / components to the dom on demand.
Load React, Vue, Angular or any other modern framework application to the DOM.

## Install

```bash
yarn add load-standalone
```

or:

```bash
npm install load-standalone
```

## Usage

The standard load function needs to be tweaked a bit.
Instead of letting the application to load when it's bundle is first executed,
it will await a certain `id` to show up on the DOM.

**React-Example**
```js
import loadStandalone from 'load-standalone'

import App from 'App'

loadStandalone({
  injectTarget: 'on-demand-app',
  appLoader: () => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('on-demand-app'),
    )
  },
})
```

**Vue-Example**
```js
import loadStandalone from 'load-standalone'
import Vue from 'vue'

import App from 'App'

loadStandalone({
  injectTarget: 'on-demand-app',
  appLoader: () => {
    new Vue({
      render: h => h(
        App,
      ),
    }).$mount('#on-demand-app')
  }
})
```