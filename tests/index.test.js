import { beforeEach, afterEach, test, describe, it, mock } from "node:test";
import assert from "node:assert";
import { main } from "../lib/krwc_tool.js";

let consol;

describe('wc tool', async () => {
  beforeEach(() => consol = mock.method(global.console, 'log'));
  afterEach(() => mock.reset());
  
  it("should count 3 words", async() => {
    const args = [,,'-w','./tests/3words.txt'];
    await main(args);
    const callArguments = consol.mock.calls[0].arguments;
    assert.strictEqual(callArguments[0], '3 ./tests/3words.txt');
  });

  it("should count 2 bytes", async() => {
    const args = [,,'-c', './tests/2bytes.txt'];
    await main(args);
    const call = consol.mock.calls[0];
    assert.strictEqual(call.arguments[0], '2 ./tests/2bytes.txt');
  });

  it('should count 4 lines', async() => {
    const args = [,,'-l', './tests/4lines.txt'];
    await main(args);
    const call = consol.mock.calls[0];
    assert.strictEqual(call.arguments[0], '4 ./tests/4lines.txt');
  });

  it('should count 5 chars', async() => {
    const args = [,,'-m', './tests/5chars.txt'];
    await main(args);
    const call = consol.mock.calls[0];
    assert.strictEqual(call.arguments[0], '5 ./tests/5chars.txt');
  });

  it('should return 1 1 5', async() => {
    const args = [,, './tests/5chars.txt'];
    await main(args);
    const call = consol.mock.calls[0];
    assert.strictEqual(call.arguments[0], '1 1 5 ./tests/5chars.txt');
  });
});

