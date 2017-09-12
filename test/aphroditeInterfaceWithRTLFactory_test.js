import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import aphrodite from 'aphrodite';
import aphroditeInterfaceWithRTLFactory from '../src/aphroditeInterfaceWithRTLFactory';

import * as resolve from '../src/utils/resolve';
import * as resolveWithRTL from '../src/utils/resolveWithRTL';

describe('aphroditeInterfaceWithRTLFactory', () => {
  const { StyleSheetTestUtils } = aphrodite;
  const aphroditeInterfaceWithRTL = aphroditeInterfaceWithRTLFactory(aphrodite);
  let resolveSpy;
  let resolveWithRTLSpy;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    resolveSpy = sinon.spy(resolve, 'default');
    resolveWithRTLSpy = sinon.spy(resolveWithRTL, 'default');
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    sinon.restore();
  });

  describe('.create()', () => {
    it('processes the styles with Aphrodite', () => {
      expect(aphroditeInterfaceWithRTL.create({
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

  describe('.resolve()', () => {
    it('calls resolveWithRTL method', () => {
      aphroditeInterfaceWithRTL.resolve([]);
      expect(resolveWithRTLSpy.callCount).to.equal(1);
    });
  });

  describe('.resolveNoRTL()', () => {
    it('calls resolve method', () => {
      aphroditeInterfaceWithRTL.resolveNoRTL([]);
      expect(resolveSpy.callCount).to.equal(1);
    });
  });
});
