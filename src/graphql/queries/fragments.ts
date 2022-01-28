import { gql } from "@apollo/client";

export const STATE_FRAGMENT = gql`
  fragment StateFragment on Address {
    state
  }
`;
