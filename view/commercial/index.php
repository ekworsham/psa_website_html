<?php include '../layouts/header.php'; ?>

<div class="clear"></div>

<div class="container_12">
  <div class="grid_3">&nbsp;</div>
    
  <div class="grid_9" id="content_box">
    <div id="content">
      <h2>Commercial Landscape Management</h2>
      <p>Proscapes of Atlanta Commercial Services specializes in Office, Industrial, Retail, HOA, and Hotel landscape management needs.</p>
      <div style="width:600px; margin:20px auto;">
        <p style="text-align:left;font-weight:bold;font-size:1.2em;margin-bottom:5px;">Commercial Monthly Maintenance Service Includes:</p>
        <p style="text-align:left;margin-left:20px;border-radius:10px;background-color:#caedca;width:450px;padding:20px 50px;line-height:1.3em;">&#8226; Comprehensive landscape management<br>&#8226; High level communication between us and your property manager<br/>&#8226; Proactive suggestions and solutions to keep ahead of potential problems</p>
      </div>

      <p style="text-align:left;font-weight:bold;font-size:1.2em;margin-bottom:5px;">Total Property Management</p>
      <p style="text-align:left;">Let us bring the areas of improvement to your attention instead of the other way around. Our professionals are trained to spot erosion, contamination and other problems before they're huge headaches that will eat away at your bottom line.</p>
      <p style="text-align:left;">ProScapes of Atlanta will become a partner that works within a budget while providing a high level of service.</p>
      <p style="text-align:left;font-weight:bold;font-size:1.2em;margin-bottom:5px;">Detention Pond Inspection</p>
      <p style="text-align:left;">EPA trained professional will assess and suggest solutions for any problems that may be occurring on your property.</p>  
      <p style="font-weight:bold;">Our staff is available to meet with you at your property for a free consultation.</p>
              
      <div style="width:600px; margin:20px auto;">
        <div style="text-align:left;margin-left:30px;border-radius:10px;background-color:#caedca;width:450px;padding:20px 50px;line-height:1.3em;"><?php

        if(isset($_POST['email2'])) {
        // EDIT THE 2 LINES BELOW AS REQUIRED
          $email_to = "proscapesofatl.kw@gmail.com";
          $email_subject = "COMMERCIAL : ProScapes Web Site Inquiry";

          function died($error) {
          // your error code can go here
            echo "We are very sorry, but there were error(s) found with the form you submitted. ";
            echo "These errors appear below.<br /><br />";
            echo $error."<br /><br />";
            echo "Please <a href=\"javascript: window.history.go(-1)\">go back</a> and fix these errors.<br /><br />";
            die();
          }

          //name phone email2 message
          // validation expected data exists
          if(!isset($_POST['email2']) ||
          !isset($_POST['phone']) ||
          !isset($_POST['name']) ||
          !isset($_POST['message'])) {
          died('We are sorry, but there appears to be a problem with the form you submitted.');       
          }
        
          $email2_from = filter_var($_POST['email2'], FILTER_SANITIZE_EMAIL); // required
          $phone = htmlspecialchars(trim($_POST['phone']), ENT_QUOTES, 'UTF-8'); // required
          $name = htmlspecialchars(trim($_POST['name']), ENT_QUOTES, 'UTF-8'); // required	
          $message = htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8'); // required

          $error_message = "";
          if(!filter_var($email2_from, FILTER_VALIDATE_EMAIL)) {
            $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
          }
          if(strlen($message) < 2) {
            $error_message .= 'The Message you entered do not appear to be valid.<br />';
          }
          if(strlen($error_message) > 0) {
            died($error_message);
          }
          $email_message = "Form details below.\n\n";
                  
          function clean_string($string) {
            $bad = array("content-type","bcc:","to:","cc:","href");
            return str_replace($bad,"",$string);
          }
                
          $email_message .= "Name: ".clean_string($name)."\n";
          $email_message .= "Phone: ".clean_string($phone)."\n"; 
          $email_message .= "Email: ".clean_string($email2_from)."\n";   
          $email_message .= "Message: ".clean_string($message)."\n";    
                
          // create email headers
          $headers = 'From: '.$email2_from."\r\n".
          'Reply-To: '.$email2_from."\r\n" .
          'X-Mailer: PHP/' . phpversion();
          mail($email_to, $email_subject, $email_message, $headers);  
          
          ?>
          <!-- Success message -->
          Thank you for contacting us. We will be in touch with you very soon.
          <?php
        }

        ?>                             
        <form name="contactform_general" method="post" action="index.php">
          <p><label for="name">Name <span style="font-weight:normal;font-size:.8em;">(Optional)</span></label><br/>
          <input type="text" name="name" id="name"></p>
          <p><label for="phone">Phone <span style="font-weight:normal;font-size:.8em;">(Optional)</span></label><br/>
          <input type="tel" name="phone" id="phone"></p>
          <p><label for="email2">Email</label><br/><input type="email" name="email2" id="email2" required></p>
          <p><label for="message">Message</label><br/><textarea name="message" id="message" cols="50" rows="5" required></textarea></p>
          <input type="submit" value="Send Message" name="submit">              
        </form>
      </div>

      <p style="margin:0;">You can also call <span style="font-weight:bold; color:#ff4c00">404-514-6254</span> or email us at <span style="font-weight:bold"><a href="mailto:proscapesofatl.kw@gmail.com">contact@ProScapesOfAtlanta.com</a></span></p>
    </div>
  </div>
</div> <!-- END container12 -->

<?php include '../layouts/footer.php'; ?>
