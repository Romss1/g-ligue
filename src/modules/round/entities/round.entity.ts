import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Division } from '../../division/entities/division.entity';
import { Player } from 'src/modules/user/entities/player.entity';
import { LifeCycleStatus } from 'src/common/enums/lifecycle-status.enum';
import { Match } from '../../match/entities/match.entity';

@Entity('rounds')
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roundNumber: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({
    type: 'enum',
    enum: LifeCycleStatus,
    default: LifeCycleStatus.IN_PROGRESS,
  })
  roundState: LifeCycleStatus;

  @Column()
  isCurrent: boolean;

  @ManyToOne(() => Division, (division) => division.rounds, {
    onDelete: 'CASCADE',
  })
  division: Division;

  @ManyToMany(() => Player, (player) => player.rounds)
  @JoinTable()
  players: Player[];

  @OneToMany(() => Match, (match) => match.round, {cascade: true})
  matches: Match[];
}
