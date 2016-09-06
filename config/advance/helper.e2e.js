var req = require.context('../../src', true, /\.e2e\.ts/);
req.keys().forEach(req);