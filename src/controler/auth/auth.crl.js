import {cryptPassword, comparePassword} from "@/utilities/encryption";
import Account from "@/model/account.model";
import User from "@/model/user.model";
import {generateAccessToken, generateRefreshToken} from "@/utilities/generateToken";
import {randomNumber} from "@/utilities";
import {verifyEmail} from "@/utilities/verifyEmail";

export class AuthCrl {
  static async sigIn(req, res) {
    try {
      const {email, password} = req.body
      const account = await Account.findOne({email})
      if (!account) {
        return res.status(400).json({message: "User not existing"});
      }
      if (!account.isVerified) {
        return res.status(400).json({message: "Your account has not been verified"});
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
      } else {
        return res.status(400).json({
          message: "Email or password wrong!!"
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

      if (existingUser) {
        return res.status(400).json({message: "User existing"});
      }
      const verifyCode = randomNumber(6);
      verifyEmail(email, 'Code', verifyCode, req, res, "Successfully");
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
        isAdmin: false,
        isVerified: false,
        verifyCode
      });
      await newProfile.save();
      await newAccount.save();
      return res.status(201).json({data: newProfile, message: "The verification code has been sent to your email"});
    } catch (error) {
      console.log(error)
      return res.status(500).json({error: error});
    }

  }

  static async verify(req, res) {
    try {
      const {email, code} = req.body;
      const account = await Account.findOne({email: email});
      if (!account) {
        return res.status(400).json({message: "User existing"});
      }
      if (code !== account.verifyCode) {
        return res.status(400).json({message: "Verify failed"});
      }
      account.isVerified = true;
      await account.save();
      return res.status(201).json({message: "Successfully"});
    } catch (e) {
      console.log(e)
      return res.status(500).json({e});
    }
  }
}
