import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/modules/apis/users/entities/user.entity";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    userID: string;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User

    @Column({
        type: 'varchar',
        nullable: false
    })
    photoName: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    photoLocation: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}