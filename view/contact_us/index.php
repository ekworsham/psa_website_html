<?php
$estimateStatus = [
  'errors' => [],
  'success' => '',
];

$generalStatus = [
  'errors' => [],
  'success' => '',
];

$estimateData = [
  'name' => '',
  'email' => '',
  'address' => '',
];

$generalData = [
  'name' => '',
  'phone' => '',
  'email' => '',
  'message' => '',
];

$contactEmail = 'proscapesofatl.kw@gmail.com';

function sanitize_text($value)
{
  return trim((string) $value);
}

function validate_email_field($value, array &$errors, string $fieldLabel)
{
  if ($value === '' || !filter_var($value, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "$fieldLabel must be a valid email address.";
  }
}

function validate_required_field($value, array &$errors, string $fieldLabel)
{
  if ($value === '') {
    $errors[] = "$fieldLabel is required.";
  }
}

function build_headers(string $from): string
{
  $fromSafe = filter_var($from, FILTER_SANITIZE_EMAIL);
  return 'From: ' . $fromSafe . "\r\n" .
    'Reply-To: ' . $fromSafe . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
}

function send_contact_email(string $to, string $subject, string $body, string $from): bool
{
  return mail($to, $subject, $body, build_headers($from));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['form_type'])) {
  $formType = $_POST['form_type'];

  if ($formType === 'estimate') {
    $estimateData['name'] = sanitize_text($_POST['name'] ?? '');
    $estimateData['email'] = sanitize_text($_POST['email'] ?? '');
    $estimateData['address'] = sanitize_text($_POST['address'] ?? '');

    validate_email_field($estimateData['email'], $estimateStatus['errors'], 'Email');
    validate_required_field($estimateData['address'], $estimateStatus['errors'], 'Property address');

    if (!$estimateStatus['errors']) {
      $messageLines = [
        'Form details below.',
        '',
        'Name: ' . ($estimateData['name'] !== '' ? $estimateData['name'] : 'Not provided'),
        'Email: ' . $estimateData['email'],
        'Address: ' . $estimateData['address'],
      ];

      send_contact_email(
        $contactEmail,
        'ProScapes Quote Inquiry',
        implode("\n", $messageLines),
        $estimateData['email']
      );

      $estimateStatus['success'] = 'Thank you for contacting us. We will be in touch with you very soon.';
    }
  }

  if ($formType === 'general') {
    $generalData['name'] = sanitize_text($_POST['name'] ?? '');
    $generalData['phone'] = sanitize_text($_POST['phone'] ?? '');
    $generalData['email'] = sanitize_text($_POST['email2'] ?? '');
    $generalData['message'] = sanitize_text($_POST['message'] ?? '');

    validate_email_field($generalData['email'], $generalStatus['errors'], 'Email');
    validate_required_field($generalData['message'], $generalStatus['errors'], 'Message');

    if ($generalData['phone'] !== '' && !preg_match('/^[0-9+\-().\s]{7,20}$/', $generalData['phone'])) {
      $generalStatus['errors'][] = 'Phone must contain only numbers and phone characters (optional).';
    }

    if (!$generalStatus['errors']) {
      $messageLines = [
        'Form details below.',
        '',
        'Name: ' . ($generalData['name'] !== '' ? $generalData['name'] : 'Not provided'),
        'Phone: ' . ($generalData['phone'] !== '' ? $generalData['phone'] : 'Not provided'),
        'Email: ' . $generalData['email'],
        'Message: ' . $generalData['message'],
      ];

      send_contact_email(
        $contactEmail,
        'ProScapes Web Site Inquiry',
        implode("\n", $messageLines),
        $generalData['email']
      );

      $generalStatus['success'] = 'Thank you for contacting us. We will be in touch with you very soon.';
    }
  }
}

include '../layouts/header.php';
?>

<style>
.contact-wrapper {
  width: 600px;
  margin: 20px auto;
}

.contact-card {
  text-align: left;
  margin-left: 30px;
  border-radius: 10px;
  background-color: #caedca;
  width: 450px;
  padding: 20px 50px;
  line-height: 1.3em;
}

.form-group {
  margin-bottom: 14px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
}

.form-group span.optional {
  font-weight: normal;
  font-size: 0.85em;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-actions {
  text-align: center;
  font-weight: normal;
}

.form-actions input[type="submit"] {
  background-color: #0070ba;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.form-actions input[type="submit"]:hover {
  background-color: #005ea6;
}

.alert {
  margin: 0 0 12px 0;
  padding: 10px 14px;
  border-radius: 6px;
  font-weight: 600;
}

.alert.success {
  background-color: #e6ffed;
  border: 1px solid #b7e1b6;
  color: #245b2a;
}

.alert.error {
  background-color: #ffecec;
  border: 1px solid #f5b5b5;
  color: #a12626;
}

.alert ul {
  margin: 6px 0 0 16px;
  padding: 0;
}

.alert li {
  margin: 4px 0;
}

.section-heading {
  margin: 0 0 10px 0;
}

.highlight-text {
  font-weight: bold;
}

.contact-info {
  margin: 0;
}

.contact-info .phone {
  font-weight: bold;
  color: #ff4c00;
}

.contact-info .email {
  font-weight: bold;
}
</style>

<div class="clear"></div>
<div class="container_12">
  <div class="grid_3">&nbsp;</div>
  <div class="grid_9" id="content_box">

      <div class="contact-wrapper">
        <h2  class="section-heading">Contact ProScapes to explore your landscape solutions that will enhance your commercial property.</h2>
        <div class="contact-card">
          <?php if ($generalStatus['success']): ?>
            <div class="alert success"><?php echo htmlspecialchars($generalStatus['success'], ENT_QUOTES, 'UTF-8'); ?></div>
          <?php elseif ($generalStatus['errors']): ?>
            <div class="alert error">
              <ul>
                <?php foreach ($generalStatus['errors'] as $error): ?>
                  <li><?php echo htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
          <?php endif; ?>

          <form name="contactform_general" method="post" action="index.php">
            <input type="hidden" name="form_type" value="general">
            <div class="form-group">
              <label for="general_name">Name <span class="optional">(Optional)</span></label>
              <input type="text" name="name" id="general_name" value="<?php echo htmlspecialchars($generalData['name'], ENT_QUOTES, 'UTF-8'); ?>">
            </div>
            <div class="form-group">
              <label for="general_phone">Phone <span class="optional">(Optional)</span></label>
              <input type="text" name="phone" id="general_phone" value="<?php echo htmlspecialchars($generalData['phone'], ENT_QUOTES, 'UTF-8'); ?>">
            </div>
            <div class="form-group">
              <label for="general_email">Email</label>
              <input type="email" name="email2" id="general_email" required aria-required="true" value="<?php echo htmlspecialchars($generalData['email'], ENT_QUOTES, 'UTF-8'); ?>">
            </div>
            <div class="form-group">
              <label for="general_message">Message</label>
              <textarea name="message" id="general_message" cols="50" rows="5" required aria-required="true"><?php echo htmlspecialchars($generalData['message'], ENT_QUOTES, 'UTF-8'); ?></textarea>
            </div>
            <div class="form-actions">
              <input type="submit" value="Send Message" name="submit">
            </div>
          </form>
        </div>
      </div>
      <p class="contact-info">You can also call <span class="phone">404-514-6254</span> or email us at <a href="mailto:proscapesofatl.kw@gmail.com" class="email">contact@ProScapesOfAtlanta.com</a></p>
    </div>
  </div>
</div> <!-- END container12 -->

<div class="clear"></div>
<div class="container_12">
  <div class="grid_3">&nbsp;</div>
  <div class="grid_9" id="content_box_commercial">
    <div id="content">
      <a href="/view/services"><h2>Looking for Commercial Services?</h2>
      <p>Proscapes of Atlanta Commercial Services specializes in Office, Industrial, Retail, HOA, and Hotel landscape management needs.</p></a>
    </div>
  </div>
</div> <!-- END container12 -->

<?php include '../layouts/footer.php'; ?>
