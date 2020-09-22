// 참고 : https://medium.com/@seladir/how-to-implement-web-push-notifications-in-your-node-react-app-9bed79b53f34https://medium.com/@seladir/how-to-implement-web-push-notifications-in-your-node-react-app-9bed79b53f34
// 참고 : https://developers.google.com/web/fundamentals/push-notifications/subscribing-a-user

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
        title: "팀 초대",
        text: "팀에 초대받으셨습니다.",
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
