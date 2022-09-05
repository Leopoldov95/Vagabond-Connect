let io, socket;

export let onlineUsers: any = [];

export const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user: any) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
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
  console.log(target);
  io.to(target.socketId).emit("notification", notifications);
};
