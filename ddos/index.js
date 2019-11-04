const http = require("http");

function makeRequest() {
  return new Promise((resolve, reject) => {
    const req = http.request("http://172.17.209.119:30001", res => {
      res.once("data", data => {
        resolve(data.toString());
      });
    });

    req.once("error", error => {
      reject(error);
    });

    req.end();
  });
}

function delay(time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time || 3000);
  });
}

const MAX_REQUEST = 20;
const DELAY = 100;

async function normal() {
  while(1) {
    await delay(DELAY);
    try {
      const res = await makeRequest();
      console.log(res);
    } catch (err) {
      console.error(err.message);
    }
  }
}

async function ddos() {
  const reqs = [];
  for (let i = 0; i < MAX_REQUEST; i++) {
    reqs.push(i);
  }
  while(1) {
    await delay(DELAY);
    try {
      const responses = await Promise.all(reqs.map(() => makeRequest()));
      for (let res in responses) {
        console.log(responses[res]);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

ddos();
