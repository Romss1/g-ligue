export class ClubResponseDTO {
    constructor(
        public uuid: string,
        public name: string,
        public createdAt: Date,
        public updatedAt:Date,
    ) {}
}