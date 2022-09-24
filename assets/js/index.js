import { Component } from "./libs/index.js";
const $containerNotifications = document.querySelector("#notifications");
const $countNotifications = document.querySelector("#count-notifications");
const $markAllAsRead = document.querySelector("#mark-all-as-read");

let LIST_NOTIFICATIONS = [];

async function getNotifications() {
  const response = await fetch("../assets/data/notifications.json");
  const { data } = await response.json();
  return data;
}

function renderNotifications() {
  $containerNotifications.innerHTML = "";
  $countNotifications.textContent = LIST_NOTIFICATIONS.filter((item) => !item.read).length;
  const notifications = LIST_NOTIFICATIONS.map((notification) => Component.CreateNotification(notification));
  notifications.forEach((notification) => {
    $containerNotifications.append(notification);
  });
}

$markAllAsRead.addEventListener("click", markAllAsRead);

function markAllAsRead() {
  const NOTIFICATIONS = LIST_NOTIFICATIONS.map(changeStateToRead);
  LIST_NOTIFICATIONS = NOTIFICATIONS;
  renderNotifications();
}

export function markAsRead(notificationId) {
  const index = LIST_NOTIFICATIONS.findIndex((value) => value.id === notificationId);
  const notification = LIST_NOTIFICATIONS[index];
  LIST_NOTIFICATIONS.splice(index, 1, changeStateToRead(notification));
  renderNotifications();
}

function changeStateToRead(notification) {
  return {
    ...notification,
    read: true,
    renderContent: notification.content ? true : false,
  };
}

async function init() {
  const response = await getNotifications();
  const list = response.map((item) => ({ ...item, read: false, renderContent: false }));
  LIST_NOTIFICATIONS = [...list];
  renderNotifications();
}

init();
