import { expect } from 'chai';
import aphrodite from 'aphrodite';

import withRTLExtension from '../../src/utils/withRTLExtension';
import resolveWithRTL from '../../src/utils/resolveWithRTL';

const { StyleSheetTestUtils, StyleSheet, css } = withRTLExtension(aphrodite);

describe('#resolveWithRTL', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('turns a processed style into a className', () => {
    const styles = StyleSheet.create({
      foo: {
        color: 'red',
      },
    });

    expect(resolveWithRTL(css, [styles.foo]))
      .to.eql({ className: 'foo_137u7ef' });
  });

  it('turns multiple processed styles into a className', () => {
    const styles = StyleSheet.create({
      foo: {
        color: 'red',
      },

      bar: {
        display: 'inline-block',
      },
    });

    expect(resolveWithRTL(css, [styles.foo, styles.bar]))
      .to.eql({ className: 'foo_137u7ef-o_O-bar_36rlri' });
  });

  it('handles an object with inline styles', () => {
    const style = {
      color: 'red',
    };

    expect(resolveWithRTL(css, [style]))
      .to.eql({
        style: {
          color: 'red',
        },
      });
  });

  it('converts inline styles to a className if RTL flippable', () => {
    const style = {
      marginLeft: 10,
    };

    expect(resolveWithRTL(css, [style])).to.eql({ className: 'inlineStyles_1c0b5pw' });
  });

  it('handles multiple objects with inline styles', () => {
    const styleA = {
      color: 'red',
    };

    const styleB = {
      display: 'inline-block',
    };

    expect(resolveWithRTL(css, [styleA, styleB]))
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

    expect(resolveWithRTL(css, [styleA, styleB]))
      .to.eql({
        style: {
          color: 'blue',
        },
      });
  });

  it('handles a mix of Aphrodite and inline styles', () => {
    const styles = StyleSheet.create({
      foo: {
        color: 'red',
      },
    });

    const style = {
      display: 'inline-block',
    };

    expect(resolveWithRTL(css, [styles.foo, style]))
      .to.eql({
        className: 'foo_137u7ef',
        style: {
          display: 'inline-block',
        },
      });
  });

  it('handles nested arrays', () => {
    const styles = StyleSheet.create({
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

    expect(resolveWithRTL(css, [[styles.foo], [[styleA, styleB]]]))
      .to.eql({
        className: 'foo_137u7ef',
        style: {
          display: 'inline-block',
          padding: 1,
        },
      });
  });
});
