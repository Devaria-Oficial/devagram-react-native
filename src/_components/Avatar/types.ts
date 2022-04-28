import { IUser, IUserData } from "../../_services/UserService/types";

export interface IAvatar {
    withBorder?: boolean,
     user: IUserData | IUser,
      image?: any
}