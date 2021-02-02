import React from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache();
const link = new createHttpLink({
    uri: "http://localhost:4000/",
});

const client = new ApolloClient({
    cache: cache,
    link: link,
    resolvers: {
        Movie: {
            isLiked: () => false
        },
        Mutation: {
            toggleLikedMovie: (_, { id, isLiked }, { cache }) => {
                const myMovie = {
                    __typename: `Movie`,
                    id: `${id}`,
                    isLiked: `${isLiked}`
                };
                cache.modify({
                    id: cache.identify(myMovie),
                    fields: {
                        isLiked(cachedName) {
                            return !isLiked;
                        },
                    },
                });
            },
        }
    }
})

export default client;
