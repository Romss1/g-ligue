import { PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, Entity } from 'typeorm';
import { Round } from '../../round/entities/round.entity';
import { Player } from 'src/modules/user/entities/player.entity';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Round, (round) => round.matches)
  round: Round;

  @ManyToOne(() => Player, { nullable: false })
  @JoinColumn({ name: 'player1_id' })
  player1: Player;

  @ManyToOne(() => Player, { nullable: false })
  @JoinColumn({ name: 'player2_id' })
  player2: Player;

  @Column('json', { nullable: true })
  setScores: { player1: number; player2: number }[];

  @ManyToOne(() => Player, { nullable: true })
  @JoinColumn({ name: 'winner_id' })
  winner: Player;
}
