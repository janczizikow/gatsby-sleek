import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { connect } from 'react-redux';

import Header from 'components/Header';
import * as actionCreators from 'store/actions';
import './layout.css';

const propTypes = {
  ctr: PropTypes.number,
  onIncrementCounter: PropTypes.func,
  onDecrementCounter: PropTypes.func,
  onAddCounter: PropTypes.func,
  onSubstractCounter: PropTypes.func,
  storedResults: PropTypes.instanceOf(Array),
  onStoreResult: PropTypes.func,
  onRemoveResult: PropTypes.func,
  children: PropTypes.node.isRequired,
};

/* eslint-disable react/prefer-stateless-function */
class Layout extends Component {
  render() {
    const {
      ctr,
      onIncrementCounter,
      onDecrementCounter,
      onAddCounter,
      onSubstractCounter,
      storedResults,
      onRemoveResult,
      onStoreResult,
      children,
    } = this.props;

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div
              style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '0px 1.0875rem 1.45rem',
                paddingTop: 0,
              }}
            >
              {ctr}
              <div>
                <button type="button" onClick={onIncrementCounter}>
                  Increment
                </button>
                <button type="button" onClick={onDecrementCounter}>
                  Decrement
                </button>
                <button type="button" onClick={onAddCounter}>
                  Add 5
                </button>
                <button type="button" onClick={onSubstractCounter}>
                  Subtract 5
                </button>
              </div>
              <br />
              <hr />
              <button type="button" onClick={() => onStoreResult(ctr)}>
                Store Result
              </button>
              <ul>
                {storedResults.map(el => (
                  /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
                  <li key={el.id} onClick={() => onRemoveResult(el.id)}>
                    {el.value}
                  </li>
                ))}
              </ul>
              {children}
            </div>
          </>
        )}
      />
    );
  }
}

Layout.propTypes = propTypes;

const mapStateToProps = state => {
  return {
    ctr: state.ctr.counter,
    storedResults: state.res.results,
  };
};

const mapDispatchToProps = dispach => {
  return {
    onIncrementCounter: () => dispach(actionCreators.inc()),
    onDecrementCounter: () => dispach(actionCreators.dec()),
    onAddCounter: () => dispach(actionCreators.add(5)),
    onSubstractCounter: () => dispach(actionCreators.sub(5)),
    onStoreResult: res => dispach(actionCreators.storeResult(res)),
    onRemoveResult: id => dispach(actionCreators.removeResult(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
