import { expect } from 'chai';
import { StyleSheetTestUtils } from 'aphrodite';

import aphroditeInterface from '../src/aphroditeInterface';
import aphroditeInterfaceNoImportant from '../src/no-important';

const interfaces = [
  {
    name: 'aphroditeInterface',
    interface: aphroditeInterface,
  },
  {
    name: 'aphroditeInterfaceNoImportant',
    interface: aphroditeInterfaceNoImportant,
  },
];

describe(interfaces.map(i => i.name).join(', '), () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  interfaces.forEach((i) => {
    describe(i.name, () => {
      describe('.create()', () => {
        it('processes the styles with Aphrodite', () => {
          expect(i.interface.create({
            foo: {
              color: 'red',
            },
          })).to.eql({
            foo: {
              _definition: {
                color: 'red',
              },
              _name: 'foo_im3wl1',
            },
          });
        });
      });

      describe('.resolve()', () => {
        it('turns a processed style into a className', () => {
          const styles = i.interface.create({
            foo: {
              color: 'red',
            },
          });

          expect(i.interface.resolve([styles.foo]))
            .to.eql({ className: 'foo_im3wl1' });
        });

        it('turns multiple processed styles into a className', () => {
          const styles = i.interface.create({
            foo: {
              color: 'red',
            },

            bar: {
              display: 'inline-block',
            },
          });

          expect(i.interface.resolve([styles.foo, styles.bar]))
            .to.eql({ className: 'foo_im3wl1-o_O-bar_cm9r68' });
        });

        it('handles an object with inline styles', () => {
          const style = {
            color: 'red',
          };

          expect(i.interface.resolve([style]))
            .to.eql({
              style: {
                color: 'red',
              },
            });
        });

        it('handles multiple objects with inline styles', () => {
          const styleA = {
            color: 'red',
          };

          const styleB = {
            display: 'inline-block',
          };

          expect(i.interface.resolve([styleA, styleB]))
            .to.eql({
              style: {
                color: 'red',
                display: 'inline-block',
              },
            });
        });

        it('prefers inline styles from later arguments', () => {
          const styleA = {
            color: 'red',
          };

          const styleB = {
            color: 'blue',
          };

          expect(i.interface.resolve([styleA, styleB]))
            .to.eql({
              style: {
                color: 'blue',
              },
            });
        });

        it('handles a mix of Aphrodite and inline styles', () => {
          const styles = i.interface.create({
            foo: {
              color: 'red',
            },
          });

          const style = {
            display: 'inline-block',
          };

          expect(i.interface.resolve([styles.foo, style]))
            .to.eql({
              className: 'foo_im3wl1',
              style: {
                display: 'inline-block',
              },
            });
        });

        it('handles nested arrays', () => {
          const styles = i.interface.create({
            foo: {
              color: 'red',
            },
          });

          const styleA = {
            display: 'inline-block',
          };

          const styleB = {
            padding: 1,
          };

          expect(i.interface.resolve([[styles.foo], [[styleA, styleB]]]))
            .to.eql({
              className: 'foo_im3wl1',
              style: {
                display: 'inline-block',
                padding: 1,
              },
            });
        });
      });
    });
  });
});
