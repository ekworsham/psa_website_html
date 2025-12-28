<?php
error_reporting(0);
$root = dirname(__DIR__);
$header = $root . '/view/layouts/header.php';
$footer = $root . '/view/layouts/footer.php';
if (file_exists($header)) { include $header; }
?>
<main>
    <h1>Welcome to ProScapes</h1>
    <h2>Misson Statement</h2>
    <p>At ProScapes of Atlanta, our mission is to enhance, protect, and elevate the value of HOA, commercial, and mixed-use communities through consistent, professional landscape management. We are committed to treating every property as if it were our own—delivering dependable service, clear communication, and disciplined execution on every visit.</p>
    <h2>Company Overview:<br> 
<p>ProScapes of Atlanta, LLC is a premier landscape contracting company dedicated to excellence in landscape installation, design, and maintenance. Established with a commitment to quality and professionalism, we have earned a reputation as one of the leading landscape contractors in
the Atlanta area.

Company History: 
Founded by John Estes, ProScapes of Atlanta, LLC began as a residential landscape maintenance company specializing in plant and lawn care. In 2005, the company expanded into landscape installation and was officially incorporated under its current name. Over the years, ProScapes of Atlanta has grown into an award-winning enterprise, renowned for its exceptional craftsmanship and commitment to customer satisfaction.

In 2014, Keith Worsham joined ProScapes of Atlanta as a 50/50 partner, bringing with him a wealth of experience in the landscape industry. With a career that began in 1988, Keith spent 17 years at Post Properties/HighGrove Partners LLC and five years at Georgia’s largest privately owned landscape company, The Brickman Group. His professional journey—from entry-level roles to senior management, career development manager, wholesale store manager for Pike Family Nursery, and Vice President at Freeman’s Tree Care—has provided him with extensive industry expertise. His leadership and strong reputation have been instrumental in shaping ProScapes of Atlanta’s HOA and residential services while driving the company’s expansion into the commercial sector.
</h2>
        

We believe successful communities are built on accountability, proactive care, and long-term stewardship. By partnering closely with property managers and boards, we ensure landscapes are not only well maintained, but thoughtfully managed to reflect pride, safety, and excellence year-round.</p>
  <nav aria-label="Primary">
    <ul>
      <li><a href="/view/commercial/index.php">WTF Commercial</a></li>
      <li><a href="/view/services/index.php">Services</a></li>
      <li><a href="/view/billing/index.php">Billing</a></li>
      <li><a href="/view/contacts/index.php">Free Estimate</a></li>
      <li><a href="/view/contacts/index.php">Contact Us</a></li>
    </ul>
  </nav>
</main>
<?php
if (file_exists($footer)) { include $footer; }
