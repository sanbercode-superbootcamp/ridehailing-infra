const https = require("https");

function makeRequest() {
  return new Promise((resolve, reject) => {
    const req = https.request("https://hello.qh.sirus.dev", res => {
      res.once("data", datas => {
        const data = JSON.parse(datas);
        resolve(data[2].ip);
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

const MAX_REQUEST = 1000;
const DELAY = 10;

async function normal() {
  while(1) {
    await delay(DELAY);
    const ip = await makeRequest();
    console.log(ip);
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
      const ips = await Promise.all(reqs.map(() => makeRequest()));
      for (let ip in ips) {
        console.log(ips[ip]);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

normal();
