import { DOM } from "./index.js";
import { markAsRead } from "../index.js";

export const CreateNotification = ({
  id,
  avatar,
  username,
  description,
  published_at,
  activity_of,
  image_thumbnail,
  read,
  content,
  renderContent,
}) => {
  let NotificationActivity = "";
  let ImageThumbnail = "";
  let NotificationContent = "";

  const ContainerNotification = DOM.createElement("div", {
    class: ["notification", !read && "notification-unread"],
    "data-id": id,
    onclick: markAsRead.bind(null, id),
  });
  if (activity_of) {
    const currentClass = activity_of.type ? `-${activity_of.type}` : "";
    NotificationActivity = `<span class="notification__activity${currentClass}">${activity_of.name}</span>`;
  }
  if (image_thumbnail) {
    ImageThumbnail = `
      <div class="notification__picture">
        <figure class="natification__picture-thumbnail">
          <img src="./assets/images/${image_thumbnail}" alt="Photo" />
        </figure>
      </div>
    `;
  }
  if (renderContent && content) {
    NotificationContent = `
      <div class="notification__content">
        <p>${content}</p>
      </div>
    `;
  }
  ContainerNotification.innerHTML = `
    <div class="notification__user">
      <figure class="user__avatar">
        <img class="user__avatar-thumbnail" src="./assets/images/${avatar}" alt="${username}" />
      </figure>
    </div>
    <div class="notification__description">
      <p class="notification__sentence">
        <strong class="notification__username">${username}</strong> ${description}
        ${NotificationActivity}
      </p>
      <p class="notification__published-time">${published_at}</p>
      ${NotificationContent}
    </div>
    ${ImageThumbnail}
  `;
  return ContainerNotification;
};
