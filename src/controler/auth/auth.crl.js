import {cryptPassword, comparePassword} from "@/utilities/encryption";
import Account from "@/model/account.model";
import User from "@/model/user.model";
import {hash} from "bcrypt";
import {generateAccessToken, generateRefreshToken} from "../../utilities/generateToken";

export class AuthCrl {
  static async sigIn(req, res) {
    try {
      const {email, password} = req.body
      const account = await Account.findOne({email})
      if (!account) {
        return res.status(400).json({message: "User not existing"});
      }
      if (await comparePassword(password, account.password)) {
        const profile = await User.findById({_id: account.profile})
        const accessToken = generateAccessToken(profile)

        const refreshToken = generateRefreshToken(profile)
        return res.status(201).json({
          message: "Successfully",
          data: profile,
          tokens: {
            accessToken,
            refreshToken
          }
        });
      }
    } catch (error) {
      return res.status(500).json({error: error});
    }
  }

  static async register(req, res) {
    try {
      const {email, password, fullName, age, gender} = req.body
      const hashPassword = await cryptPassword(password);
      const existingUser = await Account.findOne({email: email});
      console.log(hashPassword)
      if (existingUser) {
        return res.status(400).json({message: "User existing"});
      }
      const newProfile = new User({
        email,
        fullName,
        age,
        gender
      });
      const newAccount = new Account({
        email,
        password: hashPassword,
        profile: newProfile._id,
        isAdmin: false
      });
      await newProfile.save();
      await newAccount.save();
      return res.status(201).json({data: newProfile, message: "Successfully"});
    } catch (error) {
      console.log(error)
      return res.status(500).json({error: error});
    }

  }
}
