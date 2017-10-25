/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import aphrodite from 'aphrodite';
import withRTLExtension from '../../src/utils/withRTLExtension';

const { StyleSheet, StyleSheetServer, css } = withRTLExtension(aphrodite);

function MyComponent({ styles }) {
  return (
    <div className={css(styles.container)}>Hello World</div>
  );
}

MyComponent.propTypes = {
  styles: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

describe('withRTLExtension', () => {
  describe('without directional style definition', () => {
    it('handles regular styles', () => {
      const styles = StyleSheet.create({
        container: {
          color: 'red',
        },
      });
      const expectedCSS = '.container_137u7ef{color:red !important;}';

      const { css: { content } } = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(<MyComponent styles={styles} />)
      ));

      expect(content).to.equal(expectedCSS);
    });

    it('handles pseudo selectors', () => {
      const styles = StyleSheet.create({
        container: {
          color: 'red',

          ':before': {
            color: 'blue',
          },

          ':after': {
            color: 'yellow',
          },
        },
      });
      const expectedCSS = '.container_9p40ls{color:red !important;}.container_9p40ls:before{color:blue !important;}.container_9p40ls:after{color:yellow !important;}';

      const { css: { content } } = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(<MyComponent styles={styles} />)
      ));

      expect(content).to.equal(expectedCSS);
    });

    it('handles match media queries', () => {
      const styles = StyleSheet.create({
        container: {
          color: 'red',

          '@media (min-width: 744px)': {
            color: 'blue',
          },

          '@media (min-width: 1128px)': {
            color: 'yellow',
          },
        },
      });
      const expectedCSS = '.container_ojhsnk{color:red !important;}@media (min-width: 744px){.container_ojhsnk{color:blue !important;}}@media (min-width: 1128px){.container_ojhsnk{color:yellow !important;}}';
      const { css: { content } } = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(<MyComponent styles={styles} />)
      ));

      expect(content).to.equal(expectedCSS);
    });
  });

  describe('with _rtl style definition', () => {
    it('handles regular styles', () => {
      const styles = StyleSheet.create({
        container: {
          _rtl: {
            color: 'red',
          },
        },
      });
      const expectedCSS = '[dir="rtl"] .container_1eedrr2{color:red !important;}';

      const { css: { content } } = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(<MyComponent styles={styles} />)
      ));

      expect(content).to.equal(expectedCSS);
    });

    it('handles pseudo selectors', () => {
      const styles = StyleSheet.create({
        container: {
          _rtl: {
            color: 'red',

            ':before': {
              color: 'blue',
            },

            ':after': {
              color: 'yellow',
            },
          },
        },
      });
      const expectedCSS = '[dir="rtl"] .container_1etudix{color:red !important;}[dir="rtl"] .container_1etudix:before{color:blue !important;}[dir="rtl"] .container_1etudix:after{color:yellow !important;}';
      const { css: { content } } = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(<MyComponent styles={styles} />)
      ));

      expect(content).to.equal(expectedCSS);
    });

    it('handles match media queries', () => {
      const styles = StyleSheet.create({
        container: {
          _rtl: {
            color: 'red',

            '@media (min-width: 744px)': {
              color: 'blue',
            },

            '@media (min-width: 1128px)': {
              color: 'yellow',
            },
          },
        },
      });

      const expectedCSS = '[dir="rtl"] .container_17kei9l{color:red !important;}@media (min-width: 744px){[dir="rtl"] .container_17kei9l{color:blue !important;}}@media (min-width: 1128px){[dir="rtl"] .container_17kei9l{color:yellow !important;}}';
      const { css: { content } } = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(<MyComponent styles={styles} />)
      ));

      expect(content).to.equal(expectedCSS);
    });
  });

  describe('with _ltr style definition', () => {
    it('handles regular styles', () => {
      const styles = StyleSheet.create({
        container: {
          _ltr: {
            color: 'red',
          },
        },
      });
      const expectedCSS = '[dir="ltr"] .container_t91132{color:red !important;}';

      const { css: { content } } = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(<MyComponent styles={styles} />)
      ));

      expect(content).to.equal(expectedCSS);
    });

    it('handles pseudo selectors', () => {
      const styles = StyleSheet.create({
        container: {
          _ltr: {
            color: 'red',

            ':before': {
              color: 'blue',
            },

            ':after': {
              color: 'yellow',
            },
          },
        },
      });
      const expectedCSS = '[dir="ltr"] .container_165mtix{color:red !important;}[dir="ltr"] .container_165mtix:before{color:blue !important;}[dir="ltr"] .container_165mtix:after{color:yellow !important;}';
      const { css: { content } } = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(<MyComponent styles={styles} />)
      ));

      expect(content).to.equal(expectedCSS);
    });

    it('handles match media queries', () => {
      const styles = StyleSheet.create({
        container: {
          _ltr: {
            color: 'red',

            '@media (min-width: 744px)': {
              color: 'blue',
            },

            '@media (min-width: 1128px)': {
              color: 'yellow',
            },
          },
        },
      });

      const expectedCSS = '[dir="ltr"] .container_yw6y9l{color:red !important;}@media (min-width: 744px){[dir="ltr"] .container_yw6y9l{color:blue !important;}}@media (min-width: 1128px){[dir="ltr"] .container_yw6y9l{color:yellow !important;}}';
      const { css: { content } } = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(<MyComponent styles={styles} />)
      ));

      expect(content).to.equal(expectedCSS);
    });
  });

  describe('mixed style definitions', () => {
    it('handles regular styles', () => {
      const styles = StyleSheet.create({
        container: {
          color: 'red',
          _rtl: {
            marginLeft: 10,
          },
          _ltr: {
            marginRight: 10,
          },
        },
      });
      const expectedCSS = '.container_fesszw{color:red !important;}[dir="rtl"] .container_fesszw{margin-left:10px !important;}[dir="ltr"] .container_fesszw{margin-right:10px !important;}';

      const { css: { content } } = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(<MyComponent styles={styles} />)
      ));

      expect(content).to.equal(expectedCSS);
    });

    it('handles pseudo selectors', () => {
      const styles = StyleSheet.create({
        container: {
          color: 'red',

          ':before': {
            color: 'blue',
          },

          ':after': {
            color: 'yellow',
          },
          _rtl: {
            marginLeft: 10,

            ':before': {
              left: 24,
            },

            ':after': {
              left: 25,
            },
          },
          _ltr: {
            marginRight: 10,

            ':before': {
              right: 24,
            },

            ':after': {
              right: 25,
            },
          },
        },
      });
      const expectedCSS = '.container_1islbu3{color:red !important;}.container_1islbu3:before{color:blue !important;}.container_1islbu3:after{color:yellow !important;}[dir="rtl"] .container_1islbu3{margin-left:10px !important;}[dir="rtl"] .container_1islbu3:before{left:24px !important;}[dir="rtl"] .container_1islbu3:after{left:25px !important;}[dir="ltr"] .container_1islbu3{margin-right:10px !important;}[dir="ltr"] .container_1islbu3:before{right:24px !important;}[dir="ltr"] .container_1islbu3:after{right:25px !important;}';
      const { css: { content } } = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(<MyComponent styles={styles} />)
      ));

      expect(content).to.equal(expectedCSS);
    });

    it('handles match media queries', () => {
      const styles = StyleSheet.create({
        container: {
          color: 'red',
          position: 'absolute',

          '@media (min-width: 744px)': {
            color: 'blue',
          },

          '@media (min-width: 1128px)': {
            color: 'yellow',
          },
          _rtl: {
            marginRight: 10,

            '@media (min-width: 744px)': {
              left: 10,
            },

            '@media (min-width: 1128px)': {
              left: 20,
            },
          },
          _ltr: {
            marginLeft: 10,

            '@media (min-width: 744px)': {
              right: 10,
            },

            '@media (min-width: 1128px)': {
              right: 20,
            },
          },
        },
      });

      const expectedCSS = '.container_hc3clv{color:red !important;position:absolute !important;}@media (min-width: 744px){.container_hc3clv{color:blue !important;}}@media (min-width: 1128px){.container_hc3clv{color:yellow !important;}}[dir="rtl"] .container_hc3clv{margin-right:10px !important;}@media (min-width: 744px){[dir="rtl"] .container_hc3clv{left:10px !important;}}@media (min-width: 1128px){[dir="rtl"] .container_hc3clv{left:20px !important;}}[dir="ltr"] .container_hc3clv{margin-left:10px !important;}@media (min-width: 744px){[dir="ltr"] .container_hc3clv{right:10px !important;}}@media (min-width: 1128px){[dir="ltr"] .container_hc3clv{right:20px !important;}}';
      const { css: { content } } = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(<MyComponent styles={styles} />)
      ));

      expect(content).to.equal(expectedCSS);
    });

    it('handles a mix of match media queries and regular styles', () => {
      const styles = StyleSheet.create({
        container: {
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
        },
      });

      const expectedCSS = '[dir="ltr"] .container_1nqxn3{left:-8px !important;}@media (max-width:744px){[dir="ltr"] .container_1nqxn3{left:0px !important;}}[dir="rtl"] .container_1nqxn3{right:-8px !important;}@media (max-width:744px){[dir="rtl"] .container_1nqxn3{right:0px !important;}}';
      const { css: { content } } = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(<MyComponent styles={styles} />)
      ));

      expect(content).to.equal(expectedCSS);
    });

    it('handles flippable keyframe animations', () => {
      const styles = StyleSheet.create({
        container: {
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
        },
      });

      const expectedCSS = '@keyframes keyframe_p1skye{0%{-webkit-transform:scale(0.75) translate3d(4px, -8px, 0);-ms-transform:scale(0.75) translate3d(4px, -8px, 0);transform:scale(0.75) translate3d(4px, -8px, 0);}100%{-webkit-transform:scale(1) translate3d(4px, -8px, 0);-ms-transform:scale(1) translate3d(4px, -8px, 0);transform:scale(1) translate3d(4px, -8px, 0);}}@keyframes keyframe_93w1qu{0%{-webkit-transform:scale(0.75) translate3d(-4px, -8px, 0);-ms-transform:scale(0.75) translate3d(-4px, -8px, 0);transform:scale(0.75) translate3d(-4px, -8px, 0);}100%{-webkit-transform:scale(1) translate3d(-4px, -8px, 0);-ms-transform:scale(1) translate3d(-4px, -8px, 0);transform:scale(1) translate3d(-4px, -8px, 0);}}@keyframes keyframe_1sh8tyy{0%{opacity:0;}100%{opacity:1;}}.container_xmf315{-webkit-animation-duration:0.5s !important;animation-duration:0.5s !important;-webkit-animation-fill-mode:both !important;animation-fill-mode:both !important;-webkit-animation-name:keyframe_1sh8tyy !important;animation-name:keyframe_1sh8tyy !important;-webkit-animation-timing-function:ease !important;animation-timing-function:ease !important;}[dir="ltr"] .container_xmf315{-webkit-animation-name:keyframe_p1skye !important;animation-name:keyframe_p1skye !important;}[dir="rtl"] .container_xmf315{-webkit-animation-name:keyframe_93w1qu !important;animation-name:keyframe_93w1qu !important;}';
      const { css: { content } } = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(<MyComponent styles={styles} />)
      ));

      expect(content).to.equal(expectedCSS);
    });
  });
});
