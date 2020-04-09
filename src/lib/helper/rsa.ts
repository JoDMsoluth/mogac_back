const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });

const public_key: string = key.exportKey("public");
const private_key: string = key.exportKey("private");

export default {
  public_key,
  private_key,
};
