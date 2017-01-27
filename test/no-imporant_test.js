import { expect } from 'chai';
import aphroditeInterface from '../src/no-important';

describe('no-important', () => {
  it('is an interface', () => {
    expect(typeof aphroditeInterface.create).to.equal('function');
    expect(typeof aphroditeInterface.resolve).to.equal('function');
  });
});
