import frontPage from "./front-page";
import page from "./page";
import single from "./single";
import archive from "./archive";
import singular from "./singular"
import { gql } from "@apollo/client";

const HelloWorldTemplate = ({ data }) => {

  const { nodeByUri: { title, content } } = data;
  return (
      <>
        <h2 style={{color:"green"}} >{ title }</h2>
        <p dangerouslySetInnerHTML={{ __html: content}} />
      </>
  )
};

HelloWorldTemplate.variables = ( data ) => {
  return {
    uri: data.uri,
  };
}

HelloWorldTemplate.query = gql`
query GetNodeByUri($uri:String!){
  nodeByUri(uri: $uri) {
    id
    __typename
    ...WhateverYouWant
  }
}

fragment WhateverYouWant on Post {
  title
  featuredImage {
    node {
      id
      sourceUrl
    }
  }
  content
}
`

export default {
  "front-page": frontPage,
  page,
  single,
  archive,
  singular,
  "single-house": () => {
    return (
        <h2>This is the house template!</h2>
    )
  },
  "single-post-hello-world": HelloWorldTemplate
};
