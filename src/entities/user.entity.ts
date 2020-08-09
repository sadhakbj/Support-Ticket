import * as bcrypt from 'bcryptjs'
import { classToPlain, Exclude } from 'class-transformer'
import { IsEmail } from 'class-validator'
import { DBTable } from 'src/constants/dbtable'
import { BeforeInsert, Column, Entity } from 'typeorm'
import { AbstractEntity } from './abstract-entity'

@Entity(DBTable.AUTH_USERS)
export class UserEntity extends AbstractEntity {
  @Column()
  @IsEmail()
  email: string

  @Column({ unique: true })
  username: string

  @Column()
  @Exclude()
  password: string

  @Column({ default: '' })
  bio: string

  @Column({ default: null, nullable: true })
  image: string | null

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12)
  }

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase()
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password)
  }

  toJSON() {
    return classToPlain(this)
  }
}
