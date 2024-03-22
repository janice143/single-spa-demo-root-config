import { registerApplication, start, LifeCycles } from 'single-spa';

registerApplication({
  name: '@single-spa/welcome',
  app: () =>
    System.import<LifeCycles>(
      'https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js'
    ),
  activeWhen: ['/']
});

registerApplication({
  name: '@happi/my-app',
  app: () => System.import<LifeCycles>('@happi/my-app'),
  activeWhen: ['/home']
});

start({
  urlRerouteOnly: true
});
