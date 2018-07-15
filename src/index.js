const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];
let idCount = links.length;

const findIndex = id => {
  return links.findIndex(link => {
    return link.id === id;
  });
};

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => {
      return links[findIndex(args.id)];
    }
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (root, args) => {
      const i = findIndex(args.id);
      links[i] = Object.assign(links[i], args);
      return links[i];
    },
    deleteLink: (root, args) => {
      return links.splice(findIndex(args.id), 1)[0];
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
