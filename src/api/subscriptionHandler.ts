const subscriptions = {};
import * as crypto from "crypto";
import * as webpush from "web-push";

const vapidKeys = {
  privateKey: process.env.WEB_PUSH_PRIVATE_KEY,
  publicKey: process.env.WEB_PUSH_PUBLIC_KEY,
};
console.log("vapidKeys.privateKey", vapidKeys.privateKey, vapidKeys.publicKey);

webpush.setVapidDetails(
  "mailto:jodmosluth@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

function createHash(input) {
  const md5sum = crypto.createHash("md5");
  md5sum.update(Buffer.from(input));
  return md5sum.digest("hex");
}

function handlePushNotificationSubscription(req, res) {
  const subscriptionRequest = req.body;
  console.log("req.body", req.body);
  const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
  console.log("req.body", susbscriptionId);
  subscriptions[susbscriptionId] = subscriptionRequest;
  res.status(201).json({ id: susbscriptionId });
}

function sendPushNotification(req, res) {
  console.log("req.params", req.params);
  const subscriptionId = req.params.id;
  const pushSubscription = subscriptions[subscriptionId];
  webpush
    .sendNotification(
      pushSubscription,
      JSON.stringify({
        title: "New Product Available ",
        text: "HEY! Take a look at this brand new t-shirt!",
        image: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
        tag: "new-product",
        url: "/new-product-jason-leung-HM6TMmevbZQ-unsplash.html",
      })
    )
    .catch((err) => {
      console.log(err);
    });

  res.status(202).json({});
}

module.exports = { handlePushNotificationSubscription, sendPushNotification };
