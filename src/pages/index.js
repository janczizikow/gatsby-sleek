import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';

import Layout from 'layout';

const propTypes = {
  data: PropTypes.instanceOf(Object),
};

const IndexPage = ({ data }) => (
  <Layout>
    <h1>Hi people</h1>
    <div style={{ width: 250 }}>
      <Image
        style={{ width: '100%', height: 'auto', verticalAlign: 'middle' }}
        fluid={data.iconImage.childImageSharp.fluid}
      />
    </div>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

IndexPage.propTypes = propTypes;

export default IndexPage;

export const pageQuery = graphql`
  query {
    iconImage: file(relativePath: { regex: "/icon/" }) {
      childImageSharp {
        fluid(maxWidth: 200, maxHeight: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
