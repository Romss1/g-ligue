import { User } from "@prisma/client";
import { UserInformationsDTO } from "./user.informations.dto";

export class MembershipRequestResponseDTO {
    constructor(
        public id: string,
        public user: UserInformationsDTO,
        public message: string,
        public createdAt: Date,
        public updatedAt: Date,
    ){}
}