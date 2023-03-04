
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pessoa')
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  nome: string;

  @Column()
  sobrenome: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column()
  rua: string;

  @Column()
  bairro: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;


  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

}
