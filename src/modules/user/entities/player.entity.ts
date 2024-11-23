import { Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Round } from 'src/modules/round/entities/round.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.player, { cascade: true })
  user: User;

  @ManyToMany(() => Round, (round) => round.players)
  rounds: Round[];
}
