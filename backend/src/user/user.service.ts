import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { config } from 'dotenv';
import { authenticator } from 'otplib';
import { PrismaService } from 'src/prisma/prisma.service';

config;

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    async activate2fa(user: any) {
        const otpauthUrl = authenticator.keyuri(user.id, process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME, user.two_factor_auth_key);
        // console.log(otpauthUrl);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { two_factor_auth: true, two_factor_auth_uri: otpauthUrl },
        });
        // console.log(otpauthUrl);
        return { two_factor_auth_uri: otpauthUrl };
    }

    async deactivate2fa(user: any) {
        await this.prisma.user.update({
            where: { id: user.id },
            data: { two_factor_auth: false, two_factor_auth_uri: null },
        });
        return { message: '2FA deactivated' };
    }

    async verify2fa(user: any, code: string) {
        const isValid = authenticator.verify({ token: code, secret: user.two_factor_auth_key });
        if (isValid) {
            return true;
        }
        return false;
    }

    async checkIfUsernameExists(username: string) {
        const user = await this.prisma.user.findUnique({ where: { username } });
        console.log(user);
        if (user) {
            return true;
        }
        return false;
    }

    async updateProfile(user: any, body: any) {
        const { first_name, last_name, username } = body;
        const data = { first_name, last_name, username };
        if (await this.checkIfUsernameExists(username)) {
            return { message: 'Username already exists' };
        }
        return await this.prisma.user.update({
            where: { id: user.id },
            data,
        });
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (user) {
            delete user.two_factor_auth_key;
            return user;
        }
        return null;
    }

    async getFriends(id: string) {
        const friends = await this.prisma.user.findUnique(
            {
                where: { id }
            }
        ).friends().then(fs => {
            if (fs !== null) {
                fs.map(f => {
                    delete f.two_factor_auth_key;
                    return f;
                })
            }
            return fs;
        });
        return friends;
    }

    async addFriend(userId: string, friendId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        const friend = await this.prisma.user.findUnique({ where: { id: friendId } });


        if (user && friend) {
            const isFriend = await this.getFriends(userId).then(friends => {
                return friends.some(friend => friend.id === friendId);
            });
            if (isFriend)
                return { message: 'User is already your friend' };

            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    friends: {
                        connect: {
                            id: friendId
                        }
                    }
                }
            });
            await this.prisma.user.update({
                where: { id: friendId },
                data: {
                    friends: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });
            return { message: 'Friend added' };
        }
        return { message: 'User not found' };
    }

    async searchUser(username: string) {
        const users = await this.prisma.user.findMany({
            where: {
                username: {
                    contains: username,
                    mode: 'insensitive',
                }
            }
        });
        return users;
    }

    async getAllUsers(id: string) {
        const users = await this.prisma.user.findMany({
            where: {
                NOT: {
                    id
                }
            }
        });
        users.map(user => {
            delete user.two_factor_auth_key;
            return user;
        })
        return users;
    }
}
