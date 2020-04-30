/* eslint-disable no-template-curly-in-string */

import test from 'ava'
import convertFile from 'convert/file'

test('noauth', async t => {
  const [main] = await convertFile('test/material/2/noauth.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com/"
  });
}
`)
})

test('basic', async t => {
  const [main] = await convertFile('test/material/2/basic.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";
import URI from "./libs/urijs.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com/",
    auth(config, Var) {
      const address = new URI(config.address);
      address.username("user123");
      address.password("secret");
      config.address = address.toString();
      config.options.auth = "basic";
    }
  });
}
`)
})

test('bearer', async t => {
  const [main] = await convertFile('test/material/2/bearer.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com/",
    auth(config, Var) {
      config.headers.Authorization = "Bearer secrettoken";
    }
  });
}
`)
})

test('digest', async t => {
  const [main] = await convertFile('test/material/2/digest.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";
import URI from "./libs/urijs.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com/",
    auth(config, Var) {
      const address = new URI(config.address);
      address.username("user123");
      address.password("secret");
      config.address = address.toString();
      config.options.auth = "digest";
    }
  });
}
`)
})

test('ntlm', async t => {
  const [main] = await convertFile('test/material/2/ntlm.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";
import URI from "./libs/urijs.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com/",
    auth(config, Var) {
      const address = new URI(config.address);
      address.username("user123");
      address.password("secret");
      config.address = address.toString();
      config.options.auth = "ntlm";
    }
  });
}
`)
})

test('awsv4', async t => {
  const [main] = await convertFile('test/material/2/awsv4.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/spo-gpo.js";
import "./libs/shim/core.js";
import URI from "./libs/urijs.js";
import aws4 from "./libs/aws4.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com/",
    auth(config, Var) {
      const address = new URI(config.address);
      const options = {
        method: "GET",
        protocol: address.protocol(),
        hostname: address.hostname(),
        port: address.port(),
        path: address.path() + address.search(),
        body: config.data,
        region: "region",
        service: "service"
      };
      const credential = {
        accessKeyId: "accesskey",
        secretAccessKey: "secretkey",
        sessionToken: "session"
      };
      const signed = aws4.sign(options, credential);
      const [path, query = ""] = signed.path.split("?");
      config.address = new URI()
        .protocol(address.protocol())
        .hostname(signed.hostname)
        .path(path)
        .query(query)
        .toString();
      Object.assign(config.headers, signed.headers);
    }
  });
}
`)
})

test('oauth1 header sha1', async t => {
  const [main] = await convertFile('test/material/2/oauth1-header-sha1.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";
import OAuth from "./libs/oauth-1.0a.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com/",
    auth(config, Var) {
      const options = {
        consumer: {
          key: "conkey",
          secret: "consec"
        },
        signature_method: "HMAC-SHA1",
        hash_function(data, key) {
          return hmac("sha1", key, data, "base64");
        },
        version: "1.0",
        realm: "realm@example.com"
      };
      const request = {
        method: config.method,
        url: config.address,
        data: {
          oauth_timestamp: "1",
          oauth_nonce: "10"
        }
      };
      const token = {
        key: "tokkey",
        secret: "toksec"
      };
      const oauth = OAuth(options);
      const auth = oauth.toHeader(oauth.authorize(request, token));
      Object.assign(config.headers, auth);
    }
  });
}
`)
})

test('oauth1 header sha256', async t => {
  const [main] = await convertFile('test/material/2/oauth1-header-sha256.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";
import OAuth from "./libs/oauth-1.0a.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com/",
    auth(config, Var) {
      const options = {
        consumer: {
          key: "conkey",
          secret: "consec"
        },
        signature_method: "HMAC-SHA256",
        hash_function(data, key) {
          return hmac("sha256", key, data, "base64");
        },
        version: "1.0",
        realm: "realm@example.com"
      };
      const request = {
        method: config.method,
        url: config.address,
        data: {
          oauth_timestamp: "1",
          oauth_nonce: "10"
        }
      };
      const token = {
        key: "tokkey",
        secret: "toksec"
      };
      const oauth = OAuth(options);
      const auth = oauth.toHeader(oauth.authorize(request, token));
      Object.assign(config.headers, auth);
    }
  });
}
`)
})

test('oauth1 header text', async t => {
  const [main] = await convertFile('test/material/2/oauth1-header-text.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";
import OAuth from "./libs/oauth-1.0a.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com/",
    auth(config, Var) {
      const options = {
        consumer: {
          key: "conkey",
          secret: "consec"
        },
        signature_method: "PLAINTEXT",
        version: "1.0",
        realm: "realm@example.com"
      };
      const request = {
        method: config.method,
        url: config.address,
        data: {
          oauth_timestamp: "1",
          oauth_nonce: "10"
        }
      };
      const token = {
        key: "tokkey",
        secret: "toksec"
      };
      const oauth = OAuth(options);
      const auth = oauth.toHeader(oauth.authorize(request, token));
      Object.assign(config.headers, auth);
    }
  });
}
`)
})

test('oauth1 body', async t => {
  const [main] = await convertFile('test/material/2/oauth1-body.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";
import OAuth from "./libs/oauth-1.0a.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "POST",
    address: "http://example.com/",
    auth(config, Var) {
      const options = {
        consumer: {
          key: "conkey",
          secret: "consec"
        },
        signature_method: "HMAC-SHA1",
        hash_function(data, key) {
          return hmac("sha1", key, data, "base64");
        },
        version: "1.0",
        realm: "realm@example.com"
      };
      const request = {
        method: config.method,
        url: config.address,
        data: {
          oauth_timestamp: "1",
          oauth_nonce: "10"
        }
      };
      const token = {
        key: "tokkey",
        secret: "toksec"
      };
      const oauth = OAuth(options);
      const auth = oauth.authorize(request, token);
      Object.assign(config.data, auth);
    }
  });
}
`)
})

test('oauth1 address', async t => {
  const [main] = await convertFile('test/material/2/oauth1-address.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";
import OAuth from "./libs/oauth-1.0a.js";
import URI from "./libs/urijs.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com/",
    data: "line1\\nline2\\nline3\\n",
    auth(config, Var) {
      const options = {
        consumer: {
          key: "conkey",
          secret: "consec"
        },
        signature_method: "HMAC-SHA1",
        hash_function(data, key) {
          return hmac("sha1", key, data, "base64");
        },
        version: "1.0",
        realm: "realm@example.com"
      };
      const request = {
        method: config.method,
        url: config.address,
        data: {
          oauth_timestamp: "1",
          oauth_nonce: "10"
        }
      };
      const token = {
        key: "tokkey",
        secret: "toksec"
      };
      const oauth = OAuth(options);
      const auth = oauth.authorize(request, token);
      const address = new URI(config.address);
      for (const key of Object.keys(auth)) {
        address.addQuery(key, auth[key]);
      }
      config.address = address.toString();
    }
  });
}
`)
})

test('oauth2 header', async t => {
  const [main] = await convertFile('test/material/2/oauth2-header.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com/",
    auth(config, Var) {
      config.headers.Authorization = "Bearer token";
    }
  });
}
`)
})

test('oauth2 address', async t => {
  const [main] = await convertFile('test/material/2/oauth2-address.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";
import URI from "./libs/urijs.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com/",
    auth(config, Var) {
      const address = new URI(config.address);
      address.addQuery("access_token", "token");
      config.address = address.toString();
    }
  });
}
`)
})

test('inherit collection', async t => {
  const [main] = await convertFile('test/material/2/inherit-collection.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com/",
    auth(config, Var) {
      config.headers.Authorization = "Bearer token";
    }
  });
}
`)
})

test('inherit folder', async t => {
  const [main] = await convertFile('test/material/2/inherit-folder.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";
import { group } from "k6";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  group("TestFolder", function() {
    postman[Request]({
      name: "TestRequest",
      method: "GET",
      address: "http://example.com/",
      auth(config, Var) {
        config.headers.Authorization = "Bearer token";
      }
    });
  });
}
`)
})

test('inherit nested', async t => {
  const [main] = await convertFile('test/material/2/inherit-nested.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";
import { group } from "k6";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  group("TestFolder1", function() {
    group("TestFolder2", function() {
      group("TestFolder3", function() {
        group("TestFolder4", function() {
          postman[Request]({
            name: "TestRequest",
            method: "GET",
            address: "http://example.com/",
            auth(config, Var) {
              config.headers.Authorization = "Bearer token";
            }
          });
        });
      });
    });
  });
}
`)
})

test('apikey', async t => {
  const [main] = await convertFile('test/material/2/apikey.json')
  t.is(main, `// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  postman[Request]({
    name: "TestRequest",
    method: "GET",
    address: "http://example.com/",
    auth(config, Var) {
      config.headers.Authorization = "secretApiKey";
    }
  });
}
`)
})
