// import { ApolloClient } from 'apollo-client'
// import { HttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'

fetch = require('node-fetch');
const ApolloClient = require('apollo-client-preset').ApolloClient;
const HttpLink = require('apollo-link-http').HttpLink;
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;

client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8080/graphql' }),
  cache: new InMemoryCache()
});

module.exports  = client;