import { Router } from "express";
import passport from "passport";

const router = Router();

let ref = "";

router.get("/io/referral=:referral", (req, res) => {
  const { referral } = req.params;
  console.log("🔥🔥🔥🔥🔥🔥");
  //http://localhost:3001/api/auth/google?referral=salim
  console.log(referral);
  // console.log(res);
  const html2 = `<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<link href='https://fonts.googleapis.com/css?family=Lato:300,400|Montserrat:700' rel='stylesheet' type='text/css'>
	<style>
		@import url(//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css);
		@import url(//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
	</style>
	<link rel="stylesheet" href="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/default_thank_you.css">
	<script src="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/jquery-1.9.1.min.js"></script>
	<script src="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/html5shiv.js"></script>
	<script>
		document.addEventListener("DOMContentLoaded", function() {
			localStorage.setItem('referral', '${referral}');
		});

		setTimeout(function() {
			window.location.href = 'https://hara.smolleys.com/api/auth/google';
		}, 500);
	</script>
</head>
<body>


	<div class="main-content">
		<p class="main-content__body" data-lead-id="main-content-body">Loading . . .</p>
	</div>

</body>
 
</html>
`;

  res.send(html2);
});

router.get("/google", passport.authenticate("google"), (req, res) => {
  const referral = req.query.referral;
  console.log("🔥🔥🔥🔥🔥🔥");
  console.log(referral);

  const html2 = `<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<link href='https://fonts.googleapis.com/css?family=Lato:300,400|Montserrat:700' rel='stylesheet' type='text/css'>
	<style>
		@import url(//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css);
		@import url(//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
	</style>
	<link rel="stylesheet" href="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/default_thank_you.css">
	<script src="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/jquery-1.9.1.min.js"></script>
	<script src="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/html5shiv.js"></script>
	
</head>
<body>
	
	<div class="main-content">
				<p class="main-content__body" data-lead-id="main-content-body">Loading . . .</p>

	</div>

	
</body>
</html>`;

  res.send(html2);
});

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  const html2 = `<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<link href='https://fonts.googleapis.com/css?family=Lato:300,400|Montserrat:700' rel='stylesheet' type='text/css'>
	<style>
		@import url(//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css);
		@import url(//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
	</style>
	<link rel="stylesheet" href="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/default_thank_you.css">
	<script src="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/jquery-1.9.1.min.js"></script>
	<script src="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/html5shiv.js"></script>

    <script>
		document.addEventListener('DOMContentLoaded', function() {
			var referral = localStorage.getItem('referral');
			

			if (referral) {
				var url = 'https://hara.smolleys.com/subscribe/subscribe/referral=' + referral;
				var xhr = new XMLHttpRequest();

				xhr.open('GET', url, true);
				xhr.send();
			} else{
    console.log("🎁");

			}
		});

		setTimeout(function() {
			window.location.href = 'https://www.youtube.com/@SHoNgxxBoNg?sub_confirmation=1';
		}, 1000); // Redirect after 2 seconds (2000 milliseconds)
	</script>
	
</head>
<body>
	

	<div class="main-content">
		<p class="main-content__body" data-lead-id="main-content-body">Loading . . .</p>
	</div>

	
</body>
</html>
`;

  res.send(html2);
});

export default router;