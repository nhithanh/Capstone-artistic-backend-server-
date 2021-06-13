import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import * as hmacSHA512 from 'crypto-js/hmac-sha512'
import * as Base64 from 'crypto-js/enc-base64'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    username: string


    @Column({
        type: 'varchar',
        unique: true,
        nullable: true
    })
    defaultAlbumId: string
    

    @Column({
        type: 'varchar',
        nullable: false,
        select: false
    })
    password: string

    @Column({
        default: ''
    })
    firstName: string;

    @Column({
        default: ''
    })
    lastName: string;

    @Column({
        default: ''
    })
    email: string;

    @Column({
        type: 'date',
        default: new Date()
    })
    dateOfBirth: string;

    @Column({
        type: 'varchar',
        nullable: true,
        default: 'https://cdn.dribbble.com/users/427368/screenshots/14046571/dribbble.jpg'
    })
    iconURL: string;

    public comparePassword(password: string): boolean {
        const encryptPassword = Base64.stringify(hmacSHA512(password, process.env.PASSWORD_HASH_SECRET_KEY));
        console.log("Secret:", process.env.PASSWORD_HASH_SECRET_KEY)
        console.log(encryptPassword)
        console.log(this.password)
        return this.password === encryptPassword;
    }

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password) {
            this.password = Base64.stringify(hmacSHA512(this.password, process.env.PASSWORD_HASH_SECRET_KEY));
        }
    }
}
