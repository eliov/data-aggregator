import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ type: 'varchar', enum: ['earned', 'spent', 'payout', 'paid_out'] })
  type: string;

  @Column('float')
  amount: number;

  @Column()
  createdAt: Date;
}