import { gql, useLazyQuery } from "@apollo/client";
import React from "react";

const dummyQyery = gql`
  query getCompanyDetails {
    company123 {
      ceo
      coo
      cto
      cto_propulsion
      founded
      employees
      founder
      headquarters {
        state
      }
      launch_sites
      name
      test_sites
      vehicles
    }
  }
`;

function App() {
  const [forloader, { error: testError }] = useLazyQuery(dummyQyery, {
    fetchPolicy: "network-only",
  });

  return <div></div>;
}

export default App;
