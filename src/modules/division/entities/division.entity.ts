import { League } from 'src/modules/league/entities/league.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Round } from '../../round/entities/round.entity';

@Entity('divisions')
export class Division {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  @ManyToOne(() => League, (league) => league.divisions, {
    onDelete: 'CASCADE',
  })
  league: League;

  @OneToMany(() => Round, (round) => round.division, { cascade: true })
  rounds: Round[];

  @Column()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
