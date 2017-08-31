/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import * as aphrodite from 'aphrodite';
import withRTLExtension from '../src/withRTLExtension';

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
  describe('without _rtl style definition', () => {
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
});
