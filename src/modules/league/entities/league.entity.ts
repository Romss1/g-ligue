import { Division } from 'src/modules/division/entities/division.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('leagues')
export class League {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Division, (division) => division.league, { cascade: true })
  divisions: Division[];

  @Column({ default: false })
  isAuthorizedMidSeasonRegistration: boolean;

  @Column({ default: 5 })
  numberOfPlayerByDivision: number;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @UpdateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
