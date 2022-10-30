let io, socket;

export let onlineUsers: any = [];

export const addNewUser = (userId, socketId) => {
  if (!onlineUsers.some((user: any) => user.userId === userId)) {
    onlineUsers.push({ userId, socketId });
    console.log(`${userId} has been added to session!`);
  }
};

// on diconnect - remove the user
export const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

export const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

export const setSession = (setIo, setSocket) => {
  io = setIo;
  socket = setSocket;
};

// Functions that should ONLY EMIT to other users, do not use these to update the activer user's UI

export const updateNotification = (mongoId, notifications) => {
  const target = getUser(mongoId);
  io.to(target.socketId).emit("notification", notifications);
};

export const typingNotification = (data) => {
  const { sender, receiver } = data;
  const target = getUser(receiver);
  if (target) {
    io.to(target.socketId).emit("composing", sender);
  }
};

export const updateMessageSocket = (mongoId, data) => {
  //console.log(mongoId);
  //console.log(onlineUsers);
  // 10/16/2022 - becuase there is not active online user, no need to emitt a socket signal
  const target = getUser(mongoId);
  if (target) {
    console.log(data);
    io.to(target.socketId).emit("newMessage", data);
    // 10/10/22 left off here
    /**
     * SERVER
     * Message will be created onto database
     * Update will be made for target user message notifications array in database
     * This will trigger a socket action that updates necessary users of the new message array
     * CLIENT
     * Reveiver will get message, Message will ONLY populate if receiver is in Message page
     * This will trigger a react useEffect
     * IF user is in current chat room with sender, then filter out message notifications for that user AND DO NOT UPATE CLIENT NAV MESSAGE BADGE
     ** This should also update the database to clear the message notification form active sender
     * ELSE IF user is in anohter chat room or page, then update nav notifcations as usual
     * make notifications take you to chat room on click and CLEAR notificiations
     */
  } else {
    console.error("user not found!");
  }
};
