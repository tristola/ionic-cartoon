var httpProxy = require('http-proxy');

var proxy= httpProxy.createProxyServer({target:'http://m.hs.fi/'}).listen(9000);

//
// Listen for the `error` event on `proxy`.
proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
});
proxy.on('proxyRes', function (proxyRes, req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method','*');
  console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});

proxy.on('proxyReq', function(proxyReq, req, res) {
  console.log('RAW Request from the target', JSON.stringify(proxyReq.headers, true, 2));
  proxyReq.setHeader('Origin', 'http://m.hs.fi');
});
