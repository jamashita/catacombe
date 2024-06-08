import { wait } from '@jamashita/anden/helper';
import { Heap } from '../Heap.js';
import { HeapError } from '../HeapError.js';

describe('Heap', () => {
  describe('get', () => {
    it.each`
      key         | value
      ${Symbol()} | ${1}
      ${Symbol()} | ${0}
      ${Symbol()} | ${0.2}
      ${Symbol()} | ${Number.NaN}
      ${Symbol()} | ${Number.POSITIVE_INFINITY}
    `('can get the correct value even the key is correct, key is $key', ({ key, value }: { key: symbol; value: number }) => {
      const heap: Heap = new Heap();

      heap.set(key, value);

      expect(heap.get<number>(key)).toBe(value);
    });

    it('does not make the value disappear when timeout is set to 0', async () => {
      const heap: Heap = new Heap(0);
      const identifier: symbol = Symbol();
      const value: string = 'pppp';

      heap.set(identifier, value);

      expect(heap.get<string>(identifier)).toBe(value);

      await wait(3000);

      expect(heap.get<string>(identifier)).toBe(value);
    });

    it('does not make the value disappear when timeout is set to negative', async () => {
      const heap: Heap = new Heap(-193);
      const identifier: symbol = Symbol();
      const value: string = 'pppp';

      heap.set(identifier, value);

      expect(heap.get<string>(identifier)).toBe(value);

      await wait(3000);

      expect(heap.get<string>(identifier)).toBe(value);
    });

    it('performs volatilization after the timeout', async () => {
      const heap: Heap = new Heap(1);
      const identifier: symbol = Symbol();
      const value: string = 'pppp';

      heap.set(identifier, value);

      expect(heap.get<string>(identifier)).toBe(value);

      await wait(3000);

      expect(() => {
        heap.get<string>(identifier);
      }).toThrow(HeapError);
    });

    it('will not disappear if it is updated', async () => {
      const heap: Heap = new Heap(3);
      const identifier: symbol = Symbol();
      const value1: string = 'pppp';
      const value2: string = 'qqqq';

      heap.set(identifier, value1);

      await wait(2000);

      expect(heap.get<string>(identifier)).toBe(value1);

      heap.set(identifier, value2);

      await wait(2000);

      expect(heap.get<string>(identifier)).toBe(value2);
    });

    it('only retains the last one', () => {
      const heap: Heap = new Heap();
      const identifier1: symbol = Symbol();
      const value1: number = 1;
      const value2: number = 0;

      heap.set(identifier1, value1);
      expect(heap.get<number>(identifier1)).toBe(value1);
      heap.set(identifier1, value2);
      expect(heap.get<number>(identifier1)).toBe(value2);
    });

    it('throws HeapError when value is not set', () => {
      const heap: Heap = new Heap();
      const identifier: symbol = Symbol();

      expect(() => {
        heap.get<number>(identifier);
      }).toThrow(HeapError);
    });
  });
});
