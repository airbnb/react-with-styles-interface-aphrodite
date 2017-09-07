import { expect } from 'chai';

import generateDirectionalStyles from '../../src/utils/generateDirectionalStyles';

describe('#generateDirectionalStyles', () => {
  it('returns null for non-flippable styles', () => {
    const originalStyles = {
      color: 'red',
    };

    expect(generateDirectionalStyles(originalStyles)).to.eql(null);
  });

  it('returns flipped value in rtlStyles if value were to change', () => {
    const originalStyles = {
      width: 300,
      textAlign: 'left',
    };

    expect(generateDirectionalStyles(originalStyles)).to.eql({
      sharedStyles: {
        width: 300,
      },
      ltrStyles: {
        textAlign: 'left',
      },
      rtlStyles: {
        textAlign: 'right',
      },
    });
  });

  it('returns flipped style in rtlStyles object if style key changes', () => {
    const originalStyles = {
      background: '#fff',
      marginLeft: 10,
    };

    expect(generateDirectionalStyles(originalStyles)).to.eql({
      sharedStyles: {
        background: '#fff',
      },
      ltrStyles: {
        marginLeft: 10,
      },
      rtlStyles: {
        marginRight: 10,
      },
    });
  });

  it('handles nested objects', () => {
    const originalStyles = {
      ':before': {
        left: 10,
        color: 'red',
      },
      ':after': {
        float: 'right',
      },
    };

    expect(generateDirectionalStyles(originalStyles)).to.eql({
      sharedStyles: {
        ':before': {
          color: 'red',
        },
      },
      ltrStyles: {
        ':before': {
          left: 10,
        },
        ':after': {
          float: 'right',
        },
      },
      rtlStyles: {
        ':before': {
          right: 10,
        },
        ':after': {
          float: 'left',
        },
      },
    });
  });
});
