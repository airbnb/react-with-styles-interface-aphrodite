import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import {
  StyleSheet,
  css,
  flushToStyleTag,
  StyleSheetTestUtils,
} from 'aphrodite';
import aphroditeInterfaceFactory from '../src/aphroditeInterfaceFactory';

import * as resolveLTR from '../src/utils/resolveLTR';
import * as resolveRTL from '../src/utils/resolveRTL';

describe('aphroditeInterfaceFactory', () => {
  const aphroditeInterface = aphroditeInterfaceFactory({
    StyleSheet,
    css,
    flushToStyleTag,
  });

  let resolveLTRSpy;
  let resolveRTLSpy;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    resolveLTRSpy = sinon.spy(resolveLTR, 'default');
    resolveRTLSpy = sinon.spy(resolveRTL, 'default');
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    sinon.restore();
  });

  describe('.create()', () => {
    it('processes the styles with Aphrodite', () => {
      expect(aphroditeInterface.create({
        foo: {
          color: 'red',
        },
      })).to.eql({
        foo: {
          _definition: {
            color: 'red',
          },
          _len: 15,
          _name: 'foo_137u7ef',
        },
      });
    });
  });

  describe('.createLTR()', () => {
    it('processes the styles with Aphrodite', () => {
      expect(aphroditeInterface.createLTR({
        foo: {
          left: 10,
        },
      })).to.eql({
        foo: {
          _definition: {
            left: 10,
          },
          _len: 11,
          _name: 'foo_lg4jz7',
        },
      });
    });
  });

  describe('.createRTL()', () => {
    it('processes the styles with Aphrodite', () => {
      expect(aphroditeInterface.createRTL({
        foo: {
          left: 10,
        },
      })).to.eql({
        foo: {
          _definition: {
            right: 10,
          },
          _len: 12,
          _name: 'foo_6eoou0',
        },
      });
    });
  });

  describe('.resolve()', () => {
    it('calls resolveLTR method', () => {
      aphroditeInterface.resolve([]);
      expect(resolveLTRSpy.callCount).to.equal(1);
    });
  });

  describe('.resolveLTR()', () => {
    it('calls resolveLTR method', () => {
      aphroditeInterface.resolveLTR([]);
      expect(resolveLTRSpy.callCount).to.equal(1);
    });
  });

  describe('.resolveRTL()', () => {
    it('calls resolveRTL method', () => {
      aphroditeInterface.resolveRTL([]);
      expect(resolveRTLSpy.callCount).to.equal(1);
    });
  });
});
