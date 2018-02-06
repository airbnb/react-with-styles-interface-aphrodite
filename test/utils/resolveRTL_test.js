import { expect } from 'chai';
import { StyleSheetTestUtils, StyleSheet, css } from 'aphrodite';

import resolveRTL from '../../src/utils/resolveRTL';

describe('#resolveRTL', () => {
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

    expect(resolveRTL(css, [styles.foo]))
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

    expect(resolveRTL(css, [styles.foo, styles.bar]))
      .to.eql({ className: 'foo_137u7ef-o_O-bar_36rlri' });
  });

  it('handles an object with inline styles', () => {
    const style = {
      color: 'red',
    };

    expect(resolveRTL(css, [style]))
      .to.eql({
        style: {
          color: 'red',
        },
      });
  });

  it('flips inline styles', () => {
    const style = {
      marginLeft: 10,
    };

    expect(resolveRTL(css, [style])).to.eql({ style: { marginRight: 10 } });
  });

  it('handles multiple objects with inline styles', () => {
    const styleA = {
      color: 'red',
    };

    const styleB = {
      display: 'inline-block',
    };

    expect(resolveRTL(css, [styleA, styleB]))
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

    expect(resolveRTL(css, [styleA, styleB]))
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

    expect(resolveRTL(css, [styles.foo, style]))
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

    expect(resolveRTL(css, [[styles.foo], [[styleA, styleB]]]))
      .to.eql({
        className: 'foo_137u7ef',
        style: {
          display: 'inline-block',
          padding: 1,
        },
      });
  });

  it('handles multiple calls to the same style definition', () => {
    const styles = StyleSheet.create({
      container: {
        textAlign: 'left',
      },
    });

    resolveRTL(css, [styles.container]);
    const definition = { ...styles.container._definition };

    resolveRTL(css, [styles.container]);
    const newDefinition = styles.container._definition;
    expect(definition).to.eql(newDefinition);
  });
});
