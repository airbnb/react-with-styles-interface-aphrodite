import { expect } from 'chai';
import React from 'react';
import { css, StyleSheetServer, StyleSheetTestUtils } from 'aphrodite';
import ReactDOMServer from 'react-dom/server';
import aphroditeInterfaceWithRTL from '../src/with-rtl';

describe('with-rtl', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('is an interface', () => {
    expect(typeof aphroditeInterfaceWithRTL.create).to.equal('function');
    expect(typeof aphroditeInterfaceWithRTL.resolve).to.equal('function');
    expect(typeof aphroditeInterfaceWithRTL.resolveNoRTL).to.equal('function');
  });

  it('uses !important', () => {
    const styles = aphroditeInterfaceWithRTL.create({
      foo: {
        color: 'red',
      },
    });
    const result = StyleSheetServer.renderStatic(() => (
      ReactDOMServer.renderToString(React.createElement('div', { className: css(styles.foo) }))
    ));
    expect(result.css.content.includes('!important')).to.equal(true);
  });
});
