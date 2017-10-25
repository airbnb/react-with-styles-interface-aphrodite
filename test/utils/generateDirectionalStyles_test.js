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
      width: 300,
      _ltr: {
        textAlign: 'left',
      },
      _rtl: {
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
      background: '#fff',
      _ltr: {
        marginLeft: 10,
      },
      _rtl: {
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
      ':before': {
        color: 'red',
      },
      _ltr: {
        ':before': {
          left: 10,
        },
        ':after': {
          float: 'right',
        },
      },
      _rtl: {
        ':before': {
          right: 10,
        },
        ':after': {
          float: 'left',
        },
      },
    });
  });

  it('handles shared nested shared style with flipped style', () => {
    const originalStyles = {
      textAlign: 'left',
      ':active': {
        outline: 0,
      },
    };

    expect(generateDirectionalStyles(originalStyles))
      .to.eql({
        ':active': {
          outline: 0,
        },
        _ltr: {
          textAlign: 'left',
        },
        _rtl: {
          textAlign: 'right',
        },
      });
  });

  it('correctly flips a mix of nested and non-nested styles', () => {
    const originalStyles = {
      left: -8,

      '@media (max-width:744px)': {
        left: 0,
      },
    };

    expect(generateDirectionalStyles(originalStyles))
      .to.eql({
        _ltr: {
          left: -8,

          '@media (max-width:744px)': {
            left: 0,
          },
        },
        _rtl: {
          right: -8,

          '@media (max-width:744px)': {
            right: 0,
          },
        },
      });
  });

  it('keyframe animations', () => {
    const originalStyles = {
      animationName: {
        '0%': {
          opacity: 0,
          transform: 'scale(0.75) translate3d(4px, -8px, 0)',
        },
        '100%': {
          opacity: 1,
          transform: 'scale(1) translate3d(4px, -8px, 0)',
        },
      },
      animationDuration: '0.5s',
      animationTimingFunction: 'ease',
      animationFillMode: 'both',
    };

    expect(generateDirectionalStyles(originalStyles))
      .to.eql({
        _ltr: {
          animationName: {
            '0%': {
              transform: 'scale(0.75) translate3d(4px, -8px, 0)',
            },
            '100%': {
              transform: 'scale(1) translate3d(4px, -8px, 0)',
            },
          },
        },
        _rtl: {
          animationName: {
            '0%': {
              transform: 'scale(0.75) translate3d(-4px, -8px, 0)',
            },
            '100%': {
              transform: 'scale(1) translate3d(-4px, -8px, 0)',
            },
          },
        },
        animationDuration: '0.5s',
        animationFillMode: 'both',
        animationName: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        animationTimingFunction: 'ease',
      });
  });
});
