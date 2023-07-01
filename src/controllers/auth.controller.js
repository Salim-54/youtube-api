import expressAsyncHandler from "express-async-handler";

import User from "../database/model/auth.model";
import Profile from "../database/model/profile.model";
import {
  handleGetSingle,
  handleDelete,
  handleCreateUser,
  handleUpdate,
  handleCreate,
} from "../helper/general.helper.js";
import passwordGenerator from "../utils/generatePassword";
import {
  findUserByEmail,
  isCorrectPassword,
  generateToken,
} from "../helper/auth.helper.js";
import { verifyMail } from "../utils/mailer";


const httpRegisterUser = async (req, res) => {
  const { firstName, lastName, email, phone, password, role } = req.body;
  try {
    const userExist = await findUserByEmail(email);
    if (userExist) {
      return res.status(400).json({
        status: "Fail",
        message: `Email ${email} is already in our system`,
      });
    }
    const hashedPassword = await passwordGenerator(password);

    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role,
    };

    const createdUser = await handleCreateUser(User, newUser, res);

    if (createdUser) {
      await verifyMail(email, createdUser.id, req);
      return res.status(201).json({
        _id: createdUser._id,
        email: createdUser.email,
        lastName: createdUser.lastName,
        firstName: createdUser.firstName,
        role: createdUser.role,
        phone: createdUser.phone,
        verified: createdUser.verified,
      });
    } else {
      return res.status(500).json({ message: "Internal server error!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "ooops! something went wrong!" });
  }
};

const httpLoginUser = expressAsyncHandler(async (req, res) => {
  const userInfo = req.body;
  const foundUser = await findUserByEmail(userInfo.email);
  try {
    if (await isCorrectPassword(foundUser, userInfo)) {
      if (foundUser.verified) {
        return res.status(200).json({
          _id: foundUser._id,
          email: foundUser.email,
          lastName: foundUser.lastName,
          firstName: foundUser.firstName,
          role: foundUser.role,
          verified: foundUser.verified,
          phone: foundUser.phone,
          token: generateToken({
            _id: foundUser._id,
            email: foundUser.email,
            role: foundUser.role,
            lastName: foundUser.lastName,
            firstName: foundUser.firstName,
            phone: foundUser.phone,
          }),
        });
      } else {
        return res.status(200).json({
          message: `Complete the verification process that we sent on ${foundUser.email}`,
        });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: `We can't find a user with ${userInfo.email}` });
  }
});

const httpGetAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password").sort({ email: 1 });

  users
    ? res.status(200).json(users)
    : res.status(500).json({ message: "Internal server error" });
};

// @desc Get a user by Id
// @route /api/v1/users/Id
const httpGetUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id, { password: 0 }).populate("profile");
    // const user = await handleGetSingle(User, id);
    !user
      ? res.status(404).json({ status: "Fail", message: "User Not Found!" })
      : res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "ooops! something went wrong!" });
  }
};

const httpVerify = async (req, res) => {
  const { id } = req.params;
  const data = {
    verified: true,
  };

  try {
    const user = await handleGetSingle(User, id);
    if (user.verified) {
      return res
        .status(400)
        .json({ message: "ooops! Seems like you're already verified!" });
    } else {
      const initiatedProfile = await handleCreate(Profile, { user: id }, res);

      const verified = await handleUpdate(
        User,
        id,
        {
          verified: true,
        },
        res
      );
      const content = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>Email title</title>
  <!--[if mso]>
  <xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style>
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
  </style>
  <style type="text/css">
	#outlook a {padding:0;}
	body[yahoo]{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;}
	.ExternalClass {width:100%;}
	.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}
	table { border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;empty-cells:show; }
	#MessageViewBody { width: 100vw !important; min-width: 100vw !important; padding: 0 !important; margin: 0 !important; zoom: 1 !important; }
	#MessageViewBody a { color: inherit; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
	.faux-absolute{
		max-height:0;
		position:relative;
		opacity:0.999;
		}
		.faux-position{
		margin-top:0;
		margin-left:20%;
		display:inline-block;
		text-align: center;
		}
		body[data-outlook-cycle] .image{
		width:300px;
		}
	</style>
	<style type="text/css">
		@media only screen and (max-width: 414px)  {
			.reset { width: 100% !important; height: auto !important; }
			.hide { display: none !important; }
			.over-mob { max-height:170px !important; }
			.hero-textbox { width: 80% !important;}
			.left { text-align: left !important; }
		}
	</style>
</head>
<body class="body">
  <div style="max-height:0;overflow:hidden;mso-hide:all;" aria-hidden="true">
  Here's some pretty awesome preheader text...
  </div>
  <div role="article" aria-roledescription="email" aria-label="email name" lang="en" style="font-size:1rem; background-color: #E4E4E4;">
    <!-- email content in here -->
    <table role="presentation" align="center" bgcolor="#E4E4E4" border="0" cellpadding="0" cellspacing="0" width="100%">
		<tr>
			<td valign="top">
			<div class="over-mob" style="max-height:340px; margin: 0 auto; text-align: center;">
				<img class="reset" src="https://www.harambee.rw/wp-content/uploads/2023/02/GBS-Report-Launch_Cover-with-QR-Code-980x980.png" height="500px" border="0" alt="" style="vertical-align: middle;"/>
			</div>
			<!-- TEXT BLOCK START -->
			<table role="presentation" class="faux-absolute reset" align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="position:relative; opacity:0.999;">
			<tr>
				<td valign="top">
<!--[if mso]>
	<v:rect xmlns:v="urn:schemas-microsoft-com:vml" stroked="false" filled="false" style="width:600px;height:300px;">
	<v:textbox inset="0,-60px,0,0">
<![endif]-->
					<table role="presentation" class="hero-textbox" border="0" cellpadding="0" cellspacing="0" width="80%" bgcolor="#FFFFFE" align="center">
						<tr>
							<td valign="top" style="padding: 20px;">
								<h1 style="margin: 0; font-family:sans-serif; font-size:2em; color:#222222; mso-line-height-rule: exactly; line-height: 1.5; text-align:center;">
									Congratulations!
								</h1>
								<br>
							
							</td>
						</tr>
						<tr>
							<td valign="top">
								<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="80%" align="center">
								<tr>
									<td height="38" align="center" bgcolor="#36676F">
										<a href="https://harambee.vercel.app/" style="font-size: 1.2em; font-family:sans-serif; color: #FFFFFE; text-decoration: none; text-decoration: none; padding: 15px 28px; border: 1px solid #36676F; display: block; " target="_blank">
											Go to our site
										</a>
									</td>
								</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td height="30" style="margin: 0;font-size:0px; mso-line-height-rule: exactly; line-height: 1px; white-space-collapse:collapse; max-height:30px;" valign="top">
								&nbsp;
							</td>
						</tr>
					</table>
<!--[if mso]>
	</v:textbox>
	</v:rect>
<![endif]-->
				</td>
			</tr>
			</table>
			<div style="height: 40px;"></div>
			</td>
		</tr>
    </table>
  </div>
</body>
</html>`;

      return res.send(content);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ooops! something went wrong!" });
  }
};


const httpUpdateUser = () => {};

const httpDeleteUser = async(req, res) => {
    const { id } = req.params;
    const user = await handleGetSingle(User, id);
    if (!user) {
        return res.status(400).json({ status: "Fail", message: "Invalid user id" });
    }
    const isDeleted = await handleDelete(User, id);
    if (isDeleted.acknowledged)
        res
        .status(200)
        .json({ message: `User with ${user.email} removed successfully` });
};

export {
  httpRegisterUser,
  httpGetAllUsers,
  httpGetUser,
  httpUpdateUser,
  httpDeleteUser,
  httpLoginUser,
  httpVerify,
};