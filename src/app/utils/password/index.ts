import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import {User} from "../../models";

export class Passport {

    public static init(): void {
        passport.use(
            new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
                try {
                    const user: any = await User.findOne({ email });

                    if (!user) {
                        return done(null, false, { message: 'Invalid email or password' });
                    }

                    const isMatch = await bcrypt.compare(password.toString(), user.password);

                    if (!isMatch) {
                        return done(null, false, { message: 'Invalid email or password' });
                    }

                    return done(null, user);

                } catch (error) {
                    console.log("Passport error")

                    return done(error);
                }
            })
        );

        passport.serializeUser((user: any, done) => {
            done(null, user?.id);
        });

        passport.deserializeUser(async (id, done) => {
            try {
                const user = await User.findById(id);
                done(null, user);
            } catch (error) {
                done(error);
            }
        });
    }

    public static initialize(): any {
        return passport.initialize();
    }

    public static session(): any {
        return passport.session();
    }

}