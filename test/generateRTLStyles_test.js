import { expect } from 'chai';

import generateRTLStyles from '../src/generateRTLStyles';

describe('#generateRTLStyles', () => {
  it('returns null for non-flippable styles', () => {
    const ltrStyles = {
      color: 'red',
    };

    expect(generateRTLStyles(ltrStyles)).to.eql(null);
  });

  it('returns flipped style if value were to change', () => {
    const ltrStyles = {
      textAlign: 'left',
    };

    expect(generateRTLStyles(ltrStyles)).to.eql({
      textAlign: 'right',
    });
  });

  it('returns flipped style and override if style key changes', () => {
    const ltrStyles = {
      marginLeft: 10,
    };

    expect(generateRTLStyles(ltrStyles)).to.eql({
      marginLeft: 'initial',
      marginRight: 10,
    });
  });

  it('handles nested objects', () => {
    const ltrStyles = {
      ':before': {
        left: 10,
        color: 'red',
      },
      ':after': {
        float: 'right',
      },
    };

    expect(generateRTLStyles(ltrStyles)).to.eql({
      ':before': {
        left: 'initial',
        right: 10,
      },
      ':after': {
        float: 'left',
      },
    });
  });
});
