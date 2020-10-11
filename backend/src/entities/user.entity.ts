import * as bcrypt from 'bcryptjs'
import { classToPlain, Exclude } from 'class-transformer'
import { IsEmail } from 'class-validator'
import { DBTable } from 'src/constants/dbtable'
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm'
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

  @Column({ nullable: true })
  image: string | null

  @ManyToMany(type => UserEntity, { cascade: true })
  @JoinTable({
    name: DBTable.PIVOT_USERS_FOLLOWERS,
    joinColumns: [{ name: 'followee_id' }],
    inverseJoinColumns: [{ name: 'follower_id' }],
  })
  followers: UserEntity[]

  @ManyToMany(
    type => UserEntity,
    user => user.followers,
  )
  followee: UserEntity[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12)
  }

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase()
  }

  /**
   * Compare the passowrd if that matches or not.
   * @param password
   */
  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
  }

  toJSON() {
    return classToPlain(this)
  }

  /**
   *
   * @param user
   */
  toProfile(user: UserEntity) {
    const following = this.followers.includes(user)
    const profile: any = this.toJSON()
    delete profile.followers
    return { ...profile, following }
  }

  /**
   * Check if provided user follows another user or not.
   * @param user
   */
  follows(user: UserEntity): boolean {
    const followerIds = []
    user.followers.forEach(user => {
      followerIds.push(user.id)
    })
    return followerIds.includes(this.id)
  }
}
