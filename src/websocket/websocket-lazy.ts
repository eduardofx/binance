import * as WebSocket from "ws";
import * as readlineSync from "readline-sync";

const ws = new WebSocket("wss://stream.binance.com:9443/ws/bookTicker");

// examples: [BTCBRL, BTCUSDT, SHIBUSDT]
const symbol = readlineSync.question("Qual par de moedas deseja monitorar? ");

ws.on("open", () => {
  ws.send(
    JSON.stringify({
      method: "SUBSCRIBE",
      params: [`${symbol.toLowerCase()}@miniTicker`],
      id: 1,
    })
  );
});

ws.onmessage = (event) => {
  const obj = JSON.parse(event.data);
  console.log(`Symbol: ${obj.s}`);
  console.log(`Close price: ${obj.c}`);
  console.log(`Open price: ${obj.o}`);
  console.log(`High price: ${obj.h}`);
  console.log(`Low price: ${obj.l}`);
  console.log(`Total traded base asset volume: ${obj.v}`);
};
