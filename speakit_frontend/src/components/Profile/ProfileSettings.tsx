import React, { FC } from "react";
import { User } from "../../api/interfaces";

type Props = {
  user: User | undefined;
};

const ProfileSettings: FC<Props> = () => {
  return <div>ProfileSettings</div>;
};

export default ProfileSettings;
