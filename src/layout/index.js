import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { connect } from 'react-redux';

import Header from 'components/Header';
import * as actionCreators from 'store/actions';
import './layout.css';

class Layout extends Component {
  render() {
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
              {this.props.ctr}
              <div>
                <button onClick={this.props.onIncrementCounter}>Increment</button>
                <button onClick={this.props.onDecrementCounter}>Decrement</button>
                <button onClick={this.props.onAddCounter}>Add 5</button>
                <button onClick={this.props.onSubstractCounter}>Subtract 5</button>
              </div>
              <br/>
              <hr/>
              <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
              <ul>
                {this.props.storedResults.map(el => (
                  <li key={el.id} onClick={() => this.props.onRemoveResult(el.id)}>{el.value}</li>
                ))}
              </ul>
              {this.props.children}
            </div>
          </>
        )}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);