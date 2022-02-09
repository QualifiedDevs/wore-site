const emailExp = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const discordExp = new RegExp(/^.{3,32}#[0-9]{4}$/);
const walletExp = new RegExp(/^0x[a-fA-F0-9]{40}$/);

export { emailExp, discordExp, walletExp };