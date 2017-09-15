import { expect } from 'chai';
import { StyleSheetTestUtils, StyleSheet, css } from 'aphrodite';

import resolveWithRTL from '../../src/utils/resolveWithRTL';
import resolve from '../../src/utils/resolve';

describe('#resolve', () => {
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

    expect(resolve(css, [styles.foo]))
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

    expect(resolve(css, [styles.foo, styles.bar]))
      .to.eql({ className: 'foo_137u7ef-o_O-bar_36rlri' });
  });

  it('handles an object with inline styles', () => {
    const style = {
      color: 'red',
      marginLeft: 10,
    };

    expect(resolve(css, [style]))
      .to.eql({
        style: {
          color: 'red',
          marginLeft: 10,
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

    expect(resolve(css, [styleA, styleB]))
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

    expect(resolve(css, [styleA, styleB]))
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

    expect(resolve(css, [styles.foo, style]))
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

    expect(resolve(css, [[styles.foo], [[styleA, styleB]]]))
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

    resolve(css, [styles.container]);
    const definition = { ...styles.container._definition };

    resolve(css, [styles.container]);
    const newDefinition = styles.container._definition;
    expect(definition).to.eql(newDefinition);
  });

  it('style definition is as expected even after calling resolveWithRTL', () => {
    const styles = StyleSheet.create({
      container: {
        textAlign: 'left',
      },
    });

    resolveWithRTL(css, [styles.container]);
    const oldDefinition = { ...styles.container._definition };

    resolve(css, [styles.container]);
    const definition = styles.container._definition;
    expect(definition).to.not.eql(oldDefinition);
    expect(definition).to.eql({
      textAlign: 'left',
    });
  });
});
