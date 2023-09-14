import { Avatar } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";

export const ProfileIcons = ({ users }) => {
  return (
    <AvatarGroup max={4}>
      {users.length > 0 &&
        users.map((user, idx) => (
          <Avatar
            key={idx}
            alt={`${user.firstName} ${user.lastName}`}
            src={user.profile_cloudinary}
          />
        ))}
    </AvatarGroup>
  );
};
