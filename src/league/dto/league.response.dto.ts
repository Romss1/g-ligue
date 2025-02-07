export class LeagueResponseDTO {
    constructor(
        public id: string,
        public name: string,
        public description: string|null,
        public isAuthorizedMidSeasonRegistration: boolean,
        public numberOfPlayerByDivision: number,
        public startDate: Date,
        public enddDate: Date
    ) {}
}