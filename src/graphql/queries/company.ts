import { gql } from "@apollo/client";

const GET_LAUNCHES = gql`
  query GetLaunches($limit: Int) {
    launchesPast(limit: $limit) {
      ships {
        name
        home_port
        image
      }
    }
  }
`;
