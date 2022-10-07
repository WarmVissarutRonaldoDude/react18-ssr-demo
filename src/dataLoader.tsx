import React, { createContext, useContext } from "react";

const DataContext = createContext(null);

function createFakeData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const fakeTableData = [
  createFakeData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createFakeData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createFakeData("Eclair", 262, 16.0, 24, 6.0),
  createFakeData("Cupcake", 305, 3.7, 67, 4.3),
  createFakeData("Gingerbread", 356, 16.0, 49, 3.9),
];

const fakeFetch = (cb) => {
  return new Promise<true>((resolve) => {
    setTimeout(() => {
      console.log("FAKE LOAD ON SERVER FINISHED");
      cb();
      resolve(true);
    }, 5000);
  });
};

// fake load data on server
export const createServerData = () => {
  let done = false;
  let promise = null;
  return {
    preload() {
      console.log("PRELOAD DATA ");
      if (done) {
        return Promise.resolve();
      }

      if (!promise) {
        const onDone = () => {
          done = true;
          promise = null;
        };

        promise = fakeFetch(onDone);
      }
      return promise;
    },
    read() {
      console.log("START READ DATA ", done);
      if (done) {
        return;
      }
      if (promise) {
        throw promise;
      }

      const onDone = () => {
        done = true;
        promise = null;
      };

      promise = fakeFetch(onDone);
      throw promise;
    },
  };
};

export function DataProvider({ children, data }) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const ctx = useContext(DataContext);

  if (ctx !== null) {
    // This context is only provided on the server.
    // It is here to simulate a suspending data fetch.
    ctx.read();
  }

  return fakeTableData; // fake data
};
