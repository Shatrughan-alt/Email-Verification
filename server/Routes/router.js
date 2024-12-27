const router = require("express").Router();
const { User, validate, validatelogin } = require("../model/user");
const bcrypt = require("bcrypt");
const Token = require("../model/token");
const sendEmail = require("../Email/email"); // Assuming sendEmail is properly defined
const crypto = require("crypto");
const mongoose=require("mongoose");

// Registration Route
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with given email already Exist!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user = await new User({ ...req.body, password: hashPassword }).save();

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);

        res.status(201).send({ message: "An Email sent to your account please verify" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { error } = validatelogin(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });

        if (!user.verified) {
            let token = await Token.findOne({ userId: user._id });
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();
                const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
                await sendEmail(user.email, "Verify Email", url);
            }

            return res
                .status(400)
                .send({ message: "An Email sent to your account please verify" });
        }

        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Email Verification Route
router.get("/:id/verify/:token/", async (req, res) => {
    try {


        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send({ message: "Invalid user ID" });
        }
        // Find the user by ID
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link" });

        // Find the token associated with the user
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });

        // Update the 'verified' field to true
        await User.findByIdAndUpdate(user._id, { $set: { verified: true } });
        console.log("Verified");

        // Remove the token after verification
        await token.remove();


        res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Error during email verification:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// / await token.remove();



module.exports = router;
